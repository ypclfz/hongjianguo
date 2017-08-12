# 1、新增邮件
requestUrl:http://www.zhiq.wang/mails;
method：POST;
request {
    subject:"邮件标题",
	to:"收件人邮箱地址", 多个用逗号或分号隔开
	cc:"抄送人邮箱地址",
	body:"邮件正文",
	mailbox:"邮箱",取值为0或2，其中0为保存草稿，2为保存至发件箱并发送
	attachments:[1,2],//附件
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 2、更新邮件
requestUrl:http://www.zhiq.wang/mails/:id;  
method：PUT;
request {
    subject:"邮件标题",
	to:"收件人邮箱地址", 多个用逗号或分号隔开
	cc:"抄送人邮箱地址",
	body:"邮件正文",
	mailbox:"邮箱",取值为0或2，其中0为保存草稿，2为保存至发件箱并发送
}
response {
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 3、邮件详情
requestUrl:http://www.zhiq.wang/mails/:id;  
method：GET;
reponse {
    status:1,//状态，0表示请求失败，1表示请求成功
    info:"提示信息",//status为0时才出现
    mail:{ //status为1时才出现
        id:"邮件ID",
        attach:"是否有附件",
        attachments:[{
			id:"附件ID"
			name:"名称",
			ext:"格式",
			size:"大小",
			viewUrl:"查看地址",
			downloadUrl:"下载地址",
		}],
        cc:"抄送",
        from:"发件人",
        mailBody:"邮件正文",
        mailbox:"邮箱",0-草稿 1-收件箱 2-发件箱
        projects:[{
			id:"案件ID",
			serial:"案号",
			title:"案件名称"
		}]
        read:"是否阅读",
        sent_time:"发送时间",
        subject:"邮件标题",
        to:"收件人",
        top:"是否置顶",
    }
}
						
# 4、删除邮件
requestUrl:http://www.zhiq.wang/mails/:id
method:DELETE;
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}


# 5、邮件列表
requestUrl:http://www.zhiq.wang/mails;
method：GET;
request {
    /* 通用参数开始 */
    page:"1",//分页，
    listRows:"20",//分页数量，默认值20
    status:0,//邮件状态，0-未付款 1-已付款
	
	ids:"邮件ID",多个排序采用逗号隔开
	mailbox:"邮箱",0草稿 1收件箱 2发件箱
	top:"是否置顶",
	read:"是否已读",
	sent_time:"邮件期限",//或者直接采用过滤器的id:thisweek,lastweek,thismonth,lastmonth,earlier

    //关键词在列表上方
    keyword:"关键词",//支持检索以下字段：邮件标题、发件人、收件人、抄送
    sort:"field-order",//field表示字段，取值为id/attach/cc/from/read/sent_time/subject/to/top order取值为asc（升序），desc（降序），多个排序采用逗号隔开
}
response {
    status:1,
    info:"信息提示",
    mails:{
        current_page:"1",//当前页码
		last_page:"2",//最后页码
		per_page:"20",//每页数量 
		total:"记录总数",
		data:[{
			id:"邮件ID",
			attach:"是否有附件",
			attachments:[{
				id:"附件ID"
				name:"名称",
				ext:"格式",
				size:"大小",
				viewUrl:"查看地址",
				downloadUrl:"下载地址",
			}],
			cc:"抄送",
			from:"发件人",
			mailBody:"邮件正文",
			mailbox:"邮箱",0-草稿 1-收件箱 2-发件箱
			projects:[{
				id:"案件ID",
				serial:"案号",
				title:"案件名称"
			}]
			read:"是否阅读",
			sent_time:"发送时间",
			subject:"邮件标题",
			to:"收件人",
			top:"是否置顶",
		}],
		filters:{
			senttime:[{
				name:"名称",
				count:"数量",
				id:"id"
			}],
		}
    }
}

# 6、邮件与案件列表进行关联
requestUrl:http://www.zhiq.wang/mails/:id/projects;
method：PUT;
request {
	ids:[1,2],//案件ID  
}
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

# 7、邮件与案件列表取消关联
requestUrl:http://www.zhiq.wang/mails/:id/projects;
method：DELETE;
request {
	ids:[1,2],//案件ID  
}
response{
    status:1, //状态，0表示请求失败，1表示请求成功
    info:"信息提示",
}

