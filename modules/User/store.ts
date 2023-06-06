
import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface IUsersStore {
    isAuth: boolean;
    setAuth: (value: boolean) => void,
}

export const useUsersStore = create<IUsersStore>()(
    (devtools(
        immer(
            (setState) => ({
                isAuth: false,
                setAuth: (value) => setState((store) => {
                    store.isAuth = value
                    if (!value) {
                        deleteCookie('accessToken');
                    }
                })
            })
        )
    ))
);