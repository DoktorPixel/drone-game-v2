import axios from 'axios';

export const initGame = async (
  name: string,
  complexity: number,
): Promise<string> => {
  const response = await axios.post('https://cave-drone-server.shtoa.xyz/init', {
    name,
    complexity,
  });
  return response.data.id;
};

export const getToken = async (id: string): Promise<string> => {
  const tokenChunks = await Promise.all(
    [1, 2, 3, 4].map((chunkNo) =>
      axios
        .get(`https://cave-drone-server.shtoa.xyz/token/${chunkNo}?id=${id}`)
        .then((response) => response.data.chunk),
    ),
  );
  return tokenChunks.join('');
};
