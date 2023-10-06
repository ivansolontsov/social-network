import {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import {getCookie} from 'cookies-next';

export default function useChat() {
  const [socket, setSocket] = useState<Socket>();
  useEffect(() => {
    const newSocket = io(
      `${process.env.WEBSOCKET_PROTOCOL}://${process.env.APP_BASE_URL}/chats`,
      {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${getCookie('accessToken')}`
            }
          }
        }
      }
    );
    setSocket(newSocket);
    return () => {
      if (socket) socket.close();
    };
  }, []);
  return {
    socket: socket
  };
}
