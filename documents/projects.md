# 1、专利列表
requestUrl=http://www.zhiq.wang/project/lists;  
method=POST;  
request {
    category:"1",  //案件类型patent  1 trademark 2  copyright 3 other 4 默认值 patent
    type:["1","2"], //案件次类型invention 1 utility 2 design  3 
    area:["CN","US"],  //申请地区类型，2位国家代码的数组
    serial:["22288"],  //案号
    title:"标题", //案件标题
    entrust_date_start:"2017-07-07", //委案日起始日期
    entrust_date_end:"2017-07-07", //委案日结束日期
    application_date_start:"2017-07-07", //申请日起始日期
    application_date_end:"2017-07-07", //申请日结束日期
    public_date_start:"2017-07-07", //公开日起始日期
    public_date_end:"2017-07-07", //公开日结束日期
    issue_date_start:"2017-07-07", //授权日起始日期
    issue_date_start:"2017-07-07", //授权日起始日期
    application_number:"2017302865763",//申请号
    public_number:"CN10452587A",//公开号
    applicant:["1"],//申请人ID数组
    inventor:["1"],//发明人ID数组
    agency:["1"],//代理机构ID数组
    agent:["1"],//代理人ID数组
    agency_serial:"19888",//代理所案号
    status:["1"],//案件状态数组
    proposer:["1"],//提案人ID数组
    department:"1",//部门ID
    ipr:["1"],//IPR ID数组
    tag:["tag1","tag2"],//标签数组
    class:"1",//分类ID
    keyword:"关键字",//关键字
    page:"1",//页码
    listRows:"20",//每页数据条数
    sort:[{field:"title",order:"asc"}],//field可能取值为以上字段外keyword,page,listRows外的所有字段，asc升序，desc 降序
}

