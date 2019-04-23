<style scoped>
.operation{
    float: right;
}
.operation .el-dropdown-link {
    cursor: pointer;
    color: #405965;
}
.operation .el-icon-arrow-down {
    font-size: 12px;
}
.title{
    float: left;
    padding: 0 0.170em;
    font-size: 1.5em;
    font-weight: 200;
}
</style>

<template>
  <div>
    <el-row>
     <div class="title">Расписание врачей</div>
        <!-- Operations -->
        <div class="operation">
            <!-- <i class="el-icon-refresh"></i>
            <i class="el-icon-plus"></i> -->
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh"  v-has="[schedules.request]"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add"  v-has="[schedules.add]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
         <!-- list -->
         <!--Add dialog-->
		<el-dialog title="Создать новое расписание" :visible.sync="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" :rules="formRules" ref="addForm" label-width="120px" class="demo-addForm">
        <el-form-item label="Врач" prop="doctor">
          <el-select v-model="addForm.doctor" placeholder="Врач">
            <el-option
              v-for="item in doctors"
              :key="item.id"
              :label="item.doctorShortName"
              :value="item.id">
              <span style="float: left">{{ item.doctorShortName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Задать период?" prop="period">
          <el-switch v-model="addForm.period"  active-text="Да"
  inactive-text="Нет">></el-switch>
        </el-form-item>
        <el-form-item label="Период" v-if="addForm.period">
          <el-date-picker
            v-model="addForm.dates"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="До"
            start-placeholder="Дата начала"
            end-placeholder="Дата окончания"
            format="dd.MM.yyyy" value-format="dd.MM.yyyy"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Дни недели" prop="workdays" v-if="addForm.period"> 
          <el-checkbox-group v-model="addForm.workdays">
            <el-checkbox label="MO">Пн</el-checkbox>
            <el-checkbox label="TU">Вт</el-checkbox>
            <el-checkbox label="WE">Ср</el-checkbox>
            <el-checkbox label="TH">Чт</el-checkbox>
            <el-checkbox label="FR">Пт</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Дата" v-if="!addForm.period">
            <el-form-item prop="date_one">
              <el-date-picker type="date" placeholder="Выберите дату" :picker-options="pickerOptions1" v-model="addForm.date_one" format="dd.MM.yyyy" value-format="dd.MM.yyyy"></el-date-picker>
            </el-form-item>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Время приема" prop="resource">
              <el-row>
              <el-col :span="11">
                <el-time-select
                  placeholder="Время начала"
                  v-model="addForm.startTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                  }">
                </el-time-select>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-select
                  placeholder="Время окончания"
                  v-model="addForm.endTime"
                  :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: addForm.startTime
                  }">
                </el-time-select>
              </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Интервал приема" prop="interval" label-width="170px">
              <el-input-number v-model="addForm.interval" :step="5" :min="5" :max="60"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button size="medium" type="success" icon="el-icon-check" @click.native="addSubmit" :loading="addLoading">Добавить</el-button>
				<el-button size="medium" @click.native="addFormVisible = false">Отмена</el-button>
        </el-form-item>
      </el-form>
		</el-dialog>
      <!-- data -->
    <el-table :data="data" border style="width: 100%" :load="dataLoading">
       <el-table-column
      type="index"
      width="50">
    </el-table-column>
      <el-table-column prop="doctor" label="Врач">
      </el-table-column>
      <el-table-column prop="date_start" label="Дата с">
        <template slot-scope="scope">
                    <span>{{scope.row.date_start | parseTime('{d}.{m}.{y} {h}:{i}')}}</span>
                </template>
      </el-table-column>
      <el-table-column prop="date_end" label="Дата до">
        <template slot-scope="scope">
            <span>{{scope.row.date_end | parseTime('{d}.{m}.{y} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import * as schedules from "@/api/schedules";
import * as doctors from "@/api/doctors";
let myMixin = {
  data: function() {
    return { schedules }
  }
}
export default {
  name: "Schedule",
  mixins: [myMixin],
  data() {
    return {
      data: [],
      dataLoading: false,
      doctors: [],
      canReset: false,
      addFormVisible: false,
      addLoading: false,
      //Изменить данные интерфейса
      addForm: {
          doctor: '',
          period: false,
          startTime: '',
          endTime: '',
          dates: [],
          date_one: '',
          resource: '',
          interval: 0,
          workdays: []
        },
        pickerOptions1: {
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
        },
        pickerOptions2: {
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
          shortcuts: [{
            text: 'Неделя',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: 'Месяц',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '3 месяца',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        formRules: {
          doctor: [
            { required: true, message: 'Выберите доктора', trigger: 'change' }
          ],
          dates: [
            { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
          ],
          workdays: [
            { type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change' }
          ],
          startTime: [
            {type: 'date', required: true, message: 'Пожалуйста, выберите время начала приема', trigger: 'change' }
          ],
          endTime: [
            { type: 'date', required: true, message: 'Пожалуйста, выберите время окончания приема', trigger: 'change'}
          ],
        }
    }
  },
  methods: {
    handleCommand(command) {
        switch (command) {
        case 'add':
            this.handleAdd();
            break;
        case 'refresh':
            this.fetchData();
            break;
        default:
            alert( 'Я таких значений не знаю' );
        }
    },
    fetchDoctors(){
      let vm = this;
      vm.loading = true;
      doctors.requestDoctors.r().then(res => {
        vm.doctors = res.data.data.items;
        vm.loading = false;
      });
    },
    fetchData: function() {
      let vm = this;
      vm.loading = true;
      schedules.request.r({'all': true}).then(res => {
        vm.data = res.data.data.items;
        vm.loading = false;
      });
    },
    //Показать новый интерфейс
      handleAdd: function() {
            let vm = this;
            vm.addFormVisible = true;
            vm.addForm = {
                doctor: '',
                period: false,
                startTime: '',
                endTime: '',
                dates: [],
                date_one: '',
                resource: '',
                interval: 0,
                workdays: []
            };
      },
    //Новый
    //Новый
      addSubmit: function() {
        let vm = this;
        this.$refs.addForm.validate(valid => {
            if (valid) {
            this.$confirm("Подтвердить отправку？", "Подсказка", {}).then(() => {
                vm.addLoading = true;
                //NProgress.start();
                let schedule = Object.assign({}, this.addForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                schedules.add.r(schedule).then(res => {
                vm.addLoading = false;
                //NProgress.done();
                vm.$message({
                    message: res.data.data.message,
                    type: "success"
                });
                vm.$refs["addForm"].resetFields();
                vm.addFormVisible = false;
                vm.fetchData();
                }).catch(resp => {
                    vm.addLoading = false;
                    vm.$message.error(resp.data.data);
                  });
            });
            }
        });
      },
    requestNotAllowed: function() {
      schedules.notAllowed.r();
    }
  },
  created() {
    this.fetchDoctors();
    this.fetchData();
  }
};
</script>
