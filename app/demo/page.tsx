import AssistantIA from '../components/AssistantIA';
import { Container, Flex } from '@whop/frosted-ui';

export const metadata = {
  title: 'Agent IA | Fataplus',
  description: 'Interagissez avec notre agent IA pour une démonstration.',
};

export default function DemoPage() {
  return (
    <Container size="2" css={{ py: '$8' }}>
      <Flex justify="center">
        <AssistantIA />
      </Flex>
    </Container>
  );
} 