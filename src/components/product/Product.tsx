import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Product.module.css";
import Video from "../videoComponents/video/Video";
import OnlyProductGrid from "../cart/OnlyProductGrid/OnlyProductGrid";
import Image from "next/image";

export default function Product(dataFinal: any) {
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

  console.log("Product", finalData);

  return (
    <>
      <div className={styles.mainVideo}>
        <div className={styles.mainVideoContainer}>
          <Video
            src={finalData.videoUrl}
            name={finalData.name}
            price={finalData.price}
            thumbnail={finalData.thumbnai}
          />

          <button
            // onClick={handleOpenModal}
            className={styles.imageInfo}
          >
            <Image src="/img/infoProduct.svg" alt="" width={50} height={50} />
          </button>

          <div className={styles.buttonAddListProduct} data-ripple-light="true">
            <button className={styles.button}>¡Comprar Ahora!</button>
          </div>

          <div className={styles.imageMain}>
            <div className={styles.imageRounde}>
              <div className={styles.imageRounderWraper}>
                <img
                  className={styles.imageCover}
                  src={finalData.thumbnail}
                  alt={`${finalData.name} thumbnail`}
                />
              </div>

              <div className={styles.priceContainer}>
                <div className={styles.priceText}>
                  <span>
                    Precio:{" "}
                    <span className={styles.priceBold}>
                      ${new Intl.NumberFormat().format(finalData.price)}
                    </span>
                  </span>
                </div>
                <div className={styles.separationfreeTextContainer}></div>
                <div style={{ paddingTop: 8 }}>
                  <span className={styles.freeTextContainer}>
                    Envío: GRATIS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.thumbnailContainer}>
            <div className={styles.thumbnailRounde}>
              <img
                className={styles.thumbnailImage}
                src={finalData.thumbnail}
                alt={`${finalData.name} overlay thumbnail`}
              />
            </div>
            <div className={styles.containerTextImage}>
              <div className={styles.textImageThumbanail}>
                <p className="">{finalData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.containerCart}>
        <OnlyProductGrid catalog={dataFinal} />
      </div>
    </>
  );
}
