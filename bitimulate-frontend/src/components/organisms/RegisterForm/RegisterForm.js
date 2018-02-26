import React from 'react';
import styles from './RegisterForm.scss';
import classNames from 'classnames/bind';
import {
  SectionWithTitle,
  Input,
  SelectCurrency,
  Option,
  Button,
  AlignRight,
  nickname,
  InitialMoneyOptions
} from 'components';

const cx = classNames.bind(styles);

const RegisterForm = ({
  nickname, 
  currency,
  initialMoneyIndex,
  displayNameExists,
  onChangeNickname,
  onSetCurrency,
  onSetInitialMoneyIndex,
  onSubmit,
  onNicknameBlur
}) => {
  return (
    <div className={cx('register-form')}>
      <SectionWithTitle title="닉네임" description="서비스에서 사용 할 닉네임을 입력하세요.">
        {
          displayNameExists && <div className={cx('exists')}>이미 존재하는 닉네임입니다.</div>
        }
        <Input value={nickname} onChange={onChangeNickname} onBlur={onNicknameBlur}/>
      </SectionWithTitle>
      <SectionWithTitle title="초기자금 설정">
        <div className={cx('description')}>
          모의 거래소에서 사용 할 초기자금을 설정하세요. {"\r\n"}초기 자금은 언제든지 설정페이지에서 초기화 할 수 있습니다.
        </div>
        <h4>화폐 선택</h4>
          <SelectCurrency currency={currency} onSetCurrency={onSetCurrency}/>
        <h4>금액 선택</h4>
          <InitialMoneyOptions 
            initialMoneyIndex={initialMoneyIndex} 
            currency={currency} 
            onSetInitialMoneyIndex={onSetInitialMoneyIndex}
          />
      </SectionWithTitle>
      <AlignRight>
        <Button 
          disabled={displayNameExists}
          flat 
          color={!!displayNameExists ? 'none' : 'teal'} 
          className={cx('register-button')} 
          style={{padding: '0.5rem 2rem'}}
          onClick={onSubmit}
        >
          가입
        </Button>
      </AlignRight>
    </div>
  );
};

export default RegisterForm;