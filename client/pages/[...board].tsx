import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import Board from "@components/pages/Board";

const BoardPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { board } = router?.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Boards</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {board && board[0] ? (
          <Board boardId={board && board[0]} />
        ) : (
          <>No board was specified.</>
        )}
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

BoardPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withCookieAuth(BoardPage);
