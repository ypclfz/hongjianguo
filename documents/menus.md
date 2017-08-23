# 1、菜单列表
requestUrl:http://www.zhiq.wang/menus;
method：GET;

response {
    status:1,
    info:"信息提示",
    menus[{
        type:"submenu",
        text:"专利",
        path:"/patents",
        display:"1",//0不显示 1-显示
    }]
}