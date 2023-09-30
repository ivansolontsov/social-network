'use client';

import React, {useRef} from 'react';
import s from './Modal.module.scss';
import {Button} from 'antd';
import {CloseOutlined} from '@ant-design/icons';
import {useClickAway} from 'react-use';
import {createPortal} from 'react-dom';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

const Modal = ({open, setOpen, children}: Props) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    setOpen(false);
  });

  return createPortal(
    <>
      {open && (
        <div className={s.overlay}>
          <Button
            ghost
            icon={<CloseOutlined />}
            onClick={() => setOpen(false)}
            className={s.modalCloseButton}
          />
          <div ref={ref} className={s.modal}>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementsByTagName('main')[0]
  );
};

export default Modal;
