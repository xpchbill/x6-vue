<template>
  <div class="container">
    <div ref="stencil" class="stencil">
      <a-switch v-model:checked="isEditMode" checked-children="Edit" un-checked-children="Preview"  />
    </div>
    <Graph 
      @ready="ready" 
      :resizing="false"
      :connecting="{
        snap: true, 
        allowBlank: false,
        allowLoop: false,
        highlight: true,
        connector: 'rounded',
        connectionPoint: 'boundary',
        router: { 
          name: 'er',
          args: {
            offset: 16,
            direction: 'H'
          }
        }
      }"
    >
      <VueShape primer="rect" id="1" :x="100" :y="300" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#cccccc', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-container">
          <div class="x6-node-header">
            <div class="x6-node-header__status">
              <a-tooltip color="#ffffff">
                <template #title>
                  <span class="x6-node-header__tooltip-text">Sucess</span>
                </template>
                <check-circle-filled :style="{color: '#87D069', fontSize: '18px', marginRight: '6px'}" />
              </a-tooltip>
            </div>
            <span class="x6-node-header__label">
              <a-tooltip>
                <template #title>xxxxxxxx01</template>
                xxxxxxxx01
              </a-tooltip>
            </span>
            <a-tooltip>
              <template #title>Delete node</template>
              <a-button 
                type="ghost" 
                shape="circle"
                size="small"
                :style="{color: '#fff'}" 
                @click="handleCustomNodeClick(scope, $event)"
              >
                <template v-if="isEditMode" #icon><delete-filled /></template>
              </a-button>
            </a-tooltip>
          </div>
          <div class="x6-node-body">
          </div>
        </div>
        <template #port>
          <PortGroup 
            name="in" 
            position="left"
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id1" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
          <PortGroup 
            name="out" 
            position="right" 
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          > 
            <Port 
              id="id2" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
        </template>
      </VueShape>
      <VueShape primer="rect" id="2" :x="500" :y="100" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#cccccc', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <close-circle-filled :style="{color: '#F62728', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">
            <a-popover title="Title" placement="topLeft">
              <template #content>
                <p>Content</p>
                <p>Content</p>
              </template>
              xxxxxxxx02
            </a-popover>
          </span>
          <plus-square-filled :style="{color: '#ffffff', fontSize: '18px', marginLeft: '6px'}" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
          <PortGroup 
            name="in" 
            position="left"
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id3" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
          <PortGroup 
            name="out" 
            position="right" 
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id4" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
        </template>
      </VueShape>
      <VueShape primer="rect" id="3" :x="500" :y="500" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#cccccc', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <a-popover title="Title" placement="top" arrow-point-at-center>
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <div :class="isEditMode ? 'x6-node-container' : 'x6-node-container heartbeat'">
            <div class="x6-node-header">
              <div class="x6-node-header__status">
                <check-circle-filled :style="{color: '#87D069', fontSize: '18px', marginRight: '6px'}" />
              </div>
              <span class="x6-node-header__label">
                  xxxxxxxx01
              </span>
              <plus-square-filled @click="handleCustomNodeClick(scope, $event)" />
            </div>
            <div class="x6-node-body">
            </div>
          </div>
        </a-popover>
        <template #port>
          <PortGroup 
            name="in" 
            position="left"
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id5" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
          <PortGroup 
            name="out" 
            position="right" 
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id6" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
        </template>
      </VueShape>
      <VueShape primer="rect" id="4" :x="900" :y="500" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#cccccc', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <close-circle-filled :style="{color: '#F62728', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">
            <a-popover title="Title" placement="topLeft">
              <template #content>
                <p>Content</p>
                <p>Content</p>
              </template>
              xxxxxxxx04
            </a-popover>
          </span>
          <plus-square-filled :style="{color: '#ffffff', fontSize: '18px', marginLeft: '6px'}" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
          <PortGroup 
            name="in" 
            position="left"
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id7" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
          <PortGroup 
            name="out" 
            position="right" 
            :attrs="{
              circle: {
                r: 5, 
                magnet: true, 
                stroke: '#31d0c6'
              }
            }"
          >
            <Port 
              id="id8" 
              :size="isEditMode ? 5 : 0" 
              :magnet="true" 
            />
          </PortGroup>
        </template>
      </VueShape>
      <Edge 
        id="e1" 
        :source="{cell: '1', port: 'id2'}" 
        :target="{cell: '2', port: 'id3'}" 
        @added="added" 
        label="edge1" 
        :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" 
      />
      <Edge 
        id="e2" 
        :source="{cell: '1', port: 'id2'}" 
        :target="{cell: '3', port: 'id5'}" 
        @added="added" 
        label="edge2" 
        :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" 
      />
      <Edge 
        id="e3" 
        :source="{cell: '3', port: 'id6'}" 
        :target="{cell: '4', port: 'id7'}" 
        @added="added" 
        label="edge2" 
        :attrs="{
          line: !isEditMode ? {
            stroke: '#1890ff',
            strokeWidth: 2,
            strokeDasharray: 8,
            targetMarker: 'classic',
            style: {
              animation: 'ant-line 30s infinite linear',
            },
          } : 
          {
            stroke: '#777777', 
            strokeWidth: 1,
            strokeDasharray: 0,
          }
        }" 
      />
      <!-- <Scroller /> -->
      <Background />
      <Grid :visible="showGrid" />
      <Snapline />
      <Clipboard @copy="copy" @paste="paste" />
      <Keyboard />
      <MouseWheel />
      <MiniMap />
      <Node v-for="node in addedNodes" :key="node.id" v-bind="node" />
      <ContextMenu bindType="node">
        <template #default="scope">
          <a-menu
            style="width: 180px"
            mode="vertical"
            @click="hendleContextMenuClick(scope, $event)"
          >
            <a-menu-item key="1">
              <template #icon>
                <PlusSquareFilled />
              </template>
              View node
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon>
                <CloseCircleFilled />
              </template>
              Remove node
            </a-menu-item>
          </a-menu>
        </template>
      </ContextMenu>
      <TeleportContainer />
    </Graph>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
