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
        <div class="title">Разрешения модулей</div>
        <!-- Operations -->
        <div class="operation">
            <!-- <i class="el-icon-refresh"></i>
            <i class="el-icon-plus"></i> -->
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add" v-has="[permissions.add]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
         <!-- list -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="module_id" label="Модуль">
              <template slot-scope="scope">
              <span v-for="(item, index) in modules" v-bind:key="index" v-if="item.id === scope.row.module_id">{{item.name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="Наименование">
            </el-table-column>
            <el-table-column prop="url" label="Url">
            </el-table-column>
            <el-table-column prop="method" label="Метод">
            </el-table-column>
            <el-table-column prop="value" label="PERMISSION">
            </el-table-column>
            <el-table-column prop="created" label="Время создания" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.created | parseTime('{d}.{m}.{y} {h}:{i}')}}</span>
              </template>
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <el-tooltip content="Редактировать" placement="top">
                  <el-button type="text" icon="el-icon-edit" v-has="[permissions.edit]" @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="Удалить" placement="top">
                  <el-button type="text" icon="el-icon-delete" v-has="[permissions.remove]" @click="handleDel(scope.$index, scope.row)"></el-button>
                </el-tooltip>	
              </template>
            </el-table-column>
        </el-table>
        <!--Edit dialog-->
		<el-dialog title="Редактировать разрешение" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="Модуль" prop="module_id">
          <el-select v-model="editForm.module_id" placeholder="выберите модуль" style="width: 100%;">
            <el-option
              v-for="item in modules"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.url }}</span>
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="Наименование" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="URL" prop="url">
					<el-input v-model="editForm.url" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="Метод" prop="method">
          <el-select v-model="editForm.method" clearable placeholder="Метод">
            <el-option
              v-for="item in methods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PERMISSION" prop="value">
					<el-input v-model="editForm.value" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button size="medium" type="success" icon="el-icon-check" @click.native="editSubmit" :loading="editLoading">Сохранить</el-button>
				<el-button size="medium" @click.native="editFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
    <!--Add dialog-->
		<el-dialog title="Добавить разрешение для модуля" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
        <el-form-item label="Модуль" prop="module_id">
          <el-select v-model="addForm.module_id" placeholder="выберите модуль" style="width: 100%;">
            <el-option
              v-for="item in modules"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.url }}</span>
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item label="Наименование" prop="permission_group_name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="URL" prop="permission_group_url">
					<el-input v-model="addForm.url" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="Метод" prop="method">
          <el-select v-model="addForm.method" clearable placeholder="Метод">
            <el-option
              v-for="item in methods"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="PERMISSION" prop="value">
					<el-input v-model="addForm.value" auto-complete="off"></el-input>
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
import * as permissions from "@/api/permissions";

let myMixin = {
  data: function() {
    return { permissions };
  }
};

export default {
  mixins: [myMixin],
  data() {
    return {
      list: [],
      modules: [],
      methods: [
        {
          value: "GET",
          label: "Просмотр"
        },
        {
          value: "POST",
          label: "Добавление"
        },
        {
          value: "PUT",
          label: "Редактирование"
        },
        {
          value: "DELETE",
          label: "Удаление"
        }
      ],
      listLoading: false,
      canReset: false,
      editFormVisible: false,
      editLoading: false,
      editFormRules: {
        module_id: [
          { required: true, message: "Выберите модуль", trigger: "blur" }
        ],
        name: [
          { required: true, message: "Введите наименование", trigger: "blur" }
        ]
      },
      //Изменить данные интерфейса
      editForm: {
        id: "",
        module_id: "",
        name: "",
        method: "",
        url: "",
        value: ""
      },
      addFormVisible: false, // Отображается новый интерфейс
      addLoading: false,
      addFormRules: {
        module_id: [
          { required: true, message: "Выберите модуль", trigger: "blur" }
        ],
        name: [
          { required: true, message: "Введите наименование", trigger: "blur" }
        ]
      },
      //Форма добавления
      addForm: {
        module_id: "",
        name: "",
        method: "",
        url: "",
        value: ""
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
            this.getPermissions();
            break;
        default:
            alert( 'Я таких значений не знаю' );
        }
    },
    getModules: function() {
      let vm = this;
      vm.loading = true;
      permissions.request_modules.r(vm.queryParam).then(res => {
        vm.modules = res.data.data;
        vm.loading = false;
      });
    },
    getPermissions: function() {
      let vm = this;
      vm.loading = true;
      permissions.request.r(vm.queryParam).then(res => {
        vm.list = res.data.data;
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
          let permission = { id: row.id };
          permissions.remove.r(permission).then(res => {
            vm.listLoading = false;
            //NProgress.done();
            vm.$message({
              message: "Удалено успешно",
              type: "success"
            });
            vm.getPermissions();
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
        module_id: "",
        name: "",
        method: "",
        url: "",
        value: ""
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
            let permission = Object.assign({}, this.editForm);
            permission.module_id = permission.module_id;
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            permissions.edit.r(permission).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "Обновлено успешно",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getPermissions();
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
            let permission = Object.assign({}, this.addForm);
            permission.module_id = permission.module_id;
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            permissions.add.r(permission).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "Добавлено успешно",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getPermissions();
            });
          });
        }
      });
    },
    requestNotAllowed: function() {
      permissions.notAllowed.r();
    }
  },
  mounted() {
    this.getModules();
    this.getPermissions();
  }
};
</script>
