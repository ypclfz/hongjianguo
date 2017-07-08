# 1、发明人列表
requestUrl=http://www.zhiq.wang/inventor/lists;  
method=POST/GET;  
request {
    name:"name",//发明人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    mobile:"mobile",//手机
    email:"email",//邮箱
    public_name:"public_name",//不公开姓名   
    name_en:"name_en",//英文姓名

    page:"1",//页码
    pagesize:"20",//每页数据条数
    sort:[{field:"title",order:"asc"}],//field可能取值为以上字段外keyword,page,pagesize外的所有字段，asc升序，desc 降序
}

response {
    status:1,
    info:"信息提示",
    data:[
        {
            name:"name",//发明人姓名
            identity:"identity",//证件号码
            area:"area",//地区代码
            mobile:"mobile",//手机
            email:"email",//邮箱
            public_name:"public_name",//不公开姓名   
            name_en:"name_en",//英文姓名
        }
    ]
}


# 2、新建/保存发明人
requestUrl=http://www.zhiq.wang/inventor/save;  
method=POST;    
request {
    //基本信息
    id:"1",//保存现有发明人时提供，新增发明人，请填写0或不提供
    name:"name",//发明人姓名
    identity:"identity",//证件号码
    area:"area",//地区代码
    mobile:"mobile",//手机
    email:"email",//邮箱
    public_name:"public_name",//不公开姓名   
    name_en:"name_en",//英文姓名
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  

# 3、删除指定发明人
requestUrl=http://www.zhiq.wang/inventor/delete;  
method=POST/GET;   
request {
    id:"1",//要删除的发明人ID
}
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  