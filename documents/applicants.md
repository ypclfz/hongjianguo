# 1、申请人列表
requestUrl=http://www.zhiq.wang/applicants;  
method=GET;  
request {
    type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
    name:"name",//申请人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    province:"province",//省份代码
    city:"city",//城市代码
    address:"address",//详细地址
    postcode:"postcode",//邮编
    fee_discount:"fee_discount",//费用备案 0未完成 1已完成
    status:"1",//状态 1-有效 0-禁用 -1已删除
    ename:"ename",//英文姓名
    eaddress:"eaddress",//英文地址
    keyword:"关键字",//关键字
    page:"1",//页码
    listRows:"20",//每页数据条数
    sort:"field-order",//field表示字段，取值为id,status,name,identity,area,province,city,address,postcode,fee_discount,ename,eaddress order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}

response {
    status:1,
    info:"信息提示",
    applicants:{
        total:"2",//总数
        per_page:"20",//每页数量
        current_page:"1",//当前页
        last_page:"2",//最后页
        data:[{
            id:"1",//申请人ID
            area:"area",//地区代码
            type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
			type_text:"类型名称",
            name:"name",//申请人姓名
            ename:"ename",//英文姓名
            identity:"identity",//证件号码
            email:"email",//邮箱地址
            telephone:"telephone",//电话号码
            province:"province",//省份代码
			province_name:"省份名称",
            city:"city",//城市代码
			city_name:"城市名称",
            address:"address",//详细地址
            eaddress:"eaddress",//英文地址
            postcode:"postcode",//邮编
            status:"1",//提案状态，1-有效 0-禁用 -1已删除
            fee_discount:"fee_discount",//费用备案 0未完成 1已完成
            delete_time:"2017-01-01",//删除时间
            create_time:"2017-01-01",//创建时间
            update_time:"2017-01-01",//更新时间
            editor:{
                id:"2",//编辑用户ID
                name:"name",//编辑用户名称
            }
        }]
    }
}


# 2、新建申请人
requestUrl=http://www.zhiq.wang/applicants;  
method=POST;    
request {
    //基本信息
    id:"1",//保存现有申请人时提供，新增申请人，请填写0或不提供
    type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
    name:"name",//申请人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    province:"province",//省份代码
    city:"city",//城市代码
    address:"address",//详细地址
    postcode:"postcode",//邮编
    fee_discount:"fee_discount",//费用备案 0未完成 1已完成
    //英文信息,非必须
    ename:"ename",//英文姓名
    eaddress:"eaddress",//英文地址    
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  

# 3、更新申请人
requestUrl=http://www.zhiq.wang/applicants/:id;  
method=PUT;    
request {
    //基本信息
    id:"1",//保存现有申请人时提供，新增申请人，请填写0或不提供
    type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
    name:"name",//申请人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    province:"province",//省份代码
    city:"city",//城市代码
    address:"address",//详细地址
    postcode:"postcode",//邮编
    fee_discount:"fee_discount",//费用备案 0未完成 1已完成
    //英文信息,非必须
    ename:"ename",//英文姓名
    eaddress:"eaddress",//英文地址    
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  

# 4、获取某个申请人详情信息
requestUrl=http://www.zhiq.wang/applicants/:id;  
method=GET;    
response {
    status:1,//1成功 0 失败
    info:"信息提示",
	applicant:{
		id:"1",//申请人ID
		area:"area",//地区代码
		type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
		type_text:"类型名称",
		name:"name",//申请人姓名
		ename:"ename",//英文姓名
		identity:"identity",//证件号码
		email:"email",//邮箱地址
		telephone:"telephone",//电话号码
		province:"province",//省份代码
		province_name:"省份名称",
		city:"city",//城市代码
		city_name:"城市名称",
		address:"address",//详细地址
		eaddress:"eaddress",//英文地址
		postcode:"postcode",//邮编
		status:"1",//提案状态，1-有效 0-禁用 -1已删除
		fee_discount:"fee_discount",//费用备案 0未完成 1已完成
		delete_time:"2017-01-01",//删除时间
		create_time:"2017-01-01",//创建时间
		update_time:"2017-01-01",//更新时间
		editor:{
			id:"2",//编辑用户ID
			name:"name",//编辑用户名称
		}
	}
}  

# 5、删除指定申请人
requestUrl=http://www.zhiq.wang/applicants/:id;  
method=DELETE;   
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  