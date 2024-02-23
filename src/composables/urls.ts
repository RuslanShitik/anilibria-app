export const getImageUrl = (url: string): string => {
  return 'https://www.anilibria.tv/' + url || '';
};
export const getVideoUrl = (url: string): string => {
  return 'https://cache.libria.fun' + url || '';
};
