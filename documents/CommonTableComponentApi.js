//**************************
//    TableComponent       *
//**************************

//<table-component
//	:tableOption="tableOption"
//	:data="data"
//	:tableStyle="tableStyle"
//	@refreshTableData="refreshTableData"
//>
//  <div slot="headerselect"></div>
//</table-component>

//  data 表示当前table的绑定数据
//  tableStype 可以传入自定义的表格样式
//  refreshTableData 当调用表格的refresh方法时 会自动调用refreshTableData 里面写入与后台交互的逻辑
//	tableOption(示例)
tableOption = {
  'name': 'proposalList',//每个表格的名字,唯一标识 	type:string

  'url': URL,//一些内部发送请求的按钮的发送地址,如delete type:string

  'height': 'default',//这个地方输入表格高度,内置有'default', 'default2', 'default3', 'default4' type: string|number
  
  'highlightCurrentRow': true, //高亮显示当前选中Table 默认为false type: boolean
  
  'rowClick': function (row) {}, //行点击事件 type: Function, row代表当前行数据 
  
  'is_filter': true,//是否需要快速筛选,这个需要后端返回的table数据,包含filters,才能起效 默认为false type:boolean

  'is_header': true, //是否显示表头,默认为true type: boolean
  
  'is_search': true, //是否显示搜索框 默认为true type: boolean (is_header将覆盖掉这个属性) 

  'is_border': true, //是否显示表格中竖线,若不显示,无法调整表格宽度 默认为true type: boolean

  'is_pagination': true,//是否显示分页 默认为true type: boolean

  //header_btn表头按钮配置, type: Array
  'header_btn': [
    { type: 'add', click: this.add },
    //按钮字段包括type, label, icon, click
    //type样式类型大致包括: 'add', 'delete', 'export', 'import', 'batch_upload', 'control', 'custom'
    //其中除去'add', 'custome' 都拥有默认的点击事件

    { type: 'delete' }, 
    { type: 'export' },
    { type: 'import' },
    { type: 'batch_upload' },
    { type: 'control' },
  ],
  
  'import_type': 'patent', // 'import',当在header_btn使用默认的导入按钮的时候,传递导入类型或者配置数据 type: string | Object

 	//  {
	// 		action: 'getPatents',
 	//    title: '导入专利',
	// 		url: '/api/patents/import',
	// 		category: 1,
 	//    model: '/static/templates/patent_batch_template.xlsx',
 	//    model_name: '专利导入模板',
	// }
  
  'upload_type': 'patent', //''batch_upload',当在header_btn使用默认的文件上传按钮的时候,传递上传类型或者配置数据 type: string | Object

 	// {
	// 		action: 'getPatentDocuments',
	// 		url: '/patents/documents',
	// 		type: 'patent',
	// }
  
  'header_slot': [ 'headerselect' ], //自定义多个表头组件, type: Array
  
  //columns配置表格行 type: Array
	'columns': [

    { type: 'selection' },
    
    //type: 分为selection, text, array, action
    { 
    	type: 'text', 
    	label: '专利类型',//表头名 
    	prop: 'type',//返回数据关键字,对应后台接口
    	render_simple: 'name',//当后台数据返回得是对象的时候,渲染对象下面某一个字段, {id: 1, name: '类型'}
    	
    	render: function(h, text, row, prop) { //text代表当前需要渲染的数据,row代表行数据,
    		return h('span', text);
    	},//同vue的render函数用法相同,同样可使用JSX语法, 会覆盖掉render_simple

    	sortable: true,//是否可排序 默认为false

    	is_import: true,//是否包含在导入列表中, 默认为false

    	width: '142',//宽度
    },
   
    {
      type: 'array',
      label: '申请人',
      prop: 'applicants',
      width: '300',
      is_import: true,
      render: _=>{
        return _.map(_=>_.name);
      }//array 类型只渲染['a','b','c']类型的数组, 如果后台返回数据不符合, 使用render进行处理
    },
    {
      type: 'action',
      width: '145',
      label: '操作', //默认显示为操作,可不填
      btns: [ //当前按钮数组, type: array
        { 
        	//默认样式类型： edit delete view download dropdown, 可以不设置类型并自定义
         	type: 'delete', 
        	click: function(row, $event) {}
        },
        {
        	btn_type: '',//使用element-ui button组件 type 关键字
        	size: '',
        	icon: '',
        	label: '',
        	click: function(row, $event) {},
        }
      ], 
    },
  ]  
},
