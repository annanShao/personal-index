import { defineComponent, PropType } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { TAG_MAP as tagMap } from '../static'
import dayjs from 'dayjs'

interface ShowKeyMap {
  enterYear: string
  hobby: string
  desc: string
}

const StudentDetailCard = defineComponent({
  props: {
    studentInfo: {
      default: () => ({}),
      type: Object as PropType<Student.StudentDetailParams>,
    },
    handleOpenDetail: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
      type: Function as any,
    },
    handleCloseDetail: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
      type: Function as any,
    },
  },
  setup(props) {
    const showMap = [
      {
        key: 'enterYear',
        title: '入学年份',
      },
      {
        key: 'hobbys',
        title: '爱好',
      },
      {
        key: 'selfDesc',
        title: '个人简介',
      },
    ]
    return () => {
      const { handleOpenDetail, studentInfo } = props

      const cardSlots = {
        cover: () => (
          <img
            alt="img"
            src={
              props.studentInfo?.img ??
              'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
            }
          />
        ),
        actions: () => {
          return <EditOutlined onClick={() => handleOpenDetail('edit', studentInfo)} key="edit" />
        },
      }

      const metaCardSlots = {
        avatar: () => {
          return (
            <a-avatar src={props.studentInfo?.avatarUrl ?? 'https://joeschmoe.io/api/v1/random'} />
          )
        },
        description: () => {
          const type = props.studentInfo?.type ?? 'master'
          return <a-tag color={tagMap[type].color}>{tagMap[type].name}</a-tag>
        },
      }

      return (
        <a-card hoverable class="w-[300px] m-4 shadow-md min-h-[600px]" v-slots={cardSlots}>
          <a-card-meta
            class="flex items-center"
            title={props.studentInfo?.name ?? '无名氏'}
            v-slots={metaCardSlots}
          ></a-card-meta>
          <a-divider></a-divider>
          {showMap.map((item) => {
            const value = props.studentInfo?.[item.key as keyof ShowKeyMap]
            return (
              <div class="flex">
                <div class=" basis-20">{item.title}：</div>
                {item.key === 'enterYear' ? (
                  <a-typography-paragraph>{dayjs(value).format('YYYY')}</a-typography-paragraph>
                ) : (
                  <a-typography-paragraph>{value}</a-typography-paragraph>
                )}
              </div>
            )
          })}
        </a-card>
      )
    }
  },
})

export default StudentDetailCard
