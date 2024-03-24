import AdminTable from '../../components/AdminTable';
import AdminForm from '../../components/AdminForm';
import { FileUpload } from '@mui/icons-material';

function UserDetail() {
  return (
    <div className="flex w-full min-h-full">
      <div className="basis-3/4 w-full min-h-full flex flex-col">
        <div className="title-content">
          <div className="action hidden" id="select_action">
            <a className="waves-effect waves-light btn">
              Xóa
              <i className="material-icons right">delete</i>
            </a>
          </div>
        </div>

        <div className="block-content overflow scrollbar">
          <AdminTable />
          <AdminForm />
          <FileUpload />
        </div>
      </div>
    </div>
  );
}
export default UserDetail;
