# 1、用户登陆
接口URL:http://www.zhiq.wang/index/login;  
接口调用方式：post;  
需要的参数：  
@param string username(必须),用户名  
@param string password(必须),密码  
@ return json {"status":1,"info":"info"} status 1 表示登陆成功 0表示登陆失败

# 2、用户登出
接口URL:http://www.zhiq.wang/member/logout;  
接口调用方式：post/get;
需要的参数：无
@ return json {"status":1,"info":"成功退出"} 

# 3、获取用户列表
接口URL:http://www.zhiq.wang/member/lists;  
接口调用方式：post/get;  
@param integer page:分页号码，如果不提供，默认为1  
@param integer listRows:分页数量，如果不提供默认为20  
@param string keyword(可选）,关键字，用于匹配用户姓名、email、手机等字段  
@param integer department(可选)，部门id   
@param string sort_field(可选)，排序字段，可取的值为nickname,mobile,email,department  
@param string sort(如果填写了sort_field，则sort必须填写), asc升序,desc降序  

# 4、新增/保存用户
接口URL:http://www.zhiq.wang/member/save;  
接口调用方式：post;  
@param integer uid, 用户ID，保存用户时提供  
@param string username（必须）,用户名  
@param string password（必须），密码  
@param string nickname（可选）,呢称  
@param string email（可选）,邮箱  
@param string mobile（可选）,手机号  
@param string weixin（可选）,微信号 
@param string qq（可选）,QQ   
@param integer department（可选）,部ID

# 5、获取指定用户信息
接口URL:http://www.zhiq.wang/member/get;  
接口调用方式：post/get;   
@param integer uid（必须）, 用户ID   
@ return json ["status"=>1,"user"=>$user];["status"=>0,"info"=>"用户不存在或被禁用"];

# 6、删除指定用户
接口URL:http://www.zhiq.wang/member/delete;  
接口调用方式：post/get; 
@param integer/array[integer] uid（必须）, 用户ID或用户ID数组  
@ return json ["status"=>1,"info"=>"删除用户成功"]; ["status"=>0,"user"=>"删除用户失败"];