import Head from "next/head";
import { ReactComponentElement } from "react";
import { Footer } from "../../components";
import Header from "../Header";
import styles from "./styles.module.css";

const AppLayout = ({ children }: { children: ReactComponentElement<any> }) => {
  return (
    <div className={styles["wrapper"]}>
      <Head>
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="" />
        <meta name="keywords" content=""></meta>
      </Head>
      <Header />
      <main className={`${styles["container"]} pt-10 md:pt-14`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export { AppLayout };
