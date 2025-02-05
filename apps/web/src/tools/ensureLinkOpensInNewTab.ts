export const ensureLinksOpenInNewTab = (content: string) => {
  return content.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" style="color: #db9d00; cursor: pointer; font-weight: bold;" ');
};