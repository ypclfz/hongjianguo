import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Proposal from '@/components/page/Proposal'
import InventorList from '@/components/page/InventorList'
import ApplicantList from '@/components/page/ApplicantList'
import ProposalCommon from '@/components/page/ProposalCommon'
import CheckProposal from '@/components/page/CheckProposal'
import TaskCommon from '@/components/page/TaskCommon'
import PatentList from '@/components/page/PatentList'
import ApplyingPatent from '@/components/page/ApplyingPatent'
import PatentAdd from '@/components/page/PatentAdd'
import PatentStatistics from '@/components/page/PatentStatistics'
import NoticeCommon from '@/components/page/NoticeCommon'
import TrademarkList from '@/components/page/TrademarkList'
import TrademarkNotice from '@/components/page/TrademarkNotice'
import TrademarkStatistics from '@/components/page/TrademarkStatistics'
import CopyrightList from '@/components/page/CopyrightList'
import CopyrightAdd from '@/components/page/CopyrightAdd'
import UserList from '@/components/page/UserList'
import Technology from '@/components/page/Technology'
import Branch from '@/components/page/Branch'
import FeeCommon from '@/components/page/FeeCommon'
import InvoiceCommon from '@/components/page/InvoiceCommon'
import ClassificationCommon from '@/components/page/ClassificationCommon'
import MailList from '@/components/page/MailList'
import MailAdd from '@/components/page/MailAdd'
//###################
import CommonDetail from '@/components/page/CommonDetail'
import Babel from '@/components/page_extension/CommonDetail_base'
import Control from '@/components/page_extension/CommonDetail_control'
import Notice from '@/components/page_extension/CommonDetail_notice'
import Fee from '@/components/page_extension/CommonDetail_fee'
import Email from '@/components/page_extension/CommonDetail_email'
import Documents from '@/components/page_extension/CommonDetail_documents'
//#################

//-------------------设置 begin-----------------
import SettingAgency from '@/components/page/SettingAgency'
import SettingCase from '@/components/page/SettingCase'
import SettingJurisdiction from '@/components/page/SettingJurisdiction'
import SettingRule from '@/components/page/SettingRule'
import SettingTemplate from '@/components/page/SettingTemplate'
import SettingUser from '@/components/page/SettingUser'

//#################
import SettingIndividual from '@/components/page/SettingIndividual'
import SI_Base from '@/components/page_extension/SettingIndividual_base'
import SI_Notice from '@/components/page_extension/SettingIndividual_notice'
import SI_Email from '@/components/page_extension/SettingIndividual_email'

//#################
import SettingSystem from '@/components/page/SettingSystem'
import SS_Base from '@/components/page_extension/SettingSystem_base'
import SS_Email from '@/components/page_extension/SettingSystem_email'
import SS_Number from '@/components/page_extension/SettingSystem_number'
import SS_Case from '@/components/page_extension/SettingSystem_case'
import SS_Fee from '@/components/page_extension/SettingSystem_fee'
//-------------------设置 end---------------------

