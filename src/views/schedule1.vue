<style scoped>

</style>

<template>
  <div>
    <el-row>
      <full-calendar :events="events" :config="config"></full-calendar>
    </el-row>
  </div>
</template>

<script>
import 'fullcalendar/dist/locale/ru';
import 'fullcalendar/dist/fullcalendar.css'
export default {
  data() {
    return {
      events: [
        {
            title  : 'event1',
            start  : '2018-12-11',
        },
        {
            title  : 'event2',
            start  : '2018-12-12',
            end    : '2018-12-13',
        },
        {
            title  : 'event3',
            start  : '2018-12-14T12:30:00',
            allDay : false,
        },
        {
            title  : 'event4',
            start  : '2018-12-14T12:30:00',
            allDay : '2018-12-12T18:30:00',
        },
      ],
      config: {
        weekends: false,
        minTime: "08:00:00",
        maxTime: "18:00:00",
        locale: 'ru',
        height: "auto",
      },
    };
  },
  methods: {

  },
  mounted: () => {
  }
};
</script>