import { defineComponent, ref, h } from 'vue'
import {
  ReloadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  PlusSquareFilled,
  DeleteFilled,
} from '@ant-design/icons-vue'
import { Options, Vue } from 'vue-class-component'
import { Vector } from '@antv/x6';
import { Port, PortGroup, TeleportContainer } from '../src/index'
import Graph, { Node, Edge, VueShape, useVueShape, VueShapeProps, GraphContext, useCellEvent } from '../src/index'
import { Grid, Background, Clipboard, Snapline, Selection, Keyboard, Scroller, MouseWheel, MiniMap } from '../src/index'
import { Stencil, StencilGroup } from '../src/index'
import { ContextMenu } from '../src/index'
// import { Menu } from 'ant-design-vue'
import 'ant-design-vue/es/menu/style/css'
import { Connecting } from '../src/index'

const { contextSymbol } = GraphContext
// const MenuItem = Menu.Item

const CustomNode = defineComponent({
  name: 'CustomNode',
  props: [...VueShapeProps, 'otherOptions'],
  inject: [contextSymbol],
  setup(props, context) {
    const cell = useVueShape(props, context)
    useCellEvent('node:click', (e) => context.emit('click', e), { cell })
    return () => null
  }
})

@Options({
  components: {
    Graph,
    Vector,
    Node,
    Edge,
    Grid,
    Background,
    Clipboard,
    Snapline,
    Selection,
    Scroller,
    Keyboard,
    MouseWheel,
    Connecting,
    MiniMap,
    VueShape,
    CustomNode,
    Stencil,
    StencilGroup,
    ContextMenu, 
    // Menu, 
    // MenuItem,
    Port, 
    PortGroup,
    TeleportContainer,
    CheckCircleFilled,
    ReloadOutlined,
    CloseCircleFilled,
    PlusSquareFilled,
    DeleteFilled,
  },
})
export default class App extends Vue {
  isEditMode = true
  showGrid = true
  showScroller = true
  visible = true
  y = 0
  stencil = ref()
  name = "antv"

  addedNodes = []

