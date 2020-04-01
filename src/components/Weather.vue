<template>
  <div>
<!--        <div id="he-plugin-standard"></div>-->
    <!--    <script>-->
    <!--      WIDGET = {-->
    <!--        CONFIG: {-->
    <!--          "layout": 1,-->
    <!--          "width": 450,-->
    <!--          "height": 150,-->
    <!--          "background": 1,-->
    <!--          "dataColor": "FFFFFF",-->
    <!--          "borderRadius": 5,-->
    <!--          "key": "ee2807c0ef9f4b9e8ff36f765636047e"-->
    <!--        }-->
    <!--      }-->
    <!--    </script>-->
    <!--    <script src="https://widget.heweather.net/standard/static/js/he-standard-common.js?v=1.1"></script>-->

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="实况天气" name="first">
<!--        <div class=" hxp-weather-footer">-->
<!--          <div class="text-center hxp-weather-footer-left">-->
<!--            <h2>yiersan</h2>-->
<!--            <em>yiersan</em>-->
<!--          </div>-->
<!--          <div class="hxp-weather-footer-right">-->
<!--            <ol>-->
<!--              <li>今天：{{weather_week}}</li>-->
<!--              <li>天气：{{weather_weather}}</li>-->
<!--              <li>气温：{{weather_lowest}}/{{weather_highest}}</li>-->
<!--              <li>空气质量：{{weather_air_level}}</li>-->
<!--            </ol>-->
<!--          </div>-->
<!--        </div>-->
        <div class="hxp-weather ">
<!--          <div class="hxp-weather-header">-->
<!--            <img :src="weather_weatherimg" alt="">-->
<!--            <a id="jinrishici-sentence">今日诗词....</a>-->
<!--          </div>-->
          <div class=" hxp-weather-footer">
            <div class="text-center hxp-weather-footer-left">
              <h2>{{tmp}}℃</h2>
              <em>{{cond_txt}}</em>
            </div>
            <div class="hxp-weather-footer-right">
              <ol>
                <li>体感温度：{{fl}}</li>
                <li>风向：{{wind_dir}}</li>
                <li>风速：{{wind_spd}}</li>
                <li>风力：{{wind_sc}}</li>
                <li>降水量：{{pcpn}}</li>
                <li>相对湿度：{{hum}}</li>
                <li>大气压强：{{pres}}</li>
                <li>能见度：{{vis}}</li>
              </ol>
            </div>
          </div>

        </div>
      </el-tab-pane>

      <el-tab-pane label="生活指数" name="second">
        <div class="hxp-lifestyle">
          <el-table
                  :data="tableData"
                  style="width: 100%">
            <el-table-column
                    prop="type"
                    label="生活指数"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="brf"
                    label="简介"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="txt"
                    label="详细描述">
            </el-table-column>
          </el-table>
        </div>

      </el-tab-pane>
