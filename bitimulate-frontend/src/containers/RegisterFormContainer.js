import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterForm } from 'components';
import * as registerActions from 'store/modules/register';
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
    const { nickname, currency, initialMoneyIndex, authForm, RegisterActions } = this.props;
    const { email, password } = authForm.toJS();

    RegisterActions.submit({
      displayName: nickname,
      email,
      password,
      initialMoney: {
        currency,
        index: initialMoneyIndex
      }
    })
  }

  render() {
    const { nickname, currency, initialMoneyIndex, displayNameExists } = this.props;
    const { 
      handleChangeNickname,
      handleSetCurrency,
      handleNicknameBlur,
      handleSetInitialMoneyIndex,
      handleSubmit
    } = this;
    return (
      <RegisterForm
        nickname={nickname}
        currency={currency}
        initialMoneyIndex={initialMoneyIndex}
        displayNameExists={displayNameExists}
        onChangeNickname={handleChangeNickname}
        onSetCurrency={handleSetCurrency}
        onSetInitialMoneyIndex={handleSetInitialMoneyIndex}
        onSubmit={handleSubmit}
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
    displayNameExists: state.register.get('displayNameExists')
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(withRouter(RegisterFormContainer));