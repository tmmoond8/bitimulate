// import React from 'react';
// import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';
// import { ScreenMask } from 'components';

// storiesOf('ScreenMask', module)
//   .add('default', () => {
//     <ScreenMask/>
//   });

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ScreenMask from './ScreenMask';

storiesOf('ScreenMask', module)
  .add('default', () => (
    <ScreenMask/>
  ));