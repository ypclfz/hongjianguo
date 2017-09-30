<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="base">
  			<detail-patent page-type="edit" v-if="type == 'patent'"></detail-patent>
        <detail-copyright page-type="edit" v-if="type == 'copyright'"></detail-copyright>
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
</template>

<script>
import DetailPatent from '@/components/page/PatentAdd'
import DetailCopyright from '@/components/page/CopyrightAdd'
import DetailControl from '@/components/page_extension/CommonDetail_control'
import DetailNotice from '@/components/page_extension/CommonDetail_notice'
import DetailFee from '@/components/page_extension/CommonDetail_fee'
import DetailEmail from '@/components/page_extension/CommonDetail_email'
import DetailDocuments from '@/components/page_extension/CommonDetail_documents'
import {mapActions} from 'vuex'
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
  props: ['type', 'id'],
  data () {
		return {
		  loading: true,
		  activeName: 'base',
		}
  },
  computed: {
  	config () {
  		const config = map.get(this.type);
  		return config ? config : this.type;
  	}
  },
  methods: {
    ...mapActions([
      'onShrinkLoading', 
      'offShrinkLoading',
      'refreshDetailData',
    ]),
    refreshDetail () {
      const type = this.type;
      const id = this.id;
      this.$store.commit('setDetailType', type);
      const func = _=>{ 
        this.offShrinkLoading();
      };

      this.onShrinkLoading(this.config.loadingText);
      this.refreshDetailData({ id, func });
    },
  },
  created () {
  	this.refreshDetail();
  },
  watch: {
  	id () {
  		this.refreshDetail();
  	}
  },
  components: {
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