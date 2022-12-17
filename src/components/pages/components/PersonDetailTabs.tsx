import dayjs from 'dayjs'
import { defineComponent, getCurrentInstance, onMounted, PropType, Ref, ref, toRefs } from 'vue'
import { HonorParams, PapersParams } from './types'
import StudentDetailCard from './StudentDetailCard'
import { checkValidateCode, getAllStudentsInfo, updateStudentInfo } from '@/apis'
import { PlusOutlined } from '@ant-design/icons-vue'
import MonacoEditor from './MonacoEditor'
import { isNormalJSON } from '@/util'
import { message, Modal } from 'ant-design-vue'
import useValidateOperation from '@/hooks/useValidateOperation'

export interface DetailTabsProps {
  description?: string
  honors?: HonorParams[]
  papers?: PapersParams[]
  projects?: string[]
  // students: number[]
}

const PersonDetailTabs = defineComponent({
  props: {
    userInfo: {
      default: () => ({}),
      type: Object as PropType<Teacher.TeacherInfoRes>,
    },
  },
  setup(props) {
    const { userInfo } = toRefs(props)
    const activeKey = ref<string>('1')
    const loading = ref(false)
    const paperDetailVisible = ref(false)
    const studentDetailVisible = ref(false)
    const currentPaperDetail = ref<Teacher.PaperDetailParam>({} as Teacher.PaperDetailParam)
    const students = ref<Student.StudentDetailParams[]>([])
    const operateStudentId = ref<number | null>(null)
    const codeValue = ref<number>(-1)
    const operateValue = ref<Student.StudentDetailParams>()
    const operatetype = ref<'edit' | 'add'>('add')

    // monaco
    const monacoRef = ref()
    const appContext = getCurrentInstance()?.appContext

    // const handleValidateOperation = (operation: any) => {
    //   return (...data: any) => {
    //     Modal.confirm({
    //       title: '请输入操作码',
    //       content: () => (
    //         <a-input-number
    //           value={codeValue.value}
    //           onChange={(value: number) => (codeValue.value = value)}
    //           placeholder="操作码"
    //         />
    //       ),
    //       appContext,
    //       onOk: async () => {
    //         const res = await checkValidateCode(codeValue.value)
    //         if (res.data) {
    //           return operation(data)
    //         } else {
    //           message.error('请输入正确的操作码')
    //           return false
    //         }
    //       },
    //     })
    //   }
    // }

    const handlePaperDetailClick = (item: Teacher.PaperDetailParam) => {
      currentPaperDetail.value = item
      paperDetailVisible.value = true
    }

    const handlePaperModalOk = () => {
      paperDetailVisible.value = false
    }

    const handlePaperModalCancel = () => {
      paperDetailVisible.value = false
    }

    const handleTabChange = (activeTab: Ref<string>) => {
      activeKey.value = activeTab.value
    }

    const handleCheckStudentData = (data: Student.StudentDetailParams): boolean => {
      if (isNormalJSON(data)) {
        return false
      }

      return true
    }

    onMounted(async () => {
      try {
        loading.value = true
        const res = await getAllStudentsInfo()
        if (res.success) {
          students.value = res.data
        }
      } finally {
        loading.value = false
      }
    })

    const handleOpenDetail = (type: 'add' | 'edit', editValue?: Student.StudentDetailParams) => {
      operatetype.value = type
      if (type === 'edit') {
        operateValue.value = editValue
        operateStudentId.value = editValue?.uid ?? 0
      }
      studentDetailVisible.value = true
    }

    const handleCloseDetail = () => {
      studentDetailVisible.value = false
      operateStudentId.value = null
      operateValue.value = undefined
    }

    const handleEditInfoByCheck = (item: any) =>
      useValidateOperation(() => handleOpenDetail('edit', item))

    const handleAddNewInfoByCheck = useValidateOperation(handleOpenDetail)

    const handleEditStudentInfo = async () => {
      try {
        const values = monacoRef.value.getValue()
        if (!handleCheckStudentData(values)) {
          message.error('请输入正确的个人信息')
          return false
        }
        // 上传学生信息
        if (operatetype.value === 'edit') {
          const currentIndex = students.value.findIndex((item) => item.uid === values.uid)
          if (!~currentIndex || values.uid !== operateStudentId.value) {
            message.error('请勿更改 uid')
            return false
          }
          const res = await updateStudentInfo(values)
          console.log(res)
          students.value.splice(currentIndex, 1, { ...students.value[currentIndex], ...values })
        } else {
          if (students.value.some((item) => item.uid === values.uid)) {
            message.error('该 uid 已被注册')
            return false
          }
          console.log('values', values)
          const res = await updateStudentInfo(values)
          console.log(res)
          students.value.push(values)
        }
        handleCloseDetail()
        message.success('操作成功')
      } catch {
        //
      }
    }

    return () => {
      return (
        <a-spin spinning={loading.value}>
          {userInfo.value && (
            <a-tabs
              class="bg-white"
              activeKey={activeKey.value}
              onChange={handleTabChange}
              type="card"
            >
              <a-tab-pane key="1" tab="个人简介" class="px-4 py-2">
                {userInfo.value.description?.split('\\n').map((item) => {
                  return <a-typography-paragraph>{item}</a-typography-paragraph>
                }) ?? <a-empty description="暂无数据" />}
              </a-tab-pane>
              <a-tab-pane key="2" tab="奖项荣誉" class="px-4 py-2">
                <a-timeline>
                  {userInfo.value.honors?.map((item) => {
                    return (
                      <a-timeline-item color="red">
                        <div>{`${dayjs(item.time).format('YYYY')} - ${item.desc}`}</div>
                      </a-timeline-item>
                    )
                  })}
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="3" tab="发表论文" class="px-4 py-2">
                <a-timeline>
                  {userInfo.value.papers?.map((item) => {
                    return (
                      <a-timeline-item onClick={() => handlePaperDetailClick(item)}>
                        <div class="cursor-pointer hover:text-slate-800">{`${dayjs(
                          item.time,
                        ).format('YYYY')} - ${item.title}`}</div>
                      </a-timeline-item>
                    )
                  })}
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="4" tab="研究项目" class="px-4 py-2">
                <a-timeline>
                  {userInfo.value.projects?.map((item) => {
                    return (
                      <a-timeline-item color="green">
                        <div>{item}</div>
                      </a-timeline-item>
                    )
                  })}
                </a-timeline>
              </a-tab-pane>
              <a-tab-pane key="5" tab="学生信息" class="px-4 py-2">
                <div class="flex flex-wrap ">
                  {!students.value.length && <a-empty />}
                  {students.value.map((item) => {
                    return (
                      <StudentDetailCard
                        handleCloseDetail={handleCloseDetail}
                        handleOpenDetail={handleEditInfoByCheck(item)}
                        studentInfo={item}
                      ></StudentDetailCard>
                    )
                  })}
                  <a-card
                    class="w-[300px] m-4 shadow-md flex justify-center items-center group min-h-[600px]"
                    hoverable
                    onClick={handleAddNewInfoByCheck}
                  >
                    <PlusOutlined class=" text-3xl group-hover:text-[#1890ff]" />
                  </a-card>
                </div>
              </a-tab-pane>
            </a-tabs>
          )}
          <a-modal
            onCancel={handlePaperModalCancel}
            visible={paperDetailVisible.value}
            // title="论文详情"
            width={720}
            onOk={handlePaperModalOk}
            cancelText="关闭"
            okText="确定"
            dialogStyle={{ minWidth: '520px' }}
            v-slots={{
              title: () => (
                <div class="flex">
                  <div>论文详情</div>
                  <a-tag
                    color="#55acee"
                    onClick={() => {
                      window.open(currentPaperDetail.value.pdf, '_blank')
                    }}
                    class="cursor-pointer ml-2"
                  >
                    PDF
                  </a-tag>
                </div>
              ),
            }}
          >
            <a-image
              class="w-full"
              src={currentPaperDetail.value.img}
              fallback="data:image/png;base64,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"
            />
            <a-divider dashed />
            <a-typography-title class="text-center mt-2" level={3}>
              {currentPaperDetail.value.title}
            </a-typography-title>
            <div class="flex justify-between">
              <div class="basis-24">发表：</div>
              <a-typography-paragraph>{currentPaperDetail.value.publishing}</a-typography-paragraph>
            </div>
            <div class="flex justify-between">
              <div class="basis-24">作者：</div>
              <a-typography-paragraph>
                {currentPaperDetail.value.writer.join(',')}
              </a-typography-paragraph>
            </div>
            <div class="flex">
              <a-typography-paragraph>{currentPaperDetail.value.abstract}</a-typography-paragraph>
            </div>
          </a-modal>
          <a-modal
            visible={studentDetailVisible.value}
            onCancel={handleCloseDetail}
            title={`Modal`}
            width={720}
            onOk={handleEditStudentInfo}
            cancelText="关闭"
            okText="确定"
            dialogStyle={{ minWidth: '520px' }}
            destroyOnClose
          >
            <MonacoEditor
              ref={monacoRef}
              initValue={JSON.stringify(operateValue.value, null, 2) ?? ''}
              readonly={false}
            />
          </a-modal>
        </a-spin>
      )
    }
  },
})

export default PersonDetailTabs
