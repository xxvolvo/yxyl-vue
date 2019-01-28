<template>
  <div>
    <Tables :loading="loading" :columns="columns" :data="data"></Tables>
  </div>
</template>
<script>
import Tables from "_c/tables";
export default {
  name: "level2-2_1",
  data() {
    return {
      loading:false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        { title: "Name", key: "name", align: "center" },
        { title: "Age", key: "age", align: "center" }
      ],
      data: [{ name: "x", age: 1 }, { name: "y", age: 2 }]
    };
  },
  components: {
    Tables
  }
};
</script>
</script>
