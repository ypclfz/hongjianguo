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
                <el-checkbox :label="col.label" v-model="col.show"></el-checkbox>
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
              <el-dropdown-item v-for="(item,index) in btn.items" :key="index" :divided="item.divided"><div @click="handleCommand(item.click, $event)" style="margin: 0 -20px; padding: 0 20px;">{{ item.text }}</div></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template v-else-if="btn.type == 'date'">
          <div style="display: inline-block; margin-left: 10px;">
            <app-date-picker size='mini' v-model="date"></app-date-picker>
            <el-button size="mini" @click="btn.search(date[0],date[1])">搜索</el-button>
            <el-button size="mini" @click="timeClear(btn)" style="margin: 0px;">清空</el-button>
          </div>
        </template>

        <template v-else-if="btn.type == 'add'">
          <el-button class="table-header-btn" type="primary" icon="plus" @click="handleCommand(btn.click, $event)">添加</el-button>
        </template>

        <template v-else-if="btn.type == 'delete'">
          <el-button class="table-header-btn" type="primary" icon="delete" @click="handleCommand(btn.click, $event)">删除</el-button>
        </template>

        <template v-else-if="btn.type == 'filter'">
          <el-button class="table-header-btn" type="primary" icon="document" @click="handleCommand(btn.click, $event)">筛选</el-button>
        </template>

      </template>

	  	<el-input
        v-model="search_value"
        placeholder="搜索..."
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
    border 
    @selection-change="handleselectionChange" 
    :row-key="getRowKeys" 
    :default-sort="tableOption.default_sort ? tableOption.default_sort : {}"
    @sort-change="handleSortChange"
    :expand-row-keys="expands"
    @expand="handleExpand"
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
          <el-table-column :label="col.label" :prop="col.prop" v-if="tableControl[index]['show']" :sortable="col.sortable ? 'custom' : false" >
            <template scope="scope">
              <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column :label="col.label" :prop="col.prop" v-if="tableControl[index]['show']" :sortable="col.sortable ? 'custom' : false">
          </el-table-column>
        </template>
      </template>
      
      <template v-else-if="col.type == 'array'">
        <el-table-column :label="col.label" :prop="col.prop" v-if="tableControl[index]['show']">
          <template scope="scope">
            <el-tag v-for="(item, i) in arrayRender(scope['row'],col)" style="margin-left: 5px;" close-transition :key="i">{{ item }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <template v-else-if="col.type == 'action'">
        <el-table-column :label="col.label ? col.label : '操作'" align="center" :width="col.width">
          <template scope="scope">
            <template v-if="col.btns_render != undefined ? true : false">
              <slot :name="col.btns_render" :row="scope.row">
              </slot>
            </template>
            <template v-else v-for="(btn, index) in col.btns">

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
  handleExpand (a, b) {
    const fun = this.tableOption.expandFun;
    if( fun ){
      fun(a, b);
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

    this.$emit('refreshTableData', this.getRequestOption() );
  },
  handleSizeChange (size) {
    this.pagesize = size;
    const func = this.tableOption.sizeChange;
    if(func) {
      func(size);
    }

    this.$emit('refreshTableData', this.getRequestOption() );
  },
  handleSortChange ({column, prop, order}) {
    this.sort.field = prop;
    this.sort.order = order;
    const func = this.tableOption.sortChange;
    if(func) {
      func(column, prop, order);
    }

    this.$emit('refreshTableData', this.getRequestOption() );
  },
  handleSearch () {
    const func = this.tableOption.handleSearch;
    if(func && this.search_value) {
      func(this.search_value);
    }

    this.$emit('refreshTableData', this.getRequestOption() );
  },
  timeClear (btn) {

    this.date.splice(0,2);
    btn.clear();
  },
  reset () {
    this.page = 1;
    this.search_value = "";
  },
  refresh () {
    this.page = 1;
    this.search_value = "";
    this.$emit('refreshTableData', this.getRequestOption() );
  },
  getRequestOption () {
    const copy = this.$tool.deepCopy(this.requesOption);
    return copy;
  }
});
export default {
  name: 'table-component',
  methods,
  created() {
    const d = this;

    d.totalNumber = d.tableData.length;
    d.pageData = d.getPageData(d.currentPage);
  },
  props: ['tableOption', 'data'],
  computed: {
    tableData () {
      const d= this;
      return d.data ? d.data : []; 
    },
    totalNumber () {
      const d = this;
      return d.data ? d.data.length : [];
    },
    requesOption () {
      const obj = {
        page: this.page,
        pagesize: this.pagesize,
      };

      if(this.search_value) {
        obj.keyword = this.search_value;
      }

      if(this.sort.field) {
        obj.sort = this.sort;
        obj.sort = { field: this.sort.field, order: this.sort.order == 'descending' ? 'desc' : 'asc' };
      }

      return obj;
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
    const tableControl = [];

    for (let c of d.tableOption.columns) {

      let show = c.show == undefined ? true : c.show;
      let type = c.type;
      let label = c.label;
      tableControl.push({show, type, label});
    }

    const data = {
      tableControl,
      expands: [],
      getRowKeys (row) {
        return row.id;
      },
      searchClass: 'table-search',
      date: ['',''],
      search_value: '',
      page: 1,
      pagesize: 5,
      sort: {field: null, order: null},
    };

    return Object.assign({}, tableConst.data, data);
  },
  components: {
    'TableRender': {
      render: function(h) {
        return this.render(h, this.scope.row[this.prop], this.scope.row, this.prop);
      },
      props: ['render', 'scope', 'prop'],
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
.hjg-table {
  -moz-user-select:none; /*火狐*/
  -webkit-user-select:none; /*webkit浏览器*/
  -ms-user-select:none; /*IE10*/
  -khtml-user-select:none; /*早期浏览器*/
  user-select:none;
}
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