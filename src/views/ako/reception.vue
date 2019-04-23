<template>
      <div id="app">
        <div class="main">
          <div class="calendar-holder">
            <calendar/>
          </div>
          <div class="form-holder">
            <visit-filter-doctor />
            <visit-form />
          </div>
        </div>
      </div>
    </template>
    <script>
    import Calendar from '@/components/calendar.vue'
    import VisitForm from '@/components/visit-form.vue'
    import VisitFilterDoctor from '@/components/visit-filter-doctor.vue'
    import { bus } from '@/assets/bus.js'
    import * as visits from '@/api/visits';
    export default {
      name: 'app',
      components: {
        Calendar,
        VisitForm,
        VisitFilterDoctor
      },
      data(){
        return {
          visits: [{
            title     :  'visit1',
            start     : '2019-04-17',
            backgroundColor  : '#ca992c',
            borderColor: 'red',
            YOUR_DATA : {},
            school: '2'
          },
          {
            title     : 'visit2',
            start     : '2019-04-18 10:00',
            end       : '2019-04-18 10:20',
            backgroundColor  : 'orange',
            borderColor: 'orange',
            school: '2'
          },
          {
            title     : 'ОМС Пациент: Иванова Софья Ивановна    Врач: Баранова М.В.',
            start     : '2019-04-18 10:00',
            end       : '2019-04-18 10:20',
            backgroundColor  : 'green',
            borderColor: 'green',
            data: {
              description: 'Вривет это событие'
            }
          }],
          formVisible: false 
        }
      },
    }
    </script>
    <style>
    .main {
      /*display: flex;*/
      align-items: center;
    }
    .main .fc-addVisitButton-button.fc-state-default{
       background: green;
       color: #fff;
    }
   
    </style>