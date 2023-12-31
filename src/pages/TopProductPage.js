import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  proGetBestSeller,
  proGetHotDeal,
  proGetTopRated,
} from "../store/product/pro-slice";
import ProductItem from "../modules/product/ProductItem";
import Label from "../components/label/Label";
import ProQuickView from "../modules/product/ProQuickView";
const tabs = [
  {
    id: 1,
    title: "BestSeller Products",
  },
  {
    id: 2,
    title: "HotDeal Products",
  },
  {
    id: 3,
    title: "TopRated Products",
  },
];
const TopProductPage = () => {
  const dispatch = useDispatch();
  const [tabClicked, setTabClicked] = useState(1);

  useEffect(() => {
    dispatch(proGetBestSeller());
    dispatch(proGetHotDeal());
    dispatch(proGetTopRated());
  }, []);

  const { dataBestSeller, dataHotDeal, dataTopRated, loading } = useSelector(
    (state) => state.product
  );
  const { slug } = useParams();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isClickClose, setIsClickClose] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setIsClickClose(true);
  };

  return (
    <Fragment>
      <ProQuickView
        open={isModalOpen ? "visible" : "invisible"}
        onClose={closeModal}
        isClickClose={isClickClose}
        className="top-[90px]"
        // data={datafake}
      />

      <div className="mt-[80px]">
        <div className="text-center">
          <Label className="text-[35px]">Top Products</Label>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center mt-[40px] border-b-2 relative ">
          {tabs.map((item) => (
            <span
              key={item.id}
              className={`text-gray5 text-center w-[220px] text-[16px] font-medium p-4 after:absolute  after:top-full after:flex after:hover:bg-primary after:hover:h-[2px] after:content-[''] after:w-[180px] after:h-[1px] 
             cursor-pointer ${
               item.id === tabClicked
                 ? "after:bg-primary text-primary after:h-[2px]"
                 : ""
             } `}
              onClick={() => {
                setTabClicked(item.id);
              }}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="mt-[80px]">
          <div
            className={`BestSeller ${tabClicked === 1 ? "block" : "hidden"} `}
          >
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 md:mb-0 lg:mb-0 gap-6 ">
              {dataBestSeller.length > 0 &&
                dataBestSeller.map((item) => (
                  <div>
                    <ProductItem
                      openModal={openModal}
                      data={item}
                    ></ProductItem>
                  </div>
                ))}
            </div>
          </div>
          <div className={`HotDeal ${tabClicked === 2 ? "block" : "hidden"} `}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 md:mb-0 lg:mb-0 gap-6 ">
              {dataHotDeal.length > 0 &&
                dataHotDeal.map((item) => (
                  <div>
                    <ProductItem
                      openModal={openModal}
                      data={item}
                    ></ProductItem>
                  </div>
                ))}
            </div>
          </div>
          <div className={`TopRated ${tabClicked === 3 ? "block" : "hidden"} `}>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8 md:mb-0 lg:mb-0 gap-6 ">
              {dataTopRated.length > 0 &&
                dataTopRated.map((item) => (
                  <div>
                    <ProductItem
                      openModal={openModal}
                      data={item}
                    ></ProductItem>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default TopProductPage;
