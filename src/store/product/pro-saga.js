import { takeLatest } from "redux-saga/effects";
import {
  ProAdminAdd,
  ProAdminDelete,
  ProAdminGet,
  ProAdminSearchName,
  ProAdminSearchWithCate,
  ProAdminUpdate,
  proGetAll,
  proGetBestSeller,
  proGetDetails,
  proGetFeauture,
  proGetHotDeal,
  proGetQuickview,
  proGetSearch,
  proGetTopRated,
  proGetWithFilter,
} from "./pro-slice";
import handleGetProBestSeller, {
  handleAdmiDeletePro,
  handleAdmiSearchNamePro,
  handleAdmiSearchProWithCate,
  handleAdmiUpdatePro,
  handleAdminAddPro,
  handleAdminGetProAll,
  handleGetHotDeal,
  handleGetProAll,
  handleGetProDetails,
  handleGetProFeature,
  handleGetProQuickView,
  handleGetProSearch,
  handleGetProTopRated,
  handleGetProWithFilter,
} from "./pro-handlers";

export default function* proSaga() {
  yield takeLatest(proGetBestSeller.type, handleGetProBestSeller);
  yield takeLatest(proGetHotDeal.type, handleGetHotDeal);
  yield takeLatest(proGetTopRated.type, handleGetProTopRated);
  yield takeLatest(proGetFeauture.type, handleGetProFeature);
  yield takeLatest(proGetAll.type, handleGetProAll);
  yield takeLatest(proGetWithFilter.type, handleGetProWithFilter);
  yield takeLatest(proGetSearch.type, handleGetProSearch);
  yield takeLatest(proGetQuickview.type, handleGetProQuickView);
  yield takeLatest(proGetDetails.type, handleGetProDetails);
  yield takeLatest(ProAdminGet.type, handleAdminGetProAll);
  yield takeLatest(ProAdminAdd.type, handleAdminAddPro);
  yield takeLatest(ProAdminDelete.type, handleAdmiDeletePro);
  yield takeLatest(ProAdminUpdate.type, handleAdmiUpdatePro);
  yield takeLatest(ProAdminSearchName.type, handleAdmiSearchNamePro);
  yield takeLatest(ProAdminSearchWithCate.type, handleAdmiSearchProWithCate);
}
