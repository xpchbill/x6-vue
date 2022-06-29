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
      <VueShape primer="rect" id="1" :x="100" :y="300" :width="220" @added="added" @cell:change:zIndex="changed">
        <a-popover title="Title" placement="top" arrow-point-at-center>
          <template #content>
            <p>Content</p>
            <p>Content</p>
          </template>
          <div class="x6-node-container heartbeat">
            <div class="x6-node-header">
              <div class="x6-node-header__status">
                <!-- <div class="dot"></div>
                <div class="pulse"></div> -->
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
        <!-- <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id1" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id2" :magnet="true" />
        </PortGroup> -->
        </template>
      </VueShape>
      <VueShape primer="rect" id="2" :x="500" :y="100" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#dddddd', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <check-circle-filled :style="{color: '#87D069', fontSize: '18px', marginRight: '6px'}" />
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
        <!-- <template #port>
        <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id3" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id4" :magnet="true" />
        </PortGroup>
        </template> -->
      </VueShape>
      <VueShape primer="rect" id="3" :x="500" :y="500" :width="220" :attrs="{rect: {fill: '#ffffff', stroke: '#dddddd', rx: '5', ry: '5'}}" @added="added" @cell:change:zIndex="changed">
        <div class="x6-node-header">
          <close-circle-filled :style="{color: '#F62728', fontSize: '18px', marginRight: '6px'}" />
          <span class="x6-node-header__label">xxxxxxxx03</span>
          <reload-outlined class="x6-node-header__reload-icon" :style="{color: '#ffffff', fontSize: '18px', marginLeft: '6px'}" @click="handleCustomNodeClick(scope, $event)" />
        </div>
        <template #port>
        <!-- <PortGroup name="in" position="left" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id5" :magnet="true" />
        </PortGroup>
        <PortGroup name="out" position="right" :attrs="{circle: {r: 6, magnet: true, stroke: '#31d0c6'}}">
          <Port id="id6" :magnet="true" />
        </PortGroup> -->
        </template>
      </VueShape>
      <!-- <Edge 
        id="e2" 
        :source="{cell: '1'}" 
        :target="{cell: '3'}" 
        @added="added" 
        label="edge2" 
        :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" 
      /> -->
      <Edge 
        id="e1" 
        :source="{cell: '1', port: 'id2'}" 
        :target="{cell: '2', port: 'id3'}" 
        @added="added" 
        label="edge1" 
        :attrs="{
          line: {
            stroke: '#1890ff',
            strokeDasharray: 8,
            targetMarker: 'classic',
            style: {
              animation: 'ant-line 30s infinite linear',
            },
          }
        }" 
      />
      <Edge 
        id="e2" 
        :source="{cell: '1', port: 'id2'}" 
        :target="{cell: '3', port: 'id5'}" 
        @added="added" 
        label="edge2" 
        :attrs="{line: {stroke: '#777777', strokeWidth: 1}}" 
      />
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
          <!-- <Menu @click="hendleContextMenuClick(scope, $event)">
            <MenuItem key="1">Item 1</MenuItem>
            <MenuItem key="2">Item 2</MenuItem>
          </Menu> -->
          <a-menu
            style="width: 180px"
            mode="vertical"
            @click="hendleContextMenuClick(scope, $event)"
          >
            <a-menu-item key="1">
              <template #icon>
                <PlusSquareFilled />
              </template>
              Add a child node
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
      <!-- <ContextMenu bindType="edge" bindEvent="click">
        <template #default="scope">
          <Menu @click="hendleContextMenuClick(scope, $event)">
            <MenuItem key="1">edge Item 1</MenuItem>
            <MenuItem key="2">edge Item 2</MenuItem>
          </Menu>
        </template>
      </ContextMenu> -->
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
        // if (view) {
        //   view.animate('polygon', {
        //     attributeType: 'XML',
        //     attributeName: 'fill',
        //     values: '#5F95FF;#EFF4FF',
        //     dur: '1s',
        //     repeatCount: 'indefinite',
        //   })
        // }
        graph.trigger('signal', nodes.find(n => n.id === '1'))
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
  height: 99vh;
  .stencil{
    width: 280px;
    height: 100%;
    position: relative;
  }
  #graph-contaner{
    flex: 1;
  }
  .x6-node-container {
    position: relative;
    border: 3px solid #6a5cd4;
    border-radius: 8px;
    // border: 1px solid #dddddd;
    box-shadow: 0 0 0 5px rgb(135 59 244 / 20%);

    // animation: warn 0.3s ease-out;
    // animation-iteration-count: infinite;
    // animation-name: pulse;
    // animation-duration: 1000ms;
    // animation-timing-function: ease-in-out;
    // animation-iteration-count: infinite;
    // animation-play-state: running;
  }
  .x6-node-body {
    padding: 10px;
    background: #ffffff;
    border-radius: 5px;
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
.dot {
	position: absolute;
  width: 18px;
  height: 18px;
  left: 0;
  top: 0;
  background: #FFF4DC;
  border-radius: 100%;
  z-index: 2;
  animation: warn 1s ease-out;
  animation-iteration-count: infinite;
}
.pulse {
	position: absolute;
  width: 22px;
  height: 22px;
  left: -2px;
  top: -2px;
  // background: #fff;
  // border-radius: 100%;
  // animation: warn 1s ease-out;
  // animation-iteration-count: infinite;
  z-index: 1;
}
.heartbeat{
	animation-name: heartbeat;
	animation-duration: 1s;	
	animation-timing-function: ease;	
	animation-iteration-count: infinite;
	visibility: visible !important;	
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
@keyframes ant-line {
  to {
      stroke-dashoffset: -1000
  }
}
@keyframes warn {
	0% {
    transform: scale(1, 1);
    opacity: 1;
  }
	20% {
    transform: scale(1.02, 1.02);
    opacity: 0.95;
  }
	40% {
    transform: scale(1.04, 1.04);
    opacity: 0.9;
  }
	60% {
    transform: scale(1.06, 1.06);
    opacity: 0.85;
  }
	80% {
    transform: scale(1.3, 1.3);
    opacity: 0.8;
  }
	100% {
    transform: scale(1.5, 1.5);
    opacity: 0.75;
  }
}
@keyframes pulse {
	0% {
		transform: scale(1);
		opacity: 0.9;		
	}
	50% {
		transform: scale(1.1);
		opacity: 1;	
	}	
	100% {
		transform: scale(1);
		opacity: 0.9;	
	}			
}
@keyframes shake-little {
    2% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    4% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    6% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    8% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    10% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    12% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    14% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    16% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    18% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    20% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    22% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    24% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    26% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    28% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    30% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    32% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    34% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    36% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    38% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    40% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    42% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    44% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    46% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    48% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    50% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    52% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    54% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    56% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    58% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    60% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    62% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    64% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    66% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    68% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    70% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    72% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    74% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    76% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    78% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    80% {
        transform: translate(0px, 0px) rotate(0.5deg)
    }

    82% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    84% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    86% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    88% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    90% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    92% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    94% {
        transform: translate(0px, 1px) rotate(0.5deg)
    }

    96% {
        transform: translate(1px, 0px) rotate(0.5deg)
    }

    98% {
        transform: translate(1px, 1px) rotate(0.5deg)
    }

    0%,100% {
        transform: translate(0, 0) rotate(0)
    }
}
</style>
