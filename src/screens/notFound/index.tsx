import './styles.scss';

function NotFoundComponent() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center" id="main">
        <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
        <div className="inline-block align-middle">
          <h2 className="font-weight-normal lead" id="desc">
            Trang bạn yêu cầu không tìm thấy.
          </h2>
        </div>
      </div>
    </>
  );
}

export default NotFoundComponent;
