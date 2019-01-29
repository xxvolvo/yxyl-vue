<template>
  <div>
    <Table :loading="loading" :columns="columns" :data="data"></Table>
    <div class="pagination">
      <Page
        :total="total"
        show-elevator
        show-sizer
        :transfer="transfer"
        :current="current"
        :page-size="pageSize"
        :nameSpace="nameSpace"
        @on-change="onChange"
        @on-page-size-change="onPageSizeChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: 'Tables',
    columns: {
      type: Array,
      default: () => []
    }, // 列
    data: {
      type: Array,
      default: () => []
    }, // 数据
    loading: {
      type: Boolean,
      default: false
    }, // 让表格处于加载中状态，在异步请求数据、分页时建议使用
    total: {
      type: Number,
      default: 10
    }, // 分页控件总数
    transfer: {
      type: Boolean,
      default: false
    }, // 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
    current: {
      type: Number,
      default: 1
    }, // 当前页
    pageSize: {
      type: Number,
      default: 10
    }, // 每页显示数量
    nameSpace: {
      type: String,
      default: ''
    },
    extend: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    onChange (page) {
      if (this.nameSpace) {
        this.$store.dispatch(`${this.nameSpace}/getList`, { page: page })
      } else {
        this.$emit('on-change', { currentPage: page })
      }
    },
    onPageSizeChange (pageSize) {
      if (this.nameSpace) {
        this.$store.commit(`${this.nameSpace}/setPageSize`, {
          pageSize: pageSize
        })
        this.$store.dispatch(`${this.nameSpace}/getList`, {
          page: this.current,
          data: this.extend
        })
      } else {
        this.$emit('on-page-size-change', { pageSize: pageSize })
      }
    }
  },
  mounted () {
    if (this.nameSpace) {
      this.$store.dispatch(`${this.nameSpace}/getList`, {
        page: this.current,
        data: this.extend
      })
    }
  }
}
</script>
<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>
