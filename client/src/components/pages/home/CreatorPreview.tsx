import { Text, Box, Flex, Link, Image, VStack } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { Creators_creators } from "@gql/__generated__/Creators";
import { BountyDataType } from "@utils/types";
import { getImageUrlFromYoutube } from "@utils/youtube";
import NextLink from "next/link";
import { useEffect, useState } from "react";

type Props = {
  creator: Creators_creators;
};

export function CreatorPreview({ creator }: Props) {
  const handle = creator?.profile?.twitter_handle;
  const url = creator?.profile?.image_url;
  const successes = Math.round(6 * Math.random());
  const ongoing = Math.round(3 * Math.random());
  return (
    <Flex direction="column" sx={styles.container}>
      <NextLink href={`/${handle}`}>
        <Link>
          <Image sx={styles.image} alt="" src={url || ""} />
        </Link>
      </NextLink>
      <Flex direction="column" sx={styles.metadata}>
        <NextLink href={`/${handle}`}>
          <Link>
            <Text variant="previewTitle">@{handle}</Text>
          </Link>
        </NextLink>
        <Flex direction="column" alignItems="flex-start" spacing={0}>
          <Text variant="creatorPreviewSubtitle">
            {successes} successful bounties
          </Text>
          <Text variant="creatorPreviewSubtitle">
            {ongoing} ongoing bounties
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

const styles = {
  container: { maxWidth: "180px" },
  image: {
    width: "180px",
    height: "180px",
  },
  metadata: {},
};
