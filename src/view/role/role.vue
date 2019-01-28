<template>
  <div>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      @on-change="Change"
      :current="current"
      :pageSize='pageSize'
      @on-page-size-change="onPageSizeChange"
    ></Tables>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        { title: "名字", key: "name", align: "center" },
        { title: "状态", key: "isStatic", align: "center" }
      ]
    };
  },
  components: {
    Tables
  },
  computed: {
    ...mapState({
      data: state => state.role.list,
      totalCount: state => state.role.totalCount,
      current: state => state.role.currentPage,
      loading: state => state.role.loading,
      pageSize: state => state.role.pageSize
    })
  },
  methods: {
    ...mapMutations("role", ["setCurrentPage", "setPageSize"]),
    ...mapActions("role", ["getAll"]),
    Change({ currentPage }) {
      this.getAll({ page: currentPage });
    },
    onPageSizeChange({ pageSize }) {
      this.setPageSize({ pageSize });
      this.getAll({ page: this.current });
    }
  },
  watch: {
    current: {
      deep: true,
      handler(value) {
        this.setCurrentPage({ currentPage: value });
      }
    }
  },
  mounted() {
    this.$store.dispatch("role/getAll", { page: this.current });
  }
};
</script>
</script>
