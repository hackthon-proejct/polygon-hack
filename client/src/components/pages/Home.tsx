import { Flex, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import theme from "src/theme";
import Bounties from "./home/Bounties";
import Creators from "./home/Creators";
import { PolygonLogo } from "./PolygonLogo";

type Props = {};

function Home() {
  return (
    <VStack sx={styles.container}>
      <Flex direction="column" sx={styles.heroContainer}>
        <Flex direction="column" sx={styles.hero}>
          <Heading sx={styles.title}>bounty</Heading>
          <Text color="white" sx={styles.subtitle}>
            turn ideas into reality
          </Text>
          <Text color="white" sx={styles.subtitle}>
            invert crowdfunding & pitch to creators
          </Text>
          <Text color="white" sx={styles.subtitle}>
            powered by <Icon size={45} as={PolygonLogo} />
          </Text>
        </Flex>
      </Flex>
      <VStack sx={styles.content}>
        <Heading sx={styles.featuredTitle}>Featured Content</Heading>
        <HStack spacing="80px" alignItems="flex-start" sx={styles.featured}>
          <Bounties />
          <Creators />
        </HStack>
      </VStack>
    </VStack>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  heroContainer: {
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bountyGreen,
    background: `linear-gradient(
    ${theme.colors.bountyGreenLighter},
    ${theme.colors.bountyGreen},
    ${theme.colors.bountyGreen},
    ${theme.colors.bountyGreenLight},
    ${theme.colors.bountyGreen},
    ${theme.colors.bountyGreen},
    ${theme.colors.white})`,
    // background: "radial-gradient(#FFF 0%, #7DC794 60%)",
  },
  hero: {
    maxWidth: {
      sm: "350px",
      md: "600px",
      lg: "800px",
      xl: "1000px",
    },
    background: `linear-gradient(
      ${theme.colors.bountyGreenLightest},
      ${theme.colors.bountyGreenLightest},
      ${theme.colors.white},
      ${theme.colors.white},
      ${theme.colors.white},
      ${theme.colors.white},
      ${theme.colors.white},
      ${theme.colors.white},
      ${theme.colors.bountyBrownLight},
      ${theme.colors.bountyBrownLight},
      ${theme.colors.white}
    )`,
    backgroundClip: "text",
    textFillColor: "transparent",
  },
  title: {
    fontFamily: '"Averia Sans Libre", cursive',
    fontSize: {
      sm: "48px",
      md: "60px",
      lg: "72px",
    },
    marginBottom: "16px",
  },
  subtitle: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontWeight: 500,
    fontSize: {
      sm: "24px",
      md: "32px",
      lg: "40px",
    },
  },
  content: {
    minHeight: "100vh",
    paddingTop: "120px",
  },
  featuredTitle: { marginBottom: "60px" },
  featured: {},
};

export default Home;
