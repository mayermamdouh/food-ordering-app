import { FormatCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelations } from "@/types/product";

export default function MenuItem({ item }: { item: ProductWithRelations }) {
  console.log("item.image: ", item.image);
  return (
    <li>
      <div className="relative h-48 w-48 mx-auto">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        ></Image>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-xl my-3">{item.name}</h4>
        <strong className="text-accent">
          {FormatCurrency(item.basePrice)}
        </strong>
      </div>
      <p className="text-gray-500 text-sm line-clamp-3">{item.description}</p>
      <AddToCartButton item={item} />
    </li>
  );
}
