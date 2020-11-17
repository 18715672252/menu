<template>
    <li>
        <div @click="toggle(data)" :class="{'noChild' : !hasChild}">
            <span v-if="hasChild" :class="data.openFlag ? 'open' : 'close'"></span>
            
            <span v-if="hasChild" class="isOpen"></span>
            <!-- 末节点 -->
            <span v-if="!hasChild" class="isClose"></span> 
            <span>{{ data[treeProps.label] }}</span>
            <span v-if="!hasChild" class="repair"></span>
        </div>
        <ul v-show="isOpen" v-if="hasChild">
            <tree-item v-for="(item, index) in data[treeProps.children]" :data="item" :key="index" :treeProps="treeProps" ></tree-item>
        </ul>
    </li>
</template>
 
<script>
export default {
    name: 'TreeItem', //递归组件必须有name
    props: {
        data: {
            type: [Object, Array], //多个可能的类型
            required: true
        },
        // label、children 默认值
      treeProps:{
          type:Object,
          default:()=>({
            children:'childs',
            label:'name'
          })
        }
    },
    data() {
        return {
            isOpen: false,
        }
    },
    computed: {
      // 判断当前级别是否还有children
        hasChild() {
            return this.data[this.treeProps.children] && this.data[this.treeProps.children].length
        }
    },
    methods: {
      // 点击子菜单也要判断是否有children，有就展开
        toggle(data) {
            data.openFlag = !data.openFlag
            if (!data.childs.length) {
                this.$bus.$emit('selItem', data)
            }
            if(this.hasChild) {
                this.isOpen = !this.isOpen
            }
        }
    }
}
</script>
 
<style scoped>
ul {
    list-style: none;
    padding-left: 0.2rem;
}
li {
      color: #000;
      width: 100%;
}
li > div {
    cursor: pointer;
    font-size: 0.14rem;
    line-height: 0.4rem;
    display: flex;
    align-items: center;
}
.isOpen {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url('./img/catalog.png');
    background-repeat: no-repeat;
    background-position-y: 50%;
    background-size: 100%;
    margin: 0 0.05rem;
}
.isClose {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url('./img/maintain.png');
    background-repeat: no-repeat;
    margin: 0 0.05rem;
    background-size: 80%;
    background-position-y: 50%;
}
.open {
    width: 0.13rem;
    height: 0.13rem;
    background-image: url('./img/open-close.png');
    background-repeat: no-repeat;
    margin: 0 0.05rem;
    background-position: 50%;
    background-size: 100%;
    transform-origin: center;
    transform: rotate(-90deg);
   
}
.close {
    width: 0.13rem;
    height: 0.13rem;
    background-image: url('./img/open-close.png');
    background-repeat: no-repeat;
    margin: 0 0.05rem;
    background-position: 50%;
    background-size: 100%;
    transform-origin: center;
    transform: rotate(0);
}
.noChild:hover {
    background: #4771D4;
    color: white;
}
.noChild:hover .isClose {
    width: 0.2rem;
    height: 0.2rem;
    background-image: url('./img/unchecked.png');
    background-repeat: no-repeat;
    margin: 0 0.05rem;
}
.noChild:hover .repair {
    background: #4771D4;
}
.noChild {
    padding-left: 0.2rem;
    position: relative;
}
.repair {
    position: absolute;
    top: 0;
    left: -1rem;
    width: 1rem;
    height: 0.4rem;
    background: transparent;
    z-index: -1;
}
</style>