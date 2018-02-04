import React from 'react';
import { storiesOf } from '@storybook/react';

import LoginModal from './LoginModal';
const forms = {
  login: {
    email: "", 
    password: ""
  },
  register: {
    email: "", 
    password: "", 
    dispalyName: ""
  }
}
storiesOf('LoginModal', module)
  .add('default', () => (
    <LoginModal 
      visible
      forms={forms}
    ></LoginModal>))