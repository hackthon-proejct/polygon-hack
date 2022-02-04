import { Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";

interface Bounty {
  id: string;
}

type Props = {
  userId: string | undefined;
  board:
    | {
        id: string | undefined;
        bounties: (null | Bounty)[] | null;
      }
    | undefined
    | null;
};

function Board({ userId, board }: Props) {
  const { id: board_id, bounties = [] } = board || {};
  return userId != null ? (
    <>
      <Heading>{userId}&apos;s Board</Heading>
      <Text>Bounties</Text>
      {bounties?.length ? (
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
  ) : (
    <Text>No user found.</Text>
  );
}

const styles = {
  bountyGrid: {
    width: "100%",
  },
};

export default Board;
