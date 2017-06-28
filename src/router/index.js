import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/page/Home'
import Proposal from '@/components/page/Proposal'
import AddProposal from '@/components/page/AddProposal'
import CheckProposal from '@/components/page/CheckProposal'
import PendingTask from '@/components/page/PendingTask'
import AppliedPatent from '@/components/page/AppliedPatent'
import ApplyingPatent from '@/components/page/ApplyingPatent'
import AddPatent from '@/components/page/AddPatent'
import PatentDetail from '@/components/page/PatentDetail'
import TrademarkList from '@/components/page/TrademarkList'
import TrademarkNotice from '@/components/page/TrademarkNotice'
import TrademarkStatistics from '@/components/page/TrademarkStatistics'
import CopyrightList from '@/components/page/CopyrightList'
import UserList from '@/components/page/UserList'

Vue.use(Router);
export default new Router({
  routes: [
    //###重定向###
    {
      path: '/', redirect: '/statistics'
    },
    {
      path: '/proposal', redirect: '/proposal/list'
    },
    {
      path: '/task', redirect: '/task/pending'
    },
    {
      path: '/patent', redirect: '/patent/applying'
    },
    {
      path: '/trademark', redirect: '/trademark/list'
    },
    //###重定向###
    {
      path: '/statistics',
      name: 'Home',
      component: Home
    },{
    	path: '/proposal/list',
    	name: 'Proposal',
    	component: Proposal
    },{
      path: '/proposal/add',
      name: 'AddProposal',
      alias: ['/proposal/list/edit'],
      component: AddProposal
    },{
      path: '/task/pending/check',
      name: 'CheckProposal',
      component: CheckProposal
    },{
      path: '/task/pending',
      name: 'PendingTask',
      component: PendingTask
    },{
      path: '/patent/applied',
      name: 'AppliedPatent',
      component: AppliedPatent
    },{
      path: '/patent/applying',
      name: 'ApplyingPatent',
      component: ApplyingPatent
    },{
      path: '/patent/add',
      name: 'AddPatent',
      component: AddPatent,
    },{
      path: '/patent/detail',
      name: 'PatentDetail',
      component: PatentDetail,
      alias: ['/patent/applying/detail', '/patent/applied/detail']
    },{
      path: '/trademark/list',
      name: 'TrademarkList',
      component: TrademarkList
    }, {
      path: '/trademark/notice',
      name: 'TrademarkNotice',
      component: TrademarkNotice
    }, {
      path:'/trademark/statistics',
      name: 'TrademarkStatistics',
      component: TrademarkStatistics
    }, {
      path: '/copyright/list',
      name: 'CopyrightList',
      component: CopyrightList
    }, {
      path: '/userList',
      name: 'UserList',
      component: UserList,
    },
  ]
})
