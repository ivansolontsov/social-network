'use client';
import React, {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import UserAuthWatcher from './User/components/UserAuthWatcher/UserAuthWatcher';
import 'dayjs/locale/ru';
import {ConfigProvider} from 'antd';
import ru from 'antd/locale/ru_RU';
import {AntdTheme} from '@/modules/Theme/AntdConfigs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 0
    }
  }
});
function ClientProvider({children}: {children: React.ReactNode}) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <ConfigProvider locale={ru} theme={AntdTheme}>
      <QueryClientProvider client={queryClient}>
        <UserAuthWatcher>{children}</UserAuthWatcher>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default ClientProvider;
