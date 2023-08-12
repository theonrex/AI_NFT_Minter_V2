import type { NextPage } from "next";
import Head from "next/head";
import styles from "./index.module.css";
import React from "react";
import MintPage from "../components/mint/index"

const Home: NextPage<{}> = () => {
  return (
    <div className={styles["container"]}>
      <Head>
        <title>Home</title>
      </Head>
      <MintPage/>
    </div>
  );
};

export default Home;
