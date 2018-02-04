import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginModal } from 'components';
import onClickOutside from 'react-onclickoutside';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';

class LoginModalContainer extends Component {
  handleClickOutside = (event) => {
    const { visible, BaseActions, AuthActions } = this.props;
    if (!visible) return;
    BaseActions.setScreenMaskVisiblity(false);
    AuthActions.toggleLoginModal();
  }
  handleChangeMode = () => {
    const { mode, AuthActions } = this.props;
    const inverted = mode === 'login' ? 'register' : 'login';
    AuthActions.setModalMode(inverted);
  }
  handleChangeInput = (event) => {
    const { AuthActions } = this.props;
    const { name, value } = event.target;

    AuthActions.handleChangeInput({
      name,
      value
    });
  }
  handleLogin = () => {
    console.log('handleLogin');
  }

  handleRegister = () => {
    // validate email and password
    const constraints = {
      email: {
        email: {
          message: () => `잘못된 형식의 이메일 입니다.`
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: `비밀번호는 %{count}자 이상 입력하세요.`
        }
      }
    }
    const forms = this.props.forms.toJS();
    const { AuthActions } = this.props;
  }
  render() {
    const  { visible, mode, forms } = this.props;
    const { 
      handleChangeMode, 
      handleChangeInput, 
      handleLogin, 
      handleRegister 
    } = this;

    return (
      <LoginModal
        visible={visible}
        mode={mode}
        forms={forms}
        onChangeInput={handleChangeInput}
        onChangeMode={handleChangeMode}/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.auth.getIn(['modal', 'visible']),
    mode: state.auth.getIn(['modal', 'mode']),
    forms: state.auth.get('forms'),
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch)
  })
)(onClickOutside(LoginModalContainer));