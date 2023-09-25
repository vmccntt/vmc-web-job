import loading from '../../../assets/img/loading.gif';
import { useAppSelector } from '../../hooks';
import './styles.scss';
function LoadingComponent() {
  const isLoading = useAppSelector((state) => state.common.isLoading);
  return (
    <>
      {isLoading ? (
        <div className="loading-page">
          <img src={loading} alt="Loading" />
        </div>
      ) : null}
    </>
  );
}

export default LoadingComponent;
