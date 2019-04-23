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
        <div class="title">Список специализаций врачей</div>
        <!-- Operations -->
        <div class="operation">
            <!-- <i class="el-icon-refresh"></i>
            <i class="el-icon-plus"></i> -->
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh"  v-has="[doctors.requestSpecializations]"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add"  v-has="[doctors.addSpecialization]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
         <!-- list -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="name" label="Наименование">
            </el-table-column>
            <el-table-column prop="created" label="Дата создания">
                <template slot-scope="scope">
                    <span>{{scope.row.created | parseTime('{d}.{m}.{y} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <el-tooltip content="Редактировать" placement="top">
                  <el-button type="text" icon="el-icon-edit" v-has="[doctors.editSpecialization]" @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="Удалить" placement="top">
                  <el-button type="text" icon="el-icon-delete" v-has="[doctors.removeSpecialization]" @click="handleDel(scope.$index, scope.row)"></el-button>
                </el-tooltip>	
              </template>
            </el-table-column>
        </el-table>
        <!--Edit dialog-->
		<el-dialog title="Редактировать специализацию" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="Наименование" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="success" icon="el-icon-check" @click.native="editSubmit" :loading="editLoading">Сохранить</el-button>
				<el-button  size="medium" @click.native="editFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
    <!--Add dialog-->
		<el-dialog title="Добавить специализацию" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="Наименование" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="success" icon="el-icon-check" @click.native="addSubmit" :loading="addLoading">Добавить</el-button>
				<el-button size="medium" @click.native="addFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>

    </el-row>
  </div>
</template>

<script>
/* eslint-disable */
import * as doctors from "@/api/doctors";

let myMixin = {
  data: function() {
    return { doctors }
  }
}
export default {
  mixins: [myMixin],
  name: "Specializations",
  data() {
    return {
      list: [],
      listLoading: false,
      canReset: false,
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        name: [
          { required: true, message: "Введите наименование", trigger: "blur" }
        ]
      },
      //Изменить данные интерфейса
      editForm: {
        id: "",
        name: "",
      },
      addFormVisible: false, // Отображается новый интерфейс
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: "Введите наименование", trigger: "blur" }
        ]
      },
      //Форма добавления
      addForm: {
        name: "",
      }
    };
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
      fetchData: function() {
        let vm = this;
        vm.loading = true;
        doctors.requestSpecializations.r().then(res => {
            vm.list = res.data.data.items;
            vm.loading = false;
        });
        },
      //Удаление записи
      handleDel: function(index, row) {
        let vm = this;
        vm
            .$confirm("Подтвердить удаление записи?", "Подсказка", {
            type: "warning"
            })
            .then(() => {
            vm.listLoading = true;
            //NProgress.start();
            let specialization = { id: row.id };
            doctors.removeSpecialization.r(specialization).then(res => {
                vm.listLoading = false;
                //NProgress.done();
                vm.$message({
                message: "Удалено успешно",
                type: "success"
                });
                vm.fetchData();
            });
            })
            .catch(() => {});
        },
      // Показать интерфейс редактирования
      handleEdit: function(index, row) {
        let vm = this;
        vm.editFormVisible = true;
        vm.editForm = Object.assign({}, row);
      },
      //Показать новый интерфейс
      handleAdd: function() {
            let vm = this;
            vm.addFormVisible = true;
            vm.addForm = {
                name: "",
            };
      },
      //Редактировать
      editSubmit: function() {
        let vm = this;
        vm.$refs.editForm.validate(valid => {
            if (valid) {
            vm.$confirm("Подтвердить отправку?？", "Подсказка", {}).then(() => {
                vm.editLoading = true;
                //NProgress.start();
                let specialization = Object.assign({}, this.editForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                doctors.editSpecialization.r(specialization).then(res => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Отредактировано успешно",
                    type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.fetchData();
                });
            });
            }
        });
      },
      //Новый
      addSubmit: function() {
        this.$refs.addForm.validate(valid => {
            if (valid) {
            this.$confirm("Подтвердить отправку？", "Подсказка", {}).then(() => {
                this.addLoading = true;
                //NProgress.start();
                let specialization = Object.assign({}, this.addForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                doctors.addSpecialization.r(specialization).then(res => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Добавлено успешно",
                    type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.fetchData();
                });
            });
            }
        });
      },
      requestNotAllowed: function() {
        doctors.notAllowed.r();
      }
  },
  created() {
    this.fetchData();
  }
};
</script>
