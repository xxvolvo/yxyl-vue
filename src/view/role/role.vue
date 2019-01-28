<template>
  <div>
    <Input v-model="test"/>
    <button @click="handleClick">点击</button>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      :current="current"
      :pageSize="pageSize"
      :nameSpace="nameSpace"
      :extend="extend"
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
        this.$store.state.role.currentPage = value
      }
    },
    test: {
      get () {
        return this.$store.state.role.extend.Keyword
      },
      set (value) {
        this.$store.state.role.extend.Keyword = value
        this.$store.commit('role/setCurrentPage', { currentPage: 1 })
      }
    },
    extend: {
      get () {
        return this.$store.state.role.extend
      }
    }
  },
  methods: {
    handleClick () {
      this.$store.dispatch('role/getAll', {
        page: this.current
      })
    }
  }
}
</script>
</script>
