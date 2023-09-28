const { createSlice, createAction } = require("@reduxjs/toolkit");
// export const otherAction = createAction("navigateSuccess");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
  },
  reducers: {
    authRegister: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authLogin: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateUser: (state, action) => ({
      ...state,
      user: action.payload.user,
      accessToken: action.payload.accessToken,
    }),
    authFetchMe: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authCheckToken: () => {},
    authLogOut: () => ({ user: null, accessToken: null }),
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    // authGetStatus: (state, action) => ({
    //   ...state,
    //   statusErrorMess: action.payload,
    // }),
  },
  // extraReducers: (builder) => {
  //   builder.addCase(otherAction, (state, action) => {
  //     state.navigateSuccess = action.payload;
  //   });
  // },
});

export const {
  authRegister,
  authLogin,
  authUpdateUser,
  authFetchMe,
  authCheckToken,
  authLogOut,
  authGetStatus,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
