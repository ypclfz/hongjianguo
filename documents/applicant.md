# 1、申请人列表
requestUrl=http://www.zhiq.wang/applicant/lists;  
method=POST/GET;  
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
    //英文信息
    ename:"ename",//英文姓名
    eaddress:"eaddress",//英文地址
    keyword:"关键字",//关键字
    page:"1",//页码
    pagesize:"20",//每页数据条数
    sort:[{field:"title",order:"asc"}],//field可能取值为以上字段外keyword,page,pagesize外的所有字段，asc升序，desc 降序
}

response {
    status:1,
    info:"信息提示",
    data:[
        {   id: '',
            type:"1",  //申请人类型5个人 3工矿企业 1大专院校 2科研单位 4事业单位
            name:"name",//申请人姓名
            identity:"identity",//证件号码
            area:"area",//地区代码
            province:"province",//省份代码
            city:"city",//城市代码
            address:"address",//详细地址
            postcode:"postcode",//邮编
            fee_discount:"fee_discount",//费用备案 0未完成 1已完成
            //英文信息
            ename:"ename",//英文姓名
            eaddress:"eaddress",//英文地址
        }
    ]
}


# 2、新建/保存申请人
requestUrl=http://www.zhiq.wang/applicant/save;  
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
    //英文信息
    ename:"ename",//英文姓名
    eaddress:"eaddress",//英文地址    
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  

# 3、删除指定专利
requestUrl=http://www.zhiq.wang/applicant/delete;  
method=POST/GET;   
request {
    id:"1",//要删除的申请人ID
}
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  