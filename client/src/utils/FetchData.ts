import axios from 'axios'

const BASE_URL = "http://localhost:3033"


export const postAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.post(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const getAPI = async (url: string, token?:string) => {
  const res = await axios.get(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}

export const patchAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.patch(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const putAPI = async (url: string, post: object, token?:string) => {
  const res = await axios.put(`${BASE_URL}/api/${url}`, post, {
    headers: { Authorization: token }
  })

  return res;
}


export const deleteAPI = async (url: string, token?:string) => {
  const res = await axios.delete(`${BASE_URL}/api/${url}`, {
    headers: { Authorization: token }
  })

  return res;
}