import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/api/auth';

// action types
const CHANGE_NICKNAME = 'register/CHANGE_NICKNAME';
const SET_CURRENCY = 'register/SET_CURRENCY';
const SET_INITIAL_MONEY_INDEX = 'register/SET_INITIAL_MONEY_INDEX';
const CHECK_DISPLAY_NAME = 'CHECK_DISPLAY_NAME';
const SUBMIT = 'SUBMIT';
const SET_ERROR = 'SET_ERROR';

// action creator 
export const changeNickname = createAction(CHANGE_NICKNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const setInitialMoneyIndex = createAction(SET_INITIAL_MONEY_INDEX);
export const checkDisplayName = createAction(CHECK_DISPLAY_NAME, AuthAPI.checkDisplayName);
export const submit = createAction(SUBMIT, AuthAPI.localRegister);
export const setError = createAction(SET_ERROR);

// initial state
const initialState = Map({
  nickname: '',
  currency: 'KRW',
  initialMoneyIndex: 0,
  error: null,
  result: null,
});

// reducer
export default handleActions({
  [CHANGE_NICKNAME]: (state, action) => {
    const { payload: nickname } = action;
    return state.set('nickname', nickname);
  },
  [SET_CURRENCY]: (state, action) => {
    const { payload: currency } = action;
    return state.set('currency', currency);
  },
  [SET_INITIAL_MONEY_INDEX]: (state, action) => {
    const { payload: initialMoneyIndex } = action;
    return state.set('initialMoneyIndex', initialMoneyIndex);
  },
  [SET_ERROR]: (state, action) => {
    const { payload: error } = action;
    return state.set('error', error);
  },
  ...pender({
    type: CHECK_DISPLAY_NAME,
    onSuccess: (state, action) => {
      const { exists } = action.payload.data;
      return state.set('error', exists ? '이미 존재하는 닉네임입니다.' : null)
    }
  }),
  ...pender({
    type: SUBMIT,
    onSuccess: (state, action) => {
      const { data: user } = action.payload;
      return state.set('result', user);
    },
    onFailure: (state, action) => {
      const { status, data: { key } } = action.payload;
      const handler = {
        email: () => {
          return state.set('redo', true);
        }
      };
      if (status === 409 && key) return handler(key);
      return state;
    }
  })
}, initialState);