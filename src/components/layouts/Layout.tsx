import { FC, ReactNode, useEffect } from 'react';
import Head from 'next/head';
import { Providers } from '@/store/Providers';

interface Props {
  title?: string;
  children?:ReactNode;
  thumbnail?:string;
  name?:string;
}


const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const Layout: FC<Props> = ({ children, title, thumbnail, name }) => {
  

  return (
      <>                  

        <Head>
            <title>{ title || 'Checkout' }</title>
            <meta name="author" content="Dropi" />
            <meta name="description" content={`Checkout de ordenes ${ title }`} />
            <meta name="keywords" content={ `${ title }`} />
            <meta property="og:title" content={ `${name}`} />
            <meta property="og:description" content="Checkout para procesar la orden de tus productos" />
            <meta property="og:image" content={`${thumbnail}`} />
        </Head>       

        <main style={{
          minWidth: '100%',
          minHeight: '100%',
          padding: '0px',
          margin: '0px',
          width:"100vw",
          height:"100vh"
        }}>
            <Providers>
              { children }
            </Providers>
        </main>
      
      </>
  )
};