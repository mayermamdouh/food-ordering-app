"use client";
import { ShoppingCartIcon } from "lucide-react";
import MyLink from "../Link";
import { Routes } from "@/constants/enums";
import { useAppSelector } from "@/store/hooks";
import { selectCarItems } from "@/store/features/cartSlice";
import { getCartQuantity } from "@/lib/CartFunctions";

export default function CartButton() {
  const cart = useAppSelector(selectCarItems);
  const quantity = getCartQuantity(cart);
  return (
    <MyLink href={`/${Routes.CART}`} className="block relative group mx-3">
      <span className="absolute -right-3 -top-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        {quantity}
      </span>
      <ShoppingCartIcon className="text-accent group-hover:text-primary duration-200 transition-colors w-6 h-6" />
    </MyLink>
  );
}
