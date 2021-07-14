import { render, RenderOptions } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import Loading from "../../components/loading/Loading";

import { store, persistor } from "../../redux/store";

const TestRenderer = ({ children }: any) => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
};

const customRender: any = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  render(ui, {
    wrapper: TestRenderer,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };
