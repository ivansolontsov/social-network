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

export type ICreateChatWithUserRequest = {userId: number};
export type ICreateChatWithUserResponse = {chatId: number};

export interface webSocketChatResponses {
  joinChatByIdResponse: any;
  roomJoined: any;
  newMessage: any;
  sendMessage: any;
}
