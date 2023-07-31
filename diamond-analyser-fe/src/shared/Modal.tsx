import React, { useState } from 'react';
import { Box, Button, ButtonProps, IconButton, Modal, styled } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

interface IModalProps {
  buttonContent: JSX.Element;
  buttonProps?: ButtonProps;
  buttonCB: () => void;
  children: JSX.Element;
}

const StyledBox = styled(Box)(({ theme }) => ({
  overflow: 'auto',
  maxHeight: '80vh',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '375px',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '16px',
  padding: '24px 16px',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100vw - 50px)',
    maxWidth: 'calc(100% - 50px)',
    maxHeight: 'calc(100% - 50px)',
  },
}));
const IconBox = styled(Box)(() => ({
  textAlign: 'center',
  padding: '10px 0',
}));
export const BasicModal = ({ buttonContent, buttonProps, buttonCB, children }: IModalProps) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
    buttonCB();
  };

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={openModal} {...buttonProps}>
        {buttonContent}
      </Button>
      <Modal open={open} onClose={closeModal}>
        <StyledBox>
          {children}
          <IconBox component="div">
            <IconButton color="primary" size="small" onClick={closeModal}>
              <CloseRounded />
            </IconButton>
          </IconBox>
        </StyledBox>
      </Modal>
    </div>
  );
};
