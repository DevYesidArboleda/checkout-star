import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import styles from "./Product.module.css";
import Video from "../videoComponents/video/Video";
import OnlyProductGrid from "../cart/OnlyProductGrid/OnlyProductGrid";
import Image from "next/image";
import Modal from "../Modal/ModalInfo/Modal";
import colorNameList from "color-name-list";
import { colorNameToHex } from "../utils/colors";


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

  //Modal abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //prueba modal para variaciones
  const attributeValues: any = {};

  finalData.attributes?.forEach((attribute: any) => {
    const { description, values } = attribute;

    values.forEach((value: any) => {
      const { attribute_name, value: attributeValue } = value;

      if (!attributeValues[attribute_name]) {
        attributeValues[attribute_name] = [];
      }

      const hexColor = colorNameToHex[attributeValue.toLowerCase()];
      const displayValue = hexColor || attributeValue;

      attributeValues[attribute_name].push(displayValue);
    });
  });

  console.log("resultado de variaciones", attributeValues);

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

          <button onClick={handleOpenModal} className={styles.imageInfo}>
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

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.ModalInfo}>
          <h1>{finalData.name}</h1>
          <span>{finalData.description}</span>
        </div>
        {finalData.attributes?.length > 0 && <div className={styles.containerVariation}>
          {Object.entries(attributeValues).map(
            ([attributeName, values]: any) => (
              <div key={attributeName}>
                <h3>{attributeName}:</h3>
                <ul>
                  {values.map((value: any, index: any) => (
                    <li
                      key={index}
                      style={
                        isColor(value)
                          ? {
                              color: value,
                              background: value,
                              width: "24px",
                              height: "24px",
                              borderRadius: "5px",
                            }
                          : {}
                      }
                    >
                      {isColor(value) ? "" : value}
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>}
      </Modal>
    </>
  );
}

const isColor = (value: string): boolean => {
  return /^#([0-9A-F]{3}){1,2}$/i.test(value);
};
