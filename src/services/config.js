export const USER_URL = 'http://127.0.0.1:8000/api';

export const QUESTION_URL = 'http://127.0.0.1:8000/api/admin/question/get';
export const CREATE_QUESTION_URL =
  'http://127.0.0.1:8000/api/admin/question/create';
export const SUBJECTS_URL =
  'http://127.0.0.1:8000/api/admin/question/get-subjects';
export const STATUS_URL = 'http://127.0.0.1:8000/api/admin/question/get-status';

export const CLASS_URL = 'http://127.0.0.1:8000/api/admin/class/get';
export const SEARCH_CLASS_URL = 'http://127.0.0.1:8000/api/admin/class/search';
export const CREATE_CLASS_URL = 'http://127.0.0.1:8000/api/admin/class/create';
export const UPDATE_CLASS_URL = 'http://127.0.0.1:8000/api/admin/class/update';

export const TEACHER_URL = 'http://127.0.0.1:8000/api/admin/teacher/get';

export const SUBJECT_URL = 'http://127.0.0.1:8000/api/admin/subject/get';
export const SUBJECT_HEAD = 'http://127.0.0.1:8000/api/admin/subject-head/get';
export const DELETE_SUBJECT_URL =
  'http://127.0.0.1:8000/api/admin/subject/delete';

export const TEST_DETAIL_URL =
  'http://127.0.0.1:8000/api/admin/test/detail/{test_code}';

export const DELETE_HEAD_JUBJECT_URL = ' http://127.0.0.1:8000/api/admin/subject-head/delete';

export const ADMIN_LIST_CHAT_STUDENT = 'http://127.0.0.1:8000/api/admin/notification/list-student';
export const SEND_NOTIFICATION_STUDENT = 'http://127.0.0.1:8000/api/admin/notification/send-all-grade';

export const ADMIN_LIST_CHAT_TEACHER = 'http://127.0.0.1:8000/api/admin/notification/list-teacher';
export const SEND_NOTIFICATION_TEACHER = 'http://127.0.0.1:8000/api/admin/notification/send-all-teacher';

// export const NOTIFICATION_STUDENT = 'http://127.0.0.1:8000/api/student/notification/{class_id}';
export const NOTIFICATION_STUDENT = 'http://127.0.0.1:8000/api/student/notification';

export const CHAT_STUDENT = 'http://127.0.0.1:8000/api/student/chat/send';
export const ALL_CHAT_STUDENT = 'http://127.0.0.1:8000/api/student/chat/all';
// export const ALL_CHAT_STUDENT = 'http://127.0.0.1:8000/api/student/chat/all/{class_id}';


export const ALL_NOTIFICATION_STUDENT = 'http://127.0.0.1:8000/api/teacher/notification/to-student';

export const ALL_NOTIFICATION_ADMIN = 'http://127.0.0.1:8000/api/teacher/notification/by-admin';

export const SEND_NOTIFICATION_TEACHER_BY_STUDENT = 'http://127.0.0.1:8000/api/teacher/notification/send';
