import { ApolloProvider } from "@apollo/client/react";
import client from "../src/apollo/client";
import "aos/dist/aos.css";
import "../styles/index.scss";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  // console.log(client);
  return (
    <ApolloProvider client={client}>
      <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