response {
    status:1,
    info:"信息提示",
    data:[
        {
            id:"1:,//案件ID
            serial:"22288",//案号
            area:"CN",//地区
            type:"1",//案件类型 
            title:"	验票机",
            entrust_date:"2017-07-07",//委案日
            application_date:"2017-07-07",//申请日
            public_date:"2017-07-07",//公开日
            issue_date:"2017-07-07",//授权日
            applicaton_number:"2017302865763",//申请号
            public_number:"CN10452587A",//公开号
            issue_number:"CN104566A",授权号
            applicant:[{id:"id",name:"name"}],//申请人
            inventor:[{id:"id",name:"name"}],//发明人
            agency:{id:"id",name:"name"},//代理机构
            agent:{id:"id,name:"name"},//代理人
            status:{id:"id",name:"name"},//状态
            proposer:{id:"id",name:"name"},//提案人
            department:{id:"id",name:"name"},//所属部门
            ipr:{id:"id",name:"name"},//负责IPR
            tag:["tag1"],//标签
            class:{id:"id",name:"name"},//技术分类
            remark:"remark",//备注
        }
    ]
}


# 2、新建专利
requestUrl=http://www.zhiq.wang/project/save;  
method=POST;    
request {
    //基本信息
    id:"1",//保存现有专利时提供，新增专利，请填写0或不提供
    category:"1",  //案件类型patent  1 trademark 2  copyright 3 other 4 默认值 patent
    type:"1", //案件次类型invention 1 utility 2 design  3 
    area:["CN","US"],  //申请地区类型，2位国家代码的数组
    serial:["22288"],  //案号
    title:"标题", //案件标题
    project:"1",//项目ID
    attachments:["id"],//文件ID数组
    remark:"remark",//备注信息

    //部分、分类、申请人、发明人、提案人以及IPR
    department:"1",//部门ID
    tag:["tag1","tag2"],//标签数组
    class:"1",//分类ID
    applicant:["1"],//申请人ID数组
    inventor:["1"],//发明人ID数组
    proposer:["1"],//提案人ID数组
    ipr:"",//负责IPR ID

    //扩展信息
    application_date:"2017-07-07", //申请日
    public_date:"2017-07-07", //公开日
    issue_date:"2017-07-07", //授权日
    application_number:"2017302865763",//申请号
    public_number:"CN10452587A",//公开号
    issue_number:"CN1123231",//公告号
    relevance:[{id:"id",type:"type"}],//id 相关案件ID，type 相关类型，1 要求优先权，2分案申请，3部分连续案 4相同新型/发明 5相同项目产品 6要求同日送件

    //委案信息
    agency:"1",//代理机构ID
    agent:"1",//代理人ID
    due_time:"2017-08-01",//管控完成期限
}

response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  

# 3、获取指定专利详情信息
requestUrl=http://www.zhiq.wang/project/get;  
method=POST/GET;   
request {
    id:"1",//要获取信息的ID
}
response {
    status:1,//1成功 0 失败
    info:"信息提示",
    data:{
        detail:{
            id:"1:,//案件ID
            serial:"22288",//案号
            area:"CN",//地区
            type:"1",//案件类型 
            title:"	验票机",
            entrust_date:"2017-07-07",//委案日
            application_date:"2017-07-07",//申请日
            public_date:"2017-07-07",//公开日
            issue_date:"2017-07-07",//授权日
            applicaton_number:"2017302865763",//申请号
            public_number:"CN10452587A",//公开号
            issue_number:"CN104566A",授权号
            applicant:[{id:"id",name:"name"}],//申请人
            inventor:[{id:"id",name:"name"}],//发明人
            agency:{id:"id",name:"name"},//代理机构
            agent:{id:"id,name:"name"},//代理人
            status:{id:"id",name:"name"},//状态
            proposer:{id:"id",name:"name"},//提案人
            department:{id:"id",name:"name"},//所属部门
            ipr:{id:"id",name:"name"},//负责IPR
            tag:["tag1"],//标签
            class:{id:"id",name:"name"},//技术分类
            remark:"remark",//备注
        },
        tasks:[{
            id:"id",//任务ID
            name:"name",//任务名称
            start_time:"start_time",//开始时间
            end_time:"end_time",//结束时间
            due_time:"due_time",//指定期限
            deadline:"deadlin",//法定期限
            charger:"charger",//负责人
            status:"status",//状态
        }],
        notices:[{
            id:"id",//通知书ID
            name:"name",//通知书名称
            mail_date:"mail_date",//发文日
            mail_serial:"mail_serial",//发文序列号
            deadline:"deadline",//答复/费用期限
            view_url:"view_url",//直接打开URL，JPG、PDF等格式
            download_url:"download_url",//下载URL
            ext:"ext",//文件格式
        }],
        fees:[{
            id:"id",//费用ID
            name:"name",//费用名称
            fee:"fee",//费用金额
            currency,"currency",//货币
            roe,"roe",//汇率
            amount:"amount",//人民币
            type:"type",费用类型
            official:"official",//是否官费
            status:"status",//费用状态
            due_time:"due_time",//费用期限
            deadline:"deadline",//法定期限
            pay_time:"pay_time",//付款时间
            target:"target",费用对象
            remark:"remark",//费用备注
        }],
        mails:[{
            id:"id",//费用ID
            mail_date:"mail_date",//发送时间
            from:"sender",//发件人
            to:"to",//收件人
            subject:"subject",//邮件标题
            has_attachment:"has_attachment",//是否有附件
        }],
        documents:[{
            id:"id",
            name:"name",//文件名称
            remark:"remark",//文件备注
            upload_time:"upload_time",//上传时间
            upload_user:"upload_user",//上传用户
            view_url:"view_url",//直接打开URL，JPG、PDF等格式
            download_url:"download_url",//下载URL
            ext:"ext",//文件格式
        }]
    }
}

# 4、删除指定专利
requestUrl=http://www.zhiq.wang/project/delete;  
method=POST/GET;   
request {
    id:"1",//要删除的专利ID
}
response {
    status:1,//1成功 0 失败
    info:"信息提示",
}  