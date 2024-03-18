import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import styles2 from "@/styles/pageNotFound.module.css";
import { Layout } from "@/components/layouts/Layout";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import VideoList from "@/components/videoComponents/videoList/VideoList";
import Product from "@/components/product/Product";
import HeaderC from "@/components/header/HeaderComponent";

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
      <div className={styles.containerHeaderVideo}>
       <HeaderC/> 
          {(product_id || catalog_id) && validPage && <div className={styles.mainProduct} > <Product data={dataFinal} /> </div>}
          {catalog_id && (
            <div className={styles.videoListHome}>
              <VideoList />
            </div>
          )}
          {!validPage && loadingContent && (
              <div className={styles2.containerPage}>
                <div className={styles2.container}>
                  <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
                  <span className={styles2.text1}>Por favor contacta con tu vendedor</span>
                  <span className={styles2.text2}>Información no válida.</span>
                </div>
              </div>
          )}
        </div>
    </Layout>
  );
}


// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";
// import styles2 from "@/styles/pageNotFound.module.css";
// import { Layout } from "@/components/layouts/Layout";
// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import axios from "axios";
// import VideoList from "@/components/videoComponents/videoList/VideoList";
// import Product from "@/components/product/Product";

// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const [dataFinal, setDataFinal] = useState<any>([]);
//   const [validPage, setValidPage] = useState<boolean>(false);
//   const [loadingProduct, setLoadingProduct] = useState<boolean>(false); // Nuevo estado para controlar la carga de datos de Product
//   const searchParams = useSearchParams();
//   const product_id:any = searchParams.get("productID");
//   const catalog_id = searchParams.get("catalogueID");

//   useEffect(() => {
//     const fetchData = async () => {
//       const queryParam = { _id: product_id };
//       const isValidMongoId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

//       if (isValidMongoId(product_id)) {
//         setLoadingProduct(true); // Inicia la carga de datos de Product
//         try {
//           const response = await axios.get<any>(
//             `https://martiolo.xyz/api/products/allProducts`,
//             {
//               headers: {},
//               params: {
//                 query: JSON.stringify(queryParam),
//               },
//             }
//           );
//           setDataFinal(response.data.data.products);
//           setValidPage(true);
//         } catch (error) {
//           console.error("Error fetching data:", error);
//         } finally {
//           setLoadingProduct(false); // Finaliza la carga de datos de Product
//         }
//       } else if (product_id !== null) {
//         setValidPage(false); // Establece la página como no válida si el ID no es válido
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   return (
//     <>
//       <Head>
//         <title>Checkout Estrellas</title>
//         {/* Otros metadatos, estilos, scripts, etc. */}
//       </Head>
//       <Layout title="Checkout Estrellas" thumbnail={''} name={''}>
//         <div className="">
//           {(product_id || catalog_id) && validPage && (
//             <div className={styles.mainProduct}>
//               {/* Renderizar Product con la ventana de carga condicional */}
//               {loadingProduct ? (
//                 <div className={styles2.containerPage}>
//                   <div className={styles2.container}>
//                     <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
//                     <span className={styles2.text1}>Cargando...</span>
//                   </div>
//                 </div>
//               ) : (
//                 <Product data={dataFinal} />
//               )}
//             </div>
//           )}
//           {catalog_id && (
//             <div className={styles.videoListHome}>
//               <VideoList />
//             </div>
//           )}
//           {!validPage && (
//             <div className={styles2.containerPage}>
//               <div className={styles2.container}>
//                 <Image src="/img/task_alt.svg" alt="" width={48} height={48} />
//                 <span className={styles2.text1}>Por favor contacta con tu vendedor</span>
//                 <span className={styles2.text2}>Información no válida.</span>
//               </div>
//             </div>
//           )}
//         </div>
//       </Layout>
//     </>
//   );
// }