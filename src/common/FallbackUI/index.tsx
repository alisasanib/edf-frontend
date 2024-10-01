import styles from "./styles.module.css";

const FallbackUI: React.FC = () => {
  return (
    <div className={styles.fallback_container}>
      <h1>Oops! Something went wrong.</h1>
      <p>We are working on fixing this issue.</p>
      <button onClick={() => window.location.reload()}>Reload Page</button>
    </div>
  );
};

export default FallbackUI;
