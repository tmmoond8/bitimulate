import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginModal, DimmerSpinner } from 'components';
import onClickOutside from 'react-onclickoutside';
import * as baseActions from 'store/modules/base';
import * as authActions from 'store/modules/auth';
import * as registerActions from 'store/modules/register';
import validate from 'validate.js';
import { withRouter } from 'react-router';
import * as userActions from 'store/modules/user';
import storage from 'lib/storage';

class LoginModalContainer extends Component {
  handleClickOutside = (event) => {
    this.handleClose();
  }

  handleClose = () => {
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

    AuthActions.changeInput({
      name,
      value
    });
  }
  handleLogin = () => {
    const { AuthActions, UserActions, form } = this.props;
    const { email, password } = form.toJS();

    const asyncFn = async () => {
      try {
        await AuthActions.localLogin({
          email, password
        });
        const { loginResult } = this.props;
        storage.set('__BTM_USER__', loginResult);
        UserActions.setUser(loginResult);
        AuthActions.setError(null);
        this.handleClose();
      } catch(e) {
        console.log(e);
      }
    }
    asyncFn();
  }

  handleSocialLogin = (provider) => {
    const { AuthActions, UserActions } = this.props;

    const asyncFn = async() => {
      try {
        await AuthActions.requestAccessToken(provider);
        const { socialInfo } = this.props
        await AuthActions.socialLogin({
          provider, 
          providerToken: socialInfo.get('accessToken')
        });

        const { loginResult } = this.props;
        console.log('loginResult', loginResult);
        if (loginResult) {
          storage.set('__BTM_USER__', loginResult);
          UserActions.setUser(loginResult);
          AuthActions.setError(null);
          this.handleClose();
        } else {
          this.handleClose();
          const { history } = this.props;
          setTimeout(() => {
            history.push('/register');
          }, 400);
          return;
        }
      } catch(e) {
        console.log(e);
      }
    }
    asyncFn();
  }

  // FIXME async가 this에 접근이 안된다. 왜지..?
  handleRegister = () => {
    const { AuthActions } = this.props;
 +  AuthActions.setError(null);
    // // validate email and password
    const constraints = {
      email: {
        email: {
          message: () => `^잘못된 형식의 이메일 입니다.`
        }
      },
      password: {
        length: {
          minimum: 6,
          tooShort: `^비밀번호는 %{count}자 이상 입력하세요.`
        }
      }
    };
    const form = this.props.form.toJS();
    const error = validate(form, constraints);

    if (error) {
      return AuthActions.setError(error);
    }

    const checkEmailTransaction = async function(email) {
      try {
        const promise = await AuthActions.checkEmail(email);
        if (!promise.data.exists) {
          this.handleClose();
          const { history } = this.props;
          setTimeout(() => {
            history.push('/register');
          }, 400);
          
        }
      } catch(e) {
        return;
      }
    }.bind(this);
    checkEmailTransaction(form.email);
  }
  render() {
    const  { visible, mode, form, error, pending } = this.props;
    const { 
      handleChangeMode, 
      handleChangeInput, 
      handleLogin, 
      handleRegister,
      handleSocialLogin,
    } = this;

    return (
      <div>
        <LoginModal
        visible={visible}
        mode={mode}
        form={form}
        error={error}
        onChangeInput={handleChangeInput}
        onChangeMode={handleChangeMode}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSocialLogin={handleSocialLogin}
        />
        <DimmerSpinner visible={pending}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.auth.getIn(['modal', 'visible']),
    mode: state.auth.getIn(['modal', 'mode']),
    form: state.auth.get('form'),
    error: state.auth.get('error'),
    loginResult: state.auth.get('loginResult'),
    socialInfo: state.auth.get('socialInfo'),
    pending: state.pender.pending['LOCAL_LOGIN'] 
      || state.pender.pending['auth/SOCIAL_LOGIN']
      || state.pender.pending['auth/PROVIDER_LOGIN']
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    AuthActions: bindActionCreators(authActions, dispatch),
    RegisterActions: bindActionCreators(registerActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(withRouter(onClickOutside(LoginModalContainer)));