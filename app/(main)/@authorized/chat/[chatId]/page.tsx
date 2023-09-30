import MyMessages from '@/modules/Chat/MyMessages/MyMessages';
import MyChats from '@/modules/Chat/MyChats/MyChats';

export default function Page({
  params
}: {
  params: {
    userId: string;
  };
}) {
  return <MyChats />;
}
