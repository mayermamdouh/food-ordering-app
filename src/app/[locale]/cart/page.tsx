"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { delivery, getSubTotal } from "@/lib/CartFunctions";
import { FormatCurrency } from "@/lib/formatters";
import { selectCarItems, removeWholeItem } from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export default function CartPage() {
  const cart = useAppSelector(selectCarItems);
  const dispatch = useAppDispatch();
  const subTotal = getSubTotal(cart);

  useEffect(() => {
    localStorage.setItem("CartItems", JSON.stringify(cart));
  }, [cart]);

  return (
    <main>
      <section className="section-gap">
        <div className="container text-center">
          <h1 className="text-primary font-bold text-4xl italic mb-6">Cart</h1>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                {cart && cart.length > 0 ? (
                  <>
                    <ul>
                      {cart.map((item) => (
                        <li key={item.id}>
                          <div className="flex flex-col md:flex-row gap-6 justify-between">
                            <div className="flex items-center gap-2">
                              <div className="relative w-24 h-24">
                                <Image
                                  src={item.image}
                                  className="object-contain"
                                  alt={item.name}
                                  fill
                                />
                              </div>
                              <div className="text-start">
                                <h4 className="font-semibold md:text-lg">
                                  {item.name}
                                </h4>
                                <div className="relative">
                                  {item.size && (
                                    <span className="text-sm text-accent">
                                      Size: {item.size.name}
                                    </span>
                                  )}
                                  {item.extras && item.extras.length > 0 && (
                                    <div className="flex gap-1 ">
                                      <span>Extras:</span>
                                      <ul>
                                        {item.extras.map((extra) => (
                                          <li key={extra.id}>
                                            <span className="text-sm text-accent">
                                              {extra.name}{" "}
                                              {FormatCurrency(extra.price)}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  <span className="absolute right-0 top-0 text-sm text-black">
                                    x{item.quantity}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 flex items-center gap-4 justify-end">
                              <strong className="text-black ">
                                {FormatCurrency(item.price)}
                              </strong>
                              <Button
                                onClick={() =>
                                  dispatch(removeWholeItem({ id: item.id }))
                                }
                                variant="secondary"
                                className="border"
                              >
                                <Trash2 />
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-col  pt-6 w-full">
                      <span className="flex justify-between text-accent font-medium">
                        Subtotal:
                        <strong className="text-black">
                          {FormatCurrency(subTotal)}
                        </strong>
                      </span>
                      <span className="flex justify-between text-accent font-medium">
                        Delivery:
                        <strong className="text-black">
                          {FormatCurrency(delivery)}
                        </strong>
                      </span>
                      <span className="flex justify-between text-accent font-medium">
                        Total:
                        <strong className="text-black">
                          {FormatCurrency(subTotal + delivery)}
                        </strong>
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-accent">
                    There are no items in your cart. Add some
                  </p>
                )}
              </div>

              {cart && cart.length > 0 && (
                <div className="grid gap-6 bg-gray-100 rounded-md p-4">
                  <h2 className="text-2xl text-black font-semibold">
                    Checkout
                  </h2>
                  <form action="">
                    <div className="grid gap-4">
                      <div className="grid gap-1">
                        <Label htmlFor="phone" className="text-accent">
                          Phone
                        </Label>
                        <Input
                          id="phone"
                          placeholder="Enter your phone"
                          type="text"
                          name="phone"
                        />
                      </div>
                      <div className="grid gap-1">
                        <Label htmlFor="address" className="text-accent">
                          Street address
                        </Label>
                        <Textarea
                          id="address"
                          placeholder="Enter your address"
                          name="address"
                          className="resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-1">
                          <Label htmlFor="postal-code" className="text-accent">
                            Postal code
                          </Label>
                          <Input
                            type="text"
                            id="postal-code"
                            placeholder="Enter postal code"
                            name="postal-code"
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="city" className="text-accent">
                            City
                          </Label>
                          <Input
                            type="text"
                            id="city"
                            placeholder="Enter your City"
                            name="city"
                          />
                        </div>
                        <div className="grid gap-1">
                          <Label htmlFor="country" className="text-accent">
                            Country
                          </Label>
                          <Input
                            type="text"
                            id="country"
                            placeholder="Enter your country"
                            name="country"
                          />
                        </div>
                      </div>
                      <Button className="h-10">
                        Pay {FormatCurrency(subTotal + delivery)}
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
