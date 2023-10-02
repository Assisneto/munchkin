import { renderHook } from "@testing-library/react-native";
import { useSocket } from "./useSocket";
import { Socket } from "phoenix";

jest.mock("phoenix");

describe("useSocket hook", () => {
  const socketUrl = "socketUrl";
  beforeEach(() => {
    process.env.REACT_APP_SOCKET_URL = socketUrl;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize a socket and channel", () => {
    const channelName = "room:123";

    renderHook(() => useSocket(channelName));

    expect(Socket).toHaveBeenCalledWith(socketUrl, expect.anything());
    expect(new Socket(socketUrl).channel).toHaveBeenCalledWith(channelName, {});
  });

  it("should console log on various socket events", () => {
    console.log = jest.fn();

    renderHook(() => useSocket("room:123"));

    new Socket(socketUrl).onOpen(() => {});
  });
});