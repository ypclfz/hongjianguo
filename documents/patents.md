# 1、新增专利
requestUrl:http://www.zhiq.wang/patents;
method：POST;
request {
    title:"案件名称",
    abstract:"案件摘要",
    area:["CN","US"],//申请地区
    type:"案件类型",// 1发明专利 2 实用新型 3 外观设计

    project_id:"项目ID",

    proposals:[1,2],//提案ID 

    classification_id:"分类ID",
    products:[1,2],//产品ID数组

    tags:["标签1"],//标签数组

    is_utility:"是否同时申请实用新型",//该选项在area=CN,type=1时才出现；
    is_pre_public:"是否请求提前公开",//该选项在area=CN,type=1时才出现；
    is_exam_request:"是否同时提出实审请求",//该选项在area=CN,type=1时才出现；
    is_secure_check:"是否同时提出保密审查请求",//该选项在area=CN,type=1/2时才出现；
	
	is_biological:"是否与生物相关",  //该选项在type=1时才出现
	is_division:"是否是分案申请",
	is_genetic:"是否依赖于遗传资源", //该选项在type=1时才出现
	is_leakage:"是否不丧失新颖性公开",//该选项在area=CN时才出现；
	is_sequence:"是否有序列表",//该选项在type=1时才出现
	
	manner:"申请方式",//selector 选项定义如下：[{label:"直接申请",value:1},{label:"巴黎公约",value:2},{label:"PCT进入国家阶段",value:3}], 当manner选择2/3时，新增专利，优先权信息必填 
	
	//当manner 选择3时，额外显示以下字段：
	pct_apd:"国际申请日", //日期类型
	pct_no:"国际申请号",  //文本类型
	pct_priority_date:"国际优先权日", //日期类型
	pct_public_date:"国际公开日", //日期类型
	pct_public_language:"国际公开语言", //selector,固定定义数据如下：[{label:"中文-Chinese",value:"CN"},{label:"英文-English",value:"EN"},{label:"法文-Franch",value:"FR"},{label:"德文-Germany",value:"GE"},{label:"日文-Japanese",value:"JP"},{label:"俄文-Russian",value:"RU"},{label:"西班牙-Spanish",value:"ES"}]
	pct_public_no:"国际公开号", //文本类型

    ipr_id:"IPR ID"
    applicants:[1,2],//申请人ID数组
    inventors:[{id:1,share:50}],//发明人ID数组
    attachments:[1,2],//附件ID数组

    priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],//优先权信息
    relative_projects:[{
        id:"相关案件ID",
        type:"相关类型",//下拉菜单  1 要求优先权 2 分案申请 3 部分连续案 6 要求同日送件
    }],
    remark:"备注"
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
	
	is_biological:"是否与生物相关",  //该选项在type=1时才出现
	is_division:"是否是分案申请",
	is_genetic:"是否依赖于遗传资源", //该选项在type=1时才出现
	is_leakage:"是否不丧失新颖性公开",//该选项在area=CN时才出现；
	is_sequence:"是否有序列表",//该选项在type=1时才出现

	manner:"申请方式",//selector 选项定义如下：[{label:"直接申请",value:1},{label:"巴黎公约",value:2},{label:"PCT进入国家阶段",value:3},{label:"外部转让",value:4}],在 当manner选择2/3时，新增专利，优先权信息必填 
	
	//当manner 选择3时，额外显示以下字段：
	pct_apd:"国际申请日", //日期类型
	pct_no:"国际申请号",  //文本类型
	pct_priority_date:"国际优先权日", //日期类型
	pct_public_date:"国际公开日", //日期类型
	pct_public_language:"国际公开语言", //selector,固定定义数据如下：[{label:"中文-Chinese",value:"CN"},{label:"英文-English",value:"EN"},{label:"法文-Franch",value:"FR"},{label:"德文-Germany",value:"GE"},{label:"日文-Japanese",value:"JP"},{label:"俄文-Russian",value:"RU"},{label:"西班牙-Spanish",value:"ES"}]
	pct_public_no:"国际公开号", //文本类型
	
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
		
		/* [基本信息]开始 */
		serial:"案号",
		title:"标题",
		area:"CN",
		type:"专利类型",
		abstract:"摘要",
		manner:"申请方式",
		apd:"申请日",
		apn:"申请号",
		public_date:"公开日", //type=1时才出现
		public_number:"公开日",//type=1时才出现
		issue_date:"公告日",
		issue_number:"公告号",
		
		extension:{
			is_biological:"是否与生物相关",//该选项在type=1时才出现
			is_division:"是否是分案申请", 
			is_exam_request:"是否提出实质审查请求", //该选项在area=CN && type=1时才出现
			is_genetic:"是否依赖于遗传资源", //该选项在area=CN 时才出现
			is_leakage:"是否不丧失新颖性公开", //该选项在area=CN 时才出现
			is_pre_public:"是否提前公开", //该选项在type=1时才出现
			is_priority:"是否要求优先权",
			is_secure_check:"是否保密审查", //该选项在type=1 || 2时才出现
			is_sequence:"是否有序列表", //该选项在type=1时才出现
			is_utility:"是否同日申请了同样的实用新型/发明", //该选项在type=1 || 2时才出现
		},
		pre_exam_ok_date:"初审合格日",  //type=1时才出现
		sub_exam_start_date:"进入实审日", //type=1时才出现
		pct_apd:"国际申请日", //manner=3或者area包括PCT时才出现
		pct_no:"国际申请号", //manner=3或者area包括PCT时才出现
		pct_priority_date:"国际优先权日",//manner=3或者area包括PCT时才出现
		pct_public_date:"国际公开日",//manner=3或者area包括PCT时才出现
		pct_public_language:"国际公开语言",//manner=3或者area包括PCT时才出现
		pct_public_no:"国际公开号",//manner=3或者area包括PCT时才出现
		board_number:"复审委内编号",//manner=3或者area包括PCT时才出现
		/* [基本信息]结束 */
		
		/* [人员信息]开始 */
		branch:{id: 3, name: "测试部"},
		ipr:{id: 2, name: "Shawn", mobile: "18098976299", email: "shawn@iwdoing.com"},
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
		proposer:{id: 1, name: "红坚果", mobile: "18098976299", email: "hongjianguo@hongjianguo.com"},
		/* [人员信息]结束 */
		
		
		/* [分类信息]开始 */
		products:[{id:"产品ID",name:"产品名称",description:"产品描述"}],
		classification:{id: 1, name: "测试分类更新", description: "分类描述更新"}
		tags:['标签'],
		main_ipc:"主国际分类号",
		/* [分类信息]结束 */
		
		
		/* [委案信息]开始 */
		agency:"代理机构名称"
		agency_serial:"代理机构案号",
		agency_type:"代理类型",//selector: 定义数据如下：[{label:"申请&OA",value:"1"},{label:"OA",value:"2"},{label:"复审",value:"3"},{label:"无效",value:"4"},{label:"无效答复",value:"5"}]
		agent:"代理人信息",//
		/* [委案信息]结束 */
		
		/* [相关案件]开始 */
		proposals:[],
		priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],
		relative_projects:[{
			id:"相关案件ID",
			serial:"相关案件案号",
			title:"相关案件标题",
			type:"相关类型",//下拉菜单  1 要求优先权 2 分案申请 3 部分连续案 6 要求同日送件
		}],
		/* [相关案件]开始 */
		
		/* [其他信息及附件]开始 */
		status:"状态",
		words:"说明书字数",
		remark:"备注",
		attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}],
		
		/* [其他信息及附件]结束 */

		
		//以下内容其他Tab中显示 
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
			status_name:"费用状态",
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
		}],
		tasks:[同/tasks接口，但专利下任务可仅显示以下字段：name,node_name,person_in_charge,start_time,due_time,agency,agent,仅显示详情按钮,不显示完成任务的入口]
    }
}
						
