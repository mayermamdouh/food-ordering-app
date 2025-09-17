import {
  addCartItem,
  removeCartItem,
  removeWholeItem,
} from "@/store/features/cartSlice";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { ProductWithRelations } from "@/types/product";
import { Extra, Size } from "@prisma/client";

export const ChooseQuantityButton = ({
  quantity,
  item,
  selectedExtras,
  selectedSize,
}: {
  quantity: number;
  selectedExtras: Extra[];
  selectedSize: Size;
  item: ProductWithRelations;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in cart</span>
        </div>
        <Button
          variant="outline"
          onClick={() =>
            dispatch(
              addCartItem({
                price: item.price,
                id: item.id,
                image: item.image,
                name: item.name,
                extras: selectedExtras,
                size: selectedSize,
              })
            )
          }
        >
          +
        </Button>
      </div>
      <Button
        size="sm"
        onClick={() => dispatch(removeWholeItem({ id: item.id }))}
      >
        Remove
      </Button>
    </div>
  );
};
