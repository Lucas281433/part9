import { Alert } from "@mui/material";

interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  if (message === "") {
    return null;
  }

  return <Alert severity="error">{message}</Alert>;
};

export default Notification;
