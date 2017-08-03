# 1、新增专利
(is_utility:"是否同时申请实用新型",//该选项在area=CN,type=1时才出现；
is_pre_public:"是否请求提前公开",//该选项在area=CN,type=1时才出现；
is_exam_request:"是否同时提出实审请求",//该选项在area=CN,type=1时才出现；
is_secure_check:"是否同时提出保密审查请求",//该选项在area=CN,type=1/2时才出现；)

requestUrl:http://www.zhiq.wang/patents;  
method：POST;  
request {
			
	title:"案件名称",
	abstract:"案件摘要",
	proposals:[1,2],//提案ID
	area:["CN","US"],//申请地区
	type:"案件类型",// 1发明专利 2 实用新型 3 外观设计
	extension: ['is_utility', 'is_pre_public'],
	remark:"备注",
	attachments:[1,2],//附件ID数组
	
	ipr_id:"IPR ID"
	applicants:[1,2],//申请人ID数组
	inventors:[{id:1,share:50}],//发明人ID数组
	project_id:"项目ID",
	products:[1,2],//产品ID数组
	classification_id:"分类ID",
	tags:["标签1"],//标签数组
	
	#priorities:[{area:"CN",apn:"201510422563.4",date:"2017-01-01"}],//优先权信息
	#relative_projects:[{
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
