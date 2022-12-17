import { defineComponent, onMounted, ref } from 'vue'
import PersonDetailCard from './components/PersonDetailCard'
import PersonDetailTabs from './components/PersonDetailTabs'
import { getAllTeacherInfo } from '@/apis'

const Home = defineComponent({
  setup() {
    const loading = ref(false)
    const userInfo = ref<Teacher.TeacherInfoRes>()

    onMounted(async () => {
      try {
        loading.value = true
        const res = await getAllTeacherInfo()
        userInfo.value = res.data
      } catch {
        //
      } finally {
        loading.value = false
      }
    })
    return () => (
      <a-spin spinning={loading.value}>
        {userInfo.value && (
          <>
            <PersonDetailCard userInfo={userInfo.value}> </PersonDetailCard>
            <a-divider>详细资料</a-divider>
            <PersonDetailTabs class="mt-4" userInfo={userInfo.value}></PersonDetailTabs>
          </>
        )}
      </a-spin>
    )
  },
})

export default Home
