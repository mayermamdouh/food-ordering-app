import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

import { setCartItems } from "@/store/features/cartSlice";
import { useEffect } from "react";

export function useCartInit() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cartItemsLocalStorage = localStorage.getItem("CartItems");
    if (cartItemsLocalStorage) {
      const items = JSON.parse(cartItemsLocalStorage);
      dispatch(setCartItems(items));
    }
  }, [dispatch]);
}
