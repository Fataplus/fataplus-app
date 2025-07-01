import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const N8N_WEBHOOK_URL = process.env.N8N_AI_AGENT_WEBHOOK_URL;

  // 1. Authenticate the user
  const session = await getServerSession(authOptions);
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  // 2. Check N8N webhook configuration
  if (!N8N_WEBHOOK_URL) {
    console.error('N8N_AI_AGENT_WEBHOOK_URL is not set.');
    return NextResponse.json(
      { error: 'Le serveur est mal configuré.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json(
        { error: 'Le message est manquant.' },
        { status: 400 }
      );
    }

    // 3. Forward the request to the N8N webhook, including the Whop access token
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Forward Whop token to N8N for server-side validation
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        message,
        whop_user_id: session.user.id, // Pass user ID for logging/quota
      }),
    });

    if (!n8nResponse.ok) {
      const errorBody = await n8nResponse.json();
      console.error('N8N webhook returned an error:', errorBody);
      // Pass the N8N error message to the client
      return NextResponse.json(
        { error: errorBody.error || 'Erreur du service IA.' },
        { status: n8nResponse.status }
      );
    }

    const n8nData = await n8nResponse.json();

    // 4. Return the response from N8N to the client
    // N8N should return a JSON object like { "reply": "...", "quotaReached": false }
    return NextResponse.json(n8nData, { status: 200 });
  } catch (error) {
    console.error('Error in /api/ai/agent:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
} 