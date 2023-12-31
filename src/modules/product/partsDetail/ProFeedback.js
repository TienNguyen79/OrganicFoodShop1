import React from "react";
import UserAvatar from "../../user/parts/UserAvatar";
import UserName from "../../user/parts/UserName";
import IconStarYellow from "../../../components/Icons/IconStarYellow";
import IconStarGray from "../../../components/Icons/IconStarGray";
import ProFeauture from "./ProFeauture";

const ProFeedback = ({ isHidden, data }) => {
  //Cách 2 render star
  const starCount = parseInt(2); // Chuyển data thành số nguyên
  const maxStars = 5; // Số sao tối đa
  // Tạo mảng chứa số lượng sao tương ứng
  const stars = Array.from({ length: maxStars }, (_, index) => (
    <IconStarYellow key={index}></IconStarYellow>
  ));
  // Đánh dấu các sao sau starCount bằng màu xám
  stars.fill(<IconStarGray></IconStarGray>, starCount); //thay thế từ vị trí start đến hết thành stargray

  return (
    <div
      className={`${isHidden} grid md:grid-cols-3 lg:grid-cols-3 gap-x-[80px] `}
    >
      <div className=" grid-cols-1 mb-4 lg:mb-0 md:mb-0 md:col-span-3 lg:col-span-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col ">
            <div className="flex items-center  gap-x-2">
              <UserAvatar></UserAvatar>
              <div>
                <UserName></UserName>
                <div className="flex items-center gap-x-1">
                  <IconStarYellow></IconStarYellow>
                  <IconStarYellow></IconStarYellow>
                  <IconStarYellow></IconStarYellow>
                  <IconStarYellow></IconStarYellow>
                  <IconStarYellow></IconStarYellow>
                </div>
              </div>
            </div>
          </div>

          <span className="text-gray4 text-sm font-normal">2 min ago</span>
        </div>
        <p className="mt-1 text-gray5 text-sm font-normal text-justify">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad magnam
          beatae exercitationem libero. Delectus beatae magni placeat? Sequi
          enim a reprehenderit quaerat, fugiat consequuntur iure quod aut,
          eveniet quidem perspiciatis.
        </p>
      </div>
      <div className="col-span-1 md:hidden lg:block">
        <ProFeauture
          urlImage={data?.imageUrl}
          percentDiscount={data?.average_rating}
          nameCate={data?.category?.name}
        ></ProFeauture>
      </div>
    </div>
  );
};

export default ProFeedback;
