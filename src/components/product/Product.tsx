import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import styles from "./Product.module.css";

export default function Product (dataFinal: any) {
    const [finalData, setFinalData] = useState<any>([]);
    
    useEffect(() => {        
        const fetchData = async () => {
          const final: any = dataFinal.data;
          final.forEach((element: any) => {
            setFinalData(element);
          });
        };
    
        fetchData();
      }, [dataFinal]);


  return (
    <div className={styles.mainVideo}>
        <ReactPlayer
        url={finalData.videoUrl}
        controls={true}
        width="100%"
        height="100%"
        playing={true}
        className={styles.wraperVideo}
      />
    </div>
  )
}
