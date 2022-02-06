import { Button, Text, Flex, Heading, VStack } from "@chakra-ui/react";
import { web3 } from "@utils/constants";
import { useMutation } from "@apollo/client";
import {
  PublishBounty,
  PublishBountyVariables,
} from "@gql/__generated__/PublishBounty";
import { PUBLISH_BOUNTY } from "@gql/bounties.graphql";
import { useState } from "react";
import { useRouter } from "next/router";

type Props = { id: string };

export default function BountyPublish(props: Props) {
  const router = useRouter();
  const [publishBounty, { loading, error }] = useMutation<
    PublishBounty,
    PublishBountyVariables
  >(PUBLISH_BOUNTY);

  return (
    <VStack
      direction="column"
      mt="36px"
      spacing="12px"
      maxWidth="80%"
      margin="auto"
    >
      <Heading my="12px">Publish this bounty</Heading>
      <Text textAlign="center" fontSize="24px" pb="12px">
        Ready to show the world? Publish this bounty to kickstart the funding
        process!
      </Text>
      <Button
        isLoading={loading}
        onClick={async () => {
          const resp = await publishBounty({ variables: { id: props.id } });
        }}
      >
        Publish
      </Button>
    </VStack>
  );
}
