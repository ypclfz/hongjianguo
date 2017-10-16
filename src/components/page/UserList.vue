<template>
  <div class="main">
  	
			<div class="left">

				<group v-model="current_group" ref="group"></group>

			</div>
			<div class="right">
				<app-collapse col-title="用户组详情" default-close>
					<ul style="margin: 0; padding-left: 15px; list-style: none; font-size: 14px">
						<li style="margin-bottom: 20px"><span>用户组名称：</span><span>{{ group_name }}</span></li>
						<li><span>用户组描述：</span><span>{{ group_description }}</span></li>
					</ul>
				</app-collapse>
				<table-component @refreshTableData="refreshTableData" :tableOption="tableOption" :data="tableData" ref="table">
					<!-- <user-role v-model="user_role" slot="userRole" default style="width: 200px; margin-left: 5px;"></user-role> -->
				</table-component>
  		</div>
	
  	<pop :popType="popType" :group="current_group" @refresh="refresh" ref="pop"></pop>
  	
  	<el-dialog title="将所选用户添加至用户组" :visible.sync="dialogVisible" :close-on-click-modal="false">
			<el-form label-width="100px">
				<el-form-item label="用户组">
					<static-select type="group" v-model="to_group"></static-select>
				</el-form-item>
				<el-form-item style="margin-bottom: 0;">
					<el-button type="primary" @click="toGroup">添加</el-button>
					<el-button @click="dialogVisible = false">取消</el-button>
				</el-form-item>
			</el-form>
  	</el-dialog>
  </div>
</template>

<script>
import AxiosMixins from '@/mixins/axios-mixins'
import AppCollapse from '@/components/common/AppCollapse'

import AppTree from '@/components/common/AppTree'
import TableComponent from '@/components/common/TableComponent'
import Group from '@/components/page_extension/UserList_group'
import Pop from '@/components/page_extension/UserList_pop'
import UserRole from '@/components/form/UserRole'
import StaticSelect from '@/components/form/StaticSelect'

const URL = 'api/members'
const URL_GROUP = 'api/groups'

