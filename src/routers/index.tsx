import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "../Layout";
import { useAppSelector } from "../app/hooks";
import LoginPage from "../screens/login";
import NotFoundPage from "../screens/notFound";
import CreateUserComponent from "../screens/user/component/createUserComponent";
import DashBoardPage from "../screens/DashBoard";
import blockInfo from "../screens/crm/customer/pages/detailCustomer/blockInfo";
import CustomerPage from "../screens/crm/customer/pages/listCustomer/component";
import { IUserState } from "../screens/user/propState";
import { isCheckPermisson } from "../utils";
import { PERMISSION_ENUM } from "../utils/permisson.enum";

const PrivateRoute = ({ ...routeProps }: any) => {
  const isAuth = useAppSelector((state: any) => state.auth.userInfo);
  const userState = useAppSelector<IUserState>((state) => state.screens.user);
  const permissionObj = userState.permissionObj;

  if (isAuth.access_token) {
    const prop =
      isCheckPermisson(permissionObj, routeProps.permission)
        ? { ...routeProps }
        : {
          ...routeProps,
          component: NotFoundPage,
        };
    return (
      <Layout>
        <Route {...prop} />
      </Layout>
    );
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
};

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute
          path="/dashboard"
          component={DashBoardPage}
        />
        <PrivateRoute
          path="/user/profile/:id"
          component={CreateUserComponent}
        />
        <PrivateRoute
          module="crm"
          // permission={PERMISSION_ENUM.ROLE_CREATE}
          path="/customer"
          component={CustomerPage}
        />

        <PrivateRoute path="/" component={DashBoardPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </BrowserRouter>
  );
};
export default Router;
