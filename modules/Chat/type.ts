import {IUser} from '@/modules/User/type';

export interface IMessage {
  id: number;
  message: string;
  avatar: string;
  name: string;
  userId: number;
  createdAt: string;
}

export type IGetUserChatsResponse = {
  enemyUser: Pick<IUser, 'id' | 'avatar'> & {name: string};
  chat: {
    id: number;
    lastMessageDate: string;
  };
};

export type IGetMessagesByChatIdResponse = IMessage[];
export type IGetMessagesByChatIdRequest = {chatId: number};
