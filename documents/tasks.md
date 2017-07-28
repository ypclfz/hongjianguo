# 1、新增任务
requestUrl:http://www.zhiq.wang/tasks;  
method：POST;  
request {
	flow_id:'流程ID',//提案新增接口会返回flow_id；
    project_id:'提案/专利/商标/版权/专案ID',
	person_in_charge:'承办人ID',
	due_time:'2017-09-09',//承办期限
	task_def_id:'任务节点ID',//与flow_id至少填写一项
	
	deadline:'2017-09-09',//法限，部分任务类型必填，通过/taskDefs接口(尚未完成)获取的列表中，deadline为1则表示该任务类型法限必填
	remark:'任务备注',
	attachments:[1,2],//提交文件ID数组
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新任务
requestUrl:http://www.zhiq.wang/tasks/:id;  
method：PUT;  
request {
    project_id:'提案/专利/商标/版权/专案ID',
	person_in_charge:'承办人ID',
	due_time:'2017-09-09',//承办期限
	task_def_id:'任务节点ID',//与flow_id至少填写一项
	
	deadline:'2017-09-09',//法限，部分任务类型必填，通过/taskDefs接口(尚未完成)获取的列表中，deadline为1则表示该任务类型法限必填
	remark:'任务备注',
	attachments:[1,2],//提交文件ID数组
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
} 

# 3、任务详情
requestUrl:http://www.zhiq.wang/tasks/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    task:{ 
        id:"1",//任务ID
		serial:"案号",
		title:"案件名称",
		name:"任务名称",
		ipr:"案件负责IPR姓名",
		person_in_charge:"当前任务处理人姓名",
		sender_name:"任务发送人姓名",
        agency:"代理机构名称",
		agent:"代理人名称",
		apd:"申请日"
		apn:"申请号"
		start_time:"开始时间",
        deadline:"法定期限",//
		due_time:"指定期限",//
		end_time:"完成时间",
        attachments:[{
            id:"1",//文件ID
            name:"name", //文件名称
            viewUrl:"viewUrl",//查看地址
            downloadUrl:"downloadUrl",//下载地址
            ext:"ext",//文件格式
            size:"size",//文件大小
        }],//附件,列表中可不显示
        
        status:"状态",//0-暂停处理 1正常
		project_id:"案件ID",//不需要显示
		sender:"任务发送人ID",//不需要显示
		task_def_id:"任务节点ID",//不需要显示
    }
}

# 4、删除任务
requestUrl:http://www.zhiq.wang/tasks/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、任务列表
requestUrl:http://www.zhiq.wang/tasks;  
method：GET; 
request {
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
	project_type:"案件类型",//取值为1-专利 2-商标，3-版本 4-项目
	project_ipr:"案件负责IPR ID",//iprs
    project_agency:"代理机构ID",//agencies
	project_agent:"代理人ID",//agents
	task_def_id:"任务节点ID",//
	person_in_charge:"任务处理人",//members
	#due_time:"指定完成时间",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	#deadline:"法定期限",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	#end_time:"完成时间",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	keyword:"关键词",//支持检索：案号、申请号、案件负责人、任务处理人、案件名称、备注字段
	sort:"field-order",//field表示字段，取值为project_type、project_ipr、project_agency、project_agent、task_def_id、person_in_charge、due_time、deadline、end_time、title、serial、apn、apd、remark order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}

response {
    status:1,
    info:"信息提示",
    tasks:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//任务ID
			serial:"案号",
			title:"案件名称",
			name:"任务名称",
			ipr:"案件负责IPR姓名",
			person_in_charge:"当前任务处理人姓名",
			sender_name:"任务发送人姓名",
			agency:"代理机构名称",
			agent:"代理人名称",
			apd:"申请日"
			apn:"申请号"
			start_time:"开始时间",
			deadline:"法定期限",//
			due_time:"指定期限",//
			end_time:"完成时间",
			attachments:[{
				id:"1",//文件ID
				name:"name", //文件名称
				viewUrl:"viewUrl",//查看地址
				downloadUrl:"downloadUrl",//下载地址
				ext:"ext",//文件格式
				size:"size",//文件大小
			}],//附件,列表中可不显示
			
			status:"状态",//0-暂停处理 1正常
			project_id:"案件ID",//不需要显示
			sender:"任务发送人ID",//不需要显示
			task_def_id:"任务节点ID",//不需要显示se
        }]
    }
}
