import React from 'react';
import { storiesOf } from '@storybook/react';

import Modal from './Modal';

storiesOf('Modal', module)
  .add('default', () => (
    <Modal>으악</Modal>))
  .add('show', () => (
    <Modal visible>보여줘</Modal>))