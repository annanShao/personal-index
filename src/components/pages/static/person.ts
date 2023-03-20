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

export interface LabelParams {
  [x: string]: {
    icon: string
    name: string
  }
}

export const LABEL_NAME_MAP: LabelParams = {
  phone: {
    icon: 'phone-filled',
    name: '联系方式'
  },
  email: {
    icon: 'mail-filled',
    name: '联系邮箱'
  },
  location: {
    icon: 'compass-filled',
    name: '办公地址'
  },
  hiring: {
    icon: 'security-scan-filled',
    name: '招生人群'
  },
  college: {
    icon: 'bank-filled',
    name: '所在院系'
  },
  research: {
    icon: 'experiment-filled',
    name: '科研方向'
  }
}
