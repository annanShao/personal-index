import { request } from '@/util/request'

export const getAllTeacherInfo = () => {
  return request<Teacher.TeacherInfoRes>({
    url: '/api/teacher',
  })
}

export const getAllStudentsInfo = () => {
  return request<Student.StudentDetailParams[]>({
    url: '/api/students',
  })
}

export const checkValidateCode = (code: number) => {
  return request<boolean>({
    url: `/api/check?code=${code}`,
  })
}

export const updateStudentInfo = (data: Student.StudentDetailParams) => {
  return request<boolean>({
    url: '/api/students',
    method: 'POST',
    data,
  })
}

export const updateTeacherInfo = (data: Teacher.TeacherInfoRes) => {
  return request<boolean>({
    url: '/api/teacher',
    method: 'POST',
    data,
  })
}
