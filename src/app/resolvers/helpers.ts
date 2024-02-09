export const getItemIds$ = (uri: string): Promise<number[]> =>
  fetch(uri, {
    headers: {
      // Servers use this header to decide on response body format.
      // "application/json" implies that we accept the data in JSON format.
      accept: 'text/html,application/json',
    },
  }).then((res) => {
    if (!res.ok) throw new Error(res.statusText);

    return res.json() as Promise<number[]>;
  });
