import { ethers } from "ethers";
import styles from "./mint.module.css";
import React from "react"; // Don't forget to import React

interface NavigationProps {
  account: string | null; // Define the type for account
  setAccount: (account: string | null) => void; // Define the type for setAccount
}

const Navigation: React.FC<NavigationProps> = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className={styles.nav__brand}>
        <h1>AI NFT Generator</h1>
      </div>

      {/* {account ? (
        <button type="button" className={styles.nav__connect}>
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button
          type="button"
          className={styles.nav__connect}
          onClick={connectHandler}
        >
          Connect
        </button>
      )} */}
    </nav>
  );
};

export default Navigation;
