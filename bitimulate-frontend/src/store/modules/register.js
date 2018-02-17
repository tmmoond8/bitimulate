import { createAction, handleActions } from 'redux-actions';

import { Map } from 'immutable';

// action types
const CHANGE_NICKNAME = 'register/CHANGE_NICKNAME';
const SET_CURRENCY = 'register/SET_CURRENCY';
const SET_INITIAL_MONEY_INDEX = 'register/SET_INITIAL_MONEY_INDEX';

// action creator
export const changeNickname = createAction(CHANGE_NICKNAME);
export const setCurrency = createAction(SET_CURRENCY);
export const setInitialMoneyIndex = createAction(SET_INITIAL_MONEY_INDEX);

// initial state
const initialState = Map({
  nickname: '',
  currency: 'KRW',
  initialMoneyIndex: 0
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
  }
}, initialState);