import { NotificationProps } from "../types";

const Notification = (props: NotificationProps) => {
  if (props.message === "") {
    return null;
  }

  return <div className="errorMessage">{props.message}</div>;
};

export default Notification;
