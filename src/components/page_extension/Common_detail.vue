<template>
  <app-shrink :title="title" :visible=visible @update:visible="handleVisible">
    <span slot="header" style="float: right">
      <el-button size="small" type="primary" @click="edit">保存</el-button>
    </span>
    <div  v-loading="detailLoading && visible" :element-loading-text="config.loadingText" :style="divStyle">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="base">
    			<detail-patent page-type="edit" v-if="type == 'patent'" @editSuccess="editSuccess" ref="patent"></detail-patent>
          <detail-copyright page-type="edit" v-if="type == 'copyright'" @editSuccess="editSuccess" ref="copyright"></detail-copyright>
        </el-tab-pane>
        <el-tab-pane label="流程管理" name="control">
    			<detail-control></detail-control>
        </el-tab-pane>
        <el-tab-pane label="官方来文" name="notice">
    			<detail-notice></detail-notice>
        </el-tab-pane>
        <el-tab-pane label="所有费用" name="fourth">
    			<detail-fee></detail-fee>
        </el-tab-pane>
        <el-tab-pane label="往來邮件" name="fee">
    			<detail-email></detail-email>
        </el-tab-pane>
        <el-tab-pane label="文档" name="documents">
    			<detail-documents></detail-documents>
        </el-tab-pane>
      </el-tabs>
    </div>
  </app-shrink>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'
import DetailPatent from '@/components/page/PatentAdd'
import DetailCopyright from '@/components/page/CopyrightAdd'
import DetailControl from '@/components/page_extension/CommonDetail_control'
import DetailNotice from '@/components/page_extension/CommonDetail_notice'
import DetailFee from '@/components/page_extension/CommonDetail_fee'
import DetailEmail from '@/components/page_extension/CommonDetail_email'
import DetailDocuments from '@/components/page_extension/CommonDetail_documents'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
const config = [
	['patent', {
		loadingText: '加载专利信息中...',
	}],
	['copyright', {
		loadingText: '加载版权信息中...',
	}]
];
const map = new Map(config);

export default {
  name: 'commonDetailShrink',
  props: {
    'type': String,
    'id': Number,
    'visible': {
      type: Boolean,
      default: false,
    },
    'title': String,
  },
  data () {
		return {
		  activeName: 'base',
      rendered: false,
		}
  },
  computed: {
    ...mapGetters([
      'shrinkHeight',
      'detailLoading'
    ]),
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	},
    divStyle () {
      let s = '';
      if(this.detailLoading) {
        s=`height: ${this.shrinkHeight}px; overflow: hidden;`;
      }

      return s;
    }
  },
  methods: {
    ...mapActions([
      'refreshDetailData',
    ]),
    refreshDetail () {
      if(!this.type) return;

      const type = this.type;
      const id = this.id;
      this.$store.commit('setDetailType', type);

      this.refreshDetailData({ id });
    },
    edit () {
      
      if(this.$refs.patent) {
        this.$refs.patent.edit();
      }

      if(this.$refs.copyright) {
        this.$refs.copyright.edit();
      }
    },
    editSuccess () {
      this.refreshDetailData();
      this.$emit('update:visible', false);
      this.$emit('editSuccess');
    },
    handleVisible (val) {
      this.$emit('update:visible', val);
    }
  },
  watch: {
  	id () {
      if(this.type) {
  		  this.refreshDetail();
      }else {
        this.$emit('update:visible', false);
      }
  	}
  },
  components: {
    AppShrink,
    DetailPatent,
    DetailCopyright,
  	DetailControl,
  	DetailNotice,
  	DetailFee,
  	DetailEmail,
  	DetailDocuments,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>