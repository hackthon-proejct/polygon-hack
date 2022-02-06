import { Text, Box, Flex, Link, Image, VStack } from "@chakra-ui/react";
import { BountyQuery_bounty } from "@gql/__generated__/BountyQuery";
import { BountyDataType } from "@utils/types";
import { getImageUrlFromYoutube } from "@utils/youtube";
import NextLink from "next/link";
import { useEffect, useState } from "react";

type Props = {
  creator: any;
};

export function CreatorPreview({ creator }: Props) {
  return (
    <Flex direction="column" sx={styles.container}>
      <NextLink href={`/${creator.twitter_handle}`}>
        <Link>
          <Image sx={styles.image} alt="" src={creator.profile_pic} />
        </Link>
      </NextLink>
      <Flex direction="column" sx={styles.metadata}>
        <NextLink href={`/${creator.twitter_handle}`}>
          <Link>
            <Text variant="previewTitle">@{creator.twitter_handle}</Text>
          </Link>
        </NextLink>
        <Flex direction="column" alignItems="flex-start" spacing={0}>
          <Text variant="previewSubtitle">
            {creator.successes} successful bounties
          </Text>
          <Text variant="previewSubtitle">
            {creator.successes} ongoing bounties
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
