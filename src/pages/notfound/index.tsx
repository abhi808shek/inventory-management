import NOT_FOUND_IMAGE from "../../assets/images/404.gif";

const NotFound = () => {
  return (
    <div className="items-center">
      <img src={NOT_FOUND_IMAGE} className="m-auto w-[60svw] h-[80svh]" />
    </div>
  );
};

export default NotFound;
