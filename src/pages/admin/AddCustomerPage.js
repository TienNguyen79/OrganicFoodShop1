import React from "react";
import LayoutAdminAct from "../../layout/LayoutAdminAct";
import BoxBigAdmin from "../../modules/admin/BoxBigAdmin";
import ImageUpload from "../../components/image/ImageUpload";
import GroupJusBeween from "../../components/common/GroupJusBeween";
import BoxField from "../../modules/user/partsSetting/BoxField";
import LabelField from "../../modules/user/partsSetting/LabelField";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import IconEyeToggle from "../../components/Icons/IconEyeToggle";
import useToggleValue from "../../hooks/useToggleValue";
import Radio from "../../components/checkbox/Radio";
import { userRole } from "../../constants/global";
import Button from "../../components/button/Button";

const AddCustomerPage = () => {
  const { control, watch, handleSubmit } = useForm();
  const { value: showEye2, handleToggleValue: handleToggleEye2 } =
    useToggleValue();

  const watchRole = watch("role");
  return (
    <LayoutAdminAct
      label="Add Customer"
      content="Add a new Customer"
      content2="Manage My Customers"
    >
      <div className="flex gap-x-4 justify-end py-5">
        <Button kind="discard" href="/admin/customer">
          Discard
        </Button>
        <Button kind="ghost">PUBLISH CUSTOMER</Button>
      </div>
      <BoxBigAdmin>
        <div className="flex justify-center">
          <ImageUpload></ImageUpload>
        </div>
        <div className="mt-10">
          <GroupJusBeween className="gap-x-8">
            <BoxField className="flex-1">
              <LabelField label="Name"></LabelField>
              <Input
                control={control}
                name="name"
                placeholder="Enter Name..."
              ></Input>
            </BoxField>
            <BoxField className="flex-1">
              <LabelField label="Phone Number"></LabelField>
              <Input
                control={control}
                name="phone_number"
                placeholder="Enter Phone Number..."
              ></Input>
            </BoxField>
          </GroupJusBeween>

          <GroupJusBeween className="gap-x-8 mt-10">
            <BoxField className="flex-1">
              <LabelField label="Email"></LabelField>
              <Input
                control={control}
                name="email"
                placeholder="Enter Email..."
              ></Input>
            </BoxField>
            <BoxField className="flex-1">
              <LabelField label="Password"></LabelField>
              <Input
                control={control}
                kind="eye"
                name="password"
                type={`${showEye2 ? "text" : "password"}`}
                placeholder="Enter Password..."
                className="placeholder:opacity-80 placeholder:text-[14px]"
                cssEye="mt-[5px]"
              >
                <IconEyeToggle
                  open={showEye2}
                  onClick={handleToggleEye2}
                ></IconEyeToggle>
              </Input>
            </BoxField>
          </GroupJusBeween>
          <BoxField className="mt-10">
            <LabelField label="Role" control={control}></LabelField>
            <div className="flex items-center gap-x-4">
              <Radio
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
                name="role"
              >
                <span className="block text-gray6">User</span>
              </Radio>
              <Radio
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
                name="role"
              >
                <span className="block text-gray6">Admin</span>
              </Radio>
            </div>
          </BoxField>
        </div>
      </BoxBigAdmin>
    </LayoutAdminAct>
  );
};

export default AddCustomerPage;