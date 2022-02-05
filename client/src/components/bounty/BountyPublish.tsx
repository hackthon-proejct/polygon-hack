import { Button, Flex } from "@chakra-ui/react";
import { web3 } from "@utils/constants";
import { useMutation } from "@apollo/client";
import {
  PublishBounty,
  PublishBountyVariables,
} from "@gql/__generated__/PublishBounty";
import { PUBLISH_BOUNTY } from "@gql/bounties.graphql";

type Props = { id: string };

export default function BountyPublish(props: Props) {
  const [publishBounty, { loading, error }] = useMutation<
    PublishBounty,
    PublishBountyVariables
  >(PUBLISH_BOUNTY);

  return (
    <Flex direction="column">
      <Button onClick={() => publishBounty({ variables: { id: props.id } })}>
        Publish
      </Button>
    </Flex>
  );
}
