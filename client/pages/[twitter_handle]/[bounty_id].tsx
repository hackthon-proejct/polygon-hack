import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { withCookieAuth } from "@utils/auth";
import Layout from "@layouts/Layout";
import { NextPageWithLayout } from "@utils/types";
import Board from "@components/pages/Board";
import { IS_SERVER } from "@utils/constants";
import { getLocalStorageKey } from "@utils/api_client";
import Me from "@components/pages/Me";
import Bounty from "@components/pages/Bounty";
import { Container } from "@chakra-ui/react";

const BountyPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { twitter_handle, bounty_id } = router?.query;

  return (
    <Container variant="base">
      <Head>
        <title>Boards</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {bounty_id ? (
        <Bounty bountyId={bounty_id as string} />
      ) : (
        <>No board was specified.</>
      )}
    </Container>
  );
};

BountyPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default withCookieAuth(BountyPage);
