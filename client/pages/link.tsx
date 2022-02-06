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
    </div>
  );
};

LinkPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withCookieAuth(LinkPage);
