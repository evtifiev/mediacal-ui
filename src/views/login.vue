<template>
  <div>
    <div class="g-center login-page" @keyup.enter="login">
      <el-form class="login-form">
        <img class="logo" src="../assets/logo.png" alt="">
        <p class="des">Медицинская информационно-аналитическая система</p>
        <el-form-item>
          <span class="svg-container svg-container_login">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            :autofocus="true"
            placeholder="Имя пользователя"
            v-model="username">
          </el-input>
        </el-form-item>
        <el-form-item>
          <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
          </span>
          <el-input
            placeholder="Пароль"
            :type="pwdType"
            v-model="password">
          </el-input>
          <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
        </el-form-item>
        <el-form-item>
          <el-button style="width:100%" @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CryptoJS from "crypto-js";
import * as util from "../assets/util.js";
//Вход
const requestLogin = params => {
  let words = CryptoJS.enc.Utf8.parse(params.password);
  let base64 = CryptoJS.enc.Base64.stringify(words);
  params.password = base64;
  let data = JSON.stringify({
    password: params.password,
    username: params.username
  });
  return axios.post(`http://127.0.0.1:5000/v1/auth`, data);
};

export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false,
      pwdType: "password"
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return 'Авторизация...';
      return 'Вход';
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    login() {
      var vm = this;
      if (!vm.username) {
        vm.$message.error('Пожалуйста, введите свое имя пользователя！！！');
        return;
      }
      if (!vm.password) {
        vm.$message.error('Пожалуйста, введите свой пароль');
        return;
      }

      let loginParams = {username: vm.username, password: vm.password};
      vm.isBtnLoading = true;
      requestLogin(loginParams).then(res => {
        vm.isBtnLoading = false;
        if(res.data.data.token){
          util.session('token', res.data.data);
          vm.$emit('login', vm.$router.currentRoute.query.from);
        }else{
          return Promise.reject({
            message: 'Ошибка авторизации！'
          });
        }
      }).catch(util.catchError);
    }
  },
  created() {
    sessionStorage.clear();
  }
};
</script>
<style scoped>
 #app {
  display: table;
  width: 100%;
}
.main-title {
  text-align: center;
}
.des {
  text-align: center;
  color: #999;
  margin-bottom: 2em;
}
.login-form {
  width: 350px;
  margin: 3% auto 0;
  background-color: rgba(251,250,249,.9);
}
.el-input__inner {
  background: red;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 37px;
}
.login-form .el-input {
  display: inline-block;
  height: 47px;
  width: 80%;
}
.login-form .el-input__inner {
  background-color: red;
}
.login-form .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: #ffffff;
}
.login-form .show-pwd {
  position: absolute;
  right: 30px;
  top: 7px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
.login-form .thirdparty-button {
  padding-top: 20px;
  position: absolute;
  right: 35px;
  bottom: 18px;
}
.login-form .svg-container {
  padding: 6px 5px 6px 15px;
  color: #889aa4;
  vertical-align: middle;
  width: 30px;
  font-size: 15px;
  font-weight: 700;
  display: inline-block;
}
.login-form .svg-container_login {
  font-size: 15px;
}
.login-page { 
  /*background: url(../assets/bg-2.jpg) no-repeat center center fixed;*/
  background: rgba(251,250,249,.9);
  height: 100vh;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
  .logo { position: relative;left: 140px;padding-bottom: 10px;height: 80px;}
</style>