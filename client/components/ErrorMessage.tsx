import React from "react";

const ErrorMessage = (props: { message: string | null }) => {
  if (props.message) {
    return <p>Error: {props.message}</p>;
  }

  return <div></div>;
};

export default ErrorMessage;
