export const getMessageClassFromUserUid = (userUid, currentUserUid) => {
  switch (userUid) {
    case currentUserUid:
      return 'as--mine';
    case 'ADMIN':
      return 'as--admin';
    default:
      return '';
  }
};

export const getImageSrcFromMessage = (message, users) => {
  if(message.userUid === 'ADMIN') {
    return 'https://www.bcrec.net.in/admin/avatar.png';
  }
  const user = users.find(u => u.uid === message.userUid);
  return user ? user.profilePictureUrl : '';
};
