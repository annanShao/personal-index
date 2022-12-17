import { checkValidateCode } from '@/apis'
import { Modal, message } from 'ant-design-vue'
import { getCurrentInstance, ref } from 'vue'

const useValidateOperation = (operation: any) => {
  const codeValue = ref(-1)
  const appContext = getCurrentInstance()?.appContext
  return (...data: any) => {
    Modal.confirm({
      title: '请输入操作码',
      content: () => (
        <a-input-number
          class="w-60"
          value={codeValue.value}
          onChange={(value: number) => (codeValue.value = value)}
          placeholder="操作码"
        />
      ),
      appContext,
      onOk: async () => {
        const res = await checkValidateCode(codeValue.value)
        if (res.data) {
          return operation(data)
        } else {
          message.error('请输入正确的操作码')
          return false
        }
      },
    })
  }
}

export default useValidateOperation
