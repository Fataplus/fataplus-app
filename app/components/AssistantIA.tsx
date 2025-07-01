'use client';

import {
  Alert,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Icon,
  Spinner,
  Text,
  TextArea,
} from '@whop/frosted-ui';
import { useState } from 'react';
import PurchaseButton from '../demo/PurchaseButton';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || '';

export default function AssistantIA() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quotaReached, setQuotaReached] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || quotaReached) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Une erreur est survenue.');
      }

      const data = await response.json();

      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      if (data.quotaReached) {
        setQuotaReached(true);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card css={{ width: '100%', maxWidth: '700px', p: '$0' }}>
      <Box css={{ p: '$4', borderBottom: '1px solid $gray4' }}>
        <Heading size="3">Assistant IA Fataplus</Heading>
        <Text size="2" color="gray">
          Posez vos questions, notre agent est là pour vous aider.
        </Text>
      </Box>

      <Flex direction="column" gap="4" css={{ p: '$4', height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <Flex key={index} gap="3" css={{ alignItems: 'flex-start' }}>
            <Icon.Person_Filled
              color={msg.role === 'user' ? 'grass' : 'gray'}
            />
            <Box>
              <Text weight="bold">
                {msg.role === 'user' ? 'Vous' : 'Assistant'}
              </Text>
              <Text>{msg.content}</Text>
            </Box>
          </Flex>
        ))}
        {isLoading && <Spinner />}
        {error && <Alert color="red">{error}</Alert>}
        {quotaReached && (
          <Alert color="amber">
            <Flex direction="column" gap="3">
              <Text weight="bold">Quota de messages atteint</Text>
              <Text>
                Vous avez utilisé tous vos messages gratuits pour aujourd'hui.
                Passez au plan supérieur pour des conversations illimitées.
              </Text>
              <Box css={{ mt: '$2' }}>
                <PurchaseButton planId={RECOMMENDED_PLAN} />
              </Box>
            </Flex>
          </Alert>
        )}
      </Flex>

      <Box as="form" onSubmit={handleSubmit} css={{ p: '$4', borderTop: '1px solid $gray4' }}>
        <Flex gap="3">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={quotaReached ? "Quota atteint" : "Posez votre question ici..."}
            css={{ flex: 1 }}
            rows={1}
            disabled={isLoading || quotaReached}
          />
          <Button type="submit" color="grass" disabled={isLoading || quotaReached}>
            <Icon.PaperPlane />
          </Button>
        </Flex>
      </Box>
    </Card>
  );
} 