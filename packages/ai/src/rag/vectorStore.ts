let store: any[] = [];

export const saveVectors = (vectors: any[]) => {
  store.push(...vectors);
};

export const getVectors = () => {
  return store;
};