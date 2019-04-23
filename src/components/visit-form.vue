<template>
<el-dialog title="Запись на прием в АКО" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="visit" status-icon ref="visit" :rules="rules" class="demo-ruleForm" :label-position="labelPosition">
        <el-row>
          <el-col :span="7">
            <el-form-item label="Финансирование" prop="source_of_financing">
              <el-select v-model="visit.source_of_financing" placeholder="Финансирование" style="width: 100%;">
                <el-option
                  v-for="item in financing"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item label="Специализация">
              <el-select v-model="specialization" placeholder="Специализация" style="width: 100%;">
                <el-option
                  v-for="item in doctors"
                  :key="item.id"
                  :label="item.specialization"
                  :value="item.specialization">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="8">
            <el-form-item label="Врач" prop="doctor_id">
              <el-select v-model="visit.doctor_id" placeholder="Врач" style="width: 100%;">
                <el-option
                  v-for="item in filteringDoctors"
                  :key="item.id"
                  :label="item.doctorShortName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
              <el-form-item label="Дата приема">
                <el-date-picker
                style="width: 100%;"
                    v-model="date"
                    :picker-options="pickerOptions"
                    format="dd.MM.yyyy"
                    value-format="dd.MM.yyyy"
                    type="date"
                    placeholder="Дата">
                  </el-date-picker>
                  <span class="data_text" v-bind:style="{ color: activeColor}">{{data_text}}</span>
              </el-form-item>
          </el-col>
          <el-col :span="2">&nbsp;</el-col>
          <el-col :span="11">
            <el-form-item label="Время приема" prop="schedule_id">
              <el-select v-model="visit.schedule_id" filterable placeholder="Время" style="width: 100%;">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.date_start | parseTime('{h}:{i}')"
                  :value="item.id">
                  <span>{{ item.date_start | parseTime('{h}:{i}') }} - {{ item.date_end | parseTime('{h}:{i}') }}</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7">
            <el-form-item label="Фамилия" prop="last_name">
              <el-input type="text" v-model="visit.last_name" autocomplete="off" placeholder="Фамилия"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="7">
            <el-form-item label="Имя" prop="first_name">
              <el-input type="text" v-model="visit.first_name" autocomplete="off" placeholder="Имя"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="7">
             <el-form-item label="Отчество" prop="middle_name">
              <el-input type="text" v-model="visit.middle_name" autocomplete="off" placeholder="Отчество"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Телефон" prop="mobile">
          <el-input type="text" v-model="visit.mobile" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item style="text-align: center;">
          <el-button type="success" @click="submitForm('visit')" :loading="addLoading">Записать</el-button>
          <el-button @click="resetForm('visit')">Обновить</el-button>
        </el-form-item>
      </el-form>
</el-dialog>
    </template>
