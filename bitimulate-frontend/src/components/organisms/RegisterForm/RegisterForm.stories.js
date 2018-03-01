import React from 'react';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';

import RegisterForm from './RegisterForm';
const defaultForm = {
  nickname: "tmmoond8", 
  currency: "USD",
  initialMoneyIndex: 0,
}
const nicknameOverlapForm = {
  nickname: "ovelap", 
  currency: "BTC",
  initialMoneyIndex: 1,
  error: '이미 존재하는 닉네임입니다.'
}
const nicknameTooShortForm = {
  nickname: "", 
  currency: "KRW",
  initialMoneyIndex: 2,
  error: '닉네임을 입력하세요.'
}
storiesOf('RegisterForm', module)
  .add('default', () => (
    <RegisterForm 
      nickname={defaultForm.nickname}
      currency={defaultForm.currency}
      initialMoneyIndex={defaultForm.initialMoneyIndex}
    ></RegisterForm>))
  .add('nickname overlap', () => (
    <RegisterForm 
      nickname={nicknameOverlapForm.nickname}
      currency={nicknameOverlapForm.currency}
      initialMoneyIndex={nicknameOverlapForm.initialMoneyIndex}
      error={nicknameOverlapForm.error}
    ></RegisterForm>))
  .add('nickname too short', () => (
    <RegisterForm 
      nickname={nicknameTooShortForm.nickname}
      currency={nicknameTooShortForm.currency}
      initialMoneyIndex={nicknameTooShortForm.initialMoneyIndex}
      error={nicknameTooShortForm.error}
    ></RegisterForm>))