<template>
  <div class="hjg-table">
    
  	<div class="table-header" v-if="tableOption.is_header === undefined ? true : tableOption.is_header">
      <el-popover
        placement="right"
        width="800"
        trigger="click"
        v-model="filterVisible"
        :open-delay="300"
        v-if="tableOption.is_filter ? true : false"
      >
        <app-filter :data="filters" v-if="tableOption.is_filter === undefined ? true : tableOption.is_filter"></app-filter>
        <el-button slot="reference" type="primary" style="margin-right: 5px;">快速筛选</el-button>
      </el-popover>

      <template v-for="btn in tableOption.header_btn">
        
        <template v-if="btn.type == 'custom'">
          <el-button class="table-header-btn" type="primary" :icon="btn.icon ? btn.icon : ''" @click="handleCommand(btn.click, $event)">{{ btn.label }}</el-button>
        </template>

        <template v-else-if="btn.type == 'control'">
          <el-dropdown trigger="click" :hide-on-click="false" menu-align="start" >
            <el-button class="table-header-btn" type="primary" :icon="btn.icon ? btn.icon : 'menu'">
              {{ btn.label ? btn.label : '字段'}}<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" style="max-height: 500px; overflow-y: auto; overflow-x:  hidden;">
              <el-dropdown-item style="padding: 0 20px; line-height: 25px;" v-for="(col, index) in tableControl" :key="index" v-if="col.type != 'selection' && col.type != 'action' && col.type != 'expand' && col.show_option">
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
                <div @click="handleCommand(item.click, $event)" style="margin: 0 -20px; padding: 0 20px; font-size: 14px; line-height: 28px;" v-else><i v-if="!!item.icon" :class="`el-icon-${item.icon}`" style="margin-right: 5px; font-size: 12px; color: #8492A6;"></i>{{ item.text }}</div>
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
          <el-button class="table-header-btn" type="primary" icon="upload2" :loading="exportLoading" @click="handelExport(btn.click, $event)">{{ exportLoading ? '导出中...' : '导出' }}</el-button>
        </template>

        <template v-else-if="btn.type == 'import'">
          <el-button class="table-header-btn" type="primary" icon="document"  @click="handleImport(btn.click, $event)">导入</el-button>
        </template>

        <template v-else-if="btn.type == 'batch_upload'">
          <el-button class="table-header-btn" type="primary" icon="upload" @click="handleBatchUpload(btn.click, $event)">文件上传</el-button>
        </template>

      </template>
        
      <template v-if="tableOption.header_slot ? true : false">
        <slot v-for="item in tableOption.header_slot" :name="item"></slot>
      </template>
	  	<search-input
        v-model="search_value"
        placeholder="搜索..."
        style="width: 200px;"
        class="table-search"
        @click="handleSearch"
        @enter="handleSearch"
        v-if="tableOption.is_search == undefined ? true : tableOption.is_search"
	    ></search-input>
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
      :row-class-name="handleRowClassName"
      @row-click="handleRowClick"
      :highlight-current-row="tableOption.highlightCurrentRow !== undefined ? tableOption.highlightCurrentRow : false"
      :height="tableHeight"
      :class="tableOption.empty_text_position == 'topLeft' ? 'empty-top-left' : ''"
      ref="table"
    >
      <template v-for="(col, index) in tableOption.columns">
        
        <template v-if="col.type == 'selection'">
          <el-table-column type="selection" :fixed="col.fixed === false ? false : 'left'"></el-table-column>
        </template>

