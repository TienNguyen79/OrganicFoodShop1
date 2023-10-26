import React, { useEffect, useState } from "react";
import Label from "../components/label/Label";
import FieldBill from "../modules/cart/parts/FieldBill";
import { useForm } from "react-hook-form";
import BillLabel from "../modules/cart/parts/BillLabel";
import Input from "../components/input/Input";
import DropdownInit from "../components/dropdown/init/DropdownInit";
import SelectInit from "../components/dropdown/init/SelectInit";
import ListInit from "../components/dropdown/init/ListInit";
import OptionsInit from "../components/dropdown/init/OptionsInit";
import Checkbox from "../components/checkbox/Checkbox";
import TextArea from "../components/input/TextArea";
import BoxBill from "../modules/cart/parts/BoxBill";
import GroupJusBeween from "../components/common/GroupJusBeween";
import ProImage from "../modules/product/partsCartAndTym/ProImage";
import ProName from "../modules/product/partsCartAndTym/ProName";
import ProQuantity from "../modules/product/partsCartAndTym/ProQuantity";
import ProPrice from "../modules/product/partsCartAndTym/ProPrice";
import Radio from "../components/checkbox/Radio";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { debounce } from "lodash";
import { toast } from "react-toastify";
const schema = yup.object({
  firstName: yup.string().required("FirstName is required"),
  lastName: yup.string().required("LastName is required"),
  detailsAddress: yup
    .string()
    .required("detailsAddress is required")
    .min(5, "Please enter at least 5 characters"),
  phonenumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d+$/, "This field only enters numbers")
    .matches(/^[0-9]{10}$/, "The phone number must be exactly 10 digits"),
  email: yup
    .string()
    .required("E-mail is required")
    .email("Field should contain a valid e-mail"),

  // term: yup.boolean().required("Please accpect the terms and condition"),
});

const CheckOutPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const handleBill = (values) => {
    try {
      if (labelCity === "" || labelDistric === "" || labelvillage === "") {
        toast.error("Address must be complete");
      } else {
        console.log(
          "🚀 ~ file: CheckOutPage.js:56 ~ handleBill ~ values:",
          values
        );
      }
    } catch (error) {
      console.log("🚀 ~ file: CheckOutPage.js:53 ~ handleBill ~ error:", error);
    }
  };

  //city
  const [city, setCity] = useState([]);
  const [queryCity, setQueryCity] = useState("Hà Nội");
  const [labelCity, setLabelCity] = useState("");
  const [codeCity, setCodeCity] = useState("");
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        `https://provinces.open-api.vn/api/p/search/?q=${queryCity}`
      );
      setCity(result.data);
    }
    fetchData();
  }, [queryCity]);

  const handleCityChangeDebounced = debounce((value) => {
    setQueryCity(value);
  }, 300); // 300 milliseconds là khoảng thời gian debounce

  //district

  const [distric, setDistric] = useState([]);
  const [queryDistric, setQueryDistric] = useState("");
  const [labelDistric, setLabelDistric] = useState("");
  const [codeDistric, setCodeDistrict] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        // `https://provinces.open-api.vn/api/d/search/?q=${queryDistric}` chọn thành phố thì xuất hiện các quận huyện tương ứng dựa vào mã code
        `https://provinces.open-api.vn/api/p/${codeCity}?depth=2`
      );

      setDistric(result.data);
    }
    fetchData();
  }, [codeCity]);

  const handleDistricChangeDebounced = debounce((value) => {
    setQueryDistric(value);
  }, 300); // 300 milliseconds là khoảng thời gian debounce

  //Village

  const [village, setVillage] = useState([]);
  const [queryVillage, setQueryVillage] = useState("");
  const [labelvillage, setLabelvillage] = useState("");
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        // `https://provinces.open-api.vn/api/w/search/?q=${queryVillage}` chọn quận huyện thì xuất hiện các xã tương ứng dựa vào mã code
        `https://provinces.open-api.vn/api/d/${codeDistric}?depth=2`
      );

      setVillage(result.data);
    }
    fetchData();
  }, [codeDistric]);

  const handleVillageChangeDebounced = debounce((value) => {
    setQueryVillage(value);
  }, 300); // 300 milliseconds là khoảng thời gian debounce

  return (
    <div className="mt-10 mb-[80px]">
      <div className="mb-8">
        <Label className="text-[25px]">Billing Information</Label>
      </div>
      <form action="" onSubmit={handleSubmit(handleBill)}>
        <div className="grid grid-cols-3 gap-x-6">
          <div className="col-span-2">
            <div className="flex items-center justify-between ">
              <FieldBill>
                <BillLabel
                  className="text-gray9 font-normal"
                  label="First name*"
                ></BillLabel>
                <Input
                  control={control}
                  name="firstName"
                  placeholder="Your first name"
                  error={errors?.firstName?.message}
                ></Input>
              </FieldBill>
              <FieldBill>
                <BillLabel
                  className="text-gray9 font-normal"
                  label="Last name*"
                ></BillLabel>
                <Input
                  control={control}
                  name="lastName"
                  placeholder="Your last name"
                  error={errors?.lastName?.message}
                ></Input>
              </FieldBill>
              <FieldBill>
                <BillLabel
                  className="text-gray9 font-normal"
                  label="Company name"
                ></BillLabel>
                <Input
                  control={control}
                  name="companyName"
                  placeholder="Company name"
                ></Input>
              </FieldBill>
            </div>

            <div className="mt-4 ">
              <div className="flex items-baseline  gap-x-8">
                <FieldBill>
                  <BillLabel
                    className="text-gray9 font-normal"
                    label="City / Province*"
                  ></BillLabel>
                  <DropdownInit>
                    <SelectInit
                      placeholder={labelCity || "Select"}
                    ></SelectInit>
                    <ListInit>
                      <div className="bg-white p-4 ">
                        <input
                          control={control}
                          name="city"
                          placeholder="Search..."
                          className="py-3 px-4 w-full border  font-medium  rounded-md placeholder:text-text4 dark:placeholder:text-text2  dark:text-white text-text1"
                          onChange={(e) =>
                            handleCityChangeDebounced(e.target.value)
                          }
                        ></input>
                      </div>
                      <div className="max-h-[230px] overflow-y-auto">
                        {city.length > 0 &&
                          city.map((item, index) => (
                            <OptionsInit
                              key={index}
                              onClick={() => {
                                setLabelCity(item.name);
                                setCodeCity(item.code);
                              }}
                            >
                              {item.name}
                            </OptionsInit>
                          ))}
                      </div>
                    </ListInit>
                  </DropdownInit>
                </FieldBill>
                <FieldBill>
                  <BillLabel
                    className="text-gray9 font-normal "
                    label="District*"
                  ></BillLabel>
                  <DropdownInit>
                    <SelectInit
                      placeholder={labelDistric || "Select"}
                      className={`${
                        labelCity !== "" ? "" : "pointer-events-none opacity-50"
                      }`}
                    ></SelectInit>
                    <ListInit>
                      {/* <div className="bg-white p-4 ">
                        <input
                          control={control}
                          name="district"
                          placeholder="Search..."
                          className="py-3 px-4 w-full border font-medium  rounded-md placeholder:text-text4 dark:placeholder:text-text2  dark:text-white text-text1"
                          onChange={(e) =>
                            handleDistricChangeDebounced(e.target.value)
                          }
                        ></input>
                      </div> */}
                      <div className="max-h-[230px] overflow-y-auto">
                        {distric?.districts?.length > 0 &&
                          distric.districts.map((item, index) => (
                            <OptionsInit
                              key={index}
                              onClick={() => {
                                setLabelDistric(item.name);
                                setCodeDistrict(item.code);
                              }}
                            >
                              {item.name}
                            </OptionsInit>
                          ))}
                      </div>
                    </ListInit>
                  </DropdownInit>
                </FieldBill>

                <FieldBill>
                  <BillLabel
                    className="text-gray9 font-normal"
                    label="Village*"
                  ></BillLabel>
                  <DropdownInit>
                    <SelectInit
                      placeholder={labelvillage || "Select"}
                      className={`${
                        labelDistric !== ""
                          ? ""
                          : "pointer-events-none opacity-50"
                      }`}
                    ></SelectInit>
                    <ListInit>
                      {/* <div className="bg-white p-4 ">
                        <input
                          control={control}
                          name="village"
                          placeholder="Search..."
                          className="py-3 px-4 w-full border font-medium  rounded-md placeholder:text-text4 dark:placeholder:text-text2  dark:text-white text-text1"
                          onChange={(e) =>
                            handleVillageChangeDebounced(e.target.value)
                          }
                        ></input>
                      </div> */}
                      <div className="max-h-[230px] overflow-y-auto">
                        {village?.wards?.length > 0 &&
                          village?.wards.map((item, index) => (
                            <OptionsInit
                              key={index}
                              onClick={() => setLabelvillage(item.name)}
                            >
                              {item.name}
                            </OptionsInit>
                          ))}
                      </div>
                    </ListInit>
                  </DropdownInit>
                </FieldBill>

                {/* <div className="flex-1 justify-center">
                  <FieldBill>
                    <BillLabel
                      className="text-gray9 font-normal"
                      label="Zip Code"
                    ></BillLabel>
                    <Input
                      control={control}
                      name="zipCode"
                      placeholder="Zip Code"
                    ></Input>
                  </FieldBill>
                </div> */}
              </div>
            </div>

            <div className="">
              <FieldBill>
                <BillLabel
                  className="text-gray9 font-normal"
                  label="Details Address*"
                ></BillLabel>
                <Input
                  control={control}
                  name="detailsAddress"
                  placeholder="Street name, building, house number..."
                  error={errors?.detailsAddress?.message}
                ></Input>
              </FieldBill>
            </div>

            <div className="mt-4">
              <div className="flex items-center gap-x-3 ">
                <div className="flex-1">
                  <FieldBill>
                    <BillLabel
                      className="text-gray9 font-normal"
                      label="Email*"
                    ></BillLabel>
                    <Input
                      control={control}
                      name="email"
                      placeholder="Your Email"
                      error={errors?.email?.message}
                    ></Input>
                  </FieldBill>
                </div>
                <div className="flex-1">
                  <FieldBill>
                    <BillLabel
                      className="text-gray9 font-normal"
                      label="Phone*"
                    ></BillLabel>
                    <Input
                      control={control}
                      name="phonenumber"
                      placeholder="Your Phone Number"
                      error={errors?.phonenumber?.message}
                    ></Input>
                  </FieldBill>
                </div>
              </div>
              {/* <div className="mt-4">
                <Checkbox>Ship to a different address</Checkbox>
              </div> */}
            </div>

            <div className="mt-10">
              <div className="mb-8">
                <Label className="text-[25px]">Additional Info</Label>
              </div>
              <FieldBill>
                <BillLabel
                  className="text-gray9 font-normal"
                  label="Order Notes (Optional)"
                ></BillLabel>

                <TextArea
                  control={control}
                  name="additionalInfo"
                  placeholder="Notes about your order, e.g. special notes for delivery"
                ></TextArea>
              </FieldBill>
            </div>
          </div>
          <div className="col-span-1">
            <BoxBill>
              <Label className="text-[18px] !font-medium">Order Summery</Label>
              <div className="my-5">
                <GroupJusBeween className="my-2">
                  <div className="flex items-center gap-x-2">
                    <ProImage className="w-[60px] h-[60px]"></ProImage>
                    <div>
                      <ProName name="Green Capsicum"></ProName>
                      <ProQuantity quantity={10}></ProQuantity>
                    </div>
                  </div>
                  <ProPrice className="font-medium" price={50}></ProPrice>
                </GroupJusBeween>
              </div>

              <div className="mt-6">
                <GroupJusBeween className="border-b-[1px] py-2 ">
                  <BillLabel label="Subtotal:"></BillLabel>
                  <ProPrice className="font-semibold" price={20}></ProPrice>
                </GroupJusBeween>

                <GroupJusBeween className="border-b-[1px] py-2 ">
                  <BillLabel label="Shipping::"></BillLabel>
                  <BillLabel
                    label="Free"
                    className="font-medium text-gray9"
                  ></BillLabel>
                </GroupJusBeween>

                <GroupJusBeween className="border-b-[1px] py-2 ">
                  <BillLabel label="Total::"></BillLabel>
                  <ProPrice className="font-semibold" price={20}></ProPrice>
                </GroupJusBeween>
              </div>

              <div className="mt-5">
                <Label className="text-[18px] !font-medium">
                  Payment Method
                </Label>

                <div className="text-sm font-normal text-gray7 mt-5">
                  <FieldBill>
                    <Radio control={control} name="payment">
                      Cash on Delivery
                    </Radio>
                    <Radio control={control} name="payment">
                      Paypal
                    </Radio>
                    <Radio control={control} name="payment">
                      Amazon Pay
                    </Radio>
                  </FieldBill>
                </div>
              </div>

              <Button
                type="submit"
                kind="primary"
                className="mt-6 w-full hover:opacity-80 hover:scale-110 transition-all"
              >
                Place Order
              </Button>
            </BoxBill>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckOutPage;