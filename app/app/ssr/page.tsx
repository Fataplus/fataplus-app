import getSdk from "@/lib/get-user-sdk/app";
import { NextAppPage } from "@/types/app-dir";
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
} from "@whop/frosted-ui";

const Page: NextAppPage = async () => {
  const { sdk, user } = await getSdk();
  const profile = sdk ? await sdk.retrieveUsersProfile({}) : null;

  return (
    <Container size="3" css={{ py: "$8" }}>
      <Flex direction="column" gap="8" align="center">
        <Box css={{ textAlign: "center" }}>
          <Heading size="5" as="h1">
            Bienvenue sur Fataplus
            {profile ? `, ${profile.username}!` : `!`}
          </Heading>
          <Text size="5" color="gray" css={{ mt: "$2" }}>
            Connecter, apprendre, cultiver – ensemble.
          </Text>
        </Box>

        <Card css={{ p: "$5", width: "100%", maxWidth: "600px" }}>
          <Text>
            Vous êtes actuellement{" "}
            <Text as="span" weight="bold" color={sdk ? "green" : "red"}>
              {sdk ? "connecté(e)" : "déconnecté(e)"}
            </Text>
            .
          </Text>
          {user && (
            <Box css={{ mt: "$4" }}>
              <Text weight="medium">Objet de session :</Text>
              <Box
                as="pre"
                css={{
                  p: "$3",
                  mt: "$2",
                  backgroundColor: "$gray2",
                  borderRadius: "$2",
                  overflowX: "auto",
                  fontSize: "$2",
                }}
              >
                {JSON.stringify(user, null, 2)}
              </Box>
            </Box>
          )}
        </Card>

        <Flex gap="4" justify="center" wrap="wrap">
          {!sdk ? (
            <Button
              as="a"
              href="/api/auth/signin/whop"
              color="grass"
              size="3"
            >
              <Icon.SignIn />
              Se connecter avec Whop
            </Button>
          ) : (
            <>
              <Button as="a" href="/api/auth/signout" variant="outline" size="3">
                <Icon.SignOut />
                Se déconnecter
              </Button>
              <Button
                as={Link}
                href="/app/ssr/product-gated"
                color="grass"
                size="3"
                // @ts-ignore
                prefetch={false}
              >
                Accéder à l'application (SSR)
                <Icon.ArrowRight />
              </Button>
              <Button
                as={Link}
                href="/app/ssg/product-gated"
                variant="surface"
                size="3"
                // @ts-ignore
                prefetch={false}
              >
                Application (SSG)
                <Icon.ArrowRight />
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Page;