Vue.use(Router);
const router = new Router({
  routes: [
    //###重定向###
    { path: '/', redirect: '/statistics' },
    { path: '/proposal', redirect: '/proposal/list' },
    { path: '/task', redirect: '/task/pending' },
    { path: '/patent', redirect: '/patent/list' },
    { path: '/trademark', redirect: '/trademark/list' },
    { path: '/copyright', redirect: '/copyright/list' },
    //###重定向###
    {
      path: '/statistics',
      name: 'Home',
      component: Home
    },
    {
      path: '/inventorList',
      name: 'InventorList',
      component: InventorList
    },
    {
      path: '/applicantList',
      name: 'ApplicantList',
      component: ApplicantList
    },
    {
    	path: '/proposal/list',
    	name: 'Proposal',
    	component: Proposal
    },{
      path: '/proposal/add',
      name: 'ProposalCommon',
      component: ProposalCommon,
      alias: ['/proposal/detail', '/task/pending/proposal_check', '/proposal/edit'],
    },{
      path: '/task/pending/check',
      name: 'CheckProposal',
      component: CheckProposal
    },{
      path: '/task/pending',
      name: 'TaskPending',
      component: TaskCommon,
      meta: { 'status': 0 },
    },
    {
      path: '/task/pause',
      name: 'TaskPause',
      component: TaskCommon,
      meta: { 'status': -1 },
    },{
      path: '/task/finish',
      name: 'TaskFinish',
      component: TaskCommon,
      meta: { 'status': 1 },
    },{
      path: '/patent/list',
      name: 'PattentList',
      component: PatentList
    },{
      path: '/patent/applying',
      name: 'ApplyingPatent',
      component: ApplyingPatent
    },{
      path: '/patent/add',
      name: 'PatentAdd',
      component: PatentAdd,
      meta: { type: 'add' },
    },
    {
      path: '/patent/statistics',
      name: 'PatentStatistics',
      component: PatentStatistics,
    },{
      path: '/patent/notice',
      name: 'PatentNotice',
      meta: { type: 'patent' },
      component: NoticeCommon,
    },{
      path: '/trademark/list',
      name: 'TrademarkList',
      component: TrademarkList
    }, {
      path: '/trademark/notice',
      name: 'TrademarkNotice',
      component: TrademarkNotice
    },
    {
      path:'/trademark/statistics',
      name: 'TrademarkStatistics',
      component: TrademarkStatistics
    },
    {
      path: '/copyright/add',
      name: 'CopyrightAdd',
      meta: { pageType: 'add' },
      component: CopyrightAdd
    },
    {
      path: '/copyright/list',
      name: 'CopyrightList',
      component: CopyrightList
    },
    {
      path: '/copyright/list/detail/:id',
      redirect: '/copyright/list/detail__/:id',
    },
    {
      path: '/copyright/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: CopyrightAdd, meta: { pageType: 'edit' } },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/copyright/notice',
      name: 'CopyrightNotice',
      meta: { type: 'copyright' },
      component: NoticeCommon,
    },
    {
      path: '/userList',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/mailList',
      name: 'MailList',
      component: MailList,
    },
    {
      path: '/mailList/mailAdd',
      name: 'MailAdd',
      component: MailAdd,
    },
    {
      path: '/classification',
      name: 'Clssification',
      component: ClassificationCommon,
    },
    {
      path: '/product',
      name: 'Product',
      component: ClassificationCommon,
    },
    {
      path: '/branch',
      name: 'Branch',
      component: Branch,
    },
    {
      path: '/fee/income',
      name: 'FeeIncome',
      component: FeeCommon,
    },
    {
      path: '/fee/pay',
      name: 'FeePay',
      component: FeeCommon,
    },
    {
      path: '/fee/bill',
      name: 'FeeBill',
      component: InvoiceCommon,
    },
    {
      path: '/fee/payment',
      name: 'FeePayment',
      component: InvoiceCommon
    },
    {
      path: '/patent/list/detail/:id',
      redirect: '/patent/list/detail__/:id',
    },
    {
      path: '/patent/list/detail__/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'base',  },
        { path: 'base', component: PatentAdd, meta: {type: 'edit'} },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ]
    },
    {
      path: '/commonDetail/:id',
      component: CommonDetail,
      children: [
        { path: '', redirect: 'babel' },
        { path: 'babel', component: Babel },
        { path: 'control', component: Control },
        { path: 'notice', component: Notice },
        { path: 'fee', component: Fee },
        { path: 'email', component: Email },
        { path: 'documents', component: Documents },
      ],
    },
    { path: '/setting/agency', name: 'SettingAgency', component: SettingAgency },
    { path: '/setting/case', name: 'SettingCase', component: SettingAgency },
    { path: '/setting/individual', name: 'SettingIndividual', component: SettingIndividual },
    { path: '/setting/jurisdiction', name: 'SettingJurisdiction', component: SettingJurisdiction },
    { path: '/setting/rule', name: 'SettingRule', component: SettingRule },
    { path: '/setting/system', redirect: '/setting/system__' },
    { 
      path: '/setting/system__',
      component: SettingSystem,
      children: [
        { path: '', redirect: 'base' },
        { path: 'base', component: SS_Base },
        { path: 'case', component: SS_Case },
        { path: 'email', component: SS_Email },
        { path: 'fee', component: SS_Fee },
        { path: 'number', component: SS_Number },
      ] 
    },
    { path: '/setting/template', name: 'SettingTemplate', component: SettingTemplate },
    { path: '/setting/user', name: 'SettingUser', component: SettingUser },
  ]
});
router.beforeEach((to, from, next)=>{
  const store = this.a.app.$store;
  if(store) {
    store.commit('clearScreen');
  }
  next();
});
export default router
