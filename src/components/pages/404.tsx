import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const NotFound = defineComponent({
  setup() {
    const router = useRouter()

    const handleGoBackToHome = () => {
      router.replace({
        name: 'Home'
      })
    }

    const slots = {
      extra: () => (
        <a-button type="primary" onClick={handleGoBackToHome}>
          回到首页
        </a-button>
      )
    }
    return () => (
      <a-result status="404" title="404" sub-title="你访问的页面走丢了" v-slots={slots}></a-result>
    )
  }
})

export default NotFound
