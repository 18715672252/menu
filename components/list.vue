<template>
  <div class="entrance-maintain-modal">
     <div v-show="entranceMaintainSelectFlag" class="entrance-maintain-select" ref="entranceMaintainSelect" v-loading="dataMenuLoading">
      <!-- <ul>
        <li v-for="(item, index) in dataMenu" class="menu-title" ref="menu-title" :key="item.id + index" :style="{'height': item.childrenNum * 0.4 + 'rem'}">
          <div @click="upDown(index, item.children.length, $event)">
            <div :class="item.flag ? 'close-catalog' : 'open-catalog'"></div>
            <div class="catalog"></div>
            <div>{{item.label}}</div>
          </div>
          <ul class="menu-item" v-if="item.children">
            <li v-for="(item1, index1) in item.children" ref="menu-item-li" class="menu-item-li" :class="{'isCurrent': !item1.flag}" @click="itemClick(index, index1, $event, item1.label)" :key="item1.id + index1">
              <div class="catalog-item" :class="{'isCurrent-icon': !item1.flag}"></div>
              <div>{{item1.label}}</div>
            </li>
          </ul>
        </li>
      </ul> -->
      <trees :data="data" :treeProps="propsTrees"></trees>
    </div>

    <div class="entrance-maintain-content">
      <div class="entrance-maintain-title">
        <div>制卷信息维护</div>
        <div class="hide" @click="hide">×</div>
      </div>
      <div class="entrance-maintain-table">
        <div class="entrance-maintain-tip">
          <img src="./img/maintain.png" alt="" />
          <div>请对以下制卷信息进行维护：</div>
        </div>
        <el-form
          :model="dataObj"
          ref="dynamicValidateForm"
          class="demo-dynamic"
          size="mini"
        >
          <el-table v-loading="tableLoading" :data="dataObj.table" :stripe="true" :border="true"  style="width: 100%; font-size: 0.14rem;" :cell-style="{padding: '0'}" :header-cell-style="{background:'#fafafa', height: '50px', color: '#666666', borderTop: '1px solid #EBEEF5'}" :row-style="{height: '40px'}">
            <el-table-column
              label="序号"
              type="index"
              width="80"
              align="center"
              fixed
            ></el-table-column>
            <el-table-column label="证据名称" align="center">
              <template slot-scope="scope">
                <el-form-item>
                  <div  v-if="dataObj.table[scope.$index].evidenceNameFocus" style="height: 29px; font-size: 0.14rem;" >
                  <el-input
                    ref="input"
                    @blur="sureEvidenceName(scope.$index)"
                    type="text"
                    v-model.trim="dataObj.table[scope.$index].evidenceName"
                    size="mini"
                    maxlength="50"
                    show-word-limit
                    style="font-size: 0.14rem;"
                  ></el-input>
                  </div>
                  <div @dblclick="ecitEvidenceName(scope.$index)" v-else class="ovr" style="height: 29px; font-size: 0.14rem;">
                    {{ dataObj.table[scope.$index].evidenceName }}
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column property="name" label="指向人名称" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-form-item>
                  <div v-if="dataObj.table[scope.$index].nameFocus" style="height: 29px; font-size: 0.14rem;">
                  <el-select
                    style="width: 100%; font-size: 0.14rem;"
                    ref="select"
                    v-model="dataObj.table[scope.$index].name"
                    @visible-change="sureName"
                    :automatic-dropdown="true"
                    multiple
                    collapse-tags
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      style="font-size: 0.14rem;"
                    >
                    </el-option>
                  </el-select>
                  </div>
                  <div @dblclick="ecitName(scope.$index)" v-else class="ovr peo" style="height: 29px;font-size: 0.14rem;">
                    {{ dataObj.table[scope.$index].name.join(',') }}
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="所属目录" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-form-item>
                  <div v-if="dataObj.table[scope.$index].catalogNameFocus"  style="height: 29px;font-size: 0.14rem;">
                  <el-input
                    ref="inputCatalog"
                    type="text"
                    v-model.trim="dataObj.table[scope.$index].catalogName"
                    size="mini"
                    maxlength="50"
                    show-word-limit
                    style="font-size: 0.14rem;"
                  ><i slot="suffix" id="search_icon" class="el-input__icon el-icon-search" @click="searchMenu"></i></el-input>
                  </div>
                  <div @dblclick="ecitCatalogName(scope.$index, $event, scope.row.catalogName)" v-else class="ovr" style="height: 29px; font-size: 0.14rem;">
                    {{ dataObj.table[scope.$index].catalogName }}
                  </div>
                </el-form-item>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <div class="entrance-maintain-footer">
          <div class="entrance-maintain-page-total">
            <div class="allItems">
                共计7条证据信息
            </div>
            <div class="page" style="display: flex; align-items: center; font-size: 0.14rem;">
              <div class="previousPage" @click="previousPage">上一页</div>
              <div class="changePage">
                <input v-inputBorder class="pageInput" type="text" v-model.trim="pageCode">
              </div>
              <div class="nextPage" @click="nextPage">下一页</div>
            </div>
          </div>
          <div class="entrance-maintain-footer-button">
            <div class="button" @click="sureSubmit">
              确认提交
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import vueTree from './tree1'
import data from './data'
import data1 from './data1'
import trees from "./index";
export default {
  name:'list',
  components: {
    vueTree,
    trees
  },
  provide () {
    return {
      parent: this
    }
  },
  data() {
    return {
      propsTrees: {
          children: 'childs',
          label: 'name'
      },
      data: data,
      pageCode: '1',
      pageInputFlag: true,
      tableLoading: false,
      dataMenuLoading: false,
      dblclickFlag: false, // 限制document.onclick
      dataMenu: [{ // 所属目录的数据结构
        id: 1, // 目录ID
        label: '目录一', // 目录文本
        flag: true, // 代表该目录是否是打开状态
        childrenNum:1, // d代表该目录当前打开的高度比例，1为原始高度
        children: [{
          id: 4, // 条目ID
          label: '目录一下一', // 条目文本
          flag: true, // 代表该item是否被选中
          childrenNum:1
        },
        {
          id: 9,
          label: '目录一下二',
          flag: true,
          childrenNum:1
        }]
      }, {
        id: 2,
        label: '目录二',
        flag: true,
        childrenNum:1,
        children: [{
          id: 5,
          label: '目录二下一',
          flag: true,
          childrenNum:1
        }, {
          id: 6,
          label: '目录二下二',
          flag: true,
          childrenNum:1
        }]
      }, {
        id: 3,
        label: '目录三',
        flag: true,
        childrenNum:1,
        children: [{
          id: 7,
          label: '目录三下一',
          flag: true,
          childrenNum:1
          
        }, {
          id: 8,
          label: '目录三下二',
          flag: true,
          childrenNum:1
        }]
      }],
      oldTable: null,
      dialogVisible: true,
      flag: false,
      entranceMaintainSelectFlag: true,
      selIndex: 0, // 记录双击的那个指向人
      catalogNameIndex: 0, // 记录双击的那个所属目录
      options: [{
          value: '封天都',
          label: '封天都'
        }, {
          value: '萧晋寒',
          label: '萧晋寒'
        }, {
          value: '古或今',
          label: '古或今'
        }, {
          value: '李元究',
          label: '李元究'
        }, {
          value: '石空鱼',
          label: '石空鱼'
        },{
          value: '石空墨',
          label: '石空墨'
        },{
          value: '马良',
          label: '马良'
        }],

    }
  },
  props: {
    dataObj: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    pageCode (newValue, oldValue) { // 监听页码的改变
      console.log('1'+newValue);
      if (this.pageCode === '') {
        return false
      }
      if (this.pageCode < 1) {
        return false
      }
      if (this.pageCode % 1 !== 0) {
        return false
      }
      this.getList()
    },

  },
  mounted () {
    this.$bus.$on('selItem',(msg) => {
      this.dataObj.table[this.catalogNameIndex].catalogNameFocus = false;
      this.entranceMaintainSelectFlag = false
      this.dataObj.table[this.catalogNameIndex].catalogName = msg.name;
    })
    this.oldTable = JSON.parse(JSON.stringify(this.dataObj.table))
    let dom = document.getElementsByClassName('entrance-maintain-select')[0]
    document.onclick = (e) => {
      if (this.dblclickFlag) {
        e = e || window.event
        if (e.target.id !== 'search_icon') {
          if (!dom.contains(e.target)) {
            this.dataObj.table[this.catalogNameIndex].catalogNameFocus = false;
            this.entranceMaintainSelectFlag = false
            this.dblclickFlag = false
          }
        }
      } 
    }
  },
  beforeDestroy () {
    document.onclick = null
    this.$bus.$off('selItem')
  },
  directives: {
    inputBorder: {
      inserted (el) {
        el.onfocus = () => { // 聚焦
          el.parentNode.className = 'changePage focusPage'
        }
        el.onblur = () => { // 失焦
          el.parentNode.className = 'changePage'
        }
      }
    }
  },
  methods: {
    checkItem (item) {
      this.dataObj.table[this.catalogNameIndex].catalogNameFocus = false;
      this.entranceMaintainSelectFlag = false
      this.dataObj.table[this.catalogNameIndex].catalogName = item.name;

    },
    getList () { // 获取数据
      this.tableLoading = true
      let obj = {}
      obj.page = this.pageCode
    },
    getPointingToPeopleList () { // 获取指向人列表
      let arr = []
      
    },
    sureSubmit () { // 确认提交
      console.log(this.dataObj.table);
      let sendData = []
      for (let i = 0; i < this.dataObj.table.length; i++) {
        let newItem = JSON.stringify(this.dataObj.table[i])
        let oldItem = JSON.stringify(this.oldTable[i])
        if (newItem != oldItem) {
          sendData.push(JSON.parse(newItem))
        }
      }
      console.log(sendData);
    },
    previousPage () { // 上一页
      if (this.pageCode > 1) {
        this.pageCode--
      }
    },
    nextPage () { // 下一页
      this.pageCode++
    },
    searchMenu (i) { // 查询所属目录
      this.dataMenuLoading = true
      setTimeout(() => {
        this.data = data1
        this.dataMenuLoading = false
      },3000)
      
       
    },
    hide () { // 隐藏制卷信息维护弹框
      this.$emit('hide') 
    },
    entranceMaintainSelectHide () {

    },
    ecitCatalogName (index, ev, catalogName) { // 双击所属目录
      let top = this.offSet(ev.target).top
      let left = this.offSet(ev.target).left
      let width = ev.target.offsetWidth
      this.dblclickFlag = true
      this.catalogNameIndex = index
      for (let i = 0; i < this.dataMenu.length; i++) {
        for (let j = 0; j < this.dataMenu[i].children.length; j++) {
          if (catalogName === this.dataMenu[i].children[j].label) {
            for (let z = 0; z < this.dataMenu[i].children.length; z++) {
              if (j === z) {
                this.dataMenu[i].children[z].flag = false
              } else {
                this.dataMenu[i].children[z].flag = true
              }
            }
            this.dataMenu[i].flag = false
            this.dataMenu[i].childrenNum = this.dataMenu[i].children.length + 1
            break
          } else {
            this.dataMenu[i].children[j].flag = true
            this.dataMenu[i].flag = true
            this.dataMenu[i].childrenNum =  1
          }
        }
      }
     this.dataObj.table[index].catalogNameFocus = true;
        this.$nextTick(() => {
            this.$refs.inputCatalog.focus()
            this.$refs.entranceMaintainSelect.style.top = top + 35 + 'px'
            this.$refs.entranceMaintainSelect.style.left = left + 'px'
            this.$refs.entranceMaintainSelect.style.width = width + 'px'
            this.entranceMaintainSelectFlag = true
        });
    },
    upDown (index, amount, ev) { // 打开所属目录的菜单
      if (this.dataMenu[index].flag) {
        this.dataMenu[index].childrenNum = this.dataMenu[index].children.length + 1
        this.dataMenu[index].flag = false
      } else {
        this.dataMenu[index].childrenNum = 1
        this.dataMenu[index].flag = true
      }
    },
    itemClick (index, index1, ev, label) { // 点击目录下item
      for (let i = 0; i < this.dataMenu.length; i++) {
        for (let j = 0; j <  this.dataMenu[i].children.length; j++) {
          this.dataMenu[i].children[j].flag = true
        }
      }
       this.dataMenu[index].children[index1].flag = false
      this.dataObj.table[this.catalogNameIndex].catalogName = label;
    },
    ecitEvidenceName(index) { // 双击证据名称
        this.dataObj.table[index].evidenceNameFocus = true;
        this.$nextTick(() => {
            this.$refs.input.focus()
        });
    },
    offSet(curEle) {
        let totalLeft = null
        let totalTop = null
        let par = curEle.offsetParent
        // 首先把自己本身的相加
        totalLeft += curEle.offsetLeft
        totalTop += curEle.offsetTop
        while (par) {
          if (navigator.userAgent.indexOf('MSIE 8.0') === -1) {
            // 不是IE8我们才进行累加父级参照物的边框
            totalTop += par.clientTop
            totalLeft += par.clientLeft
          }
          // 把父级参照物的偏移相加
          totalTop += par.offsetTop
          totalLeft += par.offsetLeft
          par = par.offsetParent
        }
        return {left: totalLeft, top: totalTop}
      },
    sureEvidenceName(index) { // 证据input框失焦
      this.dataObj.table[index].evidenceNameFocus = false;
    },
    ecitName (index) { // 双击指向人姓名
        this.dataObj.table[index].nameFocus = true;
        this.selIndex = index
        this.$nextTick(() => {
            this.$refs.select.focus()
        });
    },
    sureName (flag) { // 
        if (!flag) {
            this.$nextTick(() => {
                this.dataObj.table[this.selIndex].nameFocus = false;
            })
        }
    }
  }
};
</script>

