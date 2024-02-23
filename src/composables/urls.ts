export const getImageUrl = (url: string): string => {
  return 'https://www.anilibria.tv/' + url || '';
};
export const getVideoUrl = (host: string, url: string): string => {
  return 'https://' + host + url || '';
};
