import ModalCreateUser from './ModalCreateUser.jsx';
import ModalCreateTest from './ModalCreateTest.jsx';
import ModalCreateClass from './ModalCreateClass.jsx';
import ModalCreateQuestion from './ModalCreateQuestion.jsx';
import ModalCreatePractice from './ModalCreatePractice.jsx';

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
    case 'practice':
      dynamicModal = (
        <ModalCreatePractice
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
          setOpen={setOpen}
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
