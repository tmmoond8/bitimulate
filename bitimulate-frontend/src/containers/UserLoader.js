import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from 'store/modules/user';
import storage from 'lib/storage';

class UserLoader extends Component {

  checkLoginStatus = () => {
    const { UserActions } = this.props;
    const user = storage.get('__BTM_USER__');
    if(user) {
      UserActions.setUser(user);
    }

    const asyncFn = async () => {
      try {
        await UserActions.checkLoginStatus();
        if (!user || (user && user._id !== this.props.user.get('_id'))) {
          // if tere is any change in login status, resave the user info
          storage.set('__BTM_USER__', this.props.user.toJS());
        }
      } catch (e) {
        // if there is an error, removes the data from the storage
        storage.remove('__BTM_USER__');
      }
    }
    asyncFn();
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render() {
    return null;
  }
}

export default connect(
  (state) => ({
    user: state.user.get('user')
  }),
  (dispatch) => ({
    UserActions: bindActionCreators(userActions, dispatch)
  })
)(UserLoader);