import styles from "@/styles/Video.module.css";

type VideoProps = {
  src: string,
  name?: string,
  thumbnail?: string,
  price?: number
}

export default function Video ({ src, name, price, thumbnail }: VideoProps) {

  return (
    <div className={styles.mainVideo}>
      <div style={{ position: 'relative' }}>
        <video className={styles.wraperVideo} controls muted playsInline loop >
          <source src={src} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
}