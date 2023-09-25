const config = {
  HOST_API: 'https://api.dev.elearning.viziple.com/',
  COMPANY: 101,
  TOKEN: 'token',
  itemsCountPerPage: 10,
};
export default config;

export const RESPONSE_STATUS = {
  SUCESS: 200,
  CREATE_SUCCESS: 201,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  ACCESS_DENIED: 401,
};

export const INVALID_TOKEN = 'INVALID_TOKEN';

export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const URL_UPLOAD = `${process.env.REACT_APP_API_URL}files/upload/`;
export const URL_DOWNLOAD = `${process.env.REACT_APP_API_URL}files/download/`;
export const URL_UPLOAD_LESSON = `${process.env.REACT_APP_API_URL}files/uploads/lessons`;

export const DATE_TIME_FORMAT = 'DD/MM/YYYY';

export const TYPE_TRANSACTION = [
  {
    name: 'Bán khóa học',
    value: 'OWNER_SELL',
  },
  {
    name: 'Bán khóa học (cấp con bán)',
    value: 'REFUSER_SELL',
  },
  {
    name: 'Hoa hồng',
    value: 'REF',
  },
  {
    name: 'Hoa hồng (cấp con bán)',
    value: 'REF_SELL',
  },
  {
    name: 'Admin bán',
    value: 'ADMIN_SELL',
  },
  {
    name: 'Bán khóa học',
    value: 'ADMIN_RECHARGE',
  },
  {
    name: 'Mua khóa học',
    value: 'USER_BUY',
  },
  {
    name: 'Admin rút tiền',
    value: 'ADMIN_WITHDRAW',
  },
  {
    name: 'Rút tiền',
    value: 'WITHDRAW',
  },
  {
    name: 'Nạp tiền',
    value: 'DEPOSIT',
  },
];

export const ORDER_STATUS: any = {
  PROCESSING: 'Đang xử lý',
  COMPLETE: 'Đã hoàn thành',
  CANCEL: 'Hủy',
  LOCK: 'Khóa',
  ERROR: 'Lỗi',
};

export const USER_ROLES: any = {
  USER: 'User thường',
  SELLER: 'User tạo khóa học',
  ADMIN: 'User admin',
};

export const LANGUAGE: any = {
  VI: 'Tiếng Việt',
  vn: 'Tiếng Việt',
  en: 'Tiếng Anh',
  EN: 'Tiếng Anh',
};

export const T1 = 'T1';
export const Fee = 'Fee';

export const PARAMS_SETTING: any = {
  G1: 'Tỉ lệ nhận hoa hồng',
  G2: 'Số cấp nhận hoa hồng',
  T1: 'Số tiền rút tối thiểu',
  Fee: 'Phí thanh toán',
  T2: 'Phí hệ thống',
  T3: 'Phí rút tiền',
};

export const PARAMS_SETTING_SUFFIX: any = {
  G1: '%',
  G2: '',
  T1: 'VND',
  Fee: 'VND',
  T2: '%',
  T3: '%',
};

export const OPERATOR = ['+', '-', '*', '^', '/', '(', ')'];

export const TRANSACTION_TYPE: any = {
  transfer: 'Chuyển Khoản',
  vnpay: 'Online',
  pay_with_balance: 'Số dư',
};

export const EDITOR = {
  plugins:
    'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
  imagetools_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar:
    'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  link_list: [
    { title: 'My page 1', value: 'https://www.tiny.cloud' },
    { title: 'My page 2', value: 'http://www.moxiecode.com' },
  ],
  image_list: [
    { title: 'My page 1', value: 'https://www.tiny.cloud' },
    { title: 'My page 2', value: 'http://www.moxiecode.com' },
  ],
  image_class_list: [
    { title: 'None', value: '' },
    { title: 'Some class', value: 'class-name' },
  ],
  importcss_append: true,
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  contextmenu: 'link image imagetools table',
  content_style: 'body { font-family:PF-BeauSans-Pro,Arial,sans-serif; font-size:14px }',
};

export const API_MEDIA = process.env.REACT_APP_MEDIA_URL;

export const PAGE_TYPE: any = {
  INTRODUCE: 'Giới thiệu',
  CGU: 'Điều khoản',
};

export const TransactionName: any = {
  OWNER_SELL: 'Bán khóa học', // bán khóa học khách hàng tự chọn (người bán bán khoá học) -> hiển thị cho cấp cha. không có hoa hồng cho các cấp con
  REFUSER_SELL: 'Cấp con bán khóa học', // bán khóa học cấp con bán khoá học của cấp cha -> hiển thị cho cấp cha
  REF: 'Hoa hồng', // hoa hồng cấp con bán -> các cấp cha dc ăn hoa hồng
  REF_SELL: 'Hoa hồng', // hoa hồng user cấp con đã bán khoá học
  ADMIN_SELL: 'Admin bán', // bán khóa học admin bán khoá học trên CMS
  ADMIN_RECHARGE: 'Admin nạp tiền', // admin nạp tiền
  USER_BUY: 'Mua khóa học', // Mua khóa học khách hàng mua cho outcome, trừ tiền kháng hàng
  ADMIN_WITHDRAW: 'ADMIN_WITHDRAW', // admin rút tiền -> cms : chưa có case này
  WITHDRAW: 'Rút tiền',
  DEPOSIT: 'Nạp tiền', // nạp tiền nạp tiền bằng VNPAY hoặc nap tiền khi mua khoá học online
  FEE: 'Phí',
};

export const OrderStatus: any = {
  CHECKOUT: 'CHECKOUT',
  COMPLETE: 'Hoàn Thành',
  CANCEL: 'Hủy',
  LOCK: 'Khóa',
  ERROR: 'Lỗi',
  PROCESSING: 'Đang diễn ra',
  DEPOSIT: 'Nạp tiền',
};
