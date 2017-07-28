# 1、新增专利
requestUrl:http://www.zhiq.wang/patents;  
method：POST;  
request {
    title:"name",//标题，不能超过150个字符
    abstract:"abstract",//摘要,不能超过1000字符
    attachments:['fileid'],//附件
    proposer:"1",//专利人
    inventors:[id:"1",share:"10"],//id 发明人ID，share 发明人贡献占比
    tags:["tag"],//标签
    classification:"1",//技术分类ID
} 
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新专利
requestUrl:http://www.zhiq.wang/patents/:id;  
method：PUT;  
request {
    title:"name",//标题，不能超过150个字符
    abstract:"abstract",//摘要,不能超过1000字符
    attachments:['fileid'],//附件
    proposer:"1",//专利人
    inventors:[{id:"1",share:"10"}],//id 发明人ID，share 发明人贡献占比
    tags:["tag"],//标签
    classification:"1",//技术分类ID
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
    proposal:{ //status为1时才出现
        id:"1",//专利ID
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
        proposer:{id:"1",name:"name"},//专利人
        inventors:[{id:"1",share:"10"}],//id 发明人ID，share 发明人贡献占比
        tags:["tag"],//标签
        classification:{id:"1",name:"name"},//技术分类
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
            proposer:{uid:"用户ID",name:"专利人姓名",mobile:"专利人手机",email:"专利人邮箱"},//专利人
            attachments:[{id:"文件ID",name:"附件名称",ext:"附件格式",size:"附件大小",viewUrl:"查看地址，为空则不能直接查看",downloadUrl:"下载地址"}]
            classification:{id:"技术分类ID",name:"技术分类名称",description:"技术分类描述"}
            product:{id:"产品ID",name:"产品名称",remark:"产品描述"}
            tags:["tag"],//标签
            inventors:[{id:"发明人ID",name:"发明人姓名",share:"发明人份额",sort:"发明人排序"}],//发明人
        }]
    }
}
