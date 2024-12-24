import NOT_FOUND_IMAGE from "../../assets/images/page-not-found.svg";

const NotFound = () => {
  return (
    <div className="items-center">
      <img
        src={NOT_FOUND_IMAGE}
        className="m-auto w-[60svw] h-[60svh] object-contain"
      />
    </div>
  );
};

export default NotFound;
