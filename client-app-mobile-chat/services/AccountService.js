/**
 * Service that manage the user connexion in application
 */
import StoreService from '@services/StoreService';

const login = async (user, jwt, remembermeInputs) => {

  await StoreService.storeData('user', user);
  await StoreService.storeData('jwttoken', jwt);

  if (remembermeInputs) {
    await StoreService.storeData('rememberMe', remembermeInputs);
  } else {
    await StoreService.deleteData('rememberMe');
  }

  return true;
}

const disconnect = async () => {
  await StoreService.deleteData('user');
  await StoreService.deleteData('jwttoken');
  await StoreService.deleteData('rememberMe');

  return true;
}

module.exports = {
  login,
  disconnect
}