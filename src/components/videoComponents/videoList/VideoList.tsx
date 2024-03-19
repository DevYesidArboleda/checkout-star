"use client";

import { createRef, useEffect, useRef, useState } from "react";
import Video from "../video/Video";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetFeedVideos } from "@/hooks/useGetFeedVideos";
import styles from "./VideoList.module.css";
import styles2 from "@/styles/pageNotFound.module.css";
import Lottie from "lottie-react";
import animationData from "../../../../public/animations/addProduct.json";
import { useAppDispatch, useAppSelector } from "@/store";
import { toggleCatalog } from "@/store/catalog/catalogs";
import ProductGrid from "@/components/cart/ProductGrid/ProductGrid";
import ModalForm from "@/components/Modal/ModalForm/ModalForm";
import FormCatalog from "@/components/formCatalog/FormCatalog";
import ModalCart from "@/components/Modal/ModalCart/ModalCart";
import router from "next/router";
import ModalCartResumen from "@/components/Modal/ModalCartResumen/ModalCartResumen";
import { ResumenCatalogue } from "@/components/cart/ResumeCatalogue/ResumenCatalogue";
import { UseWindowSize } from "@/hooks/UseWindowSize";
import Modal from "@/components/Modal/ModalInfo/Modal";

export default function VideoList() {
  const [videos, setVideos] = useState<any>();
  const searchParams = useSearchParams();
  const user_id = searchParams.get("userID");
  const catalog_id = searchParams.get("catalogueID") || "";
  const [loading, setLoading] = useState(true);
  const windowSize = UseWindowSize();
  const dispatch = useAppDispatch();

  const addProduct = useAppSelector((state) => Object.values(state.catalogo));

  //Se obtienen los videos
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetFeedVideos(catalog_id).then((videos) => setVideos(videos));
  }, []);

  const handleLoadedData = () => {
    setLoading(false);
  };

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (message) {
      // Muestra el mensaje durante 3 segundos
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer); // Limpia el temporizador al desmontar el componente
    }
  }, [message]);

  const showMessage = (msg: string) => {
    setMessage(msg);
  };

  //Agregar product
  const onToggle = (
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    thumbnail: string,
    variations: any,
    attributes: any,
    variation_id: string
  ) => {
    const catalog = {
      id,
      name,
      description,
      quantity,
      price,
      thumbnail,
      variations,
      attributes,
      variation_id,
    };
    console.log(catalog);

    if (addProduct.some((pos) => pos.id === id)) {
      console.log("La posicion ya existe", id);
      showMessage("Este producto ya fue agregado al carrito");
    } else {
      dispatch(toggleCatalog(catalog));
    }
  };

  //Modal abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //llevar al carrito mobile
  const handleNextCartMobile = () => {
    router.push(`/cartMobile?userID=${user_id}&catalogueID=${catalog_id}`);
  };

  //carrito abrir y cerrar carrito
  const [isModalOpenCart, setIsModalOpenCart] = useState(false);

  const handleOpenModalCart = () => {
    setIsModalOpenCart(true);
  };

  const handleCloseModalCart = () => {
    setIsModalOpenCart(false);
  };

  const handleFormSubmit = (data: any) => {
    // Lógica de manejo de datos del formulario
    console.log("Datos del formulario:", data);
  };

  //carrito abrir y cerrar mobile
  const [isModalOpenMobile, setIsModalOpenMobile] = useState(false);

  const handleOpenModalMobile = () => {
    setIsModalOpenMobile(true);
  };

  const handleCloseModalMobile = () => {
    setIsModalOpenMobile(false);
  };

  //carrito abrir y cerrar info Modal
  const [isModalOpenInfo, setIsModalOpenInfo] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);

  const handleOpenModalInfo = (index:any) => {
    setSelectedVideoIndex(index);
    setIsModalOpenInfo(true);
  };

  const handleCloseModalInfo = () => {
    setIsModalOpenInfo(false);
    setSelectedVideoIndex(null);
  };

  //metodo para scroll
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  console.log(currentIndex)
  const handleScroll = () => {
    if (videoContainerRef.current) {
      const container = videoContainerRef.current;
      const scrollPosition = container.scrollTop;
      const videoHeight = container.clientHeight;
      const newCurrentIndex = Math.round(scrollPosition / videoHeight);

      setCurrentIndex(newCurrentIndex);
    }
  };

  useEffect(() => {
    if (videoContainerRef.current) {
      videoContainerRef.current.addEventListener("scroll", handleScroll);
      return () => {
        if (videoContainerRef.current) {
          videoContainerRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  const handleButtonClick = (direction: "up" | "down") => {
    let newIndex;
    const lastIndex = videos.length - 1;
    console.log("a", lastIndex)
    if (direction === "up") {
      newIndex = currentIndex - 1;
      if (newIndex < -1) return; // Evitar desplazamiento negativo
    } else {
      newIndex = currentIndex + 1;
      if (newIndex > lastIndex) return; // Evitar desplazamiento más allá del último video
    }
  
    if (newIndex === 0 && currentIndex !== 0) {
      if (videoContainerRef.current) {
        videoContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (newIndex === lastIndex && currentIndex !== lastIndex) {
      if (videoContainerRef.current) {
        const container = videoContainerRef.current;
        const lastVideo = container.children[lastIndex] as HTMLDivElement | undefined;
        if (lastVideo) {
          lastVideo.scrollIntoView({ behavior: "smooth", block: "end" });
        }
      }
    } else {
      setCurrentIndex(newIndex); // Establecer el nuevo índice solo si no es necesario desplazarse al principio o al final
    }
  
    if (videoContainerRef.current) {
      const targetVideo = videoContainerRef.current.children[newIndex] as HTMLDivElement | undefined;
      if (targetVideo) {
        targetVideo.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      {videos !== "false" ? (
        <>
          <div className={styles.mainVideoList}>
            <section
              className={styles.sectionVideoList}
              ref={videoContainerRef}
            >
              {!videos
                ? "Loading..."
                : // @ts-ignore
                  videos.map((video, index) => {
                    return (
                      <div
                        className={styles.wraperVideoList}
                        key={index}
                        style={{ scrollSnapAlign: "start" }}
                      >
                        {/* {!isModalOpenCart && <Video
                          src={video.videoUrl}
                          name={video.name}
                          price={video.price}
                          thumbnail={video.thumbnai}
                        /> } */}
                        <Video
                          src={video.videoUrl}
                          name={video.name}
                          price={video.price}
                          thumbnail={video.thumbnai}
                        />
                        <button
                          onClick={() =>
                            onToggle(
                              video._id,
                              video.name,
                              video.description,
                              video.price,
                              1,
                              video.thumbnail,
                              video.variations,
                              video.attributes,
                              ""
                            )
                          }
                          className={styles.buttonAddList}
                        >
                          {<Lottie animationData={animationData} />}
                          <span className={styles.buttonAddListText}>
                            Agregar
                          </span>
                        </button>

                        <button
                          onClick={() => handleOpenModalInfo(index)}
                          className={styles.imageInfo}
                        >
                          <Image
                            src="/img/infoProduct.svg"
                            alt=""
                            width={50}
                            height={50}
                          />
                        </button>

                        <div
                          className={styles.cartBody}
                          onClick={handleOpenModalCart}
                        >
                          <Image
                            src="/img/cart.svg"
                            alt=""
                            width={20}
                            height={20}
                          />
                          <span className={styles.cartBodyText}>
                            {addProduct.length}
                          </span>
                        </div>

                        <ModalCart
                          isOpen={isModalOpenCart}
                          onClose={handleCloseModalCart}
                        >
                          <div className={styles.modalProductGrid}>
                            <ProductGrid catalog={addProduct} />
                          </div>
                        </ModalCart>

                        <div className={styles.imageMain}>
                          <div className={styles.imageRounde}>
                            <div className={styles.imageRounderWraper}>
                              <img
                                className={styles.imageCover}
                                src={video.thumbnail}
                                alt={`${video.name} thumbnail`}
                              />
                            </div>

                            <div className={styles.priceContainer}>
                              <div className={styles.priceText}>
                                <span>
                                  Precio:{" "}
                                  <span className={styles.priceBold}>
                                    $
                                    {new Intl.NumberFormat().format(
                                      video.price
                                    )}
                                  </span>
                                </span>
                              </div>
                              <div
                                className={styles.separationfreeTextContainer}
                              ></div>
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
                              src={video.thumbnail}
                              alt={`${video.name} overlay thumbnail`}
                            />
                          </div>
                          <div className={styles.containerTextImage}>
                            <div className={styles.textImageThumbanail}>
                              <p className="">{video.name}</p>
                            </div>
                          </div>
                        </div>

                        {message && (
                          <p className={styles.messagePop}>{message}</p>
                        )}

                        <div className={styles.containerButtonScroll}>
                          <button
                            onClick={() => handleButtonClick("up")}
                            disabled={currentIndex === 0}
                            className={`${styles.buttonUp} ${
                              currentIndex === 0 ? styles.buttonUpHidden : ""
                            }`}
                          >
                            <Image
                              src="/img/ScrollUp.svg"
                              alt=""
                              width={32}
                              height={32}
                            />
                          </button>

                          <button
                            onClick={() => handleButtonClick("down")}
                            disabled={currentIndex === videos.length - 1}
                            className={styles.buttonDown}
                          >
                            <Image
                              src="/img/ScrollUp.svg"
                              alt=""
                              width={32}
                              height={32}
                              className={`${styles.buttonDownImage} ${
                                currentIndex === videos.length - 1
                                  ? styles.buttonDownHidden
                                  : ""
                              }`}
                            />
                          </button>
                        </div>

                        {addProduct.length !== 0 ? (
                          <div
                            className={styles.buttonAddListProduct}
                            onClick={
                              windowSize.width <= 767
                                ? handleOpenModalMobile
                                : handleOpenModal
                            }
                            data-ripple-light="true"
                          >
                            <button className={styles.button}>
                              ¡Comprar Ahora!
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
            </section>
          </div>
          <div className={styles.videoListProductGrid}>
            <ProductGrid catalog={addProduct} />
          </div>
          <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
            <FormCatalog onSubmit={handleFormSubmit} />
          </ModalForm>
          <ModalCartResumen
            isOpen={isModalOpenMobile}
            onClose={handleCloseModalMobile}
          >
            <ResumenCatalogue />
          </ModalCartResumen>
          <Modal
            isOpen={isModalOpenInfo}
            onClose={handleCloseModalInfo}
          >
            {selectedVideoIndex !== null && (
          <div className={styles.ModalInfo}>
          <h1>{videos[currentIndex]?.name}</h1>
          <span>{videos[currentIndex]?.description}</span>
        </div>
        )}            
          </Modal>
        </>
      ) : (
        <>
          <div className={styles2.containerPage}>
            <div className={styles2.container}>
              <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
              <span className={styles2.text1}>
                Por favor contacta con tu vendedor
              </span>
              <span className={styles2.text2}>Información no válida.</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}
