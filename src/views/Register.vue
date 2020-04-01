<template>
  <div>
    <div class="register-container">

      <el-form ref="registerForm" :model="registerForm" :rules="rules" class="registerContainer" autocomplete="on" label-position="left">

        <h3 class="registerTitle">请注册</h3>

        <el-form-item prop="username">
          <el-input
                  ref="username"
                  v-model="registerForm.username"
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
                    v-model="registerForm.pass"
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

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item  prop="checkPass">
          <el-input
                  type="password"
                  v-model="registerForm.checkPass"
                  placeholder="请再次输入密码"
                  autocomplete="off">
          </el-input>
        </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
      </el-form>

    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "Register",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          if (this.registerForm.checkPass !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          username:'',
          pass: '',
          checkPass: '',
        },
        rules: {
          username: [
            { required: true, trigger: 'blur'},
            { min: 3, max: 7, message: '长度在 3 到 7 个字符', trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
      }
    },
    methods: {
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            let newUser = {
              username:this.registerForm.username,
              password:this.registerForm.checkPass
            }

            let config = {
              url: 'http://localhost:8080/register',
              method: 'post',
              data: JSON.stringify(newUser),
              timout: 10000,
              headers:{
                "Content-Type":"application/json; charset=UTF-8"
              }
            }

            axios(config)
                .then((response) => {
                  console.log(response)
                  this.$success("注册成功", () => {
                    this.$router.push("/login")
                  })
                })
                .catch(err=>{
                  console.log(err)
                })
          } else {
            this.$failed("用户名或密码错误", () => {
              this.registerForm.username = ''
              this.registerForm.pass = ''
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
</style>
