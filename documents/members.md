# 1、用户登陆
requestUrl:http://www.zhiq.wang/login;  
Method:POST;  
request{
	username:"username",
	password:"password",//password 采用RSA非对称算法加密
}  
response{
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
}

# 2、用户登出
requestUrl:http://www.zhiq.wang/logout;  
Method:GET;  
response{
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
}

# 3、新增用户
requestUrl:http://www.zhiq.wang/members;  
Method:POST;  
request{
	username:"username",//必填
	password:"password",//password 采用RSA非对称算法加密
	name:"name",//呢称 
	email:"email",//邮箱，可选
	mobile:"mobile",//手机，可选
	weixin:"weixin",//微信号，可选
	qq:"qq",//手机号，可选
	abbr:"abbr",//代码，可选
	role:"用户角色",//1发明人2-IPR 3流程 10代理机构 11 代理人 12代理机构流程 13 代理机构财务，这些选项是固定的
} 
response {
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
	member:{
		id:"id",
		username:"username",//必填
		name:"name",//呢称 
		email:"email",//邮箱，可选
		mobile:"mobile",//手机，可选
		weixin:"weixin",//微信号，可选
		qq:"qq",//手机号，可选
		abbr:"abbr",//代码，可选
		role:"用户角色"
	}
}

# 4、更新用户
requestUrl:http://www.zhiq.wang/members/:id;  
Method:PUT;  
request{
	username:"username",//必填
	password:"password",//password 采用RSA非对称算法加密暂未实现)
	name:"name",//呢称 
	email:"email",//邮箱，可选
	mobile:"mobile",//手机，可选
	weixin:"weixin",//微信号，可选
	qq:"qq",//手机号，可选
	abbr:"abbr",//代码，可选
	role:"用户角色",//1发明人2-IPR 3流程 10代理机构 11 代理人 12代理机构流程 13 代理机构财务，这些选项是固定的
} 
response {
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
	member:{
		id:"id",
		username:"username",//必填
		name:"name",//呢称 
		email:"email",//邮箱，可选
		mobile:"mobile",//手机，可选
		weixin:"weixin",//微信号，可选
		qq:"qq",//手机号，可选
		abbr:"abbr",//代码，可选
		role:"用户角色"
	}
}

# 5、删除指定用户
requestUrl:http://www.zhiq.wang/members/:id;  
Method:DELETE;  
response{
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
}

# 6、用户详情
requestUrl:http://www.zhiq.wang/members/:id;  
Method:GET;  
response{
	status:"1",//状态，1成功，0失败
	info:"info",//提示信息
	member:{
		id:"id",
		name:"name",
		username:"username",
		email:"email",
		mobile:"mobile",
		qq:"qq",
		role:"role",
		status:"1",
		weixin:"weixin"
		branch:{
			id:"id",
			name:"name",
			description:"description"
		},
		groups:[{
			id:"id",
			name:"name"
		}],
	}
}

# 7、获取用户列表
requestUrl:http://www.zhiq.wang/members;  
Method:GET;  
request {
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
	username:"用户名",//取值为1-专利 2-商标，3-版本 4-项目
	name:"用户名称",
    email:"email",
	mobile:"mobile",
	weixin:"weixin",
	qq:"qq",
	role:"用户角色",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	status:"状态",//1 正常 0 禁用
	branch_id:"部门ID",//部门可以通过/branches接口拉取
	
	group:"用户组ID"
	
	keyword:"关键词",//支持检索：username name email mobile weixin qq字段
	sort:"field-order",//field表示字段，取值为username、name、email、mobile、weixin、qq、role、status、branch_id order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}  

response {
    status:1,
    info:"信息提示",
    members:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"id",
			name:"name",
			username:"username",
			email:"email",
			mobile:"mobile",
			qq:"qq",
			role:"role",
			status:"1",
			weixin:"weixin"
			branch:{
				id:"id",
				name:"name",
				description:"description"
			},
			groups:[{
				id:"id",
				name:"name"
			}],
			children:[{
				id:"id",//用户ID
				name:"name",//用户名称
			}]
        }]
    }
}

# 8、获取IPR列表
requestUrl:http://www.zhiq.wang/iprs;  
Method:GET;  
request {
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
	username:"用户名",/
	name:"用户名称",
    email:"email",
	mobile:"mobile",
	weixin:"weixin",
	qq:"qq",
	role:"用户角色",//时间区间 2017-01-01|2017-12-31; 只填起始时间 2017-01-01| 只填结束时间 |2017-12-31
	status:"状态",//1 正常 0 禁用
	branch_id:"部门ID",//部门可以通过/branches接口拉取
	keyword:"关键词",//支持检索：username name email mobile weixin qq字段
	sort:"field-order",//field表示字段，取值为username、name、email、mobile、weixin、qq、role、status、branch_id order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}  

response {
    status:1,
    info:"信息提示",
    members:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"id",
			name:"name",
			username:"username",
			email:"email",
			mobile:"mobile",
			qq:"qq",
			role:"role",
			status:"1",
			weixin:"weixin"
			branch:{
				id:"id",
				name:"name",
				description:"description"
			},
			groups:[{
				id:"id",
				name:"name"
			}],
        }]
    }
}

# 8、保存用户扩展信息
requestUrl:http://www.zhiq.wang/members/:id/extend;  
Method:POST;
request {
	smtp_server:"smtp服务器地址",
	smtp_port:"smtp 商品",
	pop_servier:"pop服务器地址",
	pop_port:"pop端口",
	smtp_ssl:"是否使用SSL",
	email_password:"邮箱密码",
	signature:"邮件签名",
} 

# 9、获取用户扩展信息
requestUrl:http://www.zhiq.wang/members/:id/extend;  
Method:GET;
request {
	status:"1",
	info:"",
	member:{
		smtp_server:"smtp服务器地址",
		smtp_port:"smtp 商品",
		pop_servier:"pop服务器地址",
		pop_port:"pop端口",
		smtp_ssl:"是否使用SSL",
		signature:"邮件签名",// HTML编辑器
	}
} 

