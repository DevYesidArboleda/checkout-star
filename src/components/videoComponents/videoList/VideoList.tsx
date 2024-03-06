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

export default function VideoList() {
  const [videos, setVideos] = useState<any>();
  const searchParams = useSearchParams();
  const catalog_id = searchParams.get("catalogueID") || "";

  const dispatch = useAppDispatch();

  const addProduct = useAppSelector((state) => Object.values(state.catalogo));

  //Se obtienen los videos
  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGetFeedVideos(catalog_id).then((videos) => setVideos(videos));
  }, []);

  //Agregar product
  const onToggle = (
    id: string,
    name: string,
    description: string,
    price: number,
    quantity: number,
    thumbnail: string,
    variations: any
  ) => {
    const catalog = {
      id,
      name,
      description,
      quantity,
      price,
      thumbnail,
      variations,
    };
    console.log(catalog);

    if (addProduct.some((pos) => pos.id === id)) {
      console.log("La posicion ya existe", id);
    } else {
      dispatch(toggleCatalog(catalog));
    }
  };

  //carrito abrir y cerrar
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  return (
    <>
      {videos !== "false" ? (
        <>
          <main className={styles.mainVideoList}>
            <section className={styles.sectionVideoList}>
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
                        <Video
                          src={video.videoUrl}
                          name={video.name}
                          price={video.price}
                          thumbnail={video.thumbnai}
                        />
                        <button
                          onClick={() =>
                            onToggle(
                              video.externalId,
                              video.name,
                              video.description,
                              video.price,
                              1,
                              video.thumbnail,
                              video.variations
                            )
                          }
                          className={styles.buttonAddList}
                        >
                          {<Lottie animationData={animationData} />}
                          <span className={styles.buttonAddListText}>
                            Agregar
                          </span>
                        </button>

                        <div className={styles.cartBody}
                          onClick={handleOpenModalCart}>
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

                        <ModalCart isOpen={isModalOpenCart}
                          onClose={handleCloseModalCart}>
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

                        {/* <button
                          className="right-0 text-white absolute bottom-[220px] mb-6 mr-4"
                        >
                          <Image
                            src="/img/infoProduct.png"
                            alt=""
                            width={32}
                            height={32}
                          />
                        </button> */}

                        {/* <Modal
                          isOpen={openModal}
                          onClose={handleCloseModalInfo}
                        >
                          <div className="flex flex-col mt-[-20px] z-[1]">
                            <span className="text-base font-bold text-black mb-5">
                              {video.name}
                            </span>
                            <span className="text-sm font-normal text-black">
                              {video.description}
                            </span>
                          </div>
                        </Modal> */}

                        {addProduct.length !== 0 ? (
                          <div
                            className={styles.buttonAddListProduct}
                            onClick={handleOpenModal}
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
          </main>
          <div className={styles.videoListProductGrid}>
            <ProductGrid catalog={addProduct} />
          </div>
          <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
            <FormCatalog onSubmit={handleFormSubmit} />
          </ModalForm>
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