<script>
    var _ = require('lodash');
    import { bus } from '@/assets/bus.js'
    import * as doctors from "@/api/doctors";
    import * as schedules from '@/api/schedules';
    import * as visits from '@/api/visits';
    export default {
      name: 'EventForm',
      data(){
        return {
          addLoading: false,
          labelPosition: 'top',
          activeColor: '',
          options: [],
          data_text: 'Необходимо выбрать врача и дату!',
          doctors: [],
          schedules: [],
          financing: [
            {value: 1, name: 'ОМС'},
            {value: 2, name: 'ДМС'},
            {value: 3, name: 'Платный'},
          ],
          specialization: '',
          date: '',
          visit: {
            last_name: '',
            first_name: '',
            middle_name: '',
            schedule_id: '',
            source_of_financing: '',
            doctor_id: '',
            mobile: '',
          },
          rules: {
            last_name: [
              { required: true, message: 'Введите Фамилию ', trigger: 'blur' },
              { min: 3, max: 40, message: 'Длина должна быть от 3 до 40 символов', trigger: 'blur' }
            ],
            first_name: [
              { required: true, message: 'Введите Имя ', trigger: 'blur' },
              { min: 3, max: 40, message: 'Длина должна быть от 3 до 40 символов', trigger: 'blur' }
            ],
            middle_name: [
              { required: true, message: 'Введите Отчество ', trigger: 'blur' },
              { min: 3, max: 40, message: 'Длина должна быть от 3 до 40 символов', trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: 'Введите номер телефона ', trigger: 'blur' },
              { min: 7, max: 40, message: 'Длина должна быть от 7 до 13 символов', trigger: 'blur' }
            ],
            schedule_id: [
              { required: true, message: 'Выберите время приема', trigger: 'change' }
            ],
            doctor_id: [
              { required: true, message: 'Выберите врача', trigger: 'change' }
            ],
            source_of_financing: [
              { required: true, message: 'Выберите источник финансирования', trigger: 'change' }
            ],
          },
          dialogFormVisible: false,
          pickerOptions: {
          firstDayOfWeek:1,
          disabledDate(time) {
            // Отключена возможность выбрать текущую дату и прошлый период
            if(time.getTime() < Date.now()){
              return time.getTime() < Date.now();
            }
            // Отключаем субботы
            if((time.getDay() + 1) % 7 == 0){
              return true;
            }
            // Отключаем воскресенья
            if((time.getDay() + 1) == 1){
              return true;
            }
          },
          }
        }
      },
      watch: {
        // эта функция запускается при любом изменении вопроса
        date: function (newQuestion, oldQuestion) {
          this.data_text = 'Ожидаю, когда вы выберите дату...'
          this.debouncedGetAnswer()
        }
      },
      created(){
        bus.$on('mega-visit', (data)=>{
        // действия
            this.fetchDoctors();
            this.dialogFormVisible = data;
        });
        this.debouncedGetAnswer = _.debounce(this.fethSchedules, 500)
      },
      computed: {
        // Фильтр врача по специализации
        filteringDoctors: function(){
          let result = this.doctors
          if (!this.specialization)
            return result
          
          this.visit.doctor_id = ''
          
          const filterValue = this.specialization.toLowerCase()

          const filter = doctor => 
              doctor.specialization.toLowerCase().includes(filterValue)
          return result.filter(filter)
        }
        
      },
      methods: {
        fetchDoctors(){
          let vm = this;
          vm.loading = true;
          doctors.requestDoctors.r().then(res => {
            vm.doctors = res.data.data.items;
            vm.loading = false;
          });
        },
        async fethSchedules(){
           let vm = this;
           vm.loading = true;
           vm.activeColor = 'green';
           vm.data_text = 'Подбираю варианты...'
           vm.options = []
           vm.schedule_id = ''
           schedules.request.r({
             doctor_id: vm.visit.doctor_id,
             date: vm.date
           }).then(res => {
              vm.data_text = 'Варианты успешно подобраны'
              vm.options = res.data.data.items;
              vm.loading = false;
           }).catch(() => {
              vm.activeColor = 'red';
              vm.data_text = 'На текущую дату запись не возможна!'
           });
        },
        selectColor(color){
          this.visit = {
            ...this.visit,
            cssClass: color
          }
        },
        submitForm(formName) {
          let vm = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
                this.addLoading = true;
                //NProgress.start();
                let visit = Object.assign({}, this.visit);
                visits.add.r(visit).then(res => {
                vm.addLoading = false;
                //NProgress.done();
                vm.$message({
                    message: "Запись на прием создана успешно",
                    type: "success"
                });
                vm.resetForm(formName);
                vm.dialogFormVisible = false;
                }).catch(resp => {
                    vm.addLoading = false;
                    vm.$message.error("Произошла ошибка, проверьте правильность заполнения данных формы.");
                  });;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.visit = {
            last_name: '',
            first_name: '',
            middle_name: '',
            schedule_id: '',
            source_of_financing: '',
            doctor_id: '',
            mobile: '',
          }
        }
      }
    }
    </script>
    <style>
      .data_text{
        color: gray;
        font-size: 12px;
        text-align: center
      }
    </style>