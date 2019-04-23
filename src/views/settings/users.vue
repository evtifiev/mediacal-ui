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
        <div class="title">Пользователи</div>
        <!-- Operations -->
        <div class="operation">
            <!-- <i class="el-icon-refresh"></i>
            <i class="el-icon-plus"></i> -->
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh"  v-has="[users.request]"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add"  v-has="[users.add]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
         <!-- list -->
        <el-table :data="list.filter(data => !search || data.fio.toLowerCase().includes(search.toLowerCase()))" border style="width: 100%">
            <el-table-column prop="username" label="Логин">
            </el-table-column>
            <el-table-column prop="email" label="E-mail">
            </el-table-column>
            <el-table-column label="ФИО" prop="fio">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="Поиск по ФИО"/>
              </template>
            </el-table-column>
            <el-table-column prop="position" label="Должность">
            </el-table-column>
            <el-table-column width="80" align="center">
              <template slot-scope="scope">
                <el-tooltip content="Редактировать" placement="top">
                  <el-button type="text" icon="el-icon-edit" v-has="[users.edit]" @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="Удалить" placement="top">
                  <el-button type="text" icon="el-icon-delete" v-has="[users.remove]" @click="handleDel(scope.$index, scope.row)"></el-button>
                </el-tooltip>	
              </template>
            </el-table-column>
        </el-table>
        <!--Edit dialog-->
		<el-dialog title="Редактировать данные пользователя" :visible.sync="editFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
				<el-form-item label="Логин" prop="username">
          <el-input v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Фамилия" prop="last_name">
          <el-input v-model="editForm.last_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Имя" prop="first_name">
          <el-input v-model="editForm.first_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Отчество" prop="middle_name">
          <el-input v-model="editForm.middle_name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="Почта" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Пароль почты" prop="email_password">
          <el-input v-model="editForm.email_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Мобильный телефон" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Внутренний номер" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Роль" prop="role_id">
          <el-select v-model="editForm.role_id" placeholder="выберите роль" style="width: 100%;">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Меню" prop="menu_id">
          <el-select v-model="editForm.menu_id" placeholder="выберите меню" style="width: 100%;">
            <el-option
              v-for="item in menus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Подразделение" prop="role_id">
          <el-select v-model="editForm.department_id" placeholder="выберите подразделение" style="width: 100%;">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Должность" prop="role_id">
          <el-select v-model="editForm.position_id" placeholder="выберите должность" style="width: 100%;">
            <el-option
              v-for="item in positions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="success" icon="el-icon-check" @click.native="editSubmit" :loading="editLoading">Сохранить</el-button>
				<el-button  size="medium" @click.native="editFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
    <!--Add dialog-->
		<el-dialog title="Добавить пользователя" :visible.sync="addFormVisible" :close-on-click-modal="false" width="30%">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="Логин" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Пароль" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Фамилия" prop="last_name">
          <el-input v-model="addForm.last_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Имя" prop="first_name">
          <el-input v-model="addForm.first_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Отчество" prop="middle_name">
          <el-input v-model="addForm.middle_name" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="Почта" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Пароль почты" prop="email_password">
          <el-input v-model="addForm.email_password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Мобильный телефон" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Внутренний номер" prop="phone">
          <el-input v-model="addForm.phone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Роль" prop="role_id">
          <el-select v-model="addForm.role_id" placeholder="выберите роль" style="width: 100%;">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Меню" prop="menu_id">
          <el-select v-model="addForm.menu_id" placeholder="выберите меню" style="width: 100%;">
            <el-option
              v-for="item in menus"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Подразделение" prop="role_id">
          <el-select v-model="addForm.department_id" placeholder="выберите подразделение" style="width: 100%;">
            <el-option
              v-for="item in departments"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Должность" prop="role_id">
          <el-select v-model="addForm.position_id" placeholder="выберите должность" style="width: 100%;">
            <el-option
              v-for="item in positions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
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
import * as users from "@/api/users";
import * as department from "@/api/departments";
import * as position from "@/api/positions";
import * as menu from "@/api/menu";
import * as role from "@/api/role";

let myMixin = {
  data: function() {
    return { users }
  }
}
export default {
  mixins: [myMixin],
  data() {
    return {
      list: [],
      roles: [],
      menus: [],
      departments: [],
      positions: [],
      search: '',
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
        usersname: "",
        last_name: "",
        first_name: "",
        middle_name: "",
        email: "",
        email_password: "",
        mobile: "",
        phone: "",
        role_id: "",
        menu_id: "",
        department_id: "",
        position_id: ""
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
        usersname: "",
        password: "",
        last_name: "",
        first_name: "",
        middle_name: "",
        email: "",
        email_password: "",
        mobile: "",
        phone: "",
        role_id: "",
        menu_id: "",
        department_id: "",
        position_id: ""
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
      fetchRoles: function() {
        let vm = this;
        vm.loading = true;
        role.request.r().then(res => {
            vm.roles = res.data.data;
            vm.loading = false;
        });
      },
      fetchMenu: function() {
        let vm = this;
        vm.loading = true;
        menu.request.r().then(res => {
            vm.menus = res.data.data;
            vm.loading = false;
        });
      },
      fetchDepartments: function() {
        let vm = this;
        vm.loading = true;
        department.request.r().then(res => {
            vm.departments = res.data.data.items;
            vm.loading = false;
        });
      },
      fetchPositions: function() {
        let vm = this;
        vm.loading = true;
        position.request.r().then(res => {
            vm.positions = res.data.data.items;
            vm.loading = false;
        });
      },
      fetchData: function() {
        let vm = this;
        vm.loading = true;
        users.request.r().then(res => {
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
            let user = { id: row.id };
            users.remove.r(user).then(res => {
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
                username: "",
                password: "",
                last_name: "",
                first_name: "",
                middle_name: "",
                email: "",
                email_password: "",
                mobile: "",
                phone: "",
                role_id: "",
                menu_id: "",
                department_id: "",
                position_id: ""
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
                let user = Object.assign({}, this.editForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                users.edit.r(user).then(res => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Отредактировано успешно",
                    type: "success"
                });
                this.$refs["editForm"].resetFields();
                vm.editFormVisible = false;
                vm.fetchData();
                });
            });
            }
        });
      },
      //Новый
      addSubmit: function() {
        let vm = this;
        this.$refs.addForm.validate(valid => {
            if (valid) {
            this.$confirm("Подтвердить отправку？", "Подсказка", {}).then(() => {
                this.addLoading = true;
                //NProgress.start();
                let user = Object.assign({}, this.addForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                users.add.r(user).then(res => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Добавлено успешно",
                    type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                vm.fetchData();
                });
            });
            }
        });
      },
      requestNotAllowed: function() {
        users.notAllowed.r();
      }
  },
  created() {
    this.fetchRoles();
    this.fetchMenu();
    this.fetchPositions();
    this.fetchDepartments();
    this.fetchData();
  }
};
</script>