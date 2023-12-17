import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  authCheckToken,
  authLogOut,
  authLogin,
  authRegister,
} from "./auth-slice";
import handleAuthRegister, {
  handleAuthLogin,
  handleLogOut,
  handlecheckToken,
} from "./auth-handlers";

export default function* authSaGa() {
  yield takeLatest(authRegister.type, handleAuthRegister);
  yield takeLatest(authLogin.type, handleAuthLogin);

  yield takeLatest(authCheckToken.type, handlecheckToken);
  yield takeLatest(authLogOut.type, handleLogOut);
  // yield takeLatest(authFetchMe.type, handleAuthFetchMe);
}