export default {
  name: 'userList',
  mixins: [ AxiosMixins ],
  data () { 
		return {
		  formLabelWidth: '100px',
		  popType: '',
		  tableOption: {
		  	'header_btn': [
		  		{ type: 'add', label: '添加用户', click: this.addPop },
		  		{ type: 'control', label: '字段' },
		  		{},
		  	],
		  	'height': 'default',
		  	// 'header_slot': [ 'userRole' ],
		  	columns: [
		  		{ type: 'selection' },
		  		{ type: 'text', label: '用户名', prop: 'username', width: '200' },
		  		{ type: 'array', label: '所属用户组', prop: 'groups', width: '200', render: _=>_.map(_=>_.name) },
		  		// { type: 'text', label: '用户角色', prop: 'role_name', width: '200' },
		  		{ type: 'text', label: '昵称', prop: 'name', width: '200' },
		  		{ type: 'text', label: '邮箱', prop: 'email', width: '200' },
		  		{ type: 'text', label: '手机号', prop: 'mobile', width: '200' },
		  		{ type: 'text', label: '微信号', prop: 'weixin', width: '200' },
		  		{ type: 'text', label: 'QQ', prop: 'qq', width: '200' },
		  		{ 
		  			type: 'action', label: '操作', width: '150px',
		  			btns: [
		  				{ type: 'edit', click: this.editPop },
		  				{ type: 'delete', click: this.deleteSingle }
		  			],
		  		},
		  	]
		  },
			treeOption: {
	      data: [{
	        label: '部门1',
	        type: 'department',
	        children: [{
	          label: '部门1-1',
	          type: 'department',
	          children: [{
	            label: '部门1-1-1',
	            type: 'department'
	          }]
	        }]
	      }],
	      props: {
	        children: 'children',
	        label: 'label',
	      }
			},
			tableData: [],
			current_group: '',
			to_group: '',
			dialogVisible: false,
			user_role: '',
		};
	},
	computed: {
		group_id () {
			return this.current_group ? this.current_group.id : ''; 
		},
		group_name () {
			return this.current_group ? this.current_group.name : '暂未选择用户组';
		},
		group_description () {
			return this.current_group 
				? this.current_group.description
					?  this.current_group.description : '暂无用户组描述'
				: '暂未选择用户组';
		},
		groupId () {
			if(this.$route.params.groupId) {
				return this.$route.params.groupId;
			}else {
				return null;
			}
		}
	},
	methods: {
	//true代表选择全部用户,false代表选择某个用户组
    refreshTableOption (flag) {
    	const h = this.tableOption.header_btn;
    	const one = { type: 'add', label: '添加至用户组',  click: this.toGroupPop };
    	const two = { type: 'delete', label: '移出当前用户组', click: this.removeGroup };
    	if(flag) {
    		h.splice(2,1,one);
    	}else {
    		h.splice(2,1,two);
    	}
    },
		addPop () {
			this.popType = 'add';
			this.$refs.pop.show();
		},
		editPop (row) {
			this.popType = 'edit';
			this.$refs.pop.show(row);
		},
		toGroupPop () {
			const s = this.$refs.table.tableSelect;
			if( s.length == 0 ) {
				this.$message({ message: '请选择需要添加的用户', type: 'warning' });
				return false;
			}
				
			this.to_group = '';
			this.dialogVisible = true;
		},
		toGroup () {
			const ids = this.$refs.table.tableSelect.map(_=>_.id);
			const params = this.$tool.getUrlParams({ ids }); 
			const url = `${URL_GROUP}/${this.to_group}/members?${params}`;
			const success = _=>{
				this.$message({message: '添加用户至用户组成功', type: 'success'});
				this.dialogVisible = false;
				this.refresh();
			}

			this.axiosPut({url, success});

		},
		removeGroup () {
			const s = this.$refs.table.tableSelect;
			if( s.length == 0 ) {
				this.$message({ message: '请选择需要移除的用户', type: 'warning' });
				return false;
			}

			this.$confirm('确认将所选用户从当前用户组移出吗？')
				.then(()=>{
					const url = `${URL_GROUP}/${this.group_id}/members`;
					const ids = this.$refs.table.tableSelect.map(_=>_.id);
					const data = { ids };
					const success = _=>{
						this.$message({message: '移除成功', type: 'success'});
						this.dialogVisible = false;
						this.refresh();
					}

					this.axiosDelete({url, data, success}); 
				})
				.catch(()=>{});
		},
		deleteSingle ({username, id}) {
			const url = `${URL}/${id}`;
			const success = _=>{ 
				this.$message({message: '删除用户成功！', type: 'success'});
				this.update();
				this.refreshGroup();
			};

			this.$confirm(`删除后不可恢复，确认删除用户‘${username}’？`)
				.then(_=>{
					this.axiosDelete({url, success});
				})
				.catch(_=>{});
		},
		refreshTableData (option) {
			const url = URL;
			const group = this.group_id == 0 ? {} : { group: this.group_id };
			const role = this.user_role == '' ? {} : { role: this.user_role };
			const data = Object.assign({},group,option,role);
			const success = _=>{ this.tableData = _.members };
			
			this.axiosGet({url, data, success})
		},
		refresh (str) {
 			this.$refs.table.refresh();
			if(str != 'noGroup') {
				this.refreshGroup();
			}
		},
		refreshGroup () {
			this.$store.dispatch('refreshGroup');
			this.$store.dispatch('refreshIpr');
		},
		update () {
			this.$refs.table.update();
		}
	},
  watch: {
  	group_id (val) {
  		this.refreshTableOption(val == 0);
  		this.refresh('noGroup');
  	},
  },
  mounted () {
  	if(this.groupId) {
  		this.$refs.group.handleCurrentChange(this.groupId);
  	}
  },
  components: { AppTree, TableComponent, Group, Pop, AppCollapse, StaticSelect, UserRole },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>