<!--         <template v-else-if="col.type == 'expand'">
          <el-table-column type="expand">
            <template scope="scope">
              <slot name="expand" :row="scope.row">
              </slot>
            </template>
          </el-table-column>
        </template> -->

        <template v-else-if="col.type == 'text' && tableControl[index]['show']" >
          
          <template v-if="col.render ? true : false">
            <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" :sortable="col.sortable ? 'custom' : false" :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true">
              <template slot-scope="scope">
                <table-render :render="col.render" :scope="scope" :prop="col.prop"></table-render>
              </template>
            </el-table-column>
          </template>

          <template v-else-if="col.render_simple ? true : false ">
            <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" :sortable="col.sortable ? 'custom' : false" :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true">
              <template slot-scope="scope">
                <span class="table-column-render">{{ scope.row[col.prop][col.render_simple] }}</span>
              </template>
            </el-table-column>
          </template>

          <template v-else>
            <el-table-column :label="col.label" :prop="col.prop" :width="col.width ? col.width : ''" :sortable="col.sortable ? 'custom' : false" :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true">
              <!-- <template v-if="col.default !== undefined" scope="scope">{{ scope.row[col.prop] ? scope.row[col.prop] : col.default }}</template> -->
            </el-table-column>
          </template>

        </template>

        <template v-else-if="col.type == 'date'">
          <el-table-column :label="col.label" :prop="col.prop" v-if="tableControl[index]['show']">
          </el-table-column>
        </template>

        <template v-else-if="col.type == 'array'">
          <el-table-column :label="col.label" :prop="col.render ? `${col.prop}__render` : col.prop" :width="col.width ? col.width : ''" v-if="tableControl[index]['show']" :sortable="col.sortable ? 'custom' : false" :show-overflow-tooltip="col.overflow !== undefined ? col.overflow : true">
            <template slot-scope="scope">

              <el-tag v-for="(item, i) in scope.row[scope.column.property]" style="margin-left: 5px;" close-transition :key="i">{{ item }}</el-tag>

            </template>
          </el-table-column>
        </template>

        <template v-else-if="col.type == 'action'">
          <el-table-column :label="col.label ? col.label : '操作'" :align="col.align ? col.align : 'left'" :width="col.width ? col.width : ''" :min-width="col.min_width ? col.min_width : ''" header-align="center" :fixed="col.fixed === false ? false : 'right'">
            <template slot-scope="scope">
              <template v-if="col.btns_render ? true : false">
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
      v-if="tableOption.is_pagination == undefined ? true : tableOption.is_pagination"
    	@current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    	:current-page.sync="page"
    	:page-size="pagesize"
      :page-sizes="pagesizes"
    	layout="sizes, prev, pager, next, jumper, total"
    	:total="totalNumber"
    >
    </el-pagination>
  
    
      <app-import v-if="tableOption.import_type !== undefined" :visible.sync="dialogImportVisible" :columns="import_columns" :type="tableOption.import_type" @import-success="handleImportSuccess"></app-import>
    

    <file-upload v-if="tableOption.upload_type !== undefined" :type="tableOption.upload_type" @upload-success="refresh" ref="file_upload"></file-upload>
  </div>
</template>

