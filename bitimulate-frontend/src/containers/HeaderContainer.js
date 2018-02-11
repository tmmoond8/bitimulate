import React, { Component } from 'react';
import { Header } from 'components';
// import redux dependencies
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class HeaderContainer extends Component {
  handleLoginButtonClick = () => {
    console.log('handleLoginButton');
    const { BaseActions, AuthActions } = this.props;
    BaseActions.setScreenMaskVisiblity(true);
    AuthActions.toggleLoginModal();
    AuthActions.setModalMode('login');
  }

  render() {
    return (
      <Header
        onLoginButtonClick = { this.handleLoginButtonClick }
      />
    );
  }
};

export default connect(
  (state) => ({

  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(HeaderContainer)