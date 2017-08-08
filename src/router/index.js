import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Proposal from '@/components/page/Proposal'
import InventorList from '@/components/page/InventorList'
import ApplicantList from '@/components/page/ApplicantList'
import ProposalCommon from '@/components/page/ProposalCommon'
import CheckProposal from '@/components/page/CheckProposal'
import PendingTask from '@/components/page/PendingTask'
import PatentList from '@/components/page/PatentList'
import ApplyingPatent from '@/components/page/ApplyingPatent'
import PatentAdd from '@/components/page/PatentAdd'
import PatentDetail from '@/components/page/PatentDetail'
import PatentStatistics from '@/components/page/PatentStatistics'
import PatentNotice from '@/components/page/PatentNotice'
import TrademarkList from '@/components/page/TrademarkList'
import TrademarkNotice from '@/components/page/TrademarkNotice'
import TrademarkStatistics from '@/components/page/TrademarkStatistics'
import CopyrightList from '@/components/page/CopyrightList'
import UserList from '@/components/page/UserList'
import Technology from '@/components/page/Technology'
import Branch from '@/components/page/Branch'
import FeeCommon from '@/components/page/FeeCommon'
import InvoiceCommon from '@/components/page/InvoiceCommon'
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
    { path: '/patent', redirect: '/patent/applying' },
    { path: '/trademark', redirect: '/trademark/list' },
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
      name: 'PendingTask',
      component: PendingTask
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
    },{
      path: '/patent/detail',
      name: 'PatentDetail',
      component: PatentDetail,
      alias: ['/patent/applying/detail', '/patent/applied/detail']
    },
    {
      path: '/patent/statistics',
      name: 'PatentStatistics',
      component: PatentStatistics,
    },{
      path: '/patent/notice',
      name: 'PatentNotice',
      component: PatentNotice,
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
      path: '/copyright/list',
      name: 'CopyrightList',
      component: CopyrightList
    }, 
    {
      path: '/userList',
      name: 'UserList',
      component: UserList,
    },
    {
      path: '/tclass',
      name: 'Technology',
      component: Technology,
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
      path: 'fee/payment',
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
        { path: '', redirect: 'base' },
        { path: 'base', component: PatentAdd },
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
      alias: ['/patent/list/detail/:id', '/trademark/list/detail/:id', '/copyright/list/detail/:id']
    },
    { path: '/setting/agency', name: 'SettingAgency', component: SettingAgency },
    { path: '/setting/case', name: 'SettingCase', component: SettingAgency },
    { path: '/setting/individual', redirect: '/setting/individual__' },
    { 
      path: '/setting/individual__',
      component: SettingIndividual,
      children: [
        { path: '', redirect: 'base' },
        { path: 'base', component: SI_Base },
        { path: 'email', component: SI_Email },
        { path: 'notice', component: SI_Notice },
      ] 
    },
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
