import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import React from "react";
import MintPage from "../components/mint/index";
import MintNFT from "../components/mintNFT/index";
const Home: NextPage<{}> = () => {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Home</title>
      </Head>
      {/* <MintNFT /> */}

      <MintNFT />
    </div>
  );
};

export default Home;
