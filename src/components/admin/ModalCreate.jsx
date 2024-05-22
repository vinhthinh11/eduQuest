import ModalCreateUser from './ModalCreateUser.jsx';
import ModalCreateTest from './ModalCreateTest.jsx';
import ModalCreateClass from './ModalCreateClass.jsx';
import ModalCreateQuestion from './ModalCreateQuestion.jsx';

export default function ModalCreate({ open, setOpen, userType }) {
  const handleClose = () => setOpen(0);

  let dynamicModal;
  switch (userType.userPath) {
    case 'test':
      dynamicModal = (
        <ModalCreateTest
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
    case 'question':
      dynamicModal = (
        <ModalCreateQuestion
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
    case 'class':
      dynamicModal = (
        <ModalCreateClass
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
    default:
      dynamicModal = (
        <ModalCreateUser
          handleClose={handleClose}
          open={open}
          userType={userType}
        />
      );
      break;
  }

  return dynamicModal;
}
