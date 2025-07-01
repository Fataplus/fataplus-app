import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const N8N_WEBHOOK_URL = process.env.N8N_WAITLIST_WEBHOOK_URL;

  if (!N8N_WEBHOOK_URL) {
    console.error('N8N_WAITLIST_WEBHOOK_URL is not set.');
    return NextResponse.json(
      { error: 'Le serveur est mal configuré.' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();

    // Basic validation
    if (!body.email || !body.name || !body.sector) {
      return NextResponse.json({ error: 'Données manquantes.' }, { status: 400 });
    }

    // Forward the data to the N8N webhook
    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!n8nResponse.ok) {
      // Log the error from N8N if any
      const errorBody = await n8nResponse.text();
      console.error('N8N webhook returned an error:', errorBody);
      throw new Error('Failed to forward to N8N webhook');
    }

    return NextResponse.json(
      { message: 'Successfully forwarded to N8N.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in /api/waitlist:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue.' },
      { status: 500 }
    );
  }
} 