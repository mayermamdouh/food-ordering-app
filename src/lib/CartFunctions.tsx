import { cartItem } from "@/store/features/cartSlice";

export const getCartQuantity = (cart: cartItem[]) => {
  return cart.reduce((acc, item) => (item.quantity || 0) + acc, 0);
};

export const getItemQuantity = (id: string, cart: cartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const getSubTotal = (cart: cartItem[]) => {
  return cart.reduce((total, cartItem) => {
    const extraTotal =
      cartItem.extras?.reduce((acc, extra) => acc + (extra.price || 0), 0) || 0;

    const itemTotal = cartItem.price + (cartItem.size?.price || 0) + extraTotal;

    return total + itemTotal * (cartItem.quantity || 0);
  }, 0);
};

export const delivery = 5;
