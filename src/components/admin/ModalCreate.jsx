import { useState } from 'react';
import ModalCreateUser from './ModalCreateUser.jsx';
import ModalCreateTest from './ModalCreateTest.jsx';
import ModalCreateClass from './ModalCreateClass.jsx';
import ModalCreateQuestion from './ModalCreateQuestion.jsx';

export default function ModalCreate({ open, setOpen, userType }) {
  const [user, setUser] = useState({});
  const handleClose = () => setOpen(0);

  const handleInputChange = (e, field) => {
    setUser(pre => ({ ...pre, [field]: e.target.value }));
  };

  let dynamicModal;
  switch (userType.userPath) {
    case 'test':
      dynamicModal = (
        <ModalCreateTest
          test={user}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          open={open}
          userType={userType}
        />
      );
      break;
    case 'question':
      dynamicModal = (
        <ModalCreateQuestion
          question={user}
          handleClose={handleClose}
          handleInputChange={handleInputChange}
          open={open}
          userType={userType}
        />
      );
      break;
    case 'class':
      dynamicModal = (
        <ModalCreateClass
          classes={user}
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
    default:
      dynamicModal = (
        <ModalCreateUser
          classes={user}
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
  }

  return dynamicModal;
}
