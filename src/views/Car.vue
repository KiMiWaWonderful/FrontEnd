<template>
  <div id="container">


    <div id="data-card">
      <el-row :gutter="20">

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card :body-style="{ padding: '0px' }">
              <div class="weather-pic">
                <img src="../assets/pic/weather.jpg" class="image">
              </div>
              <div style="padding: 14px;">
                <span class="weather-data">当前车内温度：</span>
                <span class="data">{{weatherData}}</span>
                <span class="data">℃</span>
                <div class="bottom clearfix">
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card :body-style="{ padding: '0px' }">
              <div >
                <img src="../assets/pic/rainy.jpg" class="rainy-image">
              </div>
              <div style="padding: 14px;">
                <span class="weather-data">当前车内湿度：</span>
                <span class="data">{{moistData}}</span>
                <span class="data">hPa</span>
                <div class="bottom clearfix">
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/pic/smoke.jpg" class="image">
              <div style="padding: 14px;">
                <span class="weather-data">当前车内烟雾浓度：</span>
                <span class="data">{{smokeData}}</span>
                <span class="data">ppm</span>
                <div class="bottom clearfix">
                </div>
              </div>
            </el-card>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../assets/pic/wine.jpg" class="image">
              <div style="padding: 14px;">
                <span class="weather-data">当前车内酒精浓度：</span>
                <span class="data">{{alcoholData}}</span>
                <span class="data">%</span>
                <div class="bottom clearfix">
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-divider><i class="el-icon-s-promotion"></i></el-divider>

<!--    <div id="data-table">-->
<!--      <span>现在是北京时间: {{ currentDate }}</span>-->
<!--      <el-divider></el-divider>-->
<!--      <span>当前车上共有: {{ peopleNum }}名乘客</span>-->
<!--      <el-divider></el-divider>-->
<!--      <span>您的驾驶时长：{{ driveTime }}</span>-->
<!--    </div>-->
    <div id="weather-data">
      <Weather></Weather>
    </div>




  </div>
</template>

<script>
  import Weather from "../components/Weather";
  export default {
    name: "Car",
    components :{
      Weather
    },
    data() {
      return {
        currentDate: new Date(),
        peopleNum: 0,
        driveTime: 0,
        weatherData: 26,
        moistData: 54,
        smokeData: 0.13,
        alcoholData: 0.1,

        websocket: null
      };
    },
    methods: {

      initWebSocket() {
        if(typeof (WebSocket) == 'undefined'){
          alert('不支持websocket')
          return false
        }

        const wsuri = 'ws://localhost:8080/websocket/carData'
        this.websocket = new WebSocket(wsuri)

        this.websocket.onopen = this.websocketonopen
        this.websocket.onmessage = this.websocketonmessage
        this.websocket.onerror = this.websocketonerror
        this.websocket.onclose = this.websocketclose
      },
      //连接成功
      websocketonopen(){
        console.log('WebSocket连接成功')
      },
      //接收数据
      websocketonmessage(e) {
        console.log(e.data)
        var obj = JSON.parse(e.data)

        //转换后的对象：
        //{weatherData: 26, moistData: 0.0001, smokeData: 2.344444, alcoholData: 0.56}
        console.log(obj)

        //赋值
        this.weatherData = obj.weatherData;
        this.moistData = obj.moistData
        this.smokeData = obj.smokeData
        this.alcoholData = obj.alcoholData

      },
      //连接建立失败重连
      websocketonerror(e){
        console.log(`连接失败的信息：`, e)
        this.initWebSocket() // 连接失败后尝试重新连接
      },
      //关闭连接
      websocketclose(e){
        console.log('断开连接',e)
      },
      getCarData() {

      }
    },
    created() {
      this.initWebSocket()
    },
    destroyed() {
      this.websocket.close()
    }
  }
</script>

<style scoped>

  /*.weather-data {*/
  /*  height: 600px;*/
  /*}*/
  /*布局属性*/
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  /*卡片属性*/
  #data-card {
    padding-bottom: 35px;
  }
  .weather-data {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    height: 100%;
    /*display: block;*/
    object-fit: fill;
  }

  .weather-pic {
    /*padding-top: 10px;*/
  }

  .rainy-pic {
    margin-bottom: 10px;
  }

  .rainy-image{
    width: 100%;
    height: 100%;
    /*display: block;*/
    object-fit: fill;
    /*padding-bottom: 5px;*/
  }

  .data {
    font-size: 26px;
    color: #7FA0A7;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
