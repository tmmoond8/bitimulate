import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RegisterForm } from 'components';
import * as registerActions from 'store/modules/register';

class RegisterFormContainer extends Component {

  handleChangeNickname = (e) => {
    const { value } = e.target;
    const { RegisterActions } = this.props;

    RegisterActions.changeNickname(value);
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
    const { nickname, currency, initialMoneyIndex } = this.props;
+   console.log(nickname, currency, initialMoneyIndex);
  }

  render() {
    const { nickname, currency, initialMoneyIndex } = this.props;
    const { 
      handleChangeNickname,
      handleSetCurrency,
      handleSetInitialMoneyIndex,
      handleSubmit
    } = this;
    return (
      <RegisterForm
        nickname={nickname}
        currency={currency}
        initialMoneyIndex={initialMoneyIndex}
        onChangeNickname={handleChangeNickname}
        onSetCurrency={handleSetCurrency}
        onSetInitialMoneyIndex={handleSetInitialMoneyIndex}
        onSubmit={handleSubmit}
      >
      </RegisterForm>
    )
  }
};

export default connect(
  (state) => ({
    nickname: state.register.get('nickname'),
    currency: state.register.get('currency'),
    initialMoneyIndex: state.register.get('initialMoneyIndex')
  }),
  (dispatch) => ({
    RegisterActions: bindActionCreators(registerActions, dispatch)
  })
)(RegisterFormContainer);