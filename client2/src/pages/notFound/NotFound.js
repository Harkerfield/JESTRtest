import React from "react";
import image from "./404NotFound.jpg";

const NotFound = () => {
  return (
    <div
      style={{
        background: `url(${image})`,
        width: "100vw",
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div>
   Page can not be found... Sorry about that.
    </div>
    </div>
  );
};
export default NotFound;
