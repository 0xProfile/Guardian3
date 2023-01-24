import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styles from "../styles/Home.module.css"
import { Connect } from "./CustomButton";

export const Header = ({}) => {
  return (
    <div className={styles.head}>
      <header className={styles.headerwrap}>FC11loud</header>
      <Connect></Connect>
    </div>
  );
};