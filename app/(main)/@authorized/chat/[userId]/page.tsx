import MyMessages from '@/modules/Chat/MyMessages/MyMessages';

export default function Page({
  params
}: {
  params: {
    userId: string;
  };
}) {
  return <MyMessages />;
}
