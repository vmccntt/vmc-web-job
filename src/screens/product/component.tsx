import "./styles.scss";
import PostComponent from "../post/component";

function PostPage(props: any) {
  const title = "Sản phẩm";
  return (
    <>
      <PostComponent {...{ ...props, title }} />
    </>
  );
}

export default PostPage;
