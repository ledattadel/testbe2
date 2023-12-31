import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPass from '../components/auth/LoginPass'


import { RootStore } from '../utils/TypeScript'

const Login = () => {
  const history = useHistory()

  const { auth } = useSelector((state: RootStore) => state)

  useEffect(() => {
    if(auth.access_token) {
      let url = history.location.search.replace('?', '/')
      return history.push(url)
    }
  },[auth.access_token, history])

  return (
    <div className="auth_page">
      <div className="auth_box">
        <h3 className="text-uppercase text-center mb-4">Login</h3>


        <LoginPass /> 

        <p>
          {`You don't have an account? `}
          <Link to={`/register${history.location.search}`} style={{color: 'crimson'}}>
            Register Now
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
