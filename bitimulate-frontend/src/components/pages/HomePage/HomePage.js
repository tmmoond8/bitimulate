import React from 'react';
import { PageTemplate, PolyBackground, Block } from 'components';
import { HeaderContainer } from 'containers';;

const HomePage = () => {
  const style = {
    color: 'black'
  }
  return (
    <PageTemplate 
      header={<HeaderContainer/>}
    >
      <PolyBackground>
        <Block style={style} center shadow>
          <h1>
            모의 거래소에서 다양한 가상화페 거래를 진행해보세요.
          </h1>
          <h2>
            실제 거래소의 실시간 데이터에 기반하여 거래를 진행합니다.
          </h2>
        </Block>
      </PolyBackground>
    </PageTemplate>
  );
};

export default HomePage; 