import { createSlice } from '@reduxjs/toolkit';
import { getMeetList, setTab, getMeetListRecommended } from './meetActions';


const initialState = {
  meetList: null,
  meetListRecommended: null,
  isLoading: false,
  currentTab: 0,
  totalMeeting: null,
};
const meetSlice = createSlice({
  name: 'meet',
  initialState,
  reducers: { // 동기적 액션에 대한 리듀서를 정의

  },
  extraReducers: (builder) => {
    // checkAuth 액션이 실행되었을 때 각 상태(pending, fulfilled, rejected)에 따라 상태를 업데이트합니다.
    builder.addCase(getMeetList.pending, (state) => {
      state.isLoading = true;  // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(getMeetList.fulfilled, (state, action) => {
      state.meetList= action.payload.meetList;
      state.totalMeeting = action.payload.totalMeeting; 
      state.isLoading = false; 
    });
    builder.addCase(getMeetList.rejected, (state) => {
      state.isLoading = false;  // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.pending, (state) => {
      state.isLoading = true;  // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.fulfilled, (state, action) => {
      state.meetListRecommended= action.payload.meetListRecommended; // 인증이 성공하면 인증 상태를 업데이트합니다.
      state.isLoading = false;  // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.rejected, (state) => {
      state.isLoading = false;  // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(setTab, (state, action) => {
      state.currentTab = action.payload;
    });
  },
});

export default meetSlice.reducer;  // auth 리듀서를 기본 export 합니다.