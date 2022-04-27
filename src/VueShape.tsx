// @ts-nocheck
import { h, defineComponent } from 'vue';
import { VueShape as VueShapeContainer } from '@antv/x6-vue-shape';
import { contextSymbol } from './GraphContext'
import { NodeProps, useCell } from './Shape'

export const VueShapeProps = NodeProps.concat('primer', 'useForeignObject', 'component')

export const useVueShape = (props, { slots, emit }) => {

  // 这里实际上只是在这个作用域传递一个createShape函数到useCell
  return useCell(props, {slots, emit}, (props) => {
    const {
      id,
      width, height,
      primer='circle', useForeignObject=true, component,  // 这几个是@antv/x6-vue-shape独有的参数
      magnet,
      ...otherOptions
    } = props
    const cell = new VueShapeContainer({
      id,
      width: Number(width) || 60,
      height: Number(height) || 60,
      primer, useForeignObject,
      // 这里将自己的slots中的内容强行放到画布中去
      // 这样图结构的交互还有一些操作逻辑交给x6
      // 通过vue绘制的组件渲染和组件内部交互逻辑交给用户
      component: component
        ? component
        : () => h('div', {key: id, class: 'vue-shape'}, slots.default ? slots.default({props, item: cell}) : null),
      ...otherOptions,
    })
    return cell
  })
}

const VueShape = defineComponent({
  name: 'VueShape',
  props: VueShapeProps,
  inject: [contextSymbol],
  setup(props, context) {
    const cell = useVueShape(props, context)
    // 优先判断名字是port的slot在不在，不存在的时候渲染默认的slot
    const { default: _default, port } = context.slots
    return () => cell.value ? <div style="display:none;visibility:hidden;">
      {port && port()}
      {_default && _default()}
    </div> : null
  }
})

VueShape.VueShapeContainer = VueShapeContainer
VueShape.VueShapeProps = VueShapeProps
VueShape.useVueShape = useVueShape

export default VueShape
