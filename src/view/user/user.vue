<template>
  <div>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      @on-change="Change"
      :current="current"
      :pageSize="pageSize"
      @on-page-size-change="onPageSizeChange"
    ></Tables>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { mapMutations, mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { title: '名字', key: 'name', align: 'center' },
        { title: '状态', key: 'isActive', align: 'center' }
      ]
    }
  },
  components: {
    Tables
  },
  computed: {
    ...mapState({
      data: state => state.user.list,
      totalCount: state => state.user.totalCount,
      loading: state => state.user.loading,
      pageSize: state => state.user.pageSize
    }),
    current: {
      get () {
        return this.$store.state.user.currentPage
      },
      set (value) {
        this.$store.commit('user/currentPage', value)
      }
    }
  },
  methods: {
    ...mapMutations('user', ['setCurrentPage', 'setPageSize']),
    ...mapActions('user', ['getAll']),
    Change ({ currentPage }) {
      this.getAll({ page: currentPage })
    },
    onPageSizeChange ({ pageSize }) {
      this.setPageSize({ pageSize })
      this.getAll({ page: this.current })
    }
  },

  mounted () {
    this.$store.dispatch('user/getAll', { page: this.current })
  }
}
</script>
</script>
