import React, { Component } from 'react';
import { 
  PageTemplate, 
  RegisterTemplate,
  PolyBackground, 
  Paper,
} from 'components';
import { HeaderContainer, RegisterFormContainer } from 'containers';

class RegisterPage extends Component {
  state = {
    half: false
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        half: true
      });
    });
  }

  render() {
    const { half } = this.state;
    return (
      <PageTemplate 
        header={<HeaderContainer/>}>
        <PolyBackground fixed half={half}/>
        <Paper>
          <RegisterTemplate>
            <RegisterFormContainer/>
          </RegisterTemplate>
        </Paper>
      </PageTemplate>
    );
  }
}

export default RegisterPage; 