declare namespace Teacher {
  interface PaperDetailParam {
    time: string
    title: string
    writer: string[]
    publishing: string
    img: string
    abstract: string
    pdf: string
  }

  interface TeacherInfoRes {
    tags: string[]
    name: string
    phone: string
    email: string
    location: string
    research: string[]
    hiring: string[]
    college: {
      name: string
      website: string
    }
    description: string
    honors: Record<'time' | 'desc', string>[]
    papers: PaperDetailParam[]
    projects: string[]
  }
}
