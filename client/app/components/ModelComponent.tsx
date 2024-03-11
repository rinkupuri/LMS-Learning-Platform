import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  setRoute: (route: string) => void;
  Component: any;
};

const ModelComponent: FC<Props> = ({ open, setOpen, Component, setRoute }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={
            "absolute top-[50%] rounded-sm  w-11/12 md:w-[450px] left-[50%] translate-x-[-50%] translate-y-[-50%] border-none outline-none bg-[#12202ce4] p-5"
          }
        >
          <Component setRoute={setRoute} />
        </Box>
      </Modal>
    </div>
  );
};

export default ModelComponent;
