import Loadable from 'react-loadable';
import LoadingDefaultComponent from '../../../app/components/loadingPage';
export default Loadable({
  loader: () => import("./pages/listCustomer/component"),
  loading: LoadingDefaultComponent
});