<style scoped>
/* 滚动条样式 */

::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}

::-webkit-scrollbar-track-piece {
    background-color: #e1e1e1;
    border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
    height: 10px;
    background-color: #a9a9a9;
    border-radius: 6px;
    
}

::-webkit-scrollbar-thumb:horizontal {
    width: 5px;
    background-color: #a9a9a9;
    border-radius: 6px;
}
input {
  font-size: 0.14rem !important;
}
.entrance-maintain-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  box-sizing: border-box;
  padding-top: 1%;
  overflow-y: auto;
}
.entrance-maintain-content {
  width: 11.05rem;
  background: white;
  height: auto;
  margin: 0.5rem auto 0;
}
.entrance-maintain-table {
  padding: 0 0.28rem 0.32rem;
}
.entrance-maintain-title {
  height: 0.48rem;
  background: #4771d4;
  display: flex;
  align-items: center;
}
.entrance-maintain-title > div:nth-child(1) {
  color: white;
  font-size: 0.18rem;
  margin-left: 0.28rem;
}
.entrance-maintain-title > div:nth-child(2) {
  color: white;
  margin-left: auto;
  font-size: 0.2rem;
  margin-right: 0.16rem;
}
.entrance-maintain-tip {
  font-size: 0.16rem;
  margin: 0.26rem 0 0.2rem 0;
  display: flex;
  align-items: center;
}
.entrance-maintain-tip img {
  width: 0.16rem;
  margin-right: 0.11rem;
}
.el-form-item {
  margin-bottom: 0;
}
.el-form-item__content {
  line-height: 0 !important;
}
.entrance-maintain-select {
    max-height: 3.59rem;
    padding: 0.2rem 0 0.2rem 0.1rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 20px 40px #888;
    background: white;
    font-size: 0.14rem;
    overflow-y: auto;
    
}
  .el-icon-folder {
    margin-right: 0.1rem;
  }
  ul li {
    list-style: none;
  }
  .menu-title {
    overflow: hidden; 
    /* height: 40px; */
    cursor: pointer;
    transition: all 0.5s;
    font-size: 0.14rem;
  }
  .menu-title > div {
   display: flex;
   align-items: center;
   height: 0.4rem;
   padding-left: 0.3rem;
  }
  .menu-item {
    width: 100%;
    
  }
  .menu-item li {
    padding-left: 0.7rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.14rem;
    display: flex;
    align-items: center;
  }
  .menu-item>li:hover {
    background:#4771D4;
    cursor: pointer;
    color: white;
  }
  .menu-item>li:hover .catalog-item {
    background-image: url('./img/unchecked.png')
  }
  .isCurrent {
    background:#4771D4;
    color: white;
  }
  .isCurrent-icon {
    background-image: url('./img/unchecked.png') !important;
  }
  .catalog {
    width: 0.18rem;
    height: 0.15rem;
    background-image: url('./img/catalog.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
    margin: 0 0.05rem;
  }
  .catalog-item {
    width: 0.16rem;
    height: 0.19rem;
    margin-right: 0.05rem;
    background-image: url('./img/maintain.png');
    background-size: 100% 99%;
    background-repeat: no-repeat;
    background-position: 0 0;
  }
  .close-catalog {
    width: 0.13rem;
    height: 0.08rem;
    background-image: url('./img/open-close.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: 100%;
    transition: all 0.5s;
    transform-origin: center;
    transform: rotate(-90deg);
  }
  .open-catalog {
    width: 0.13rem;
    height: 0.08rem;
    background-image: url('./img/open-close.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: 0 0;
    transition: all 0.5s;
    transform-origin: center;
    transform: rotate(0);
  }
  .el-icon-search:hover {
    cursor: pointer;
  }
  .ovr {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .entrance-maintain-page-total {
    display: flex;
    align-items: center;
    margin-top: 0.16rem;
  }
  .page {
    margin-left: auto;
  }
  .changePage {
    width: 0.39rem; 
    height: 0.39rem;
    position: relative;
    overflow: hidden;
    border: 1px solid #999;
    border-radius: 0.04rem;
    margin: 0 0.1rem;
  }
  .previousPage, .nextPage{
    width: 0.58rem;
    height: 0.39rem;
    background: #FFFFFF;
    border: 1px solid #D9D9D9;
    border-radius: 0.04rem 0 0 0.04rem;
    color: #000000;
    line-height: 0.39rem;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }
  .pageInput {
    width: 100%; 
    height: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    border: none;
    font-size: 0.14rem;
  }
  .focusPage {
    border-color: #4771D4 !important;
  }
  .allItems {
    font-size: 0.14rem;
  }

  .button {
    width: 1.6rem;
    height: 0.39rem;
    font-size: 0.14rem;
    background: #4771D4;
    border-radius: 0.04rem;
    background: #4771D4;
    color: white;
    text-align: center;
    line-height: 0.39rem;
    margin: 0.2rem auto 0;
    cursor: pointer;
    user-select:none;
  }
  .hide {
    font-size: 0.3rem !important;
    cursor: pointer;
  }
  .entranceMaintainSelectHide {
    position: absolute;
    top: 0.02rem;
    right: 0.05rem;
    font-size: 0.16rem;
    cursor: pointer;
  }
  .peo {
    background-image: url('./img/open-close.png');
    background-repeat: no-repeat;
    background-size: 0.13rem 0.08rem;
    background-position: right 50%;
    padding:0 0.13rem;
    box-sizing: border-box;
  }
</style>