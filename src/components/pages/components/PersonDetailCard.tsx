import { defineComponent, PropType, toRefs } from 'vue'
import { TAG_MAP as tagMap } from '../static'

export interface UserInfoProps {
  imgUrl: string
  tags: string[]
  name: string
  phone: string
  email: string
  location: string
  research: string[]
  from: {
    college: string
    website: string
  }
}

const PersonDetialCard = defineComponent({
  props: {
    userInfo: Object as PropType<UserInfoProps>
  },
  setup(props) {
    const { userInfo } = toRefs(props)
    return () => (
      <a-card class="w-full">
        <div class="flex">
          <a-image class="w-48" src={userInfo.value?.imgUrl} />
          <a-divider type="vertical" class="h-64 bg-slate-200 mx-4" />
          <div>
            <div>
              <div>{userInfo.value?.name}</div>
              {userInfo.value?.tags &&
                userInfo.value.tags.map((item: string) => {
                  return <a-tag color={tagMap[item].color}>{tagMap.name}</a-tag>
                })}
            </div>
            <a-divider class="bg-slate-200 mx-4" />
            <div></div>
          </div>
        </div>
      </a-card>
    )
  }
})

export default PersonDetialCard
