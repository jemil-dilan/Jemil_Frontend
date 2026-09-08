const originalFetch = globalThis.fetch.bind(globalThis);

const fetchToServer = async function fetchWithHeaders(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  return originalFetch(input, init);
};

export default fetchToServer;