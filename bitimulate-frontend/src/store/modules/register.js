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

// action creator
export const changeNickname = createAction(CHANGE_NICKNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const setInitialMoneyIndex = createAction(SET_INITIAL_MONEY_INDEX);
export const checkDisplayName = createAction(CHECK_DISPLAY_NAME, AuthAPI.checkDisplayName);
export const submit = createAction(SUBMIT, AuthAPI.localRegister);

// initial state
const initialState = Map({
  nickname: '',
  currency: 'KRW',
  initialMoneyIndex: 0,
  displayNameExists: false
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
  ...pender({
    type: CHECK_DISPLAY_NAME,
    onSuccess: (state, action) => {
      const { exists } = action.payload.data;
      console.log('check display', exists);
      return state.set('displayNameExists', exists);
    }
  }),
  ...pender({
    type: SUBMIT,
    onSuccess: (state, action) => {
      return state;
    }
  })
}, initialState);