# 1、新增或保存提案
接口URL:http://www.zhiq.wang/proposal/save;  
接口调用方式：post;  
需要的参数：  
@param string title(必须),标题,不能超过150个字符  
@param string abstract(必须),摘要,不能超过1000字符  
@param array attachments(必须),文件ID数组  
@param integer proposer(必须）,提案人
@param array inventors(可选),发明人ID数组  
@param array tags(可选），标签数组


# 2、获取提案列表
接口URL:http://www.zhiq.wang/proposal/lists;  
接口调用方式：post;  
支持的参数：  
@param integer page:分页号码，如果不提供，默认为1  
@param integer pagesize:分页数量，如果不提供默认为20  
@param integer status:提案状态,1-正常，0-暂停，-1 删除，如果不提供，默认值为1  
@param string keyword(可选）,关键字，支持标题、提案人姓名、摘要内容等字段的匹配    
@param string tag(可选）,标签  
@param integer proposer(可选）,提案人id  
@param integer inventor(可选)，发明人id  
@param date time(可选），提案时间，可以传入2017-01-01格式的字符串  
@param string sort_field(可选)，排序字段，可取的值为title(标题),proposer(提案人),status(提案状态),time(提案时间)，如果不提供默认为按提案时间逆序  
@param string sort(如果填写了sort_field，则sort必须填写), asc升序,desc降序  

# 3、获取指定提案详情信息
接口URL：http://www.zhiq.wang/proposal/lists;  
接口调用方式:post/get  
需要的参数：  
@param integer id,提案ID  
@return json {"status":1,"data":"data"},status为1表示获取成功，为0表示获取失败  

# 4、删除指定提案
接口URL：http://www.zhiq.wang/proposal/delete;  
接口调用方式:post/get  
需要的参数：  
@param integer id,提案ID  
@return json {"status":1,"data":{"id":8,"title":"title","abstract":"abstract","proposer":"红坚果","create_time":"2017-06-21 10:46:35","attachments":[{"id":2,"name":"说明书.pdf","url":"\/public\/uploads\/2015-08-19\/55d4273c8a175.pdf","downloadUrl":"\/file\/download\/id\/2\/pid\/8","ext":"pdf","size":"152KB","uploadUser":"红坚果","uploadTime":"2015-08-19 14:50:36"}],"inventors":[{"id":1,"name":"红坚果"},{"id":2,"name":"发明人1"},{"id":3,"name":"发明人2"}],"tags":["标签1","标签2","标签3"]}},status为1表示获取成功，为0表示获取失败  