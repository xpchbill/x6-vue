<template>
  <div class="container">
    <div ref="stencil" class="stencil"/>
    <Graph 
      @ready="ready" 
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
      <VueShape primer="rect" id="1" :x="100" :y="300" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#dddddd', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <check-circle-filled :style="{color: '#87D069', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">查询主机线程</span>
          <reload-outlined class="x6-node-header__reload-icon" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
        <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id1" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id2" :magnet="true" />
        </PortGroup>
        </template>
      </VueShape>
      <VueShape primer="rect" id="2" :x="500" :y="100" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#dddddd', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <check-circle-filled :style="{color: '#87D069', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">主机版本查询</span>
          <reload-outlined :style="{color: '#ffffff', fontSize: '18px', marginLeft: '6px'}" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
        <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id3" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id4" :magnet="true" />
        </PortGroup>
        </template>
      </VueShape>
      <VueShape primer="rect" id="3" :x="500" :y="500" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#dddddd', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <close-circle-filled :style="{color: '#F62728', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">主机参数查询</span>
          <reload-outlined :style="{color: '#ffffff', fontSize: '18px', marginLeft: '6px'}" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
        <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id5" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id6" :magnet="true" />
        </PortGroup>
        </template>
      </VueShape>
      <Edge id="e1" :source="{cell: '1', port: 'id2'}" :target="{cell: '2', port: 'id3'}" @added="added" label="edge1" :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" />
      <Edge id="e2" :source="{cell: '1', port: 'id2'}" :target="{cell: '3', port: 'id5'}" @added="added" label="edge2" :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" />
      <!-- <Scroller /> -->
      <Background />
      <Grid :visible="showGrid" />
      <!-- <Selection @selected="selected" @unselected="unselected" @changed="changed" /> -->
      <Snapline />
      <Clipboard @copy="copy" @paste="paste" />
      <Keyboard />
      <MouseWheel />
      <MiniMap />
      <Stencil :container="stencil" :layoutOptions="{columns: 1, columnWidth: 200, rowHeight: 60}" :stencilGraphWidth="200" :validateNode="validateNode" :groups="[{name: 'group1', graphHeight: 160}, {name: 'group2', graphHeight: 160}]">
        <StencilGroup name="group1" :graphHeight="160" :graphWidth="200">
          <Node id="1" @added="added" label="group node1" :width="160" />
          <Node id="2" label="group node2" :width="160" />
        </StencilGroup>
        <StencilGroup name="group2" :graphHeight="200" :graphWidth="200">
          <Node id="3" label="group2 node3" :width="160" />
          <Node id="4" label="group2 node4" :width="160" />
        </StencilGroup>
      </Stencil>
      <Node v-for="node in addedNodes" :key="node.id" v-bind="node" />
      <ContextMenu>
        <template #default="scope">
          <Menu @click="hendleContextMenuClick(scope, $event)">
            <MenuItem key="1">Item 1</MenuItem>
            <MenuItem key="2">Item 2</MenuItem>
          </Menu>
        </template>
      </ContextMenu>
      <ContextMenu bindType="edge" bindEvent="click">
        <template #default="scope">
          <Menu @click="hendleContextMenuClick(scope, $event)">
            <MenuItem key="1">edge Item 1</MenuItem>
            <MenuItem key="2">edge Item 2</MenuItem>
          </Menu>
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
} from '@ant-design/icons-vue'
import { Options, Vue } from 'vue-class-component'
import { Vector } from '@antv/x6';
import { Port, PortGroup, TeleportContainer } from '../src/index'
import Graph, { Node, Edge, VueShape, useVueShape, VueShapeProps, GraphContext, useCellEvent } from '../src/index'
import { Grid, Background, Clipboard, Snapline, Selection, Keyboard, Scroller, MouseWheel, MiniMap } from '../src/index'
import { Stencil, StencilGroup } from '../src/index'
import { ContextMenu } from '../src/index'
import { Menu } from 'ant-design-vue'
import 'ant-design-vue/es/menu/style/css'
import { Connecting } from '../src/index'

const { contextSymbol } = GraphContext
const MenuItem = Menu.Item

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
    ContextMenu, Menu, MenuItem,
    Port, PortGroup,
    TeleportContainer,
    CheckCircleFilled,
    ReloadOutlined,
    CloseCircleFilled,
  },
})
export default class App extends Vue {

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
    console.log('hendleContextMenuClick', data, e)
    // data.onClose()
  }
  hendleContextMenuClick(data, e) {
    e.preventDefault()
    e.stopPropagation()
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
        if (view) {
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
      const firstNode = nodes.find(n => n.id === '1');
      if (firstNode) {
        const view = graph.findView(firstNode)
        if (view) {
          view.animate('polygon', {
            attributeType: 'XML',
            attributeName: 'fill',
            values: '#5F95FF;#EFF4FF',
            dur: '1s',
            repeatCount: 'indefinite',
          })
        }
        graph.trigger('signal', nodes.find(n => n.id === '1'))
      }
      setTimeout(trigger, 2000)
    }

    trigger();

    graph.on('node:mouseenter', ({ node }) => {
      node.addTools({
        name: 'boundary',
        args: {
          attrs: {
            fill: '#7c68fc',
            stroke: '#9254de',
            strokeWidth: 1,
            fillOpacity: 0.2,
          },
        },
      })
    })

    graph.on('node:mouseleave', ({ node }) => {
      node.removeTools()
    })
  }
}
</script>

<style lang="less">
.container{
  display: flex;
  height: 99vh;
  .stencil{
    width: 280px;
    height: 100%;
    position: relative;
  }
  #graph-contaner{
    flex: 1;
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

    &__label {
      flex-grow: 1;
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
</style>
