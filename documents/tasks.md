# 1、新增任务
requestUrl:http://www.zhiq.wang/tasks;  
method：POST;  
request {
    project_id:'提案/专利/商标/版权/专案ID',
	person_in_charge:'承办人ID',
	task_def_id:'任务类型ID',
	flow_node_id:'任务的流程起始阶段'
	remark:'任务备注',
	attachments:[1,2],//提交文件ID数组
	due_time:'2017-09-09',//承办期限
	deadline:'2017-09-09',//法限，部分任务类型必填，通过/taskDefs接口(尚未完成)获取的列表中，deadline为1则表示该任务类型法限必填
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
	task_def_id:'任务节点ID',//
	due_time:'2017-09-09',//承办期限
	flow_node_id:'任务的流程起始阶段'
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
		//flow_id:"当前任务所属的流程ID",//不需要显示，/flows接口可以拉取所有流程节点定义数据，其具体数据结构参见flows.md，任务的flow_id字段用来在flows接口返回的定义数据中匹配流程
		//flow_node_id:"任务流程节点ID",//不需要显示，采用flow_id在/flows接口返回数据中匹配流程后，采用flow_node_id匹配当前节点的定义数据，该定义数据结构参见flows.md，该数据用于控制完成任务表单中下一阶段的选项，承办人的搜索接口，额外的字段，默认字段的隐藏等等
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
    agency:"代理机构ID",
	agent:"代理人ID",
	task_def_id:"任务节点ID",
	role:"任务流程阶段",
	person_in_charge:"任务处理人",
	due_time:"指定完成时间",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	deadline:"法定期限",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	end_time:"完成时间",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	keyword:"关键词",//支持检索：案号、申请号、案件负责人、任务处理人、案件名称、备注字段
	scope:"all/personal",//all-所有任务 personal-全部任务
	status:"0/1",//0未完成 1-已完成
	sort:"field-order",//field表示字段，取值为project_type、agency、agent、task_def_id、role、person_in_charge、due_time、deadline、end_time、title、serial、apn、apd、remark order取值为asc（升序），desc（降序），多个排序采用逗号隔开
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
			task_def_id:"任务节点ID",//不需要显示
			flow_id:"当前任务所属的流程ID",//不需要显示，用来通过 /flows/1/nodes接口拉取流程节点
        }],
		filters:{
			agents:[{
				name:'name',
				count:"count"
			}],
			duetime:[{
				name:'name',
				count:"count"
			}],
			roles:[{
				name:'name',
				count:"count"
			}],
		}
    }
}

# 6、获取完成任务表单预定义数据
requestUrl:http://www.zhiq.wang/tasks/:id/form;  
method：GET; 
response{
	status:"状态码",//1成功0失败
	info:"info",//提示信息
	data:{
		next:[{
			id:"流程节点ID",
			name:"流程节点名称",
			default:"默认承办人类型",//可能的值为：proposer/ipr/agent/reviewer/previous
			fields:['next','person_in_charge'],//完成任务表单可见字段列表，用户选择每一个不同的任务流程节点，对应显示不同的字段
			url:"承办人搜索接口URL"
		}]
		//next中每一条记录代表一个流程节点，用户选择该节点后，应根据该节点default值，将对应的承办人加载进来
		fields:['agency','agent'],//完成任务表单额外的字段列表
		agent:{
			id:"用户",
			name:"用户名称"
		},
		ipr:{
			id:"用户",
			name:"用户名称"
		},
		previous:{
			id:"用户",
			name:"用户名称"
		},
		proposer:{
			id:"用户",
			name:"用户名称"
		},
		reviewer:{
			id:"用户",
			name:"用户名称"
		},
	}
}

# 7、完成当前任务，并生成一下阶段的任务
requestUrl:http://www.zhiq.wang/tasks/:id/nexttask;  
method：POST;
request {
	person_in_charge:'承办人ID',
	flow_node_id:'下一个流程节点的ID',//
	due_time:'2017-09-09',//承办期限
	deadline:'2017-09-09',//法限，部分任务类型必填，通过/taskDefs接口(尚未完成)获取的列表中，deadline为1则表示该任务类型法限必填
	remark:'任务备注',
	attachments:[1,2],//提交文件ID数组
	proposals:[1,2],//不同提案合并立案时才提供
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}  

