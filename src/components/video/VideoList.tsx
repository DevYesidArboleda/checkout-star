"use client";

import { createRef, useEffect, useRef, useState } from "react";
import Video from "./Video";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetFeedVideos } from "@/hooks/useGetFeedVideos";
import styles from "@/styles/VideoList.module.css";

export default function VideoList() {
  const [videos, setVideos] = useState<any>();
  const searchParams = useSearchParams();
  const catalog_id = searchParams.get("catalogueID") || "";

  //Se obtienen los videos 
  useEffect(() => {
    useGetFeedVideos(catalog_id).then((videos) => setVideos(videos));
  }, []);

  
  return (
    <>
      {videos !== "false" ? (
        <>
          <main className={styles.mainVideoList}>
            <section
              className={styles.sectionVideoList}
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
                        <Video
                          src={video.videoUrl}
                          name={video.name}
                          price={video.price}
                          thumbnail={video.thumbnai}
                        />
                        <button                         
                          className="text-white absolute bottom-[145px] mb-6 w-16 "
                        >
                          {/* <Lottie animationData={animationData} /> */}
                          <span className="flex justify-center text-white text-[10px] text-center font-bold mt-[-5px]">
                            Agregar
                          </span>
                        </button>

                        


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
                                  <span className="">
                                    $
                                    {new Intl.NumberFormat().format(
                                      video.price
                                    )}
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
                            <div>
                              <img
                                className={styles.thumbnailImage}
                                src={video.thumbnail}
                                alt={`${video.name} overlay thumbnail`}
                              />
                            </div>
                          </div>
                          <div className="ml-4 flex-1 py-4">
                            <div className="flex items-bottom justify-between">
                              <p className="text-grey-darkest whitespace-nowrap overflow-hidden overflow-ellipsis">
                                {video.name}
                              </p>
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

                        {/* {addProduct.length !== 0 ? (
                          <div
                            className="fixed bottom-0 md:w-[384px] w-full h-[84px] text-2xl font-bold text-[#53545C] flex justify-center"
                            data-ripple-light="true"
                          >
                            <button className="button">¡Comprar Ahora!</button>
                          </div>
                        ) : (
                          ""
                        )} */}
                      </div>
                    );
                  })}
            </section>
            
          </main>
        </>
      ) : (
        <>
            <div className="flex items-center justify-center h-screen">
              <div className="bg-white border-gray-200 rounded-lg flex flex-col justify-center items-center gap-2 p-6">
                <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
                <span className="text-green-400 text-xl text-center">
                  Por favor contacta con tu vendedor
                </span>
                <span className="text-black text-base font-medium">
                  Información no válida.
                </span>
              </div>
            </div>
        </>
      )}
    </>
  );
}
