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

// export const connectWebSocket = (
//   id: string,
//   token: string,
//   onData: (data: [number, number]) => void,
// ): WebSocket => {
//   const ws = new WebSocket(`wss://cave-drone-server.shtoa.xyz/cave`);

//   ws.onopen = () => {
//     console.log('WebSocket open, sending player ID and token');
//     ws.send(`player:${id}-${token}`);
//   };

//   ws.onmessage = (event) => {
//     console.log('WebSocket message received:', event.data);
//     try {
//       const data = event.data.split(',').map(Number) as [number, number];
//       onData(data);
//     } catch (error) {
//       console.error('Error parsing WebSocket message:', error);
//     }
//   };

//   ws.onerror = (error) => {
//     console.error('WebSocket error:', error);
//   };

//   ws.onclose = (event) => {
//     console.log('WebSocket closed:', event);
//     if (event.wasClean) {
//       console.log(`WebSocket closed cleanly, code=${event.code} reason=${event.reason}`);
//     } else {
//       console.error('WebSocket closed unexpectedly');
//     }
//   };

//   return ws;
// };
