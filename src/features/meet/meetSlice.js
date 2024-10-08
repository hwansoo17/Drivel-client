import {createSlice} from '@reduxjs/toolkit';
import {
  getMeetList,
  setTab,
  getMeetListRecommended,
  getMeetListMore,
  getMyMeetList,
  getMeetingApplyList,
  setFilterAge,
  setFilterCarCareer,
  setFilterCarModel,
  setFilterDriveStyle,
  setFilterDriveTheme,
  setFilterDriveWith,
  setFilterRegion,
  setFilterGender,
  getMeetMessageList,
  getMeetMessageListMore,
  setMeetMessageList,
  setLastMessageId,
  setMeetMessageListNull,
  setParticipateStatus,
  getFeedbackUserList,
  setFeedbackUserListNull,
  setSort
} from './meetActions';

const initialState = {
  meetList: null,
  meetListRecommended: null,
  meetApplyList: null,
  isLoading: false,
  currentTab: 0,
  totalMeeting: null,
  isLastPage: false,
  initialPage: 0,
  currentPage: null,
  sort: 'LATEST',
  myMeetList: null,
  filterDriveWith: '',
  filterDriveTheme: '',
  filterDriveStyle: '',
  filterRegion: '',
  filterGender: '',
  filterAge: '',
  filterCarModel: '',
  filterCarCareer: '',
  meetMessageList: [],
  lastMessageId: -1,
  isLastMessage: false,
  participateStatus: 'NONE',
  feedbackUserList: null,
};
const meetSlice = createSlice({
  name: 'meet',
  initialState,
  reducers: {
    // 동기적 액션에 대한 리듀서를 정의
  },
  extraReducers: builder => {
    // checkAuth 액션이 실행되었을 때 각 상태(pending, fulfilled, rejected)에 따라 상태를 업데이트합니다.
    builder.addCase(getMeetList.pending, state => {
      // state.isLoading = true; // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(getMeetList.fulfilled, (state, action) => {
      state.meetList = action.payload.meetList;
      state.totalMeeting = action.payload.totalMeeting;
      // state.isLoading = false;
      state.isLastPage = action.payload.isLastPage;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getMeetList.rejected, state => {
      // state.isLoading = false; // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.pending, state => {
      state.isLoading = true; // 인증 상태를 확인하는 중이므로 로딩 상태를 true로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.fulfilled, (state, action) => {
      state.meetListRecommended = action.payload.meetListRecommended; // 인증이 성공하면 인증 상태를 업데이트합니다.
      state.isLoading = false; // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMeetListRecommended.rejected, state => {
      state.isLoading = false; // 로딩이 완료되었으므로 false로 설정합니다.
    });
    builder.addCase(getMeetListMore.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMeetListMore.fulfilled, (state, action) => {
      state.meetList = [...state.meetList, ...action.payload.meetList];
      state.isLoading = false;
      state.isLastPage = action.payload.isLastPage;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getMeetListMore.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getMyMeetList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMyMeetList.fulfilled, (state, action) => {
      state.myMeetList = action.payload.myMeetList;
      state.isLoading = false;
    });
    builder.addCase(getMyMeetList.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getMeetingApplyList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMeetingApplyList.fulfilled, (state, action) => {
      state.meetApplyList = action.payload.meetApplyList;
      state.isLoading = false;
    });
    builder.addCase(getMeetingApplyList.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getMeetMessageList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMeetMessageList.fulfilled, (state, action) => {
      state.meetMessageList = action.payload.meetMessageList;
      state.lastMessageId = action.payload.lastMessageId;
      state.isLastMessage = action.payload.isLastMessage;
      state.isLoading = false;
    });
    builder.addCase(getMeetMessageList.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(getMeetMessageListMore.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getMeetMessageListMore.fulfilled, (state, action) => {
      state.meetMessageList = [
        ...state.meetMessageList,
        ...action.payload.meetMessageList,
      ];
      state.lastMessageId = action.payload.lastMessageId;
      state.isLastMessage = action.payload.isLastMessage;
      state.isLoading = false;
    });
    builder.addCase(getMeetMessageListMore.rejected, state => {
      state.isLoading = false;
    });

    builder.addCase(setTab, (state, action) => {
      state.currentTab = action.payload;
    });
    builder.addCase(setFilterAge, (state, action) => {
      state.filterAge = action.payload;
    });
    builder.addCase(setFilterCarModel, (state, action) => {
      state.filterCarModel = action.payload;
    });
    builder.addCase(setFilterCarCareer, (state, action) => {
      state.filterCarCareer = action.payload;
    });
    builder.addCase(setFilterDriveStyle, (state, action) => {
      state.filterDriveStyle = action.payload;
    });
    builder.addCase(setFilterDriveTheme, (state, action) => {
      state.filterDriveTheme = action.payload;
    });
    builder.addCase(setFilterDriveWith, (state, action) => {
      state.filterDriveWith = action.payload;
    });
    builder.addCase(setFilterRegion, (state, action) => {
      state.filterRegion = action.payload;
    });
    builder.addCase(setFilterGender, (state, action) => {
      state.filterGender = action.payload;
    });
    builder.addCase(setMeetMessageList, (state, action) => {
      state.meetMessageList = [action.payload, ...state.meetMessageList];
    });
    builder.addCase(setLastMessageId, (state, action) => {
      state.lastMessageId = action.payload;
    });
    builder.addCase(setMeetMessageListNull, state => {
      state.meetMessageList = [];
    });
    builder.addCase(setParticipateStatus, (state, action) => {
      state.participateStatus = action.payload;
    });
    builder.addCase(setSort, (state, action) => {
      state.sort = action.payload;
    });
    builder.addCase(getFeedbackUserList.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getFeedbackUserList.fulfilled, (state, action) => {
      state.feedbackUserList = action.payload.feedbackUserList;
      state.isLoading = false;
    });
    builder.addCase(getFeedbackUserList.rejected, state => {
      state.isLoading = false;
    });
    builder.addCase(setFeedbackUserListNull, state => {
      state.feedbackUserList = null;
    });
  },
});

export default meetSlice.reducer; // auth 리듀서를 기본 export 합니다.
