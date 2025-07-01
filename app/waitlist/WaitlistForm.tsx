'use client';

import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  TextField,
  Theme,
} from 'frosted-ui';
import { useState } from 'react';

type FormState =
  | {
      status: 'idle' | 'loading' | 'error';
      message: string;
    }
  | {
      status: 'success';
      message: string;
    };

export default function WaitlistForm() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormState({ status: 'loading', message: '' });

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      sector: formData.get('sector'),
    };

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('La réponse du serveur n'était pas OK.');
      }

      setFormState({
        status: 'success',
        message: 'Merci ! Vous avez été ajouté(e) à notre liste d'attente.',
      });
    } catch (error) {
      setFormState({
        status: 'error',
        message:
          'Une erreur est survenue. Veuillez réessayer ou nous contacter.',
      });
      console.error(error);
    }
  };

  if (formState.status === 'success') {
    return (
      <Card css={{ p: '$5', textAlign: 'center' }}>
        <Flex direction="column" gap="4" align="center">
          <Icon.CheckCircled color="green" size="7" />
          <Heading size="3">Inscription réussie !</Heading>
          <Text color="gray">{formState.message}</Text>
          <Button as="a" href="/" variant="outline">
            Retour à l'accueil
          </Button>
        </Flex>
      </Card>
    );
  }

  return (
    <Card css={{ p: '$5', width: '100%', maxWidth: '450px' }}>
      <form onSubmit={handleSubmit}>
        <Flex direction="column" gap="4">
          <Heading size="4" as="h2">
            Rejoignez la liste d'attente
          </Heading>
          <Text color="gray">
            Soyez le premier informé du lancement de Fataplus et accédez à des
            avantages exclusifs.
          </Text>
          <TextField.Root
            name="name"
            placeholder="Votre nom complet"
            size="3"
            required
            type="text"
          />
          <TextField.Root
            name="email"
            placeholder="Votre adresse e-mail"
            size="3"
            required
            type="email"
          />
          <TextField.Root
            name="sector"
            placeholder="Votre secteur d'activité (ex: e-learning)"
            size="3"
            required
            type="text"
          />
          <Button
            type="submit"
            color="grass"
            size="3"
            disabled={formState.status === 'loading'}
          >
            {formState.status === 'loading' ? 'Envoi en cours...' : "S'inscrire"}
            <Icon.ArrowRight />
          </Button>
          {formState.status === 'error' && (
            <Text color="red" size="2" css={{ textAlign: 'center' }}>
              {formState.message}
            </Text>
          )}
        </Flex>
      </form>
    </Card>
  );
} 