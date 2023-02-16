import StoreService from '@services/StoreService';
import ChappyError from '@error/ChappyError';

const login = async (user, jwt, remembermeInputs) => {
  try {
    await StoreService.storeData('user', user);
    await StoreService.storeData('jwttoken', jwt);

    if (remembermeInputs) {
      await StoreService.storeData('rememberMe', remembermeInputs);
    } else {
      await StoreService.deleteData('rememberMe');
    }

  } catch (err) {
    if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "AccountService.login()");
    throw err;
  }
}

const disconnect = async () => {
  try {
    await StoreService.deleteData('user');
    await StoreService.deleteData('jwttoken');
    await StoreService.deleteData('rememberMe');

  } catch (err) {
    if (!(err instanceof ChappyError)) err = new ChappyError(err.message, false, "AccountService.disconnect()");
    throw err;
  }
}

module.exports = {
  login,
  disconnect
}