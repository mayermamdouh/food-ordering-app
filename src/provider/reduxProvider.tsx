"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { useCartInit } from "@/store/hooks";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <CartInitializer />
      {children}
    </Provider>
  );
}

function CartInitializer() {
  useCartInit();
  return null;
}
