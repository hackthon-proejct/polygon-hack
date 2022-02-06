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
      sm: "300px",
      md: "600px",
      lg: "800px",
      xl: "1000px",
    },
  },
  title: {
    fontFamily: '"Averia Sans Libre", cursive',
    fontSize: "72px",
    marginBottom: "16px",
  },
  subtitle: {
    fontFamily: '"Josefin Sans", sans-serif',
    fontSize: "42px",
  },
};

export default Home;
