import ReactPlayer from "react-player";
import styles from "./Video.module.css";

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
      <ReactPlayer
        url={src}
        controls={true}
        width="100%"
        height="100%"
        playing={false}
        loop={false}
        muted={true}
        className={styles.wraperVideo}
        onReady={()=>console.log('is ready')
        }
      />
        {/* <video className={styles.wraperVideo} controls muted playsInline loop >
          <source src={src} type="video/mp4"></source>
        </video> */}
      </div>
    </div>
  );
}