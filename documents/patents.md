# 1、新增专利
(is_utility:"是否同时申请实用新型",//该选项在area=CN,type=1时才出现；
is_pre_public:"是否请求提前公开",//该选项在area=CN,type=1时才出现；
is_exam_request:"是否同时提出实审请求",//该选项在area=CN,type=1时才出现；
is_secure_check:"是否同时提出保密审查请求",//该选项在area=CN,type=1/2时才出现；)

requestUrl:http://www.zhiq.wang/patents;  
method：POST;  
request {
			
	R#title:"案件名称",
	abstract:"案件摘要",
	proposals:[1,2],//提案ID
	R#area:["CN","US"],//申请地区
	R#type:"案件类型",// 1发明专利 2 实用新型 3 外观设计
	extension: ['is_utility', 'is_pre_public'],
	remark:"备注",
	R#attachments:[1,2],//附件ID数组
	
	R#ipr_id:"IPR ID"
	R#applicants:[1,2],//申请人ID数组
	R#inventors:[{id:1,share:50}],//发明人ID数组
	project_id:"项目ID",
	products:[1,2],//产品ID数组
	classification_id:"分类ID",
	tags:["标签1"],//标签数组
	
	priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],//优先权信息
	relative_projects:[{
		id:"相关案件ID",
		type:"相关类型",//下拉菜单  1要求优先权 2 分案申请 3部分连续案 6要求同日送件
	}],
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新专利
requestUrl:http://www.zhiq.wang/patents/:id;  
method：PUT;  
request {
    title:"案件名称",
	abstract:"案件摘要",
	area:["CN","US"],//申请地区
	type:"案件类型",// 1发明专利 2 实用新型 3 外观设计 
	products:[1,2],//产品ID数组
	classification:"分类ID",
	tags:["标签1"],//标签数组
	project_id:"项目ID",
	
	is_pct:"是否是PCT"// 0否 1是
	is_utility:"是否同时申请实用新型",//该选项在area=CN,type=1时才出现；
	is_pre_public:"是否请求提前公开",//该选项在area=CN,type=1时才出现；
	is_exam_request:"是否同时提出实审请求",//该选项在area=CN,type=1时才出现；
	is_secure_check:"是否同时提出保密审查请求",//该选项在area=CN,type=1/2时才出现；
	
	ipr:"IPR ID"
	applicants:[1,2],//申请人ID数组
	inventors:[1,2],//发明人ID数组
	attachments:[1,2],//附件ID数组
	
	priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],//优先权信息
	relative_projects:[{
		id:"相关案件ID",
		type:"相关类型",//下拉菜单  1要求优先权 2 分案申请 3部分连续案 6要求同日送件
	}],
	remark:"备注",
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、专利详情
requestUrl:http://www.zhiq.wang/patents/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    patent:{ //status为1时才出现
		id:"专利ID",//不需要要显示
		serial:"案号",
		type:"专利类型",
		area:"CN",
		title:"标题",
		abstract:"摘要",
		apd:"申请日",
		apn:"申请号",
		public_date:"公开日",
		public_number:"公开日",
		pre_exam_ok_date:"初审合格日",
		sub_exam_start_date:"进入实审日",
		issue_date:"公告日",
		issue_number:"公告号",
		
		ipr:{id: 2, name: "Shawn", mobile: "18098976299", email: "shawn@iwdoing.com"},
		agency:"代理机构名称"
		agency_serial:"代理机构案号",
		
		main_ipc:"主国际分类号",
		pct_apd:"国际申请日",
		pct_no:"国际申请号",
		pct_priority_date:"国际优先权日",
		pct_public_date:"国际公开日",
		pct_public_language:"国际公开语言",
		pct_public_no:"国际公开号",
		board_number:"复审委内编号",
		is_biological:"是否与生物相关",
		is_division:"是否是分案申请",
		is_exam_request:"是否提出实质审查请求",
		is_genetic:"是否依赖于遗传资源",
		is_leakage:"是否不丧失新颖性公开",
		is_pre_public:"是否提前公开",
		is_priority:"是否要求优先权",
		is_secure_check:"是否保密审查",
		is_sequence:"是否有序列表",
		is_utility:"是否同日申请了同样的实用新型/发明",
		status:"状态",
		words:"说明书字数",
		remark:"备注",
		
		
		applicants:[
			{
				id:"1",//申请人ID
				area:"area",//地区代码
				type_text:"类型名称",
				name:"name",//申请人姓名
				ename:"ename",//英文姓名
				identity:"identity",//证件号码
				email:"email",//邮箱地址
				telephone:"telephone",//电话号码
				province_name:"省份名称",
				city_name:"城市名称",
				address:"address",//详细地址
				eaddress:"eaddress",//英文地址
				postcode:"postcode",//邮编
				status_name:"1",//提案状态，1-有效 0-禁用
				fee_discount_name:"费减备案状态"
			}
		],
		inventors:[
			{id: 1, citizenship: "CN", name: "韩易", email: "hanyi@iwdoing.com", mobile: "13510482996", share: 0,sort:1}
		],
		tags:['标签']
		attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}],
		branch:{id: 3, name: "测试部"},
		classification:{id: 1, name: "测试分类更新", description: "分类描述更新"}
		priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],
		products:[{id:"产品ID",name:"产品名称",description:"产品描述"}],
		proposer:{id: 1, name: "红坚果", mobile: "18098976299", email: "hongjianguo@hongjianguo.com"},
		relative_projects:[{
			id:"相关案件ID",
			serial:"相关案件案号",
			title:"相关案件标题",
			type:"相关类型",//下拉菜单  1 要求优先权 2 分案申请 3 部分连续案 6 要求同日送件
		}],
		fees:[{
			id:"费用ID",
			fee:"费用金额",
			fee_name:"费用名称",
			amount:"人民币金额"
			roe:"汇率",
			currency:"货币",
			create_time:"创建时间",
			pay_time:"支付时间",
			due_time:"费用期限",
			deadline:"法定期限",
			mail_date:"发文日",
			debit:"收入类型", //对应于该字段，需要在UI上显示一个图标，用以区分收入/支出类型
			debit_name:"收入类型",
			remark:"费用备注",
			type:"费用类型",//对应于该字段，需要在UI上显示一个图标，用以区分是不是官费
			type_name:"费用类型"
			status_name:"费用状态",
			policy_name:"费用监控类型",
		}],
		notices:[{
			id:"通知书ID",
			notice_name:"通知书名称",
			seria:"发文序列号",
			mail_date:"发文日",
			deadline:"法定期限",
			examiner:"审查员",
			examiner_dept:"光电审查部",
			examiner_phone:"审查委员电话",
			download_url:"下载地址",
			view_url:"查看地址"
		}],
		mails:[{
			id:"邮件ID",
			from:"邮件发件人",
			to:"邮件收件人",
			cc:"CC",
			mailbox:"1收件箱2发送箱",
			read:"是否已读",
			top:"是否置顶",
			subject:"邮件主题",
			sent_time:"发送时间",
			attach:"是否有附件"
		}]
    }
}

