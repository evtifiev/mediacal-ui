<style scoped>
.g-body {
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 100%;
  padding: 110px 20px 0 270px;
}

.g-statues-bar {
  position: fixed;
  z-index: 90;
  top: 55px;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  margin-left: 270px;
  background: rgba(251,250,249,.9);
}

.g-statues-bar .bread {
  line-height: 40px;
}

.g-side {
  position: fixed;
  z-index: 90;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 230px;
  height: 100%;
  padding-top: 55px;
  border-right: 1px solid #e6e6e6;
  overflow-y: auto;
  background: rgba(251,250,249,.9);
}


.g-head {
  position: fixed;
  z-index: 91;
  top: 0;
  left: 0;
  width: 100%;
  height: 55px;
  line-height: 55px;
  background: rgba(251,250,249,.9);
  border-bottom: 1px solid #e6e6e6;
}
.brand {
  float: left;
  padding-left: 1em;
  width: 270px;
  font-size: 1.4em;
  text-decoration: none;
  color:#222;
}
.brand span{
    position: relative;
    bottom: 0.8em;
    left: 0.4em;
}
.brand .logo { padding-bottom: 0px;height: 55px;}

.nav {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.usermenu {
  float: right;
  padding: 0 2em;
  color:#405965;
  font-size: 0.875em;
}
.usermenu span {
  position: absolute;
  color: #405965;
  font-weight: 300;
  font-size: 0.775em;
  padding: 1.2em 0;
  right: 17.5em;
}
.usermenu a {
  text-decoration: none;
  margin: 0 0.2em 0 1em;
  color:inherit;
}
.usermenu a:hover{
  color: #d00;
}
#main {
  height: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
<template>
  <div class="g-body">
    <el-row type="flex" class="g-head">
      <a href="" target="_blank" title="АИС ЛПУ Городская больница №38 им. Н.А. Семашко" class="brand" ><img class="logo" src="../assets/logo.png" alt=""> <span>АИС ЛПУ</span></a>
      <div class="nav">
        <div class="usermenu" v-if="user.id">
          <svg-icon icon-class="avatar" /> {{user.name}}
          <span>{{user.position}}</span>
          <router-link :to="{path: '/'}"><svg-icon icon-class="house" /> Главная</router-link>
          <a href="javascript:;" @click="logout"><svg-icon icon-class="logout" /> Выход</a>
        </div>
      </div>
    </el-row>

    <el-menu :default-active="activeMenu" class="g-side" router >
      <template v-for="(route, index) in menus">
        <template v-if="route.children">
          <el-submenu :key="index" :index="route.name">
            <template slot="title">
              {{route.meta.name || route.name}}</template>
            <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute"><i class="ion menuIcon" v-html="cRoute.meta.icon"></i>{{cRoute.meta.name || cRoute.name}}</el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :route="route" :index="route.name" :key="'nav'+index">{{route.meta.name || route.name}}</el-menu-item>
        </template>
      </template>
    </el-menu>

    <div class="g-statues-bar p-lr">
      <el-breadcrumb separator="/" class="bread" id="mybread">
        <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :key="index" :to="item">
          {{ item.meta.name || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <template v-if="$route.path=='/'">
      <dashboard />
    </template>
    <template v-else>
    <router-view id="main"></router-view>
    </template>
    
  </div>
</template>
<script>
 // eslint-disable-next-line
import instance from "@/api";
 // eslint-disable-next-line
import { changePw } from "@/api/users";

export default {
  components: {
    dashboard: () => import("../components/dashboard.vue")
  },
  data() {
    return {
      user: this.$root.userData,
      menus: this.$root.menuData
    };
  },
  computed: {
    activeMenu: function(){
      return this.$route.name
    },
    breadcrumbs: function(){
      return (this.$route && this.$route.matched) || []
    }
  },
  methods: {
    logout: function() {
      this.$confirm("Да, что бы Выйти?", "Подсказка", {
        confirmButtonText: "Да",
        cancelButtonText: "Нет",
        type: "info"
      })
        .then(() => {
          this.$emit("logout");
        })
        .catch(() => {});
    }
  },
  created: function() {
    if (!this.user) {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
