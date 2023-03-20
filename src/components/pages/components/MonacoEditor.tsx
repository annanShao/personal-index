import { defineComponent, onMounted, onUnmounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/language/json/monaco.contribution'

const MonacoEditor = defineComponent({
  props: {
    initValue: {
      type: String,
      required: false,
      default: '',
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    language: {
      type: String,
      required: false,
      default: 'json',
    },
    onChange: {
      type: Function as any,
      required: false,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  setup(props, context) {
    const editor = ref<monaco.editor.IStandaloneCodeEditor | null>(null)
    const monacoElRef = ref(null)

    onMounted(() => {
      if (monacoElRef.value && !editor.value) {
        editor.value = monaco.editor.create(monacoElRef.value, {
          value: props.initValue,
          language: props.language,
        })

        editor.value.onDidChangeModelContent((val: any) => {
          props.onChange?.(val)
        })
      }
    })

    onUnmounted(() => {
      if (editor.value) {
        toRaw(editor.value).dispose()
      }
    })

    const getValue = () => {
      return JSON.parse(toRaw(editor.value)?.getValue() as string)
    }

    context.expose({
      getValue,
      MonacoEditor,
    })

    return () => <div class=" w-full h-64" ref={monacoElRef}></div>
  },
})
export default MonacoEditor
