# 1、新增账单
requestUrl:http://www.zhiq.wang/invoices;
method：POST;
request {
    debit:"账单类型",//0-应付 1-应收，这个根据费用收入支出类型自动决定
    //新建账单的菜单包括：1、从选取费用新增，2、从所有查询结果新增
    scope:"数据范围",取值为all,selected,all对应菜单2 selected对应菜单1
    fees:[1,2],//费用ID数组（用户通过复选框选择），菜单1时必须传递
    与费用列表接口相同的参数，在scope=all时必须传递
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新账单
requestUrl:http://www.zhiq.wang/invoices/:id;  
method：PUT;
request {
    invoice_entity_id:"开票主体",//通过/invoiceEntities接口获取选项
    due_time:"账单期限",
    pay_time:"支付时间",
    company:"快递公司名称",//选项列出一些常见快递公司名称即可
    number:"快递单号",
    date:"快递寄送日期",
    remark:"备注"
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、向账单中增加费用
requestUrl:http://www.zhiq.wang/invoices/:id/fees;
method：PUT;
request {
    scope:"数据范围",取值为all,selected,all对应菜单2 selected对应菜单1
    fees:[1,2],//费用ID数组（用户通过复选框选择），或者将费用的筛选条件传入
    与费用列表接口相同的参数，在scope=all时必须传递
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 4、从账单中移除费用
requestUrl:http://www.zhiq.wang/invoices/:id/fees;
method：DELETE;
request {
    scope:"数据范围",取值为all,selected,all对应菜单2 selected对应菜单1
    fees:[1,2],//费用ID数组（用户通过复选框选择
	与费用列表接口相同的参数，在scope=all时必须传递
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 5、账单详情
requestUrl:http://www.zhiq.wang/invoices/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    invoice:{ //status为1时才出现
        id:"账单ID",
        target:"账单对象",
        create_time:"创建时间",
        due_time:"付款期限",
        deadline:"付款绝限",
        pay_time:"付款时间",
        amount:"金额",
        currency:"货币",
        roe:"汇率",
        rmb:"人民币金额",
        status:"状态",
        remark:"备注",
        debit:"收入/支出类型",
        invoice_no:"发票号码",
        invoice_date:"开票日期",
        express_company:"快递公司",
        express_number:"快递单号",
        express_date:"快递日",
        creator_name:"创建人",
        invoice_title:"发票抬头",
        tax_payer_identifier:"纳税人识别号",
        account:"银行账号",
        bank:"开户行",
        address:"地址",
        telphone:"电话",
    }
}
						
# 6、删除账单
requestUrl:http://www.zhiq.wang/invoices/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 7、账单列表
requestUrl:http://www.zhiq.wang/invoices;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//账单状态，0-未付款 1-已付款
	debit:"收入支出类型",1收入0支出
    ids:"账单ID,多个用逗号隔开",
    target:"账单对象ID",//多个用逗号隔开，选项通过/members?role=10获取
	invoice_no:"发票号码",//多个用逗号隔开
    create_time:"账单生成日期",//
	due_time:"账单期限",//或者直接采用过滤器的id:expired/thisweek/nextweek/thismonth/nextmonth/later
	deadline:"官方绝限",//
	pay_time:"付款时间",//

    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：标题、案号、申请号、公开号、公告号
	
    sort:"field-order",//field表示字段，取值为'id','target','create_time','due_time','deadline','pay_time','amount','currency','roe','rmb','status','remark','debit','invoice_no','invoice_date','express_company','express_number','express_date','creator_name','invoice_title','tax_payer_identifier','account','bank','address','telphone' order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    invoices:{
        current_page:"1",//当前页码
		last_page:"2",//最后页码
		per_page:"20",//每页数量 
		total:"记录总数",
		sum_allpage:"所有页总金额",
		sum_curpage:"当前页总金额",
		data:[{
			id:"账单ID",
			target:"账单对象",
			create_time:"创建时间",
			due_time:"付款期限",
			deadline:"付款绝限",
			pay_time:"付款时间",
			amount:"金额",
			currency:"货币",
			roe:"汇率",
			rmb:"人民币金额",
			status:"状态",
			remark:"备注",
			debit:"收入/支出类型",
			invoice_no:"发票号码",
			invoice_date:"开票日期",
			express_company:"快递公司",
			express_number:"快递单号",
			express_date:"快递日",
			creator_name:"创建人",
			invoice_title:"发票抬头",
			tax_payer_identifier:"纳税人识别号",
			account:"银行账号",
			bank:"开户行",
			address:"地址",
			telphone:"电话",
		}],
		filters:{
			duetime:[{
				name:"名称",
				count:"数量",
				id:"id"
			}],
			targets:[{
				name:"名称",
				count:"数量",
				id:"id"
			}]
		}
    }
}
