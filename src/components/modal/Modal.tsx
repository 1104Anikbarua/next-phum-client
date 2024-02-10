import React from "react";
import { Modal } from "antd";
import { useSetStatusMutation } from "../../redux/features/admin/userManagementApi";
import { toast } from "sonner";

interface IModalProps {
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  status: {
    status: string;
  };
}

const UserModal = ({
  isModalOpen,
  setisModalOpen,
  id,
  status,
}: IModalProps) => {
  //
  // change user status
  const [setStatus, { isLoading }] = useSetStatusMutation();
  //

  //
  const handleChangeStatus = async () => {
    const userIdStatus = { id, status };
    //
    // console.log(userIdStatus);
    //
    const toastId = toast.loading("Blocking User", {
      position: "top-center",
    });
    try {
      const res = await setStatus(userIdStatus).unwrap();
      if (res.success) {
        toast.success(`User is ${status.status}`, {
          id: toastId,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(`Fail to ${status.status} user`, {
        id: toastId,
        position: "top-center",
      });
    }
  };
  return (
    <>
      <Modal
        title={`Are you sure?`}
        centered
        open={isModalOpen}
        onOk={() => {
          handleChangeStatus(), setisModalOpen(false);
        }}
        onCancel={() => setisModalOpen(false)}
        confirmLoading={isLoading}
      ></Modal>
    </>
  );
};

export default UserModal;
