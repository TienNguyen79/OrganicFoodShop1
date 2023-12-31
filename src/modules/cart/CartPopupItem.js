import React, { useEffect } from "react";
import ProImage from "../product/partsCartAndTym/ProImage";
import ProName from "../product/partsCartAndTym/ProName";
import ProQuantity from "../product/partsCartAndTym/ProQuantity";
import ProPrice from "../product/partsCartAndTym/ProPrice";
import IconClose2 from "../../components/Icons/IconClose2";
import { useDispatch } from "react-redux";
import { cartDelete } from "../../store/cart/cart-slice";
import { Link } from "react-router-dom";

const CartPopupItem = ({ data, onClose = () => {} }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between mt-6">
      <Link
        className="flex items-center gap-x-2"
        to={`/productDetails/${data?.id}`}
        onClick={onClose}
      >
        <ProImage
          className="w-[80px] h-[80px]"
          linkUrl={data?.imageUrl}
        ></ProImage>
        <div>
          <ProName
            name={data?.name}
            className="text-sm hover:text-primary"
          ></ProName>
          <div className="flex items-baseline gap-x-1">
            <ProPrice price={(data?.current_price).toFixed(2)}></ProPrice>
            <ProQuantity quantity={data?.pivot?.quantity}></ProQuantity>
          </div>
        </div>
      </Link>
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch(cartDelete(data?.id));
        }}
      >
        <IconClose2></IconClose2>
      </div>
    </div>
  );
};

export default CartPopupItem;
