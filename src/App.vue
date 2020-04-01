<template>
  <div id="app">

<!--    <el-container style="height: 100vh; border: 1px solid #eee">-->
<!--      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
<!--        <el-menu router :default-openeds="['1']">-->
<!--          <el-submenu index="1">-->
<!--            <template slot="title"><i class="el-icon-tickets"></i>功能</template>-->
<!--            <el-menu-item index="/map">地图首页</el-menu-item>-->
<!--            <el-menu-item index="/trace">历史轨迹</el-menu-item>-->
<!--            <el-menu-item index="/fence">地理围栏</el-menu-item>-->
<!--            <el-menu-item index="/car">车辆详情</el-menu-item>-->
<!--            &lt;!&ndash;    这一项先空着&ndash;&gt;-->
<!--            <el-menu-item index="/drive">辅助驾驶</el-menu-item>-->
<!--            &lt;!&ndash;    这一项可以写之前写好的车辆管理，用户管理那些&ndash;&gt;-->
<!--            <el-menu-item index="/profile">个人中心</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-aside>-->

<!--      <el-container>-->
<!--        &lt;!&ndash;    头部信息，可以写管理设置之类&ndash;&gt;-->
<!--        <el-header style="text-align: right; font-size: 12px">-->
<!--          <el-dropdown>-->
<!--            <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item>查看</el-dropdown-item>-->
<!--              <el-dropdown-item>新增</el-dropdown-item>-->
<!--              <el-dropdown-item>删除</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
<!--          <span>王小虎</span>-->
<!--        </el-header>-->

<!--        <el-main>-->
<!--          &lt;!&ndash;    负责跳转&ndash;&gt;-->
<!--          <router-view></router-view>-->
<!--        </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->

<!--    <Login></Login>-->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Login from "./views/Login";
export default {
  name: 'app',
  components: {
    // HelloWorld
    Login
  }
}
</script>

<style>
/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
html,body{
  padding: 0;
  margin: 0;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 50px;
}

.el-aside {
  color: #333;
}
</style>
