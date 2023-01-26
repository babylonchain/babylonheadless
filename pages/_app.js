import { ApolloProvider } from "@apollo/client/react";
import client from "../src/apollo/client";
import "aos/dist/aos.css";
import "../styles/index.scss";

function MyApp({ Component, pageProps }) {
  // console.log(client);
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
