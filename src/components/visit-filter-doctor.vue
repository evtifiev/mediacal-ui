<template>
<el-dialog title="Врачи" :visible.sync="dialogTableVisible" width="19%">
  <el-select v-model="doctor_id" multiple placeholder="Выберите врача">
    <el-option
      v-for="item in doctors"
      :key="item.id"
      :label="item.doctorShortName"
      :value="item.doctorShortName">
    </el-option>
  </el-select>
</el-dialog>
</template>

<script>
  import { bus } from '@/assets/bus.js';
  import * as doctors from "@/api/doctors";
  export default {
    name: 'EventFilterDoctor',
    data() {
      return {
        doctors: [],
        doctor_id: '',
        dialogTableVisible: false
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
    },
    created(){
        bus.$on('visit-open-doctor-filter', (data)=>{
        // действия
            this.fetchDoctors();
            this.dialogTableVisible = data;
        });
      },
  }
</script>