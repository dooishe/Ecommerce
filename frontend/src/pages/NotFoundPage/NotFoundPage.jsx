import { useTitle } from "@/hooks/usePageMeta";
import Header from "@/components/Header/Header";
import styles from "./NotFoundPage.module.css";
function NotFoundPage({ cartProducts }) {
  useTitle("404 Page Not Found");
  return (
    <>
      <Header cartProducts={cartProducts} />
      <div className={styles.container}>
        <span className={styles.numbers}>404</span>
        <span className={styles.text1}>Not Found</span>
        <span className={styles.text2}>
          The resource requested not be found on this server!
        </span>
      </div>
    </>
  );
}

export default NotFoundPage;
