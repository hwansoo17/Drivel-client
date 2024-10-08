import {createSlice} from '@reduxjs/toolkit';
import {
  checkAuth,
  kakaoLogin,
  login,
  logout,
  setOnboarded,
  appleLogin,
} from './authActions';

// authSlice 정의: 인증 관련 상태와 리듀서를 관리합니다.
const initialState = {
  nickname: null,
  isAuthenticated: false,
  accessToken: null,
  isAutoLoginLoading: false,
  isLoading: false,
  onboarded: false,
  userId: null,
};
const authSlice = createSlice({
  name: 'auth', // 슬라이스의 이름을 'auth'로 설정합니다.
  initialState,
  reducers: {
    // 동기적 액션에 대한 리듀서를 정의
    // setAuth 리듀서: 인증 상태와 토큰을 설정합니다.
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
    },
    setGlobalNickname: (state, action) => {
      state.nickname = action.payload;
    },
  },
  extraReducers: builder => {
    // checkAuth 액션이 실행되었을 때 각 상태(pending, fulfilled, rejected)에 따라 상태를 업데이트합니다.
    builder.addCase(checkAuth.pending, state => {
      state.isAutoLoginLoading = true; // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated; // 인증이 성공하면 인증 상태를 업데이트합니다.
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.onboarded = action.payload.onboarded;
      state.userId = action.payload.userId;
      state.isAutoLoginLoading = action.payload.isLoading; // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.isAutoLoginLoading = action.payload.isLoading;
    });
    builder.addCase(login.pending, state => {
      state.isLoading = true; // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    // login 액션이 실행되었을 때 각 상태(pending, fulfilled, rejected)에 따라 상태를 업데이트합니다.
    builder.addCase(login.fulfilled, (state, action) => {
      //첫번째 인자인 액션타입은 authActions에서 임포트한 변수명으로 써도 되고, authActions에서 createAsyncThunk의 첫번째 인자로 전달한 문자열로 써도됨.
      state.isAuthenticated = action.payload.isAuthenticated; // 로그인 성공 시 인증 상태를 업데이트합니다.
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.onboarded = action.payload.onboarded;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.isLoading = action.payload.isLoading;
    });

    // logout 액션이 실행되었을 때 각 상태(pending, fulfilled, rejected)에 따라 상태를 업데이트합니다.
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(logout.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    });

    builder.addCase(kakaoLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(kakaoLogin.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated; // 로그아웃 성공 시 인증 상태를 false로 설정합니다.
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken; // 인증 토큰을 null로 설정합니다.
      state.onboarded = action.payload.onboarded;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(kakaoLogin.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(appleLogin.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(appleLogin.fulfilled, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.nickname = action.payload.nickname;
      state.accessToken = action.payload.accessToken;
      state.onboarded = action.payload.onboarded;
      state.userId = action.payload.userId;
      state.isLoading = action.payload.isLoading;
    });
    builder.addCase(appleLogin.rejected, (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.accessToken = action.payload.accessToken;
      state.isLoading = action.payload.isLoading
    });
    builder.addCase(setOnboarded, (state, action) => {
      state.onboarded = action.payload;
    });
  },
});

// authSlice에서 생성된 액션과 리듀서를 export 합니다.
export const {setAuth, setGlobalNickname} = authSlice.actions; // setAuth 액션 생성자를 export 합니다. 외부 컴포넌트에서 setAuth를 사용할 일이 있으면 이거 사용
export default authSlice.reducer; // auth 리듀서를 기본 export 합니다.
