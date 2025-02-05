export const getAcessToken = () => {
  const state = JSON.parse(localStorage.getItem('__state') || '{}');
  const accessToken = state.accessToken;

  return accessToken;
}