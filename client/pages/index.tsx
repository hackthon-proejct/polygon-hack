import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import Home from "@components/pages/Home";

const HomePage: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bounty</title>
        <meta name="description" content="Crowdfunding" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Home />
      </main>
    </div>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withCookieAuth(HomePage);
