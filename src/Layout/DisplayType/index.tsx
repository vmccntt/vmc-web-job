import { Card } from "antd";
import { DisplayTypeCategory } from "../../utils/displayType";

const DisplayTypeComponent = () => {
  return (
    <>
      {DisplayTypeCategory.map((item) => (
        <Card
          title={`${item.label}`}
          className="mb-3" 
          style={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <img src={item.src} title={item.label || undefined} width="100%"   />
        </Card>
      ))}
    </>
  );
};

export default DisplayTypeComponent;
