import styles from "./horizontal.module.css";

export default function Horizontal({ children }) {
  return <div className={styles.horizontal}>{children}</div>;
}
