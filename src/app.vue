<template>
  <div class="menu-bar">
    <ul id="menu">
      功能：
      <li v-on:click="handleLiClick('canvasExample')">照片擷取</li>
      <li v-on:click="handleLiClick('opencvExample')">opencv</li>
      <li v-on:click="handleLiClick('faceExample')">臉部辨識</li>
      <li v-on:click="handleLiClick('objectExample')">物體辨識</li>
      <li v-on:click="handleLiClick('trainingExample')">圖像訓練</li>
      <li v-on:click="handleLiClick('myTest')">訓練測試</li>
    </ul>
  </div>
  <div id="component">
  </div>
</template>
  
<script lang="ts">
  import { ref, defineComponent } from 'vue'
  import canvasExample from '../src/example/canvasExample'
  import opencvExample from '../src/example/opencvExample'
  import faceExample from '../src/example/faceExample'
  import objectExample from '../src/example/objectExample'
  import trainingExample from '../src/example/trainingExample'
  import myTest from '../src/example/myTest'

  export default defineComponent({
    name: 'App',
    setup(){
        const component = ref({});
        const handleLiClick = (componentName: string)=>{
          if(componentName === 'canvasExample'){
            canvasExample(document.querySelector<HTMLDivElement>("#component")!)
          }
          if(componentName === 'opencvExample'){
            opencvExample(document.querySelector<HTMLDivElement>("#component")!)
          }
          if(componentName === 'faceExample'){
            faceExample(document.querySelector<HTMLDivElement>("#component")!)
          }
          if(componentName === 'objectExample'){
            objectExample(document.querySelector<HTMLDivElement>("#component")!)
          }
          if(componentName === 'trainingExample'){
            trainingExample(document.querySelector<HTMLDivElement>("#component")!)
          }
          if(componentName === 'myTest'){
            myTest(document.querySelector<HTMLDivElement>("#component")!)
          }
        }

        return {
            component,
            handleLiClick
        }
    }
  })
</script>
<style>
.menu-bar{
  width: 100%;
  text-align: start;
}
.menu-bar ul{
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: black;
  color: white;
}
.menu-bar ul{
  padding: 0px 6px 0px 6px;
}
.menu-bar ul>li{
  display: inline-block;
  padding: 16px 6px 16px 6px;
  font-size: 16px;
}
.menu-bar ul>li:hover{
  background-color: gray;
  color: white;
}

#component{
  width: 100%;
  display: block;
}
</style>