import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { USER } from "@gql/users.graphql";

import {
  UserQuery as UserQueryType,
  UserQueryVariables,
  UserQuery_user,
} from "@gqlt/UserQuery";
import { Heading, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { BountyPreview } from "@components/BountyPreview";

type Props = { userId: string };

function Board({ userId }: Props) {
  // fetch the user info and their bounties from graphql

  const { data, loading, error } = useQuery<UserQueryType, UserQueryVariables>(
    USER,
    {
      fetchPolicy: "network-only",
      variables: {
        id: userId,
      },
    }
  );

  const user = data?.user || null;

  const { board } = user || {};
  const { bounties = [] } = board || {};
  return userId != null ? (
    <>
      <Heading>{userId}&apos;s Board</Heading>
      <Text>Bounties</Text>
      {bounties?.length ? (
        <Wrap sx={styles.bountyWrap} spacing="30px">
          {bounties.map((bounty) =>
            bounty ? (
              <WrapItem key={bounty.id}>
                <BountyPreview bounty={bounty} />
              </WrapItem>
            ) : null
          )}
        </Wrap>
      ) : (
        <Text>No bounties found</Text>
      )}
    </>
  ) : (
    <Text>No user found.</Text>
  );
}

const styles = {
  bountyWrap: {
    width: "100%",
  },
};

export default Board;
