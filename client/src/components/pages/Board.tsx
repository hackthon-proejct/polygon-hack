import Head from "next/head";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { USER } from "@gql/users.graphql";
import styles from "@styles/Home.module.css";

import {
  UserQuery as UserQueryType,
  UserQueryVariables,
  UserQuery_user,
} from "@gqlt/UserQuery";
import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";

type Props = { boardId: string };

function Board({ boardId }: Props) {
  // fetch the user info and their bounties from graphql

  const { data, loading, error } = useQuery<UserQueryType, UserQueryVariables>(
    USER,
    {
      fetchPolicy: "network-only",
      variables: {
        id: boardId,
      },
    }
  );
  console.log("data", data);

  const bounties = data?.user?.board?.bounties || [];

  return (
    <>
      <Heading>{boardId}&apos;s Board</Heading>
      <Text>Bounties</Text>
      {bounties.length ? (
        <Grid sx={styles.bountyGrid} templateColumns="repeat(5, 1fr)" gap={6}>
          {bounties.map((bounty) =>
            bounty ? (
              <GridItem key={bounty.id} w="100%" h="10" bg="blue.500" />
            ) : null
          )}
        </Grid>
      ) : (
        <Text>No bounties found</Text>
      )}
    </>
  );
}

const styles = {
  bountyGrid: {
    width: "100%",
  },
};

export default Board;
