
<template>
  <div>
    <ul v-for="(item,index) in data" :key="index">
      <tree-item :data="item" :treeProps="treeProps" @checkItem="checkItem"></tree-item>
    </ul>
  </div>
</template>
 
<script>
  import treeItem from './item'
  export default {
    name:'index',
    props: {
      data: {
        type: [Object, Array],
        required: true
      },
      treeProps: {
        type: Object,
        default: () => ({
          children: 'childs',
          label: 'name'
        })
      }
    },
    components: {
      treeItem
    },
  }
  </script>
  <style scoped>
  ul li{
      list-style: none;
  }
  </style>>

