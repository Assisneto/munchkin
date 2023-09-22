import { useEffect, useState } from "react";
import { Channel, Socket } from "phoenix";

interface UseSocketReturn {
  channel: Channel | null;
}

export const useSocket = (channelName: string): UseSocketReturn => {
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    const socket = new Socket(
      "ws://810a-189-70-64-212.ngrok-free.app/socket",
      {}
    );

    socket.onOpen(() => console.log("Connected."));
    socket.onError((event) => console.log("Cannot connect.", event));
    socket.onClose((event) => console.log("Goodbye.", event));
    socket.connect();

    const ch = socket.channel(channelName, {});

    ch.join()
      .receive("ok", (resp) => {
        console.log("Joined successfully", resp);
      })
      .receive("error", (resp) => {
        console.log("Unable to join", resp);
      });

    setChannel(ch);

    return () => {
      ch.leave();
    };
  }, [channelName]);

  return { channel };
};
