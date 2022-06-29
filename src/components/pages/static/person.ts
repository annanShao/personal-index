export interface TagParams {
  [x: string]: {
    color: string
    name: string
  }
}

export const TAG_MAP: TagParams = {
  doctor: {
    color: '#f50',
    name: '博士'
  },
  master: {
    color: '#2db7f5',
    name: '硕士'
  },
  doctorTeacher: {
    color: '#f56',
    name: '博士生导师'
  },
  bachelor: {
    color: '#87d068',
    name: '本科生'
  },
  professor: {
    color: '#FF2D00',
    name: '教授'
  }
}
