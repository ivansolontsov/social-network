
import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IModalStore {
    isOpen: boolean;
    children: React.ReactNode;
    setOpen: (value: boolean) => void;
    setChildren: (value: React.ReactNode) => void;
}

export const useModalStore = create<IModalStore>()(
    (devtools(
        immer(
            (setState) => ({
                isOpen: false,
                children: null,
                setOpen: (value) => setState((store) => {
                    store.isOpen = value
                }),
                setChildren: (value) => setState((store) => {
                    store.children = value;
                })
            })
        )
    ))
);