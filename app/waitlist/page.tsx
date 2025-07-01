import { Container, Flex } from 'frosted-ui';
import WaitlistForm from './WaitlistForm';

export const metadata = {
  title: 'Liste d’attente | Fataplus',
  description: 'Rejoignez la liste d’attente pour être le premier informé du lancement de Fataplus.',
};

export default function WaitlistPage() {
  return (
    <Container size="2" css={{ py: '$8' }}>
      <Flex justify="center">
        <WaitlistForm />
      </Flex>
    </Container>
  );
} 