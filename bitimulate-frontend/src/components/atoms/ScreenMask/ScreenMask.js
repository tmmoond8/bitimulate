import React from 'react';
import styles from './ScreenMask.scss';
import classNames from 'classnames/bind';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

const cx = classNames.bind(styles);

const ScreenMask = ({visible}) => {
  return (
    <CSSTransitionGroup
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
      transitionName={{
        enter: cx('fade-enter'),
        leave: cx('fade-leave')
      }}
      >
        { visible && <div class={cx('screen-mask')}/> }
    </CSSTransitionGroup>
  );
};

export default ScreenMask;