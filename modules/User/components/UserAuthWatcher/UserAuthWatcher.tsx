'use client';

import {useQuery} from '@tanstack/react-query';
import {getCookie} from 'cookies-next';
import React, {useEffect} from 'react';
import {useUsersStore} from '../../store';
import {getUserFetcher} from '../../api';

type Props = {
  children: React.ReactNode;
};

const UserAuthWatcher = ({children}: Props) => {
  const {setAuth, setUser} = useUsersStore((store) => store);

  const {data, isSuccess, isError} = useQuery(
    ['getUser'],
    getUserFetcher,
    {
      enabled: !!getCookie('accessToken')
    }
  );

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      setAuth(true);
    }
    if (isError) setAuth(false);
  }, [data, isSuccess]);

  return <>{children}</>;
};

export default UserAuthWatcher;
