<template>
  <div class="hjg-table">
  	<div class="table-header">
      <template v-for="btn in tableOption.header_btn">
        
        <template v-if="btn.type == 'custom'">
          <el-button class="table-header-btn" type="primary" :icon="btn.icon ? btn.icon : ''" @click="handleCommand(btn.click, $event)">{{ btn.label }}</el-button>
        </template>

        <template v-else-if="btn.type == 'control'">
          <el-dropdown trigger="click" :hide-on-click="false" menu-align="start">
            <el-button class="table-header-btn" type="primary" :icon="btn.icon ? btn.icon : 'menu'">
              {{ btn.label ? btn.label : '字段'}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(col, index) in tableControl" :key="index" v-if="col.type != 'selection' && col.type != 'action' && col.type != 'expand'">
                <el-checkbox :label="col.label" v-model="col.show" @change=handleControlChange></el-checkbox>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template v-else-if="btn.type == 'dropdown'">
          <el-dropdown trigger="click" menu-align="start">
            <el-button class="table-header-btn" type="primary" :icon="btn.icon ? btn.icon : ''">
              {{ btn.label }}<i class="el-icon-caret-bottom el-icon--right"></i>            
            </el-button>
            <el-dropdown-menu v-if="btn.items">
              <el-dropdown-item v-for="(item,index) in btn.items" :key="index" :divided="item.divided">
                <div @click="handleDelete(item.click, $event)" style="margin: 0 -20px; padding: 0 20px;" v-if="item.type == 'delete'">删除</div>
                <div @click="handleCommand(item.click, $event)" style="margin: 0 -20px; padding: 0 20px;" v-else>{{ item.text }}</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template v-else-if="btn.type == 'date'">
          <div style="display: inline-block; margin-left: 10px;">
            <app-date-picker size='mini' v-model="date"></app-date-picker>
            <el-button size="mini" @click="timeSearch(btn)">搜索</el-button>
            <el-button size="mini" @click="timeClear(btn)" style="margin: 0px;">清空</el-button>
          </div>
        </template>

        <template v-else-if="btn.type == 'add'">
          <el-button class="table-header-btn" type="primary" icon="plus" @click="handleCommand(btn.click, $event)">{{ btn.label ? btn.label : '添加' }}</el-button>
        </template>

        <template v-else-if="btn.type == 'delete'">
          <el-button class="table-header-btn" type="primary" icon="delete" @click="handleDelete(btn.click, $event)">{{ btn.label ? btn.label : '删除' }}</el-button>
        </template>

        <template v-else-if="btn.type == 'filter'">
          <el-button class="table-header-btn" type="primary" icon="document" @click="handleCommand(btn.click, $event)">筛选</el-button>
        </template>

        <template v-else-if="btn.type == 'export'">
          <el-button class="table-header-btn" type="primary" icon="upload2" @click="handelExport(btn.click, $event)">导出</el-button>
        </template>

      </template>
        
      <template v-if="tableOption.header_slot ? true : false">
        <slot v-for="item in tableOption.header_slot" :name="item"></slot>
      </template>
	  	<el-input
        v-model="search_value"
        placeholder="搜索..."
        style="width: 200px;"
        icon="search"
        :class="searchClass"
        @focus="searchClass='table-search table-search-focus'"
        @blur="searchClass='table-search'"
        @click="handleSearch"
        v-if="tableOption.is_search == undefined ? true : tableOption.is_search"
	    ></el-input>
    </div>
    
	<el-table 
    :data="tableData" 
    stripe 
    :border="tableOption.is_border != undefined ? tableOption.is_border : true" 
    @selection-change="handleselectionChange" 
    :row-key="getRowKeys" 
    :default-sort="tableOption.default_sort ? tableOption.default_sort : {}"
    @sort-change="handleSortChange"
    :expand-row-keys="expands"
    @expand="handleExpand"
    :style="tableStyle"
  >
    <template v-for="(col, index) in tableOption.columns">
      
      <template v-if="col.type == 'selection'">
        <el-table-column type="selection"></el-table-column>
      </template>

      <template v-else-if="col.type == 'expand'">
        <el-table-column type="expand">
          <template scope="scope">
            <slot name="expand" :row="scope.row">
            </slot>
          </template>
        </el-table-column>
      </template>

      <template v-else-if="col.type == 'text'">
        <template v-if="col.render ? true : false">
          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" v-if="tableControl[index]['show']" :sortable="col.sortable ? 'custom' : false" >
            <template scope="scope">
              <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" v-if="tableControl[index]['show']" :sortable="col.sortable ? 'custom' : false">
          </el-table-column>
        </template>
      </template>

      <template v-else-if="col.type == 'date'">
        <el-table-column :label="col.label" :prop="col.prop" v-if="tableControl[index]['show']">
        </el-table-column>
      </template>


      
      <template v-else-if="col.type == 'array'">
        <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" v-if="tableControl[index]['show']">
          <template scope="scope">
            <el-tag v-for="(item, i) in arrayRender(scope['row'],col)" style="margin-left: 5px;" close-transition :key="i">{{ item }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <template v-else-if="col.type == 'action'">
        <el-table-column :label="col.label ? col.label : '操作'" :align="col.align ? col.align : 'center'" :width="col.width" header-align='center' >
          <template scope="scope">
            <template v-if="col.btns_render != undefined">
              <slot :name="col.btns_render" :row="scope.row">
              </slot>
            </template>
            <template v-else v-for="(btn, index) in col.btns" v-if="btn.btn_if ? btn.btn_if(scope.row) : true">

              <el-dropdown v-if="btn.type == 'dropdown'" :key="index" trigger="click" menu-align="start">
                <el-button class="table-header-btn" :type="btn.btn_type ? btn.btn_type : ''" :size="btn.size ? btn.size : 'mini'" :icon="btn.icon ? btn.icon : ''">
                  {{ btn.label }}<i class="el-icon-caret-bottom el-icon--right"></i>            
                </el-button>
                <el-dropdown-menu v-if="btn.items">
                  <el-dropdown-item v-for="(item,index2) in btn.items" :key="index2" :divided="item.divided"><div @click="handleCommand(item.click, $event)" style="margin: 0 -10px; padding: 0 10px;">{{ item.text }}</div></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-button v-else-if="btn.type == 'edit'" :type="btn.btn_type ? btn.btn_type : 'text'" :key="index" :size="btn.size ? btn.size : 'mini'" icon="edit" @click="handleActionCommand(btn.click, scope, $event)">编辑</el-button>

              <el-button v-else-if="btn.type == 'detail'" :type="btn.btn_type ? btn.btn_type : 'text'" :key="index" :size="btn.size ? btn.size : 'mini'" icon="information" @click="handleActionCommand(btn.click, scope, $event)" >详情</el-button>

              <el-button v-else-if="btn.type == 'delete'" :type="btn.btn_type ? btn.btn_type : 'text'" :key="index" :size="btn.size ? btn.size : 'mini'" icon="delete" @click="handleActionCommand(btn.click, scope, $event)" >删除</el-button>

              <el-button v-else-if="btn.type == 'download'" :type="btn.btn_type ? btn.btn_type : 'text'" :key="index" :size="btn.size ? btn.size : 'mini'" icon="share" @click="handleActionCommand(btn.click, scope, $event)" >下载</el-button>

              <el-button v-else-if="btn.type == 'view'" :type="btn.btn_type ? btn.btn_type : 'text'" :key="index" :size="btn.size ? btn.size : 'mini'" icon="view" @click="handleActionCommand(btn.click, scope, $event)" >查看</el-button>

              <el-button v-else :type="btn.btn_type ? btn.btn_type : ''" :key="index" :size="btn.size ? btn.size : 'mini'" :icon="btn.icon" @click="handleActionCommand(btn.click, scope, $event)">{{ btn.label }}</el-button>

            </template>
          </template>
        </el-table-column>
      </template>

    </template>
	</el-table>
  <!--v-if="totalNumber > pageSize"-->
	<el-pagination
    v-if="tableOption.is_pagination == undefined ? true : tableOption.is_search"
  	@current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  	:current-page.sync="page"
  	:page-size="pagesize"
    :page-sizes="pagesizes"
  	layout="total, sizes, prev, pager, next, jumper"
  	:total="totalNumber"
  >
  </el-pagination>
  </div>
</template>

<script>
import tableConst from '@/const/tableConst'
import AppDatePicker from '@/components/common/AppDatePicker'
const methods = Object.assign({}, tableConst.methods, {
  handelExport(func, e) {
    if(func) {
      func(e)
    }else {
      this.$message({message: '导出接口开发中', type: 'warning'})
    }
  },
  handleExpand (a, b) {
    const fun = this.tableOption.expandFun;
    if( fun ){
      fun(a, b);
    }
  },
  handleDelete (func, e) {
    if(func) {
      func(e)
    }else {
      const s = this.tableSelect;
      if(s.length == 0) {
        this.$message({message: '请选择需要删除的提案', type: 'warning'});
      }else {
        this.$confirm('删除后不可恢复，确认删除？')
          .then(_=>{
            const url = this.url;
            const data = { ids: this.$tool.splitObj(s, 'id') };
            const success = _=>{ this.update() };
            this.axiosDelete({ url, data, success });
          })
          .catch(_=>{console.log(_)});
      }     
    }
  },
  handleCommand (func, event) {
    if(func) {
      func(event);
    }
  },
  handleActionCommand (func, scope, event) {
    if(func) {
      func(scope.row, event);
    }
  },
  arrayRender (row, col) {
    const arr = row[col.prop];
    return col.render ? col.render(arr) : arr;
  },  
  handleCurrentChange (currentPage) {
    const func = this.tableOption.currentChange;
    if(func) {
      func(currentPage);
    }

    this.update();
  },
  handleSizeChange (size) {
    this.$store.commit('setPageSize', size);
    const func = this.tableOption.sizeChange;
    if(func) {
      func(size);
    }

    this.reset();
  },
  handleSortChange ({column, prop, order}) {
    this.sort.field = prop;
    this.sort.order = order;
    const func = this.tableOption.sortChange;
    if(func) {
      func(column, prop, order);
    }

    this.reset();
  },
  handleSearch () {
    const func = this.tableOption.handleSearch;
    if(func && this.search_value) {
      func(this.search_value);
    }

    this.reset();
  },
  timeSearch ({search}) {
    if(search) {
      search();
    }

    this.reset()
  },
  timeClear ({clear}) {
    if(clear) {
      clear();
    }

    this.date = [];
    this.reset();
  },
  getRequestOption () {
    const copy = this.$tool.deepCopy(this.requesOption);
    return copy;
  },
  getSelect () {
    const s = this.tableSelect;
    if(s.length == 0) {
      this.$message({ message: '请至少选择一项！', type: 'warning' })
    }else {
      return s;
    }
  },
  update () {
    this.$emit('refreshTableData', this.getRequestOption() );
  },
  reset () {
    this.page = 1;
    this.update();
  },
  refresh () {
    this.page = 1;
    this.search_value = "";
    this.update();
  },
  handleControlChange () {
    const name = this.tableOption.name;
    const value = JSON.stringify(this. tableControl);
    this.$tool.setCookie(name, value);
  }
});
export default {
  name: 'tableComponent',
  methods,
  props: ['tableOption', 'data', 'tableStyle'],
  computed: {
    tableData () {
      const d = this.data;
      return d ? d.data : []; 
    },
    totalNumber () {
      const d = this.data;
      return d && d.total ? d.total : 0;
    },
    requesOption () {
      const obj = {
        page: this.page,
        listRows: this.pagesize,
      };

      if(this.search_value) {
        obj.keyword = this.search_value;
      }

      if(this.sort.field) {
        const field = this.sort.field;
        const order = this.sort.order == 'descending' ? 'desc' : 'asc';
        obj.sort = `${field}-${order}`;
      }

      return obj;
    },
    pagesize () {
      return this.$store.getters.pagesize;
    },
    url () {
      return tableOption.url ? tableOption.url : '';
    }
  },
  watch: {
    'requesOption': {
      handler: function () {  },
      deep: true,
    }
  },
  data () {

    const d = this;
    const cols = d.tableOption.columns;
    let tableControl = [];
    const cookieControl = this.$tool.getCookie(this.tableOption.name);
    if(cookieControl) {
      tableControl = JSON.parse(cookieControl);
    }else {
      for (let c of d.tableOption.columns) {
        let show = c.show == undefined ? true : c.show;
        let type = c.type;
        let label = c.label;
        tableControl.push({show, type, label});
      }
    }


    const data = {
      tableControl,
      expands: [],
      getRowKeys (row) {
        return row.id;
      },
      searchClass: 'table-search',
      date: [],
      search_value: '',
      page: 1,
      sort: {field: null, order: null},
    };

    return Object.assign({}, tableConst.data, data);
  },
  components: {
    'TableRender': {
      render: function(h) {
        return this.render(h, this.scope.row[this.prop], this.scope.row, this.prop);
      },
      props: {
        'render': null, 
        'scope': null, 
        'prop': {
          type: String,
          default: '',        
        }
      },
    },
    AppDatePicker,
  },
  mounted () {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.table-header i.el-icon-menu {
  font-size: 13px;
}
/*.el-table__expand-column {
  display: none;
}*/
/*.hjg-table {
  -moz-user-select:none; 
  -webkit-user-select:none; 
  -ms-user-select:none; 
  -khtml-user-select:none; 
  user-select:none;
}*/
/*.table-header-btn {
  margin: 0;
  margin-right: 10px;
}*/
</style>
<style scoped lang="scss">

.el-button+.el-dropdown {
  margin-left: 10px;
}
.el-dropdown+.el-button {
  margin-left: 10px;
}
.el-dropdown+.el-dropdown {
  margin-left: 10px;
}
</style>