import React, { useState } from "react";
import Overlay from "../../components/common/Overlay";
import IconClose from "../../components/Icons/IconClose";
import Button from "../../components/button/Button";
import CartPopupItem from "./CartPopupItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartGetAll } from "../../store/cart/cart-slice";
import { getToken } from "../../utils/auth";
import { Fragment } from "react";

const CartPopup = ({
  openCart = "invisible",
  isClickClose,
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const { dataCartAll } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(cartGetAll(getToken()));
  }, []);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // const Arr = [];
    // dataCartAll.map((item) => {
    //   Arr.push(item.current_price * item.pivot.quantity);
    // });
    // const total =
    //   Arr &&
    //   Arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const total = dataCartAll.reduce((accumulator, item) => {
      return accumulator + item.current_price * item.pivot.quantity;
    }, 0);
    setTotalPrice(total);
  }, [dataCartAll]);

  return (
    <div className="relative">
      <Overlay open={openCart} onClick={onClose}></Overlay>
      <div
        className={`fixed bg-white top-0 z-[99] right-0 bottom-0 w-[400px] p-10 flex flex-col transition-all  ${
          openCart === "visible" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray9 text-[20px] font-medium">
            Shopping Card ({dataCartAll?.length})
          </span>
          <span className="cursor-pointer" onClick={onClose}>
            <IconClose color="black"></IconClose>
          </span>
        </div>
        {dataCartAll.length > 0 ? (
          <Fragment>
            <div className="flex-1 overflow-y-auto scroll-hidden ">
              {dataCartAll.length > 0 &&
                dataCartAll.map((item) => (
                  <CartPopupItem
                    key={item.id}
                    data={item}
                    onClose={onClose}
                  ></CartPopupItem>
                ))}
            </div>

            <div>
              <div className="flex items-center justify-between py-6">
                <span className="text-gray9 text-[16px] font-normal">
                  {dataCartAll?.length} Product
                </span>
                <span className="text-gray9 text-[16px] font-semibold">
                  {totalPrice.toFixed(2)} $
                </span>
              </div>
              <div className="flex flex-col gap-y-3">
                <div
                  onClick={() => {
                    let data = {
                      products_order: [...dataCartAll],
                      total_price: totalPrice,
                    };
                    var arrayJSON = JSON.stringify(data);
                    localStorage.setItem("orderData", arrayJSON);
                    onClose(); //sau khi chuyển hướng sẽ đóng popup
                  }}
                >
                  <Button
                    kind="primary"
                    href="/checkout"
                    className="hover:opacity-80 hover:scale-110 transition-all"
                  >
                    CheckOut
                  </Button>
                </div>
                <div onClick={onClose}>
                  <Button
                    kind="secondary"
                    href="/shoppingCart"
                    className="hover:opacity-80 hover:scale-110  transition-all"
                  >
                    Go to Cart
                  </Button>
                </div>
              </div>
            </div>
          </Fragment>
        ) : (
          <div>
            <div className="p-10   mx-auto ">
              <img
                src="https://web.nvnstatic.net/tp/T0199/img/empty_cart.png?v=3"
                alt=""
                className=" object-contain"
              />
            </div>
            <h1 className="text-gray-700 py-5 text-[25px] text-center font-medium">
              N0 ITEMS IN CART
            </h1>
            <Button href="/shop" kind="cart" className="w-[200px] mx-auto">
              Return to shop
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPopup;
