import { Text, Box, Flex, Link, Image } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyDataType } from "@utils/types";
import { getImageUrlFromYoutube } from "@utils/youtube";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import BountyRejectButton from "./BountyRejectButton";

type Props = {
  bounty: BountyQuery_bounty;
};

export function BountyPreview({ bounty }: Props) {
  const { title, pitch, description } = bounty.metadata;
  const imageUrl = getImageUrlFromYoutube(pitch);
  return (
    <Flex direction="column" sx={styles.container}>
      <NextLink href={`/${bounty.creator_id}/${bounty.id}`}>
        <Link>
          <Image alt="" src={imageUrl!} />
        </Link>
      </NextLink>
      <Flex direction="column" sx={styles.metadata}>
        <Text>{title}</Text>
        <Text sx={styles.description}>{description}</Text>
      </Flex>
      <BountyRejectButton bounty={bounty} />
    </Flex>
  );
}

const styles = {
  container: { maxWidth: "320px" },
  // TODO: hardcoded to webkit
  description: {
    display: "WebkitBox",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  metadata: {},
};
