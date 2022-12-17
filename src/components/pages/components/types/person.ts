export interface HonorParams {
  time: Date
  desc: string
}

export interface CustomLabelProps {
  icon: string
  title: string
}

export interface PapersParams {
  time: Date
  title: string
  writer: string[]
  publishing: string
  img?: string
  abstract: string
  pdf?: string
}

export interface UserInfoProps {
  imgUrl?: string
  tags: string[]
  name: string
  phone: string
  email: string
  location?: string
  research?: string[]
  hiring?: string[]
  college?: {
    name: string
    website?: string
  }
  description?: string
  honors?: HonorParams[]
  papers?: PapersParams[]
  projects?: string[]
}
