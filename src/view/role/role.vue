<template>
  <div>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      :current="current"
      :pageSize="pageSize"
      :nameSpace="nameSpace"
    ></Tables>
  </div>
</template>
<script>
import Tables from '_c/tables'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      nameSpace: 'role',
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        { title: '名字', key: 'name', align: 'center' },
        { title: '状态', key: 'isStatic', align: 'center' }
      ]
    }
  },
  components: {
    Tables
  },
  computed: {
    ...mapState({
      data: state => state.role.list,
      totalCount: state => state.role.totalCount,
      loading: state => state.role.loading,
      pageSize: state => state.role.pageSize
    }),
    current: {
      get () {
        return this.$store.state.role.currentPage
      },
      set (value) {
        this.$store.commit('role/currentPage', value)
      }
    }
  }
}
</script>
</script>
