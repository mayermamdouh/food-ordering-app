"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Extra, ProductSizes, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem, selectCarItems } from "@/store/features/cartSlice";
import { getItemQuantity } from "@/lib/CartFunctions";
import { ChooseQuantityButton } from "./ChooseQuantityButton";

export default function AddToCartButton({
  item,
}: {
  item: ProductWithRelations;
}) {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCarItems);
  const quantity = getItemQuantity(item.id, cart);
  const defaultSize =
    cart.find((ele) => ele.id === item.id)?.size ||
    item.sizes.find((size) => size.name === ProductSizes.SINGLE);
  const [selectSize, setSelectSize] = useState<Size>(defaultSize!);

  const defaultExtra = cart.find((ele) => ele.id === item.id)?.extras || [];
  const [selectExtra, setSelectExtra] = useState<Extra[]>(defaultExtra!);

  let totalPrice = item.basePrice;
  if (selectSize) {
    totalPrice += selectSize.price;
  }

  if (selectExtra.length > 0) {
    for (const extra of selectExtra) {
      totalPrice += extra.price;
    }
  }

  const handleAddAToCart = () => {
    dispatch(
      addCartItem({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.basePrice,
        size: selectSize,
        extras: selectExtra,
      })
    );
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            type="button"
            size="lg"
            className="mt-4 text-white rounded-full !px-8"
          >
            <span> Add To Cart</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex items-center">
            <Image
              src="/assets/images/sandwich.png"
              alt={item.name}
              width={200}
              height={200}
            />
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription className="text-center">
              {item.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-10">
            <div className="space-y-4 text-center">
              <Label
                className="block w-full text-center"
                htmlFor="pick-sandwish"
              >
                Pick Your Size
              </Label>
              <PickSize
                sizes={item.sizes}
                item={item}
                selectSize={selectSize}
                setSelectSize={setSelectSize}
              />
            </div>
            <div className="grid gap-3">
              <Label className="block w-full text-center" htmlFor="add-extra">
                Any Extra?
              </Label>
              <Extras
                extras={item.extra}
                item={item}
                selectExtra={selectExtra}
                setSelectExtra={setSelectExtra}
              />
            </div>
          </div>
          <DialogFooter>
            {quantity === 0 ? (
              <Button
                type="submit"
                onClick={handleAddAToCart}
                className="w-full h-10"
              >
                Add To Cart {FormatCurrency(totalPrice)}
              </Button>
            ) : (
              <div className="flex items-center justify-center w-full">
                {" "}
                <ChooseQuantityButton
                  quantity={quantity}
                  selectedExtras={selectExtra}
                  selectedSize={selectSize}
                  item={item}
                />{" "}
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

function PickSize({
  sizes,
  item,
  selectSize,
  setSelectSize,
}: {
  sizes: Size[];
  selectSize: Size;
  item: ProductWithRelations;
  setSelectSize: React.Dispatch<React.SetStateAction<Size>>;
}) {
  return (
    <RadioGroup>
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border rounded-md border-gray-100 p-3"
        >
          <RadioGroupItem
            value={selectSize.name}
            checked={selectSize.id === size.id}
            id={size.id}
            onClick={() => setSelectSize(size)}
          />
          <Label htmlFor={size.id}>
            {`${size.name} ${FormatCurrency(size.price + item.basePrice)}`}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

function Extras({
  extras,
  selectExtra,
  setSelectExtra,
}: {
  extras: Extra[];
  item: ProductWithRelations;
  selectExtra: Extra[];
  setSelectExtra: React.Dispatch<React.SetStateAction<Extra[]>>;
}) {
  const handleExtra = (extra: Extra) => {
    if (selectExtra.find((e) => e.id === extra.id)) {
      setSelectExtra((prev) => prev.filter((item) => item.id !== extra.id));
    } else {
      setSelectExtra((prev) => [...prev, extra]);
    }
  };
  return (
    <RadioGroup>
      {extras.map((extra) => (
        <div
          key={extra.id}
          className="flex items-center space-x-2 border rounded-md border-gray-100 p-3"
        >
          <Checkbox
            id={extra.id}
            checked={Boolean(selectExtra.find((e) => e.id === extra.id))}
            onClick={() => handleExtra(extra)}
          />
          <Label htmlFor={extra.id}>
            {extra.name} {FormatCurrency(extra.price)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