  created() {
    setTimeout(() => {
      // this.showGrid = false
      // this.showScroller= false
      // this.visible = false
      this.y = 400
      this.name = 'x6'
    }, 5000)
  }
  getPopupContainer(trigger: HTMLElement) {
    return trigger.parentElement
  }
  copy(e) {
    console.log('copy', e)
  }
  paste(e) {
    console.log('paste', e)
  }
  added(e) {
    console.log('added', e)
  }
  click(e) {
    console.log('click', e)
  }
  selected(e) {
    console.log('selected', e)
  }
  unselected(e) {
    console.log('unselected', e)
  }
  changed(e) {
    console.log('changed', e)
  }
  validateNode(node, options) {
    console.log('validateNode', node, options)
    const label = node.getLabel()
    const { width, height } = node.getSize()
    const { x, y } = node.getPosition()
    this.addedNodes.push({
      id: `add_node_${this.addedNodes.length}`,
      label,
      x,
      y,
      width,
      height,
      magnet: true, // 直接通过这个变量控制是否能连接
    })
    // 这里将数据存到当前对象，永远返回false，拖拽的节点不放入画布，使用一个新的节点替换位置
    return Promise.resolve(false)
  }
  handleCustomNodeClick(data, e) {
    e.preventDefault()
    e.stopPropagation()
    console.log('hendleContextMenuClick', data, e)
    // data.onClose()
  }
  hendleContextMenuClick(data, e) {
    console.log('hendleContextMenuClick', data, e)
    // data.onClose()
  }
  validateEdge({edge}) {
    console.log('validateEdge', edge)
    return true
  }
  ready({ graph }){
    // setGraph(graph)
    graph.on('signal', (cell) => {
      if (cell.isEdge()) {
        const view = graph.findViewByCell(cell)
        if (view && !this.isEditMode && (cell.id === 'e2' || cell.id === 'e3')) {
          const token = Vector.create('circle', { r: 6, fill: '#feb662' })
          const target = cell.getTargetCell()
          view.sendToken(token.node, 1000);
          // setTimeout(() => {
          //   view.sendToken(token.node, 1000, () => {
          //     if (target) {
          //       graph.trigger('signal', target)
          //     }
          //   })
          // }, 300)
        }
      } else {
        const edges = graph.model.getConnectedEdges(cell, {
          outgoing: true,
        });
        edges.forEach((edge) => graph.trigger('signal', edge));
      }
    });

    const trigger = () => {
      const nodes = graph.getNodes() || [];
      const firstNode = nodes.find(n => n.id === '3');
      if (firstNode) {
        const view = graph.findView(firstNode)
        // if (view) {
        //   view.animate('polygon', {
        //     attributeType: 'XML',
        //     attributeName: 'fill',
        //     values: '#5F95FF;#EFF4FF',
        //     dur: '1s',
        //     repeatCount: 'indefinite',
        //   })
        // }
        graph.trigger('signal', nodes.find(n => n.id === '3'))
      }
      setTimeout(trigger, 2000)
    }

    trigger();

    // graph.on('node:mouseenter', ({ node }) => {
    //   node.addTools({
    //     name: 'boundary',
    //     args: {
    //       attrs: {
    //         fill: '#7c68fc',
    //         stroke: '#9254de',
    //         strokeWidth: 1,
    //         fillOpacity: 0.2,
    //       },
    //     },
    //   })
    // })

    // graph.on('node:mouseleave', ({ node }) => {
    //   node.removeTools()
    // })
  }
}
</script>

<style lang="less">
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  .stencil{
    width: 100%;
    height: 64px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 2px 5px #ddd;
    z-index: 10;
  }
  #graph-contaner{
    flex: 1;
  }
  .x6-node-container {
    position: relative;
  }
  .x6-node-body {
    padding: 10px;
    background: #ffffff;
  }
  .x6-node-header {
    display: flex;
    height: 40px;
    color: #fff;
    background: #2C3044;
    border-radius: 5px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 0 16px;
    align-items: center;

    &__status {
      position: relative;
      width: 18px;
      height: 18px;
      margin-right: 12px;
    }
    &__status .anticon {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      border-radius: 100%;
      background: #2C3044;
    }
    &__label {
      height: 100%;
      display: flex;
      flex-grow: 1;
      align-items: center;
    }
    &__reload-icon {
      color: #ffffff; 
      font-size: 18px;
      margin-left: 6px;
      transition: transform .7s ease-in-out;
    }
    &__reload-icon:hover {
        transform: rotate(360deg);
    }
  }
}
.x6-node-header__tooltip-text {
  color: #333;
}
.x6-node-container.heartbeat{
  border: 3px solid #6a5cd4;
  border-radius: 8px;
  box-shadow: 0 0 0 5px rgb(135 59 244 / 20%);
}
.heartbeat{

	animation-name: heartbeat;
	animation-duration: 1s;	
	animation-timing-function: ease;	
	animation-iteration-count: infinite;
	visibility: visible !important;	
}
@keyframes ant-line {
  to {
      stroke-dashoffset: -1000
  }
}
@keyframes heartbeat {
	0% {
		transform: scale(1);	
	}
	10% {
		transform: scale(1.03);
	}
	20% {
		transform: scale(1.06);
	}
	100% {
		transform: scale(1);	
	}						
}
</style>