# 4、删除专利
requestUrl:http://www.zhiq.wang/patents
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、专利列表
requestUrl:http://www.zhiq.wang/patents;  
method：GET; 
request {
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//专利状态，1-正常 0-暂停处理 -1 删除，多个状态用逗号隔开，如0,1
    title:"title",//专利标题
    classification:"1",//技术分类ID，多个分类用逗号隔开
    product:"1",//产品分类ID，多个分类用逗号隔开
    proposer:"1",//专利人ID，多个专利人ID用逗号隔开
	//branch:"1",//部门ID,暂未启用，多个部门ID用逗号隔开
    tags:"tag",//标签，多个标签用逗号隔开
    inventors:"1",//发明人ID，多个发明人ID用逗号隔开
	sort:"field-order",//field表示字段，取值为id,status,title,abstract,classification,product,proposer,create_time,update_time,delete_time,remark,tag,inventor order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}  
response {
    status:1,
    info:"信息提示",
    patents:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//专利ID
			status:"1",//专利状态，1-正常 0-暂停处理
            title:"title",//专利标题
            abstract:"1",  //专利摘要
			remark:"remark",//备注
			create_time:"create_time",//创建时间
			update_time:"update_time",//更新时间
			delete_time:"delete_time",//删除时间
			branch:{id:"部门ID",name:"部门名称"},
            product:{id:1,name:"产品名称",remark:"备注"},//
            proposer:{id:"用户ID",name:"专利人姓名",mobile:"专利人手机",email:"专利人邮箱"},//专利人
            attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}]
            classification:{id:"技术分类ID",name:"技术分类名称",description:"技术分类描述"}
            product:{id:"产品ID",name:"产品名称",remark:"产品描述"}
            tags:["tag"],//标签
            inventors:[{id:"发明人ID",name:"发明人姓名",share:"发明人份额",sort:"发明人排序"}],//发明人
        }]
    }
}

# 6、专利的分案
