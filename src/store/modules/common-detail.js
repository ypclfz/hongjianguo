const patentUrl = 'requestUrl=http://www.zhiq.wang/project/get'; 
const response = {
    status: 1,//1成功 0 失败
    info:"信息提示",
    data:{
        detail:{
            id:"1",//案件ID
            serial:"22288",//案号
            area:["CN"],//地区
            type:"1",//案件类型 
            title:"验票机",
            entrust_date:"2017-07-07",//委案日
            application_date:"2017-07-07",//申请日
            public_date:"2017-07-07",//公开日
            issue_date:"2017-07-07",//授权日
            application_number:"2017302865763",//申请号
            public_number:"CN10452587A",//公开号
            issue_number:"CN104566A",//授权号
            applicant: ['1'],//申请人
            inventor: [
                { inventor: '1', percent: '50' },
                { inventor: '2', percent: '25' },
                { inventor: '3', percent: '25' },
            ],//发明人
            agency: '1',//代理机构
            agent: '1',//代理人
            status: '1',//状态
            proposer: ['1'],//提案人
            department: '1',//所属部门
            ipr: '1',//负责IPR
            tag:["标签一"],//标签
            class: '1',//技术分类
            remark: "remark",//备注
            project: '1',
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
            currency: "currency",//货币
            roe: "roe",//汇率
            amount:"amount",//人民币
            type:"type",//费用类型
            official:"official",//是否官费
            status:"status",//费用状态
            due_time:"due_time",//费用期限
            deadline:"deadline",//法定期限
            pay_time:"pay_time",//付款时间
            target:"target",//费用对象
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
};
const state = {
	type: '',
	data: null,
}

const getters = {
  detail_type: state=>state.type,
  detailBase: state=>state.data ? state.data.detail : null,
  detailTasks: state=>state.data ? state.data.tasks : [],
  detailNotices: state=>state.data ? state.data.notices : [],
  detailFees: state=>state.data ? state.data.fees : [],
  detailMails: state=>state.data ? state.data.mails : [],
  detailDocuments: state=>state.data ? state.data.documents : [],
}

const mutations = {
	setDetailType: (state, path)=>{
		const arr = ['patent', 'trademark', 'copyright'];
		for(let a of arr) {
			const reg = new RegExp(a);
			if(reg.test(path)) {
				state.type = a;
				break;
			}
		}
	},
	setDetailData: (state, data)=>{ state.data = data },
}

const actions = {
	refreshDetailData({ commit, state }, {id, func}) {
		if(state.type == 'patent') {
			setTimeout(function() {
				if( !response.status ) {
					commit('setDetailData', null);
				}else {
					commit('setDetailData', JSON.parse(JSON.stringify(response.data)));
				}
        if(func) {
          func();
        }
			},2000);
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}