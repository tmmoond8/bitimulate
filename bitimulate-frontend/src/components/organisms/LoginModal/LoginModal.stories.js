import React from 'react';
import { storiesOf } from '@storybook/react';

import LoginModal from './LoginModal';
const defaultForm = {
  login: {
    email: "tmmoond8@gmail.com", 
    password: "xoalsxoals1231@"
  },
  register: {
    email: "tmmoond8@gmail.com", 
    password: "xoalsxoals1231@",
    dispalyName: "test"
  }
}
const emailInvalidForm = {
  login: {
    email: "tmmoail.com", 
    password: "xoalsxoals1231@"
  },
  register: {
    email: "tmmoail.com", 
    password: "xoalsxoals1231@",
    dispalyName: "test"
  }
}
storiesOf('LoginModal', module)
  .add('default', () => (
    <LoginModal 
      visible
      form={defaultForm}
    ></LoginModal>))
  .add('invalid email', () => (
    <LoginModal 
      visible
      form={emailInvalidForm}
    ></LoginModal>))