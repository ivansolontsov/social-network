
import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { IUser } from './type';

interface IUsersStore {
    user: IUser,
    isAuth: boolean;
    setAuth: (value: boolean) => void,
    setUser: (value: IUser) => void
}

export const useUsersStore = create<IUsersStore>()(
    (devtools(
        immer(
            (setState) => ({
                id: 1,
                user: {
                    id: 1,
                    email: "",
                    firstName: "",
                    lastName: "",
                    banned: false,
                    banReason: "",
                    avatar: "",
                    background: ""
                },
                isAuth: false,
                setAuth: (value) => setState((store) => {
                    store.isAuth = value
                    if (!value) {
                        deleteCookie('accessToken');
                    }
                }),
                setUser: (value) => setState((store) => {
                    store.user = value
                }),
            })
        )
    ))
);