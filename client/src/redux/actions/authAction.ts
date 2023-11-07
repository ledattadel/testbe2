import { Dispatch } from 'redux'
import { AUTH, IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'

import { IUserLogin, IUserRegister } from '../../utils/TypeScript'
import { postAPI, getAPI } from '../../utils/FetchData'
import { validRegister, validPhone } from '../../utils/Valid'
import { checkTokenExp } from '../../utils/checkTokenExp'


export const login = (userLogin: IUserLogin) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('login', userLogin)
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'datletrong')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const check = validRegister(userRegister)
  
  if(check.errLength > 0)
    return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await postAPI('register', userRegister)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const logged = localStorage.getItem('logged')
  if(logged !== 'datletrong') return;

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await getAPI('refresh_token')
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    localStorage.removeItem('logged')
  }
}


export const logout = (token: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token

  try {
    localStorage.removeItem('logged')
    dispatch({ type: AUTH, payload: { } })
    await getAPI('logout', access_token)
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}


export const forgotPassword = (account: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('forgot_password', { account })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}