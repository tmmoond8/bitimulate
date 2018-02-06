import React from 'react';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';

import LoginModal from './LoginModal';
const defaultForm = {
  email: "tmmoond8@gmail.com", 
  password: "xoalsxoals1231@"
}
const emailInvalidForm = {
  email: "tmmail.com", 
  password: "xoalsxoals1231@"
}
storiesOf('LoginModal', module)
  .add('default', () => (
    <LoginModal 
      visible
      form={fromJS(defaultForm)}
    ></LoginModal>))
  .add('invalid email', () => (
    <LoginModal 
      visible
      form={fromJS(emailInvalidForm)}
      error={fromJS({email:'invalid email format'})}
    ></LoginModal>))