<template>
      <full-calendar :events="visits" :config="config" @event-selected="eventSelected" @view-render="handleDateClick"/>
</template>

<script>
    import 'fullcalendar/dist/locale/ru';
    import { bus } from '@/assets/bus.js'
    import * as visits from '@/api/visits';
    export default {
      name: 'Calendar',
      data() {
        return {
          config: {
            weekends: false,
            minTime: "08:00:00",
            maxTime: "18:00:00",
            slotDuration: '00:10',
            allDaySlot: false,
            defaultView:"agendaDay",
            locale: 'ru',
            height: "auto",
            editable: false,
            header: {
              left: 'myCustomButton',
              center: 'prev title next',
              right: 'agendaDay,agendaWeek,month today addEventButton'
            },
            customButtons: {
              myCustomButton: {
                text: 'Фильтр',
                click: function() {
                  bus.$emit('visit-open-doctor-filter', true);
                }
              },
              addEventButton: {
                text: '+ Прием',
                click: function() {
                  bus.$emit('mega-visit', true);
                }
              }
            },
          },
          visits: []
        }
      },
      methods: {
        fetchVisits(date_start, date_end){
            let vm = this;
            vm.loading = true;
            visits.request.r({'date_start': date_start, 'date_end': date_end}).then(res => { 
                try {
                  vm.visits = res.data.data.items;
                } catch (error) {
                    
                }
                vm.loading = false;
            });
        },
        refreshEvents() {
          this.$refs.calendar.$emit('refetch-events')
        },
        eventSelected(event, jsEvent, view) {
          //console.log(event);
        },
        handleDateClick(view) {
          this.fetchVisits(view.start._i, view.end._i)
        }
      },
      created() {
        this.fetchVisits();
      }
    }
</script>

<style scoped>
    .red {
      background: rgb(235, 77, 77) !important;
      color: whitesmoke !important;
    }
    .blue {
      background: rgb(59, 59, 163) !important;
      color: whitesmoke !important;
    }
    .orange {
      background: orange !important;
      color: white !important;
    }
    .green {
      background: rgb(49, 155, 49) !important;
      color: white !important;
    }
    .blue,
    .orange,
    .red,
    .green {
      font-size: 13px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .event-item {
      padding: 2px 0 2px 4px !important;
    }
</style>