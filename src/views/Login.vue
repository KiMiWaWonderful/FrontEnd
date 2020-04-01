<template>
<div>
  <div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="registerContainer" autocomplete="on" label-position="left">

        <h3 class="registerTitle">请登录</h3>

      <el-form-item prop="username">
        <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="请输入用户名"
                name="username"
                type="text"
                tabindex="1"
                autocomplete="on"
                size="normal"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="请输入密码"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
          />
        </el-form-item>
      </el-tooltip>
      <el-button type="text">没有登录?去注册</el-button>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
    </el-form>

  </div>

</div>

</template>

<script>
   import axios from 'axios'
   import {mapMutations} from 'vuex'

  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          username: '',
          password: ''
        },
        checked: true,
        loginRules: {
          username: [
            { required: true, trigger: 'blur'},
            { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
            ],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    // watch: {
    //   $route: {
    //     handler: function(route) {
    //       const query = route.query
    //       if (query) {
    //         this.redirect = query.redirect
    //         this.otherQuery = this.getOtherQuery(query)
    //       }
    //     },
    //     immediate: true
    //   }
    // },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    methods: {
      ...mapMutations(["setUsername"]),
      checkCapslock(e) {
        const { key } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            // this.postKeyValueRequest('http://localhost:8080/login?username=\'+this.loginForm.username+\'&password=\'+this.loginForm.password', null).then(resp => {
            //   this.loading = false;
            //   if (resp) {
            //     // this.$store.commit('INIT_CURRENTHR', resp.obj);
            //     // window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
            //     // let path = this.$route.query.redirect;
            //     // this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
            //     this.$success("登录成功", () => {
            //       sessionStorage.setItem("loginuser", this.loginForm.username)
            //       this.$router.push("/")
            //     })
            //   }
            // })
            let config = {
              url: 'http://localhost:8080/login?username='+this.loginForm.username+'&password='+this.loginForm.password,
              method: 'post',
            }

            axios(config)
                .then((response) => {
                  console.log(response)
                })

            this.$success("登录成功", () => {
              this.setUsername(this.loginForm.username)
              this.$router.push("/")
            })
          } else {
            this.$failed("用户名或密码错误", () => {
              this.loginForm.username = ''
              this.loginForm.password = ''
            })
          }
        })
      },
    }
  }
</script>

<style>
  .registerContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .registerTitle {
    margin: 15px auto 20px auto;
    text-align: center;
    color: #505458;
  }

  .loginRemember {
    text-align: left;
    margin: 0px 0px 15px 0px;
  }
</style>

