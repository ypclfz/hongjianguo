# 1、新增费用
requestUrl:http://www.zhiq.wang/fees;
method：POST;
request {
    debit:"费用类型",//0-应付 1-应收
	project_id:"对应的案件ID",
	target_id:"费用对象",//通过/members接口，附加listOnly=1参数
	code:"费用代码",//通过/feeCodes接口查询获取
	status:"费用状态",//0-未付款 1-请款单 2-付款单 10-年费监控中 11-年费评估单 12-经评估确认不再缴纳 100-已付款
	amount:"费用金额",//浮点类型
	currency:"货币类型",//选项定义如下：[{label:"人民币[CNY]",value:"CNY"},{label:"美元[USD]",value:"USD"},{label:"欧元[EUR]",value:"EUR"},{label:"日元[JPY]",value:"JPY"},{label:"韩元[KRW]",value:"KRW"},{label:"港币[HKD]",value:"HKD"},{label:"新台币[NTD]",value:"NTD"},{label:"英磅[GBP]",value:"GBP"},{label:"德国马克[DEM]",value:"DEM"},{label:"瑞士法郎[CNY]",value:"CHF"},{label:"加拿大元[CAD]",value:"CAD"},{label:"澳大利亚元[AUD]",value:"AUD"},{label:"新西兰元[NZD]",value:"NZD"}],其余后续增加
	roe:"执行汇率",//浮点类型
	due_time:"费用期限",//
	deadline:"官方绝限",
	pay_time:"支付时间",
	invoice_entity_id:"开票主体",//通过/invoiceEntities接口获取选项
    remark:"备注"
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新费用
requestUrl:http://www.zhiq.wang/fees/:id;  
method：PUT;
request {
    type:"费用类型",//0-应付 1-应收
	project_id:"对应的案件ID",
	target_id:"费用对象",//通过/members接口，附加listOnly=1参数
	code:"费用ID",//通过/feeCodes接口查询获取
	status:"费用状态",//0-未付款 1-请款单 2-付款单 3-等待客户支付相对费用 10-年费监控中 11-经评估确认不再缴纳 100-已付款
	amount:"费用金额",//浮点类型
	currency:"货币类型",//选项定义如下：[{label:"人民币[CNY]",value:"CNY"},{label:"美元[USD]",value:"USD"},{label:"欧元[EUR]",value:"EUR"},{label:"日元[JPY]",value:"JPY"},{label:"韩元[KRW]",value:"KRW"},{label:"港币[HKD]",value:"HKD"},{label:"新台币[NTD]",value:"NTD"},{label:"英磅[GBP]",value:"GBP"},{label:"德国马克[DEM]",value:"DEM"},{label:"瑞士法郎[CNY]",value:"CHF"},{label:"加拿大元[CAD]",value:"CAD"},{label:"澳大利亚元[AUD]",value:"AUD"},{label:"新西兰元[NZD]",value:"NZD"}],其余后续增加
	roe:"执行汇率",//浮点类型
	due_time:"费用期限",//
	deadline:"官方绝限",
	pay_time:"支付时间",
    remark:"备注"
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、费用详情
requestUrl:http://www.zhiq.wang/fees/:id;  
method：GET;
reponse {

    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    amount:{ //status为1时才出现
		id:"费用ID",
		serial:"案号",
		category:"案件类型",
		patent_type:"专利类型",
		title:"案件名称",
		apn:"申请号",
		apd:"申请日",
		area:"地区",
		mail_date:"发文日",
		create_time:"创建日期",
		due_time:"费用期限",
		deadline:"官方绝限",
		pay_time:"款款时间",
		target:"费用对象",
		name:"费用名称",
		type_name:"费用类型",
		amount:"金额",
		roe:"汇率",
		currency:"货币",
		rmb:"人民币",
		status_name:"状态",
		invoice_id:"请款单ID",
		invoice_remark:"请款单备注",
		invoice_title:"发票抬头",
		tax_payer_identifier:"纳税人识别号",
		remark:"费用备注"
    }
}
						
# 4、删除费用
requestUrl:http://www.zhiq.wang/fees/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、费用列表
requestUrl:http://www.zhiq.wang/fees;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//费用状态，0-未付款 1-请款单 2-付款单  10-年费监控中 11-经评估确认不再缴纳 100-已付款
    /* 通用参数结束 */
	
	debit:"收入/支出类型",//1收入 0 支出

    id:"费用ID",//多个用逗号隔开
	target:"费用对象ID",//多个用逗号隔开
	code:"费用代码",//多个用逗号隔开
	mail_date:"通知书发文日",//多个用逗号隔开2017-08-01|2017-08-31
    create_time:"费用生成日期",//
	due_time:"费用期限",//
	deadline:"官方绝限",//或者直接采用过滤器的id:thisweek/lastweek/thismonth/lastmonth/earlier
	pay_time:"付款时间",//

    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：标题、案号、申请号、公开号、公告号
	
    sort:"field-order",//field表示字段，取值为id/status/title/abstract/proposer/classification/remark/create_time/apn/apd/public_date/public_number/issue_date/issue_number/progress/branch/ipr/agency/agent/agencey_serial order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    fees:{
        id:"费用ID",
		serial:"案号",
		category:"案件类型",
		patent_type:"专利类型",
		title:"案件名称",
		apn:"申请号",
		apd:"申请日",
		area:"地区",
		mail_date:"发文日",
		create_time:"创建日期",
		due_time:"费用期限",
		deadline:"官方绝限",
		pay_time:"款款时间",
		target:"费用对象",
		name:"费用名称",
		type_name:"费用类型",
		amount:"金额",
		roe:"汇率",
		currency:"货币",
		rmb:"人民币",
		status_name:"状态",
		invoice_id:"请款单ID",
		invoice_remark:"请款单备注",
		invoice_title:"发票抬头",
		tax_payer_identifier:"纳税人识别号",
		remark:"费用备注"		
    }
}

# 6、获取开票主体
requestUrl:http://www.zhiq.wang/invoiceEntities
method：GET;
response:{
	status:1,
    info:"信息提示",
	entities:[{
		label:"标签",
		value:"值"
	}]
}

# 7、获取费用代码
requestUrl:http://www.zhiq.wang/feeCodes
method：GET;
request {
    debit:"收入/支出类型",
	project_id:"用户选择的关联案件ID",
}
response:{
	status:1,
    info:"信息提示",
	entities:[{
		label:"标签",
		value:"值",
		amount:"费用的默认金额"
	}]
}
