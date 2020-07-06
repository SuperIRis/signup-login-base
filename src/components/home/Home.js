import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from './react.svg';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedState: false, counter: 0 };
  }

  render() {
    return (
      <>
        <div>
          <img src={logo} className='Home-logo' alt='logo' />
          <h2>Welcome to MyList test</h2>
        </div>
        {this.state.loggedState ? (
          <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </ul>
        ) : (
          <div>You are ready!</div>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state,
  };
}

export default connect(mapStateToProps)(Home);
