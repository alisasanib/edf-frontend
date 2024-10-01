import React from "react";
import styles from "./styles.module.css";

const CircularLoader: React.FC = () => {
  return (
    <div
      data-testid='circular-loader'
      className={styles.loader_container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default CircularLoader;
