import React from "react";
import {
  // Button,
  Modal,
} from "antd";
import { useSetStatusMutation } from "../../redux/features/admin/userManagementApi";
import { toast } from "sonner";

interface IModalProps {
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  studentId: string;
  status: {
    status: string;
  };
}

const UserModal = ({
  isModalOpen,
  setisModalOpen,
  studentId,
  status,
}: IModalProps) => {
  //
  const [blockStudent, { isLoading }] = useSetStatusMutation();
  //
  const handleChangeStatus = async () => {
    const userIdStatus = { studentId, status };
    //
    console.log(userIdStatus);
    const id = toast.loading("Blocking Student", { position: "top-center" });
    try {
      const res = await blockStudent(userIdStatus).unwrap();
      if (res.success) {
        toast.success(`Student is ${status.status}`, {
          id,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Fail to block student", { id, position: "top-center" });
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
      ></Modal>
    </>
  );
};

export default UserModal;
