import React, { Component } from 'react';
import { 
  PageTemplate, 
  RegisterTemplate,
  PolyBackground, 
  Block, 
  Paper 
} from 'components';
import { HeaderContainer } from 'containers';


class RegisterPage extends Component {
  state = {
    half: false
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        half: true
      });
    })
    
  }

  render() {
    const { half } = this.state;
    return (
      <PageTemplate 
        header={<HeaderContainer/>}>
        <PolyBackground fixed half={half}/>
        <Paper>
          <RegisterTemplate>
            이곳에 더 작성해야 하는데....
          </RegisterTemplate>
        </Paper>
      </PageTemplate>
    );
  }
}

export default RegisterPage; 