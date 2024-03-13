import ReactPlayer from "react-player";
import styles from "./Video.module.css";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

type VideoProps = {
  src: string,
  name?: string,
  thumbnail?: string,
  price?: number
}

export default function Video ({ src, name, price, thumbnail }: VideoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { isPlaying, videoRef } = useAutoPlay();
  const searchParams = useSearchParams();
  const product_id = searchParams.get("productID");
  console.log(product_id)

  return (
    <div className={styles.mainVideo}  style={product_id !=null ? { height: '100dvh' } : {}}>
      <div style={{ position: 'relative' }}>
      <ReactPlayer
       ref={(ref) => {
        videoRef.current = ref;
      }}
        url={src}
        controls={false}
        width="100%"
        height="100%"
        playing={isPlaying}
        loop={true}
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