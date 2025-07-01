import getSdk from "@/lib/get-user-sdk/app";
import { cached as findProduct } from "@/lib/has-product";
import ServerSDK from "@/lib/sdk";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
} from "frosted-ui";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import PurchaseButton from "./PurchaseButton";

const ALLOWED_PRODUCT: string = process.env.NEXT_PUBLIC_REQUIRED_PRODUCT || "";
const RECOMMENDED_PLAN = process.env.NEXT_PUBLIC_RECOMMENDED_PLAN_ID || "";

export default async function DemoLayout({ children }: PropsWithChildren<{}>) {
  const { sdk } = await getSdk();
  if (!sdk) {
    return redirect("/app/ssr"); // Redirect to login if not authenticated
  }

  const membership = await findProduct(sdk, ALLOWED_PRODUCT);

  if (!membership) {
    const plan = await ServerSDK.plans.retrievePlan({ id: RECOMMENDED_PLAN });
    return (
      <Container size="2" css={{ py: "$8" }}>
        <Flex direction="column" gap="4" align="center">
          <Card css={{ p: "$5", width: "100%", maxWidth: "500px" }}>
            <Flex direction="column" gap="4" align="center">
              <Icon.Lock size="7" color="amber" />
              <Heading>Accès exclusif</Heading>
              <Text color="gray" css={{ textAlign: "center" }}>
                Pour accéder à notre démonstration de l'agent IA, un accès est
                requis.
              </Text>
              {plan && (
                <Text size="2" color="gray">
                  Plan recommandé : {plan.name}
                </Text>
              )}
              <PurchaseButton planId={RECOMMENDED_PLAN} />
            </Flex>
          </Card>
        </Flex>
      </Container>
    );
  }

  return <>{children}</>;
} 