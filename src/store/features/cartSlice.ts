import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Extra, Size } from "@prisma/client";

export type cartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity?: number;
  size?: Size;
  extras?: Extra[];
};

type cartState = {
  Items: cartItem[];
};

const initialState: cartState = {
  Items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<cartItem[]>) => {
      state.Items = action.payload;
    },
    addCartItem: (state, action: PayloadAction<cartItem>) => {
      const existingItme = state.Items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItme) {
        existingItme.quantity = (existingItme.quantity || 0) + 1;
        existingItme.size = action.payload.size;
        existingItme.extras = action.payload.extras;
      } else {
        state.Items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.Items.find((item) => item.id === action.payload.id);
      if (item) {
        if (item.quantity === 1) {
          state.Items = state.Items.filter(
            (item) => item.id !== action.payload.id
          );
        } else {
          item.quantity! -= 1;
        }
      }
    },
    removeWholeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.Items = state.Items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.Items = [];
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  removeCartItem,
  removeWholeItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCarItems = (state: RootState) => state.cart.Items;