<script>
import tableConst from '@/const/tableConst'
import AppDatePicker from '@/components/common/AppDatePicker'
import AxiosMixins from '@/mixins/axios-mixins'
import AppFilter from '@/components/common/AppFilter'
import AppImport from '@/components/common/AppImport'
import FileUpload from '@/components/common/FileUpload'
import SearchInput from '@/components/common/SearchInput'
import { mapGetters } from 'vuex'
const methods = Object.assign({}, tableConst.methods, {
  handleRowClick (a,b,c) {
    // if(c.fixed) return false;
    b.stopPropagation();

    if(c.type == 'selection') return false;
    
    const func = this.tableOption.rowClick;
    if(func) func(a,b,c);
  },
  handelExport(func, e) {
    const fields = this.tableControl.filter(_=>{
      if(_.show && _.prop) {
        return true;  
      }
    }).map(_=>_.prop);

    if(func) {
      func(e)
    }else {
      
      this.$emit('refreshTableData', Object.assign({}, this.getRequestOption(), {format: 'excel'}, {'fields': JSON.stringify(fields) } ) );
      
      this.$nextTick(_=>{
        if(this.refreshProxy) {
          this.exportLoading = true;
          this.refreshProxy.then(
            _=>{
              window.setTimeout(_=>{this.exportLoading = false;}, 500);
            }
          );  
        }
      })
      
      
      // if(a) { a.then(_=>{console.log('exportExcess')}) };
    }
  },
  handleImport(func, e) {
    if(func) {
      func(e)
    }else {
      // this.$message({message: '导入接口开发中', type: 'warning'})
      this.dialogImportVisible = true;
    }
  },
  handleBatchUpload(func, e) {
    if(func) {
      func(e)
    }else {
      this.$refs.file_upload.show();
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
        this.$message({message: '请选择需要删除的列表项', type: 'warning'});
      }else {
        this.$confirm('删除后不可恢复，确认删除？', '删除确认', {type: 'warning'})
          .then(_=>{
            const url = this.url;
            const data = { id: this.$tool.splitObj(s, 'id') };
            const success = _=>{ 
              this.$message({type: 'success', message: '批量删除成功'});
              this.update() 
            };
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
    event.stopPropagation();
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
  getSelect (flag=false) {
    const s = this.tableSelect;
    
    if(!flag) {
      if(s.length == 0) {
        this.$message({ message: '请至少选择一项！', type: 'warning' });
        return false;
      }  
    }

    return s;
  },
  update () {
    this.$emit('refreshTableData', Object.assign({}, this.getRequestOption(), this.screen_obj) );
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
    const value = JSON.stringify(this.tableControl);
    this.$tool.setLocal(name, value);
  },
  handleRowClassName (row, index) {

    const func = this.tableOption.row_class;
    if(func) {
      return func(row, index);
    }else {
      return '';
    }
  },
  handleImportSuccess () {
    this.$message({message: '导入成功', type: 'success'});
    this.dialogImportVisible = false;
    this.refresh();
  },
  setCurrentRow (row) {
    this.$refs.table.setCurrentRow(row);
  }
});
export default {
  name: 'tableComponent',
  methods,
  mixins: [ AxiosMixins ],
  props: ['tableOption', 'data', 'tableStyle', 'refreshProxy'],
  computed: {
    ...mapGetters([
      'screen_obj',
      'innerHeight',
      'pagesize',
    ]),
    tableData () {
      const d = this.data;
      let r;
      
      if(d instanceof Array) {
        r = d;
      }else {
        r = d.data ? d.data : [];
      }

      //这里对得到的数据进行一些额外的处理,element-ui中难以操控:
      
      //  .暂时将array类型的render处理放到这里,因为如果放到v-for里面会被多次重复执行
      this.tableOption.columns.forEach(_=>{
        if(_.type == 'array' && _.render) {
          r.forEach(d_c=>{
            const p = _.prop;
            d_c[`${p}__render`] = _.render(d_c[p]);
          })
        }
      })
      
      return r;
    },
    totalNumber () {
      const d = this.data;
      if(d instanceof Array) {
        return d.length;
      }else {
        return d.total ? d.total : 0;  
      }
    },
    filters () {
      const d = this.data;
      let filter = [];
      
      if(d && d.filters) {
        filter = d.filters;
      }

      return filter;
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
    url () {
      return this.tableOption.url ? this.tableOption.url : '';
    },
    import_if () {
      const h = this.tableOption.header_btn;
      let flag = false;
      if(h) {
        h.forEach(_=>{ if(_.type == 'import' && _.click == undefined) flag = true })
      }

      return flag;
    },
    import_columns () {
      const c =this.tableOption.columns;
      const a = c.filter(_=>_.is_import);
      if(this.tableOption.import_columns) {
        a.push(...this.tableOption.import_columns);
      }

      return a;
    },
    tableHeight () {
      let height = '';
      const hk = this.tableOption.height;

      if(hk !== undefined) {
        if(hk == 'default') {
          height = this.innerHeight - 200;
          height = height < 300 ? 300 : height;
        }else if(hk == 'default2') {
          height = this.innerHeight - 150;
          height = height < 300 ? 300 : height;
        }else if(hk === 'default3') {
          height = this.innerHeight - 100;
          height = height < 300 ? 300 : height;
        }else if(hk === 'default4') {
          height = this.innerHeight - 55;
          height = height < 300 ? 300 : height;
        }else {
          height = hk;
        }
      }

      return height;
    }
  },
  watch: {
    'requesOption': {
      handler: function () {  },
      deep: true,
    },
    screen_obj (val) {
      this.filterVisible = false;
      this.refresh();    
    }
  },
  data () {

    const d = this;
    const cols = d.tableOption.columns;
    
    //获得有配置数据得到的控制器
    let tableControl = [];
    for (let c of d.tableOption.columns) {
      let show = c.show == undefined ? true : c.show;
      let type = c.type;
      let label = c.label;
      let show_option = c.show_option !== undefined ? c.show_option : true;
      let prop = c.prop !== undefined ? c.prop : '';
      tableControl.push({show, type, label, show_option, prop});        
    }
    //或得本地缓存的控制器
    const cookieControl = JSON.parse(this.$tool.getLocal(this.tableOption.name));
    
    //当存在本地缓存时
    //对两个控制器进行比对(主要针对代码修改阶段,字段不稳定)
    if(cookieControl) {
      const r = (_=>{
        let i = tableControl.length;
        
        while(i--) {
          if( !cookieControl[i] || tableControl[i]['prop'] != cookieControl[i]['prop'] ) {
            return false;
          }
        }

        return true;
      })();
      //比对结果成功时使用缓存值,否则清空已有的无效缓存
      console.log(r);
      if(r) {
        tableControl = cookieControl;
      }else {
        this.$tool.deleteLocal(this.tableOption.name);
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
      dialogImportVisible: false,
      filterVisible: false,
      exportLoading: false,
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
        'simple': {
          type: Boolean,
          default: false,
        },
        'prop': {
          type: String,
          default: '',        
        }
      },
    },
    AppDatePicker,
    AppFilter,
    AppImport,
    FileUpload,
    SearchInput,
  },
  mounted () {},
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