# 4、删除专利
requestUrl:http://www.zhiq.wang/patents/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、专利列表
requestUrl:http://www.zhiq.wang/patents;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//专利状态，1-正常 0-暂停处理 
    /* 通用参数结束 */

    /* 固定参数开始 */
    type:"1",//专利类型 1-发明 2-实用新型 3-外观设计 0-其他
    area:"CN",//申请地区,
    progress:"1",//当前进度，多个进度采用逗号隔开,案件进度的选项采用/progress?category=1获取 取值 1-4
    apd:"2017-08-01|2017-08-31",//申请日
    agencey:"1",//代理机构，多个agency用逗号隔开
    agent:"1",//代理人，多个agent用逗号隔开
    /* 固定参数结束 */

    //以下字段动态添加
    proposer:"1",//提案人，多个提案人ID用逗号隔开
    ipr:"1",//IPR ,多个IPR用逗号隔开
    classification:"1",//技术分类ID，多个分类用逗号隔开
    branch:"1",//部门,暂未启用，多个部门ID用逗号隔开
    create_time:"2017-08-01|2017-08-31",//立案时间，或者直接采用过滤器的id:thisweek/lastweek/thismonth/lastmonth/earlier
    issue_date:"2017-08-01|2017-08-31",//授权日
    public_date:"2017-08-01|2017-08-31",//公开日
    product:"1",//产品分类ID，多个分类用逗号隔开
    applicants:"1",//申请人ID，多个申请人用逗号隔开
    inventors:"1",//发明人ID，多个发明人ID用逗号隔开
    tags:"tag",//标签，多个标签用逗号隔开
    is_utility:"1",//是否同时申请实用新型
    is_pre_public:"1",//是否提前公开
    is_exam_request:"1",//是否同时提出实审
    is_secure_check:"1",//是否进行保密审查
	
	//用户不可操作参数
	ids:[1,2],//用户选择的案件列表，用户只能通过专利列表界面来选择

    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：标题、案号、申请号、公开号、公告号
	
	//如果只是单纯获取列表请添加以下参数
	listOnly:"1",
	
	//如果要导出专利需要添加以下参数
	export:"1"
    sort:"field-order",//field表示字段，取值为id/status/title/abstract/proposer/classification/remark/create_time/apn/apd/public_date/public_number/issue_date/issue_number/progress/branch/ipr/agency/agent/agencey_serial order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    patents:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{ //status为1时才出现
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
		extension:{
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
		},
		
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
		
		filters:[{
			label:"标签",
			key:"上传字段",
			items:[{
				label:"标签",
				value:"值",
				count:"数量"
			}]
		}]
		
    }
}

# 6、专利的分案
