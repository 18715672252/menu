<template>
  <div class="hello">
   <list v-if="hideFlag" :dataObj="tableObj" />
  </div>
</template>

<script>
import list from './list'
export default {
  components: {
    list
  },
  name: 'HelloWorld',
  data () {
    return {
      hideFlag: false,
      tableObj:{
        table:[
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '目录一下一', 
            catalogNameFocus: false, 
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '目录二下二', 
            catalogNameFocus: false, 
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          },
           {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false, 
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          },
           {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录', 
            catalogNameFocus: false, 
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '目录一下一', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          },
          {
            evidenceName: '证据名称', 
            name: ['孙成龙'], 
            catalogName: '所属目录所属目录所属目录所属目录所属目录所属目录ha', 
            catalogNameFocus: false,
            evidenceNameFocus: false, 
            nameFocus: false
          }
        ]
      }
    }
  },
  mounted () {
    
      this.hideFlag = true
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* .hello {
  height: 100vh;
  background: white;
} */
</style>
