import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.containerContent}>
      <Image
        src="/img/logoStar.svg"
        alt="Logo Star"
        width={64}
        height={64}
        // style={{
        //   width: "100%",
        //   height: "auto",
        // }}
        priority={true}
      />
      <div className="">
        <span className={styles.textheader}>
          estrellas
        </span>
      </div>
      </div>
    </header>
  );
};

export default Header;
