'use client'

import React, { useRef } from 'react'
import s from './Modal.module.scss'
import { useModalStore } from './store'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useClickAway } from 'react-use'

type Props = {
}

const Modal = ({ }: Props) => {
    const isOpen = useModalStore((store) => store.isOpen)
    const children = useModalStore((store) => store.children)
    const setOpen = useModalStore((store) => store.setOpen)

    const ref = useRef(null);
    useClickAway(ref, () => { setOpen(false) })

    return (
        <>
            {isOpen &&
                <div className={s.overlay}>
                    <Button
                        type='ghost'
                        icon={<CloseOutlined />}
                        onClick={() => setOpen(false)}
                        className={s.modalCloseButton}
                    />
                    <div
                        ref={ref}
                        className={s.modal}
                    >
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal