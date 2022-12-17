import axios, { AxiosRequestConfig } from 'axios'
import { notification } from 'ant-design-vue'

interface BasicResponse<D> {
  success: boolean
  code: number
  msg: string
  data: D
}

const apiDomain = () => {
  return location.host.includes('localhost') ? 'http://localhost:7001' : ''
}

const axiosInstance = axios.create({
  baseURL: `${apiDomain()}`,
  timeout: 3000,
})

axiosInstance.interceptors.response.use(
  function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (res.data.success || !res.data.code) {
      return res.data
    } else {
      notification.error({
        message: '出错了',
        description: res.data.msg || res.data.message,
      })
    }
    return Promise.reject(res.data.msg)
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    notification.error({
      message: '出错了',
      description: error.response.data.message,
    })
    return Promise.reject(error)
  },
)

export const request = async <T, U = BasicResponse<T>>(config: AxiosRequestConfig): Promise<U> => {
  return axiosInstance.request<T, U>(config)
}
