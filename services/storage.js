const USER_KEY = '@firebaseQuicky/current-user';

export const getUserInStorage = () => {
  const userAsJson = localStorage.getItem(USER_KEY);
  return userAsJson && JSON.parse(userAsJson);
};
export const setUserInStorage = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};
