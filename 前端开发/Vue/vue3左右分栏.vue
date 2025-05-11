<template>
    <div class="draggable-split-pane" ref="splitPane">
      <div class="left-pane" :style="{ width: leftPaneWidth + '%' }">
        <!-- 左侧栏内容 -->
        111
      </div>
      <div
        class="resizer"
        @mousedown="startResize"
        @mousemove="resize"
        @mouseup="stopResize"
        
      ></div>
      <div class="right-pane" :style="{ width: 100 - leftPaneWidth + '%' }">
        <!-- 右侧栏内容 -->
        222
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  
  export default {
    setup() {
      const leftPaneWidth = ref(30); // 默认左侧栏宽度为30%
      const isResizing = ref(false);
      const initialX = ref(0);
      const splitPane = ref<HTMLElement | null>();
  
      const startResize = (event: MouseEvent) => {
        isResizing.value = true;
        initialX.value = event.clientX;
      };
  
      const resize = (event: MouseEvent) => {
        if (isResizing.value) {
          const deltaX = event.clientX - initialX.value;
          console.log('splitPane.value!.offsetWidth:',splitPane.value!.offsetWidth,'deltaX:',deltaX)
          leftPaneWidth.value += (deltaX / splitPane.value!.offsetWidth) * 100; // 移动的位移/总宽度
          initialX.value = event.clientX;
        }
      };
  
      const stopResize = () => {
        isResizing.value = false;
      };
  
      // 清除事件监听器
      onUnmounted(() => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
        // window.removeEventListener('mouseleave', stopResize);
      });
  
      // 添加事件监听器
      onMounted(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
        // window.addEventListener('mouseleave', stopResize);
      });
  
      return {
        leftPaneWidth,
        splitPane,
        startResize,
        stopResize,
        resize
      };
    }
  };
  </script>
  
  <style scoped>
  .draggable-split-pane {
    display: flex;
    height: 100vh;
  }
  
  .left-pane,
  .right-pane {
    overflow: auto;
  }
  
  .resizer {
    width: 5px;
    background: #ccc;
    cursor: ew-resize;
    touch-action: none;
  }
  </style>
  