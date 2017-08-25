# 1、新增提案
requestUrl:http://www.zhiq.wang/proposals;  
method：POST;  
request {
    title:"name",//标题，不能超过150个字符
    abstract:"abstract",//摘要,不能超过1000字符
    attachments:['fileid'],//附件
    proposer:"1",//提案人
    inventors:[id:"1",share:"10"],//id 发明人ID，share 发明人贡献占比
    tags:["tag"],//标签
    classification:"1",//技术分类ID
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
	id:"任务ID",//返回的任务ID，如果用户选择提交，首先通过/tasks/:id/nexttast接口获取完成任务表单的初始数据，显示表单后提交；
}

# 2、更新提案
requestUrl:http://www.zhiq.wang/proposals/:id;  
method：PUT;  
request {
    title:"name",//标题，不能超过150个字符
    abstract:"abstract",//摘要,不能超过1000字符
    attachments:['fileid'],//附件
    proposer:"1",//提案人
    inventors:[{id:"1",share:"10"}],//id 发明人ID，share 发明人贡献占比
    tags:["tag"],//标签
    classification:"1",//技术分类ID
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
	id:"任务ID",//返回的任务ID，如果用户选择提交，首先通过/tasks/:id/nexttast接口获取完成任务表单的初始数据，显示表单后提交；
} 

# 3、提案详情
requestUrl:http://www.zhiq.wang/proposals/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    proposal:{ //status为1时才出现
        id:"1",//提案ID
        title:"name",//标题，不能超过150个字符
        abstract:"abstract",//摘要,不能超过1000字符
        attachments:[{
            id:"1",//文件ID
            name:"name", //文件名称
            viewUrl:"viewUrl",//查看地址
            downloadUrl:"downloadUrl",//下载地址
            ext:"ext",//文件格式
            size:"size",//文件大小
        }],//附件
        proposer:{id:"1",name:"name"},//提案人
        inventors:[{id:"1",share:"10"}],//id 发明人ID，share 发明人贡献占比
        tags:["tag"],//标签
        classification:{id:"1",name:"name"},//技术分类
		flow_node:"当前节点"
    }
}

# 4、删除提案
requestUrl:http://www.zhiq.wang/proposals/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、提案列表
requestUrl:http://www.zhiq.wang/proposals;  
method：GET; 
request {
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//提案状态，1-正常 0-暂停处理 -1 删除，多个状态用逗号隔开，如0,1
    title:"title",//提案标题
    classification:"1",//技术分类ID，多个分类用逗号隔开
    product:"1",//产品分类ID，多个分类用逗号隔开
    proposer:"1",//提案人ID，多个提案人ID用逗号隔开
	branch:"1",//部门ID,暂未启用，多个部门ID用逗号隔开
    tags:"tag",//标签，多个标签用逗号隔开
    inventors:"1",//发明人ID，多个发明人ID用逗号隔开
	sort:"field-order",//field表示字段，取值为id,status,title,abstract,classification,proposer,create_time,update_time,delete_time,remark order取值为asc（升序），desc（降序），多个排序采用逗号隔开
	
	//如果要导出清单请添加以下参数
	format:"excel"
}  
response {
    status:1,
    info:"信息提示",
    proposals:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//提案ID
			status:"1",//提案状态，1-正常 0-暂停处理
			seria:"案号",
            title:"title",//提案标题
            abstract:"1",  //提案摘要
			create_time:"create_time",//创建时间
			branch:{id:"部门ID",name:"部门名称"},
			classification:{id:"技术分类ID",name:"技术分类名称",description:"技术分类描述"}
			products:{id:"产品ID",name:"产品名称",description:"产品描述"}
			proposer:{id:"用户ID",name:"提案人姓名",mobile:"提案人手机",email:"提案人邮箱"},//提案人
            inventors:[{id:"发明人ID",name:"发明人姓名",share:"发明人份额",sort:"发明人排序"}],//发明人
			tags:["tag"],//标签
            attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}]
			remark:"remark",//备注
			
			//以下是点击相关专利弹出面板显示
			patents:[{
				id:"id",不显示，用于跳转链接
				serial:"案号",
				title:"标题",
				type_name:"专利类型",
				area:"申请地区",
				apn:"申请号",
				apd:"申请日"
			}]
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
		
		//当提交format=excel参数时，返回如下
		downloadUrl:"/files/33",//可以直接windows.open下载
		ext:"xlsx",
		id:"33",文件ID
		name:"文件名称",
		size:"文件大小",
    }
}

# 6、两个及以上的提案合并立案
在前端页面上需要提供菜单/按钮，选择两个及以上提案后，选择合并立案，立案方式与单个提案递交相同，可以采用选择的任一提案保存接口返回的任务ID进行提交，提交时next值设为6（此节点，其他字段均可不提供），但提交的参数里需要增加proposals:[所有提案ID的数组];

# 7、提案导出
同任务列表接口，需要添加参数 format = excel
response {
	status:"1",
	info:"",
	file:{
		//这是一个文件对象，请参考列表接口中的附件，可以直接windows.open(downloadUrl)
	}
}