'use client';

import { usePurchaseLink } from '@/lib/get-purchase-link';
import { Button, Icon } from 'frosted-ui';

export default function PurchaseButton({ planId }: { planId: string }) {
  const purchaseLink = usePurchaseLink(planId);

  return (
    <Button as="a" href={purchaseLink} color="grass" size="3">
      Obtenir l'accès maintenant <Icon.ArrowRight />
    </Button>
  );
} 