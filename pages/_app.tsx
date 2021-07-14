import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
const { loadIntercom, initIntercomWindow } = require("intercom-next");

import { store, persistor } from "../redux/store";
import Loading from "../components/loading/Loading";

import { useState } from "react";
import { Router } from "next/dist/client/router";

import "../styles/main.scss";

loadIntercom({
  appId: "s3axjlw2",
  email: "raj.gopinath@sootchy.com",
  name: "Some Name",
  ssr: false,
  initWindow: true,
  delay: 0,
});

initIntercomWindow({
  appId: "s3axjlw2",
  email: "raj.gopinath@sootchy.com",
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  Router.events.on("routeChangeStart", () => setLoading(true));
  Router.events.on("routeChangeComplete", () => setLoading(false));
  Router.events.on("routeChangeError", () => setLoading(true));

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {loading ? <Loading /> : <Component {...pageProps} />}
      </PersistGate>
    </ReduxProvider>
  );
}
export default MyApp;
