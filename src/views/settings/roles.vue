<style scoped>
.extendGroup {
  float: right;
  margin-right: 20px;
  opacity: 0;
}

.el-tree-node__content:hover .extendGroup {
  opacity: 1;
}
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
  <div v-loading="listLoading">
    <!-- Операции -->
    <div class="operation">
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh" v-has="[role.request]"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add" v-has="[role.add]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
    <!-- table start  -->
    <div class="page">
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="name" label="Наименование">
      </el-table-column>
      <el-table-column prop="description" label="Примечание" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column width="80" align="center">
        <template slot-scope="scope">
          <el-tooltip content="Редактировать" placement="top">
            <el-button size="mini" type="text" icon="el-icon-edit" v-has="[role.edit]" @click="handleEdit(scope.$index, scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip content="Удалить" placement="top">
            <el-button size="mini" type="text" icon="el-icon-delete" v-has="[role.remove]" @click="handleDel(scope.$index, scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <!-- table end  -->
    <!--Edit dialog-->
		<el-dialog title="Настройка прав доступа" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="200px" :rules="editFormRules" ref="editForm">
        <el-form-item label="Наименование" prop="role_name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="Примечание" prop="role_description">
          <el-input
            type="textarea"
            :rows="2"
            v-model="editForm.description"
            auto-complete="off">
          </el-input>
				</el-form-item>
        <el-tabs :tab-position="tabPosition">
            <el-tab-pane
              v-for="item in permissions"
              :key="item.id"
              :label="item.label"
            >
            <el-card class="box-card" v-for="n in item.children" :key="n.id">
              <div slot="header" class="clearfix">
                <span>{{n.label}}</span>
              </div>
              <el-checkbox-group v-model="checkedPermission">
                        <el-checkbox v-for="i in n.children" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
                </el-checkbox-group>
            </el-card>
              
            </el-tab-pane>
          </el-tabs>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button size="medium"  type="success" @click.native="editSubmit" icon="el-icon-check" :loading="editLoading">Сохранить</el-button>
				<el-button size="medium" @click.native="editFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
    <!--Add dialog-->
		<el-dialog title="Создать роль пользователя" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="200px" :rules="addFormRules" ref="addForm">
				<el-form-item label="Наименование" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
        <el-form-item label="Примечание" prop="description">
					<el-input
            type="textarea"
            :rows="2"
            v-model="addForm.description"
            auto-complete="off">
          </el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button size="medium" type="success" icon="el-icon-check" @click.native="addSubmit" :loading="addLoading">Добавить</el-button>
				<el-button size="medium" @click.native="addFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import * as role from "@/api/role";

let myMixin = {
  data: function() {
    return { role };
  }
};

export default {
  mixins: [myMixin],
  data() {
    return {
      list: [],
      listLoading: false,
      canReset: false,
      editFormVisible: false,
      editLoading: false,
      activeName: "first",
      tabPosition: "left",
      checkedCities: [],
      editFormRules: {
        name: [
          { required: true, message: "Введите наименование", trigger: "blur" }
        ]
      },
      //Изменить данные интерфейса
      editForm: {
        id: 0,
        name: "",
        description: ""
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
        description: ""
      },
      editPermissionFormVisible: false,
      editPermissionLoading: false,
      checkedPermission: [2, 3],
      permissions: []
    };
  },
  methods: {
    handleCommand(command) {
        switch (command) {
        case 'add':
            this.addFormVisible = true;
            break;
        case 'refresh':
            this.getRoles();
            break;
        default:
            alert( 'Я таких значений не знаю' );
        }
    },
    getRoles: function() {
      let vm = this;
      vm.loading = true;
      role.request.r(vm.queryParam).then(res => {
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
          role.remove.r(permission).then(res => {
            vm.listLoading = false;
            //NProgress.done();
            vm.$message({
              message: "Удалено успешно",
              type: "success"
            });
            vm.getRoles();
          });
        })
        .catch(() => {});
    },
    // Показать интерфейс редактирования
    handleEdit: function(index, row) {
      let vm = this;
      vm.editFormVisible = true;
      role.view.r({ id: row.id }).then(res => {
        vm.editForm = Object.assign({}, res.data.data);
        vm.permissions = res.data.data.permission_items;
        vm.checkedPermission = res.data.data.permission_checked;
      });
    },
    //Показать новый интерфейс
    handleAdd: function() {
      let vm = this;
      vm.addFormVisible = true;
      vm.addForm = {
        name: "",
        description: ""
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
            let role_send = Object.assign({}, this.editForm);
            role_send.permission_checked = vm.checkedPermission;
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            role.edit.r(role_send).then(res => {
              this.editLoading = false;
              //NProgress.done();
              this.$message({
                message: "Отправлено успешно",
                type: "success"
              });
              this.$refs["editForm"].resetFields();
              this.editFormVisible = false;
              this.getRoles();
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
            let role_send = Object.assign({}, this.addForm);
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
            role.add.r(role_send).then(res => {
              this.addLoading = false;
              //NProgress.done();
              this.$message({
                message: "Отправлено успешно",
                type: "success"
              });
              this.$refs["addForm"].resetFields();
              this.addFormVisible = false;
              this.getRoles();
            });
          });
        }
      });
    },
    requestNotAllowed: function() {
      role.notAllowed.r();
    }
  },
  mounted() {
    this.getRoles();
    //this.getRoles();
  }
};
</script>