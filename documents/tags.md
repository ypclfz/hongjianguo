# 1、获取所有标签
接口URL:http://www.zhiq.wang/tag/lists;  
接口调用方式：post/get;  
@return json `{"status":1,"tags":[{"tag":"标签1","count":1},{"tag":"标签3","count":1},{"tag":"标签2","count":1}]}`，其中count表示被标记该标签的提案/专利的数量

# 2、给提案或专利打标签
接口URL: http://www.zhiq.wang/tag/save;  
接口调用方式：post;  
支持的参数：  
@param integer pid:提案/项目ID  
@param string tag:标签  
@return json  

# 3、删除专利或提案的标签
接口URL： http://www.zhiq.wang/tag/delete;   
接口调用方式：post;  
支持的参数：  
@param integer pid:提案/项目ID  
@param string tag:标签  
@return json 