import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterForm } from 'components';
import * as registerActions from 'store/modules/register';
import * as userActions from 'store/modules/user';
import debounce from 'lodash/debounce';
import { withRouter } from 'react-router';

class RegisterFormContainer extends Component {

  handleChangeNickname = (e) => {
    const { value } = e.target;
    const { RegisterActions } = this.props;

    RegisterActions.changeNickname(value);
    this.checkDisplayName(value);
  }

  checkDisplayName = debounce((value) => {
    const { RegisterActions } = this.props;
    RegisterActions.setError(null);
    RegisterActions.checkDisplayName(value);
  }, 500)

  handleNicknameBlur = () => {
    const { nickname, RegisterActions } = this.props;
    RegisterActions.checkDisplayName(nickname);
  }

  handleSetCurrency = (currency) => {
    const { RegisterActions } = this.props;
    RegisterActions.setCurrency(currency);
  }

  handleSetInitialMoneyIndex = (index) => {
    const { RegisterActions } = this.props;
    RegisterActions.setInitialMoneyIndex(index);
  }

  handleSubmit = () => {
    const { 
      nickname, 
      currency, 
      initialMoneyIndex, 
      authForm, 
      RegisterActions,
      UserActions,
      history,
    } = this.props;
    const { email, password } = authForm.toJS();

    if(nickname.length < 1) {
      RegisterActions.setError('닉네임을 입력하세요');
      console.log('짧음');
      return;
    }

    const asyncFn = async () => {
      try {
        await RegisterActions.submit({
          displayName: nickname,
          email,
          password,
          initialMoney: {
            currency,
            index: initialMoneyIndex
          }
        });
        const { result } = this.props;
        UserActions.setUser(result);
        history.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    asyncFn();
  }

  handleSocialSubmit = () => {
    const { 
      nickname, 
      currency, 
      initialMoneyIndex, 
      RegisterActions,
      UserActions,
      history,
      provider,
      providerToken,
    } = this.props;

    if(nickname.length < 1) {
      RegisterActions.setError('닉네임을 입력하세요');
      console.log('짧음');
      return;
    }

    const asyncFn = async () => {
      try {
        await RegisterActions.submitSocial({
          displayName: nickname,
          provider,
          providerToken,
          initialMoney: {
            currency,
            index: initialMoneyIndex
          }
        });
        const { result } = this.props;
        UserActions.setUser(result);
        history.push('/');
      } catch (e) {
        console.log(e);
      }
    };
    asyncFn();
  }

  render() {
    const { nickname, currency, initialMoneyIndex, error, provider, providerToken } = this.props;
    const { 
      handleChangeNickname,
      handleSetCurrency,
      handleNicknameBlur,
      handleSetInitialMoneyIndex,
      handleSubmit,
      handleSocialSubmit
    } = this;
    return (
      <RegisterForm
        nickname={nickname}
        currency={currency}
        initialMoneyIndex={initialMoneyIndex}
        error={error}
        provider={provider}
        onChangeNickname={handleChangeNickname}
        onSetCurrency={handleSetCurrency}
        onSetInitialMoneyIndex={handleSetInitialMoneyIndex}
        onSubmit={handleSubmit}
        onSocialSubmit={handleSocialSubmit}
        onNicknameBlur={handleNicknameBlur}
      />
    )
  }
};

export default connect(
  (state) => ({
    authForm: state.auth.get('form'),
    nickname: state.register.get('nickname'),
    currency: state.register.get('currency'),
    initialMoneyIndex: state.register.get('initialMoneyIndex'),
    error: state.register.get('error'),
    result: state.register.get('result'),
    provider: state.auth.getIn(['socialInfo', 'provider']),
    providerToken: state.auth.getIn(['socialInfo', 'accessToken']),
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch),
    UserActions: bindActionCreators(userActions, dispatch),
  })
)(withRouter(RegisterFormContainer));