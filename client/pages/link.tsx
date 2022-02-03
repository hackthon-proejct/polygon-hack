import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";
import {
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import Home from "@components/pages/Home";

const LinkPage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bounty</title>
        <meta name="description" content="Crowdfunding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <FormLabel htmlFor="twitter">Link your Twitter account</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">@</InputLeftElement>
          <Input id="twitter" placeholder="@username" />
        </InputGroup>

        <Button loadingText="Submitting" colorScheme="teal" variant="outline">
          Link
        </Button>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

LinkPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withCookieAuth(LinkPage);
