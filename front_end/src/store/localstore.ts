export function localStoreClearLoginInfo() {
  localStorage.removeItem('email');
  localStorage.removeItem('role');
  localStorage.removeItem('access-token');
  localStorage.removeItem('refresh-token');
}
