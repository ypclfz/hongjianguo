<template>
  <div class="main">
    <patent-detail type='edit' v-if="detail_type == 'patent'"></patent-detail>
  </div>
</template>

<script>
import PatentDetail from '@/components/page/PatentAdd'

export default {
  name: 'babel',
  data () {
		return {

		}
  },
  computed: {
    detail_type () {
      return this.$store.getters.detail_type;
    }
  },
  components: { PatentDetail },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>