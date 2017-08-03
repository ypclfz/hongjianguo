# 1、获取流程列表(业务逻辑过于复杂，改由其他接口实现)
requestUrl:http://www.zhiq.wang/flows;  
method：GET; 
response {
    status:1,
    info:"信息提示",
    flows:[{
		id:"id",
		name:"name",
		description:"description",
		nodes:[{
			id:"id",
			name:"name",
			fields:['agency'],//完成任务表单中需要附加的字段
			action:"patents/edit",//当值非"normal"时，在操作栏显示额外的操作入口，指向action代表的链接，初始定义如下：proposals/edit 提案编辑 patents/edit 专利编辑
			action_name:"操作名称",//当action值非"normal"，操作入口的链接名称
			next:[2,3],//在任务界面选择完成任务时，下一阶段的可见选项，任务接口返回的任务列表数据内有flow_id及flow_node_id字段，flow_id对应本接口的id，本接口返回的数据中每一个flow_id对应有多个节点,flow_node_id用来匹配节点的id,从而可以获取当前任务节点下一阶段的可见选项
			end:0,//1-表示是结束节点，该节点被选择时，隐藏除下一阶段外的所有字段，且不再校验这些字段
			agent_url:"url",//该字段是完成任务表单下一阶段承办人的搜索接口URL
		}]
	}]
}
