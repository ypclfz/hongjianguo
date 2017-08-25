# 1、新增版权
requestUrl:http://www.zhiq.wang/copyrights;
method：POST;
request {
    title:"案件名称",
    abstract:"案件摘要",
    type:"案件类型",// 1计算机软件著作权 2文字作品著作权 3美术作品著作权 4 影视作品著作权
    classification_id:"分类ID",
    products:[1,2],//产品ID数组
    tags:["标签1"],//标签数组
    ipr_id:"IPR ID"
	proposer_id:"提案人ID"
	branch_id:"部分ID",
    applicants:[1,2],//申请人ID数组
    attachments:[1,2],//附件ID数组
    remark:"备注",
	apn:"申请号”,
	apd:"申请日",
	issue_date:"发证日",
	issue_number:"证书号"
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新版权
requestUrl:http://www.zhiq.wang/copyrights/:id;  
method：PUT;
request {
    title:"案件名称",
    abstract:"案件摘要",
    type:"案件类型",// 1计算机软件著作权 2文字作品著作权 3美术作品著作权 4 影视作品著作权
    classification_id:"分类ID",
    products:[1,2],//产品ID数组
    tags:["标签1"],//标签数组
    ipr_id:"IPR ID",
	proposer_id:"提案人ID"
	branch_id:"部分ID",
    applicants:[1,2],//申请人ID数组
    attachments:[1,2],//附件ID数组
    remark:"备注",
	apn:"申请号”,
	apd:"申请日",
	issue_date:"发证日",
	issue_number:"证书号"
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、版权详情
requestUrl:http://www.zhiq.wang/copyrights/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    copyright:{ //status为1时才出现
		id:"版权ID",//不需要要显示
		serial:"案号",
		type:"版权类型",
		title:"标题",
		abstract:"摘要",
		apd:"申请日",
		apn:"申请号",
		issue_date:"公告日",
		issue_number:"公告号",
		ipr:{id: 2, name: "Shawn", mobile: "18098976299", email: "shawn@iwdoing.com"},
		agency:"代理机构名称"
		agency_serial:"代理机构案号",
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
		tags:['标签']
		attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}],
		branch:{id: 3, name: "测试部"},
		classification:{id: 1, name: "测试分类更新", description: "分类描述更新"}
		products:[{id:"产品ID",name:"产品名称",description:"产品描述"}],
		
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
		tasks:[同/tasks接口，但版权下任务可仅显示以下字段：name,node_name,person_in_charge,start_time,due_time,agency,agent,仅显示详情按钮,不显示完成任务的入口]
    }
}
						
# 4、删除版权
requestUrl:http://www.zhiq.wang/copyrights/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、版权列表
requestUrl:http://www.zhiq.wang/copyrights;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//版权状态，1-正常 0-暂停处理 
    /* 通用参数结束 */

    /* 固定参数开始 */
    type:"1",//版权类型 1计算机软件著作权 2文字作品著作权 3美术作品著作权 4 影视作品著作权
    progress:"1",//案件进度，多个进度采用逗号隔开,案件进度的选项采用/progresses/category/:id获取 :id取值 1-4
    apd:"2017-08-01|2017-08-31",//申请日
    agencey:"1",//代理机构ID，多个agency用逗号隔开
    agent:"1",//代理人ID，多个agent用逗号隔开
    /* 固定参数结束 */

    //以下字段动态添加
    proposer:"1",//提案人ID，多个提案人ID用逗号隔开
    ipr:"1",//IPR ID,多个IPR用逗号隔开
    classification:"1",//技术分类ID，多个分类用逗号隔开
    branch:"1",//部门ID,多个部门ID用逗号隔开
    create_time:"2017-08-01|2017-08-31",//立案时间，或者直接采用过滤器的id:thisweek/lastweek/thismonth/lastmonth/earlier
    issue_date:"2017-08-01|2017-08-31",//授权日
    product:"1",//产品分类ID，多个分类用逗号隔开
    applicants:"1",//申请人ID，多个申请人用逗号隔开
    tags:"tag",//标签，多个标签用逗号隔开


    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：标题、案号、申请号、公开号、公告号
	
	//如果只是单纯获取列表请添加以下参数
	listOnly:"1",
    sort:"field-order",//field表示字段，取值为id/status/title/abstract/proposer/classification/remark/create_time/apn/apd/public_date/public_number/issue_date/issue_number/progress/branch/ipr/agency/agent/agencey_serial order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    copyrights:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{ //status为1时才出现
			id:"版权ID",//不需要要显示
			serial:"案号",
			type:"版权类型",
			title:"标题",
			abstract:"摘要",
			apd:"申请日",
			apn:"申请号",
			issue_date:"公告日",
			issue_number:"公告号",
			ipr:{id: 2, name: "Shawn", mobile: "18098976299", email: "shawn@iwdoing.com"},
			agency:"代理机构名称"
			agency_serial:"代理机构案号",
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
			tags:['标签']
			attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}],
			branch:{id: 3, name: "测试部"},
			classification:{id: 1, name: "测试分类更新", description: "分类描述更新"}
			products:[{id:"产品ID",name:"产品名称",description:"产品描述"}],
			
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
			tasks:[同/tasks接口，但版权下任务可仅显示以下字段：name,node_name,person_in_charge,start_time,due_time,agency,agent,仅显示详情按钮,不显示完成任务的入口]
		}]
		
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

