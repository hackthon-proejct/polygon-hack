import { Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

type Props = {};

function Home() {
  return (
    <Flex direction="column" sx={styles.container}>
      <Heading sx={styles.title}>bounty</Heading>
      <Text sx={styles.subtitle}>transform ideas into reality,</Text>
      <Text sx={styles.subtitle}>inverting the crowdfunding model,</Text>
      <Text sx={styles.subtitle}>powered by web3</Text>
    </Flex>
  );
}

const styles = {
  container: {
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
    fontSize: {
      sm: "24px",
      md: "32px",
      lg: "40px",
    },
  },
};

export default Home;
