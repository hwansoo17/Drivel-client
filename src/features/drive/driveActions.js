import {createAsyncThunk, createAction} from '@reduxjs/toolkit';
import {api, authApi} from '../../api/api';
import config from '../../config/config';
import axios from 'axios';

export const getDriveList = createAsyncThunk(
  'drive/getDriveList',
  async ({themeId, styleId, togetherId, page, size, regionId}, thunkAPI) => {
    try {
      const response = await authApi.get('/course', {
        params: {
          themeId,
          styleId,
          togetherId,
          regionId,
          page,
          size,
        },
      });
      // console.log(themeId, styleId, togetherId, page, size);
      if (response.status == 200) {
        console.log(response.data, 'response');
        const driveList = response.data.content;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        return {
          driveList: driveList,
          isLastPage: isLastPage,
          currentPage: currentPage,
        };
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getDriveListMore = createAsyncThunk(
  'drive/getDriveListMore',
  async ({themeId, styleId, togetherId, page, size, regionId}, thunkAPI) => {
    try {
      const response = await authApi.get('/course', {
        params: {
          themeId,
          styleId,
          togetherId,
          page,
          size,
          regionId,
        },
      });
      if (response.status === 200) {
        // console.log(response.data.number, '현재페이지');
        // console.log(response.data.last);
        const driveList = response.data.content;
        const isLastPage = response.data.last;
        const currentPage = response.data.number;
        return {driveList, isLastPage, currentPage};
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);

export const getBlogReview = createAsyncThunk(
  'drive/getBlogReview',
  async (title, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://openapi.naver.com/v1/search/blog.json',
        {
          params: {query: title},
          headers: {
            'X-Naver-Client-Id': config.NAVERBLOG_ID_KEY,
            'X-Naver-Client-Secret': config.NAVERBLOG_SECRET_KEY,
          },
        },
      );
      if (response.status == 200) {
        const blogReviewList = response.data.items.map((item, index) => ({
          ...item,
          id: index,
        }));
        console.log(blogReviewList);
        return blogReviewList;
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  },
);

export const getCafeBlogReview = createAsyncThunk(
  'drive/getCafeBlogReview',
  async (title, thunkAPI) => {
    try {
      const response = await axios.get(
        'https://openapi.naver.com/v1/search/blog.json',
        {
          params: {query: title},
          headers: {
            'X-Naver-Client-Id': config.NAVERBLOG_ID_KEY,
            'X-Naver-Client-Secret': config.NAVERBLOG_SECRET_KEY,
          },
        },
      );
      if (response.status == 200) {
        const cafeBlogReviewList = response.data.items.map((item, index) => ({
          ...item,
          id: index,
        }));
        console.log(cafeBlogReviewList);
        return cafeBlogReviewList;
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  },
);

export const getDriveReviewList = createAsyncThunk(
  'drive/getDriveReviewList',
  async ({id, page, size}, thunkAPI) => {
    try {
      const response = await authApi.get(`/course/${id}/reviews`, {
        params: {
          page,
          size,
        },
      });
      // console.log(themeId, styleId, togetherId, page, size);
      if (response.status == 200) {
        console.log('@@@@', response.data, '@@@@');
        const reviewTotalElements = response.data.reviews.totalElements;
        const averageRating = response.data.averageRating;
        const driveReviewList = response.data.reviews.content;
        const isReviewLastPage = response.data.reviews.last;
        const reviewCurrentPage = response.data.reviews.number;
        return {
          reviewTotalElements: reviewTotalElements,
          averageRating: averageRating,
          driveReviewList: driveReviewList,
          isReviewLastPage: isReviewLastPage,
          reviewCurrentPage: reviewCurrentPage,
        };
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
);

export const getDriveReviewListMore = createAsyncThunk(
  'drive/getDriveReviewListMore',
  async ({id, page, size}, thunkAPI) => {
    try {
      const response = await authApi.get(`/course/${id}/reviews`, {
        params: {
          page,
          size,
        },
      });
      if (response.status === 200) {
        // console.log(response.data.number, '현재페이지');
        // console.log(response.data.last);
        const driveReviewList = response.data.reviews.content;
        const isReviewLastPage = response.data.reviews.last;
        const reviewCurrentPage = response.data.reviews.number;
        return {
          driveReviewList: driveReviewList,
          isReviewLastPage: isReviewLastPage,
          reviewCurrentPage: reviewCurrentPage,
        };
      } else {
        return thunkAPI.rejectWithValue({
          error: `Unexpected response status: ${response.status}`,
        });
      }
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue({error: error.message});
    }
  },
);
export const setFilterDriveStyle = createAction('drive/filterDriveStyle');

export const setFilterDriveTheme = createAction('drive/filterDriveTheme');

export const setFilterDriveWith = createAction('drive/filterDriveWith');

export const setFilterRegion = createAction('drive/filterRegion');

export const setBlogReviewList = createAction('drive/setBlogReviewList');

export const setCafeBlogReviewList = createAction(
  'drive/setCafeBlogReviewList',
);
