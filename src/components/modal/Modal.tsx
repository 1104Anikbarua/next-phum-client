import React from "react";
import {
  // Button,
  Modal,
} from "antd";

interface IModalProps {
  isModalOpen: boolean;
  setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserModal = ({ isModalOpen, setisModalOpen }: IModalProps) => {
  //
  //   const [isModalOpen, setisModalOpen] = useState(false);
  //
  return (
    <>
      {/* <Button type="primary" onClick={() => setisModalOpen(true)}>
        Vertically centered modal dialog
      </Button> */}
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={isModalOpen}
        onOk={() => setisModalOpen(false)}
        onCancel={() => setisModalOpen(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};

export default UserModal;
