import { defineComponent } from 'vue'
import './index.css'

export default defineComponent({
  setup() {
    return () => (
      <div class="pb-4">
        <div class="w-full bg-slate-500 h-16"></div>
        <div class="p-4">
          <router-view/>
        </div>
        {/* <div class="w-full text-center absolute bottom-0 mb-[-16px] text-gray-300">© 2022 - san</div> */}
      </div>
    )
  }
})
