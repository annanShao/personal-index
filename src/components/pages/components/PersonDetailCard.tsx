import { defineComponent, PropType, ref, toRaw, toRefs } from 'vue'
import { TAG_MAP as tagMap, LABEL_NAME_MAP as labelNameMap } from '../static'
import {
  PhoneFilled,
  CompassFilled,
  ExperimentFilled,
  SecurityScanFilled,
  BankFilled,
  MailFilled,
} from '@ant-design/icons-vue'
import MonacoEditor from './MonacoEditor'
import useValidateOperation from '@/hooks/useValidateOperation'
import { updateTeacherInfo } from '@/apis'
import { message, notification } from 'ant-design-vue'

export type LabelValueParams = string | string[] | { name: string; website?: string }

interface CustomLabelParams {
  location?: string
  research?: string[]
  hiring?: string[]
  email: string
  college?: {
    name: string
    website?: string
  }
}

const IconGen = (icon: string) => {
  switch (icon) {
    case 'phone-filled':
      return <PhoneFilled />
    case 'compass-filled':
      return <CompassFilled />
    case 'experiment-filled':
      return <ExperimentFilled />
    case 'security-scan-filled':
      return <SecurityScanFilled />
    case 'bank-filled':
      return <BankFilled />
    case 'mail-filled':
      return <MailFilled />
    default:
      return <></>
  }
}

const getImageUrl = (name: string) => {
  return new URL(`../../../assets/${name}.jpeg`, import.meta.url).href
}

const PersonDetialCard = defineComponent({
  props: {
    userInfo: {
      type: Object as PropType<Teacher.TeacherInfoRes>,
      default: () => ({}),
    },
  },
  setup(props) {
    const { userInfo } = toRefs(props)
    const userInfoEditVisible = ref(false)
    const handleGotoCollegeWeb = (url: string) => {
      if (url.length) {
        window.open(url, '_blank')
      }
    }

    const CustomLabel = (customLabelProps: {
      icon: string
      index: string
      name: string
      value: LabelValueParams
    }) => {
      const { icon, index, name, value } = customLabelProps
      return (
        <div class="flex items-start my-1">
          <div class="flex items-center text-md text-gray-800">
            {IconGen(icon)}
            <div class="ml-2">{`${name}：`}</div>
          </div>
          {['hiring', 'research'].includes(index) ? (
            <div class="flex flex-col">
              {(value as string[]).map((item) => {
                return <li>{item}</li>
              })}
            </div>
          ) : index === 'college' ? (
            <div
              class="cursor-pointer hover:text-sky-800 hover:underline"
              onClick={() =>
                handleGotoCollegeWeb((value as { name: string; website?: string })?.website ?? '')
              }
            >
              {(value as { name: string; website?: string }).name}
            </div>
          ) : (
            <div>{value}</div>
          )}
        </div>
      )
    }

    // edit modal
    const monacoRef = ref()

    const handleCloseModal = () => {
      userInfoEditVisible.value = false
    }

    const handleEditTeacherInfo = async () => {
      try {
        const values = monacoRef.value.getValue()
        await updateTeacherInfo(values)
        message.success('更新成功')
        userInfo.value = values
        userInfoEditVisible.value = false
      } catch {
        //
      }
    }

    const handleOpenEditModal = useValidateOperation(() => {
      userInfoEditVisible.value = true
    })

    return () => (
      <a-card class="w-full">
        <div class="flex">
          {userInfo.value && (
            <div class="flex items-center">
              <a-image class="w-48" src={getImageUrl('lhw')} />
              <a-divider type="vertical" class="h-64 bg-slate-200 mx-4" />
              <div>
                <div>
                  <div class=" text-3xl font-bold text-slate-700">{userInfo.value?.name}</div>
                  <div class="mt-2">
                    {userInfo.value.tags.map((item: string) => {
                      return <a-tag color={tagMap[item].color}>{tagMap[item].name}</a-tag>
                    })}
                  </div>
                </div>
                <div class="mt-2 grid grid-col gap-2">
                  {Object.entries(labelNameMap).map((item) => {
                    return (
                      <CustomLabel
                        icon={item[1].icon}
                        index={item[0]}
                        name={item[1].name}
                        value={userInfo.value?.[item[0] as keyof CustomLabelParams] ?? ''}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
        <a-modal
          visible={userInfoEditVisible.value}
          onCancel={handleCloseModal}
          title={`Modal`}
          width={1080}
          onOk={handleEditTeacherInfo}
          cancelText="关闭"
          okText="确定"
          dialogStyle={{ minWidth: '820px' }}
          destroyOnClose
        >
          <MonacoEditor
            ref={monacoRef}
            initValue={JSON.stringify(userInfo.value, null, 2) ?? ''}
            readonly={false}
          />
        </a-modal>
        <a-button type="primary" class="absolute top-12 right-12" onClick={handleOpenEditModal}>
          编辑
        </a-button>
      </a-card>
    )
  },
})

export default PersonDetialCard
