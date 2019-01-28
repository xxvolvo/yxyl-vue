<template>
  <div>
    <Talbes></Talbes>
  </div>
</template>
<script>
import Talbes from "_c/tables";
export default {
  name: "level_1",
  data() {
    return {
      data: [{ title: "Name", key: "name" }, { title: "Age", key: "age" }]
    };
  }
};
</script>
