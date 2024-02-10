import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "@mui/material";

interface Props {
  children: ReactNode;
  handleCancelSelect: () => void;
}

export interface TogglableRef {
  handleChangeVisibility: () => void;
}

const Togglable = forwardRef((props: Props, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };
  const hideWhenVisible = { display: visible ? "none" : "" };

  const handleChangeVisibility = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(!visible);
    props.handleCancelSelect();
  };

  useImperativeHandle(ref, () => {
    return {
      handleChangeVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" onClick={handleChangeVisibility}>
          Add New Entry
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div>
          <Button color="secondary" variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Togglable;
