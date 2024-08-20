export const connectWebSocket = (
  id: string,
  token: string,
  onData: (data: [number, number]) => void,
): WebSocket => {
  const ws = new WebSocket(`wss://cave-drone-server.shtoa.xyz/cave`);

  ws.onopen = () => {
    ws.send(`player:${id}-${token}`);
  };

  ws.onmessage = (event) => {
    const data = event.data.split(',').map(Number) as [number, number];
    onData(data);
  };

  ws.onclose = () => {
    console.log('Connection closed');
  };

  return ws;
};
