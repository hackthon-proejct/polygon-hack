import { Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import theme from "src/theme";
import styles from "../../styles/Home.module.css";

type Props = {};

function Home() {
  return (
    <Flex direction="column" sx={styles.container}>
      <Flex direction="column" sx={styles.hero}>
        <Heading color="white" sx={styles.title}>
          bounty
        </Heading>
        <Text color="white" sx={styles.subtitle}>
          transform ideas into reality,
        </Text>
        <Text color="white" sx={styles.subtitle}>
          inverting the crowdfunding model,
        </Text>
        <Text color="white" sx={styles.subtitle}>
          powered by web3
        </Text>
      </Flex>
    </Flex>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.bountyGreen,
    background: `linear-gradient(${theme.colors.bountyGreen},${theme.colors.bountyGreen}, ${theme.colors.bountyGreen}, ${theme.colors.bountyGreen}, ${theme.colors.white})`,
    // background: "radial-gradient(#FFF 0%, #7DC794 60%)",
  },
  hero: {
    maxWidth: {
      sm: "350px",
      md: "600px",
      lg: "800px",
      xl: "1000px",
    },
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
};

export default Home;
