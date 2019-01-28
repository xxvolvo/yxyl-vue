<template>
  <div>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      @on-change="Change"
      :current="current"
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
      loading: state => state.role.loading
    })
  },
  methods: {
    ...mapMutations("role", ["setCurrentPage", "setPageSize"]),
    ...mapActions("role", ["getAll"]),
    Change({ currentPage }) {
      this.setCurrentPage({ currentPage });
      this.getAll({ page: currentPage });
    },
    onPageSizeChange({ pageSize }) {
      this.setPageSize({ pageSize });
      this.getAll({ page: this.current });
    }
  },
  mounted() {
    this.$store.dispatch("role/getAll", { page: this.current });
  }
};
</script>
</script>
