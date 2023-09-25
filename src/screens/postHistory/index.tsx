import Loadable from 'react-loadable';
import LoadingDefaultComponent from '../../app/components/loadingPage';
export default Loadable({
  loader: () => import("./component"),
  loading: LoadingDefaultComponent
});
