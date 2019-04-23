<style>

</style>

<template>
  <div>
    <h4>Количество товаров</h4>
    <p>Всего <strong>{{list.length}}</strong> шт</p>
  </div>
</template>

<script>
import * as goods from '../api/goods';

export default {
  data() {
    return {
      list: []
    }
  },
  methods: {
    fetchData: function(){
      let vm = this;
      // Время выполнения задачи оценки запросов
      goods.request.r().then((res) => {
        vm.list = res.data.content;
      })
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
