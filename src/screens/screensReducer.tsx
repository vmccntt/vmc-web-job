import { combineReducers } from "redux";
import postReducer from "./post/slice";
import postHistoryReducer from "./postHistory/slice";
import bannerReducer from "./banner/slice";
import categoryReducer from "./category/slice";
import userReducer from "./user/slice";
import partnerReducer from "./partner/slice";
import contactReducer from "./contact/slice";
import inforContactReducer from "./inforContact/slice";
import languageReducer from "./language/slice";
import recruimentReducer from "./recruiment/slice";
import roleReducer from "./role/slice";
import customerReducer from "./crm/customer/pages/listCustomer/slice";

const screenReducer = combineReducers({
  language: languageReducer,
  recruiment: recruimentReducer,
  post: postReducer,
  banner: bannerReducer,
  category: categoryReducer,
  user: userReducer,
  role: roleReducer,
  partner: partnerReducer,
  contact: contactReducer,
  inforContact: inforContactReducer,
  postHistory: postHistoryReducer,
  // TienLY: CRM
  customer: customerReducer,
});
export default screenReducer;
