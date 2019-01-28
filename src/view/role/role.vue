<template>
  <div>
    <Tables
      :loading="loading"
      :columns="columns"
      :data="data"
      :total="totalCount"
      @on-change="Change"
      :current="current"
    ></Tables>
  </div>
</template>
<script>
import Tables from "_c/tables";
import { mapMutations, mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
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
      current: state => state.role.currentPage
    })
  },
  methods: {
    Change(currentPage) {
      this.$store.commit("setCurrentPage", { currentPage });
      this.$store.dispatch("getAll", { page: currentPage });
    }
  },
  mounted() {
    this.$store.dispatch("getAll", { page: this.current });
  }
};
</script>
</script>
