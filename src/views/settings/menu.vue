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
        <div class="title">Список пользовательских меню</div>
        <!-- Operations -->
        <div class="operation">
            <!-- <i class="el-icon-refresh"></i>
            <i class="el-icon-plus"></i> -->
            <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                Действия<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="refresh" v-has="[menus.request]"><i class="el-icon-refresh"></i> Обновить</el-dropdown-item>
                <el-dropdown-item command="add" v-has="[menus.add]"><i class="el-icon-plus"></i> Создать</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </div>
         <!-- list -->
        <el-table :data="list" border style="width: 100%">
            <el-table-column prop="name" label="Наименование">
            </el-table-column>
            <el-table-column prop="description" label="Примечание" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column width="80" align="center">
                <template slot-scope="scope">
                <el-tooltip content="Редактировать" placement="top">
                    <el-button size="mini" type="text" icon="el-icon-edit" v-has="[menus.edit]" @click="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip content="Удалить" placement="top">
                    <el-button size="mini" type="text" icon="el-icon-delete" v-has="[menus.remove]" @click="handleDel(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!--Edit dialog-->
		<el-dialog title="Настройка доступных разделов меню" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="150px" :rules="editFormRules" ref="editForm">
        <el-row>
          <el-col :span="24">
            <el-form-item label="Наименование" prop="name">
              <el-input v-model="editForm.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="Примечание" prop="description">
              <el-input
                type="textarea"
                :rows="2"
                v-model="editForm.description"
                auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24"><h4>Доступные разделы меню</h4></el-col>          
          <el-col :span="24">
            <el-tree
                                :data="data2"
                                show-checkbox
                                check-strictly
                                :auto-expand-parent="false"
                                node-key="id"
                                ref="tree"
                                :props="defaultProps">
              </el-tree>
          </el-col>
        </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
        <el-button size="medium" type="success" icon="el-icon-check" @click.native="editSubmit" :loading="editLoading">Сохранить</el-button>
				<el-button size="medium" @click.native="editFormVisible = false">Отмена</el-button>
			</div>
		</el-dialog>
    <!--Add dialog-->
		<el-dialog title="Создать меню" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="150px" :rules="addFormRules" ref="addForm">
        <el-row>
          <el-col :span="24">
              <el-form-item label="Наименование" prop="name">
                <el-input v-model="addForm.name" auto-complete="off"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="24">
             <el-form-item label="Примечание" prop="description">
              <el-input
                type="textarea"
                :rows="2"
                v-model="addForm.description"
                auto-complete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
import * as menus from "@/api/menu";

let myMixin = {
  data: function() {
    return { menus };
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
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
      handleCommand(command) {
        switch (command) {
        case 'add':
            this.addFormVisible = true;
            break;
        case 'refresh':
            this.getMenus();
            break;
        default:
            alert( 'Я таких значений не знаю' );
        }
      },
      getMenus: function() {
        let vm = this;
        vm.loading = true;
        menus.request.r(vm.queryParam).then(res => {
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
            let menu = { id: row.id };
            menus.remove.r(menu).then(res => {
                vm.listLoading = false;
                //NProgress.done();
                vm.$message({
                message: "Удалено успешно",
                type: "success"
                });
                vm.getMenus();
            });
            })
            .catch(() => {});
        },
      // Показать интерфейс редактирования
      handleEdit: function(index, row) {
        let vm = this;
        vm.editFormVisible = true;
        menus.view.r({ id: row.id }).then(res => {
            vm.editForm = Object.assign({}, res.data.data);
            vm.data2 = res.data.data.menu_items;
            vm.$refs.tree.setCheckedKeys(res.data.data.menu_checked);
            console.log(res.data.data.menu_checked);
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
                let menu = Object.assign({}, this.editForm);
                menu.menu_checked = vm.$refs.tree.getCheckedKeys();
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                menus.edit.r(menu).then(res => {
                this.editLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Отправлено успешно",
                    type: "success"
                });
                this.$refs["editForm"].resetFields();
                this.editFormVisible = false;
                this.getMenus();
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
                let menu = Object.assign({}, this.addForm);
                // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                menus.add.r(menu).then(res => {
                this.addLoading = false;
                //NProgress.done();
                this.$message({
                    message: "Отправлено успешно",
                    type: "success"
                });
                this.$refs["addForm"].resetFields();
                this.addFormVisible = false;
                this.getMenus();
                });
            });
            }
        });
      },
      requestNotAllowed: function() {
        menus.notAllowed.r();
      },
      setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: "Роли"
        },
        {
          id: 6,
          label: "Разрешения"
        }
      ]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      }
  },
  mounted() {
    this.getMenus();
  }
};
</script>