<!--      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
<!--      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapGetters} from 'vuex'

  export default {
    name: "Weather",
    computed: {
      //  ...mapState(["username"])
      ...mapGetters(["city"])
    },
    data() {
      let city = this.$store.state.city
      return {
        activeName: 'first',
        city: city,

        //温度
        tmp: '',
        //描述
        cond_txt: '',
        //体感温度
        fl: '',
        //风向
        wind_dir: '',
        //风速
        wind_spd: '',
        //风力
        wind_sc: '',
        //降水量
        pcpn: '',
        //相对湿度
        hum: '',
        //大气压强
        pres: '',
        //能见度
        vis: '',

        tableData:[]
      };
    },
    methods: {
      getWeatherData() {
        let config = {
          //location是否要存入vuex中？
          url: 'https://free-api.heweather.net/s6/weather/now?key=48f99fd6a5e14657b94e060c986c221e&location='+this.city,
          method: 'get',
        }

        axios(config)
            .then((response) => {
              console.log(response.HeWeather6[0])

              // cid: "CN101011600", location: "东城", parent_city: "北京", admin_area: "北京", cnty: "中国
              console.log(response.HeWeather6[0].basic)

              // {loc: "2020-02-11 17:18", utc: "2020-02-11 09:18"}
              console.log(response.HeWeather6[0].update)

              //"ok"
              console.log(response.HeWeather6[0].status)

              //{cloud: "51", cond_code: "101", cond_txt: "多云", fl: "8", hum: "55", …}
              console.log(response.HeWeather6[0].now)

              this.tmp = response.HeWeather6[0].now.tmp
              this.cond_txt = response.HeWeather6[0].now.cond_txt
              this.wind_dir = response.HeWeather6[0].now.wind_dir
              this.wind_spd = response.HeWeather6[0].now.wind_spd
              this.wind_sc = response.HeWeather6[0].now.wind_sc
              this.pcpn = response.HeWeather6[0].now.pcpn
              this.vis = response.HeWeather6[0].now.vis
              this.fl = response.HeWeather6[0].now.fl
              this.hum = response.HeWeather6[0].now.hum
              this.pres = response.HeWeather6[0].now.pres
            })
      },
      getLifeStyleData(){
        let config = {
          //location是否要存入vuex中？
          url: 'https://free-api.heweather.net/s6/weather/lifestyle?key=48f99fd6a5e14657b94e060c986c221e&location='+this.city,
          method: 'get',
        }

        axios(config)
            .then((response) => {
              console.log(response.HeWeather6[0])

              // cid: "CN101011600", location: "东城", parent_city: "北京", admin_area: "北京", cnty: "中国
              // console.log(response.data.HeWeather6[0].basic)
              //
              // // {loc: "2020-02-11 17:18", utc: "2020-02-11 09:18"}
              // console.log(response.data.HeWeather6[0].update)
              //
              // //"ok"
              // console.log(response.data.HeWeather6[0].status)

              //{cloud: "51", cond_code: "101", cond_txt: "多云", fl: "8", hum: "55", …}
              console.log(response.HeWeather6[0].lifestyle)

              // this.tmp = response.data.HeWeather6[0].now.tmp
              // this.cond_txt = response.data.HeWeather6[0].now.cond_txt
              // this.wind_dir = response.data.HeWeather6[0].now.wind_dir
              // this.wind_spd = response.data.HeWeather6[0].now.wind_spd
              // this.wind_sc = response.data.HeWeather6[0].now.wind_sc
              // this.pcpn = response.data.HeWeather6[0].now.pcpn
              // this.vis = response.data.HeWeather6[0].now.vis

              // var data = response.data.HeWeather6[0].lifestyle
              // if(data.type == "comf"){
              //
              // }

              var data = response.HeWeather6[0].lifestyle
              for(var i = 0; i <data.length; i++){
                if(data[i].type == "comf"){
                  data[i].type = "舒适度指数"
                }else if(data[i].type == "drsg"){
                  data[i].type = "穿衣指数"
                }else if(data[i].type == "flu"){
                  data[i].type = "感冒指数"
                }else if(data[i].type == "sport"){
                  data[i].type = "运动指数"
                }else if(data[i].type == "trav"){
                  data[i].type = "旅游指数"
                }else if(data[i].type == "uv"){
                  data[i].type = "紫外线指数"
                }else if(data[i].type == "cw"){
                  data[i].type = "洗车指数"
                }else if(data[i].type == "air"){
                  data[i].type = "空气指数"
                }
              }
              this.tableData = response.HeWeather6[0].lifestyle
            })
      },
      handleClick(tab, event) {
       // console.log(tab, event);
        if(this.activeName == "first"){
          this.getWeatherData()
        }else if(this.activeName == "second"){
          this.getLifeStyleData()
        }
      },

    },
    created() {
       this.getWeatherData()
    }
  }
</script>

<style scoped>
  ol li,
  ul li {
    list-style: none;
  }

  /* --------------天气卡片区------------ */
  .hxp-weather {
    margin: 1rem auto;
    /*color: #394568;*/
    /*background: linear-gradient(to bottom, #d1d8eb 40%, #222 100%);*/
    /*border-radius: 5px;*/
    /*box-shadow: 0 5px 15px 0 rgba(0, 0, 0, 0.25);*/
    width: 80%;
    height: 15rem;
    align-items: flex-end;
    transition: all 0.3s ease-in-out;
    overflow: hidden;
    font-family: "Open Sans", "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  }

  /*.hxp-weather-header {*/
  /*  width: 100%;*/
  /*  height: 50%;*/
  /*}*/

  .hxp-weather-footer {
    width: 100%;
    height: 100%;
    /*background: whitesmoke;*/
  }

  .hxp-weather-footer-left,
  .hxp-weather-footer-right {
    width: 50%;
    height: 5rem;
    float: left;
  }

  .my_fav_list{
    margin: 0;
    padding: 0;
    font-size: 100%;
    vertical-align: baseline;
    border: 0;
    display: block;
    overflow: hidden;
    zoom: 1;
  }
  .my_fav_list_li{
    padding: 16px 0;
    /*font-size: 0;*/
    /*border-top: 1px solid #e0e0e0;*/
    list-style: none;
  }
</style>
