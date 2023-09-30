import {$api} from '@/src/axios/axios';
import {
  IGetMessagesByChatIdRequest,
  IGetMessagesByChatIdResponse,
  IGetUserChatsResponse
} from '@/modules/Chat/type';

export const getUserChatsFetcher = async (): Promise<
  IGetUserChatsResponse[]
> => {
  const {data} = await $api.get('/chat/getUserChats');
  return data;
};

export const getMessagesByIdFetcher = async (
  request: IGetMessagesByChatIdRequest
): Promise<IGetMessagesByChatIdResponse> => {
  const {data} = await $api.get(
    `/chat/getMessagesByChatId/${request.chatId}`
  );
  return data;
};
