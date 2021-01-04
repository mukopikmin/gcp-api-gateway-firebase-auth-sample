import React from "react";
import { AppProps } from "next/app";
import { AuthProvider } from "../components/Auth";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
