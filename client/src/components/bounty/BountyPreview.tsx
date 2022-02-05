import { Text, Box, Flex, Link } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyDataType } from "@utils/types";
import { getImageUrlFromYoutube } from "@utils/youtube";
import NextLink from "next/link";
import { useEffect, useState } from "react";

type Props = {
  bounty: BountyQuery_bounty;
};

export function BountyPreview({ bounty }: Props) {
  const { title, pitch, description } = bounty.metadata;
  return (
    <Flex direction="column" sx={styles.container}>
      <NextLink href={`/${bounty.creator_id}/${bounty.id}`}>
        <Link>
          <img src={getImageUrlFromYoutube(pitch)} />
        </Link>
      </NextLink>
      <Flex direction="column" sx={styles.metadata}>
        <Text>{title}</Text>
        <Text sx={styles.description}>{description}</Text>
      </Flex>
    </Flex>
  );
}

const styles = {
  container: { maxWidth: "320px" },
  // TODO: hardcoded to webkit
  description: {
    display: "-webkit-box",
    "-webkit-line-clamp": "3",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
  },
  metadata: {},
};
