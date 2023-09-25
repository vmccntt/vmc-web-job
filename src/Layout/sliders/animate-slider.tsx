import Slider from "react-animated-slider";
import "react-animated-slider/build/horizontal.css";
import bannerNew from "../../assets/img/bn-new.jpg";
import "./animate-slider.scss";
const AnimateSider = (item: {
  title?: string;
  description?: string;
  content?: string;
  button?: string;
  imgage?: string;
}) => (
  <>
    <Slider>
      <div
        style={{
          background: `url('${
            item.imgage ? item.imgage : bannerNew
          }') no-repeat center center / cover`,
        }}
      >
        <div className="center text-center mt-24 text-white">
          <h5 className="text-uppercase mb-2 font-sans text-xl font-semibold">
            {item.title}
          </h5>
          <h3 className="text-uppercase font-sans text-3xl">{item.content}</h3>
          <p className="p-3 whitespace-pre-wrap">{item.description}</p>
        </div>
      </div>
    </Slider>
  </>
);
export default AnimateSider;
