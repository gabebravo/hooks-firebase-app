import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function Login(props) {
  const [state, setState] = React.useState({
    showSignIn: true,
    tabValue: false
  });
  const tabIndex = state.showSignIn ? 0 : 1;

  function switchState() {
    setState(state => ({ ...state, showSignIn: !state.showSignIn }));
  }

  function handleChange(value) {
    setState({ ...state, tabValue: value });
  }

  return (
    <div>
      {state.showSignIn ? <SignIn {...props} /> : <SignUp {...props} />}
      <Tabs
        centered
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        <Tab label="Sign In" onClick={() => switchState()} />
        <Tab label="Sign Up" onClick={() => switchState()} />
      </Tabs>
    </div>
  );
}
