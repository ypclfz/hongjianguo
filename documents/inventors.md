# 1、发明人列表
requestUrl=http://www.zhiq.wang/inventors;  
method=GET;  
request {
    name:"name",//发明人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    mobile:"mobile",//手机
    email:"email",//邮箱
    not_disclose_name:"1",//不公开姓名  1 表示不公开姓名 0 默认表示公开姓名
    given_name:"given_name",//英文名
    family_name:"family_name",//姓
	keyword:"关键字",
    status:"status",//1 表示正常，0表示禁用 -1表示删除
    create_time:"create_time",//创建时间, 时间段用逗号隔开，例如2017-01-01,2017-01-05
    update_time:"update_time",//更新时间, 时间段用逗号隔开，例如2017-01-01,2017-01-05
    delete_time:"delete_time",//删除时间, 时间段用逗号隔开，例如2017-01-01,2017-01-05

    page:"1",//页码
    listRows:"20",//每页数据条数
    sort:"field-order",//field可能取值name,identity,area,mobile,email,not_disclose_name,given_name,family_name,status,create_time,update_time,delete_time，asc升序，desc 降序
}

response {
    status:1,
    info:"信息提示",
    data:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//发明人ID
            citizenship:"citizenship",//发明人国籍
            name:"name",//发明人姓名
            identity:"identity",//证件号码
            given_name:"given_name",//英文名
            family_name:"family_name",//英文姓
            email:"email",//邮箱地址
            mobile:"mobile",//电话号码
            not_disclose_name:"not_disclose_name",//1表示不公开姓名，0表示公开姓名
            stats:"1",//1 表示正常，0表示禁用 -1表示删除
            delete_time:"2017-01-01",//删除时间
            create_time:"2017-01-01",//创建时间
            update_time:"2017-01-01",//更新时间
            editor:{
                id:"2",//上传者用户ID
                name:"name",//上传用户名称
            }
        }]
    }
}


# 2、新建发明人
requestUrl=http://www.zhiq.wang/inventors;  
method=POST;    
request {
    //基本信息
    name:"name",//发明人姓名
    identity:"identity",//证件号码
    citizenship:"citizenship",//地区代码
    mobile:"mobile",//手机
    email:"email",//邮箱
    not_disclose_name:"not_disclose_name",//不公开姓名   
    given_name:"given_name",//英文名,可选
    family_name:"family_name",//英文姓，可选
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	inventor:{
		id:"发明人ID",//
		name:"name",//发明人姓名
		identity:"identity",//证件号码
		citizenship:"citizenship",//地区代码
		mobile:"mobile",//手机
		email:"email",//邮箱
		not_disclose_name:"not_disclose_name",//不公开姓名   
		given_name:"given_name",//英文名,可选
		family_name:"family_name",//英文姓，可选
	}
}  

# 3、更新发明人
requestUrl=http://www.zhiq.wang/inventors/:id;  
method=PUT;    
request {
    //基本信息
    name:"name",//发明人姓名
    identity:"identity",//证件号码
    citizenship:"citizenship",//地区代码
    mobile:"mobile",//手机
    email:"email",//邮箱
    not_disclose_name:"not_disclose_name",//不公开姓名   
    given_name:"given_name",//英文名,可选
    family_name:"family_name",//英文姓，可选
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	inventor:{
		id:"发明人ID",//
		name:"name",//发明人姓名
		identity:"identity",//证件号码
		citizenship:"citizenship",//地区代码
		mobile:"mobile",//手机
		email:"email",//邮箱
		not_disclose_name:"not_disclose_name",//不公开姓名   
		given_name:"given_name",//英文名,可选
		family_name:"family_name",//英文姓，可选
	}
}  

# 4、获取发明人详情
requestUrl=http://www.zhiq.wang/inventors/:id;  
method=GET;    

response {
    status:1,//1成功 0 失败
    info:"信息提示",
	inventor:{
		id:"发明人ID",//
		name:"name",//发明人姓名
		identity:"identity",//证件号码
		citizenship:"citizenship",//地区代码
		mobile:"mobile",//手机
		email:"email",//邮箱
		not_disclose_name:"not_disclose_name",//不公开姓名   
		given_name:"given_name",//英文名,可选
		family_name:"family_name",//英文姓，可选
		create_time:"create_time",//创建时间
		update_time:"update_time",//更新时间
		editor:{
			id:"操作者用户ID",
			name:"操作者用户名称"
		}
	}
}  

# 5、删除指定发明人
requestUrl=http://www.zhiq.wang/inventors/:id;  
method=DELETE;   
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  