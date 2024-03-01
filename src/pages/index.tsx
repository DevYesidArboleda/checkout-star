import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Layout } from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import VideoList from "@/components/video/VideoList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [dataFinal, setDataFinal] = useState<any>([]);
  const [validPage, setValidPage] = useState<boolean>(false);
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const product_id = searchParams.get("productID");
  const catalog_id = searchParams.get("catalogueID");

  useEffect(() => {
    const fechtDataPrueba = async () => {
      const queryParam = { _id: product_id };
      const isValidMongoId = (id: string) => {
        const mongoIdPattern = /^[0-9a-fA-F]{24}$/;
        return mongoIdPattern.test(id);
      };

      const myMongoId: any = product_id;
      if (isValidMongoId(myMongoId)) {
        console.log("ID de MongoDB válido");
        setValidPage(true);
        const dataApi = await axios.get(
          `https://martiolo.xyz/api/products/allProducts`,
          {
            headers: {},
            params: {
              query: JSON.stringify(queryParam),
            },
          }
        );

        console.log(dataApi);

        setDataFinal(dataApi.data.data.products);
      } else {
        if (product_id !== null) {
          setLoadingContent(true);
        }
      }
    };

    fechtDataPrueba();
  }, [searchParams]);


  return (
    <Layout title="Checkout Estrellas" thumbnail={''} name={''}>
      <div className="">
          {(product_id || catalog_id) && validPage && "contenido para un producto"}
          {catalog_id && (
            <div className={styles.videoListHome}>
              <VideoList />
            </div>
          )}
          {!validPage && loadingContent && (
              <div className="flex items-center justify-center h-screen">
                <div className="bg-white border-gray-200 rounded-lg flex flex-col justify-center items-center gap-2 p-6">
                  <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
                  <span className="text-green-400 text-xl text-center">Por favor contacta con tu vendedor</span>
                  <span className="text-black text-base font-medium">Información no válida.</span>
                </div>
              </div>
          )}
        </div>
    </Layout>
  );
}
