import Link from "next/link";
import Image from "next/image";
import styles from "./HeaderComponent.module.css";

const HeaderSub: React.FC = () => {
  return (
    <div className={styles.headerContainerSub}>
      <div className={styles.containerContent}>
      <Image
        src="/img/logoStar.svg"
        alt="Logo Star"
        width={30}
        height={30}
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
    </div>
  );
};

export default HeaderSub;
