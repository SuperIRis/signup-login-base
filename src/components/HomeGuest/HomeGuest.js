import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HomeGuest = ()=>{
  return (
    <div>
      <h1>Hello stranger!</h1>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </div>
  );
}

function mapStateToProps(state){
  return {
    data:state
  }
}

export default connect(mapStateToProps)(HomeGuest);