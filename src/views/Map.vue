<template>
<!--  <div>-->
<!--    map-->
<!--  </div>-->
  <div id="container">

    <baidu-map :center="{lng: 110.91608047485352, lat: 21.661895340414247}" :zoom="zoom" :scroll-wheel-zoom="true" @ready="handler" >
      <bm-view class="map"></bm-view>

      <!--定位-->
<!--      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->

      <!--交通流量-->
      <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>

      <!--搜索地点的输入框和自动补全-->
<!--      <bm-control :offset="{width: '10px', height: '10px'}">-->
<!--        <bm-auto-complete v-model="keyword" :sug-style="{zIndex: 1}">-->
<!--&lt;!&ndash;          <search-field placeholder="请输入地名关键字"></search-field>&ndash;&gt;-->
<!--          <label>关键字：-->
<!--            <input placeholder="请输入地名关键字"></input>-->
<!--          </label>-->
<!--        </bm-auto-complete>-->
<!--      </bm-control>-->

<!--      <Transit></Transit>-->

      <bm-control>
        <div id="searchbox" class="clearfix">
          <!--      ::before-->
          <div id="searchbox-container">

            <div id="sole-searchbox-content" class="searchbox-content" style="display: block;">
              <input id="sole-input" class="searchbox-content-common cc_cursor" type="text" name="word" autocomplete="off" maxlength="256"
                     placeholder="搜地点"
                     v-model="keyword">
              <div class="input-clear cc_pointer" title="清空" style="display: block;"></div>
              <div class="searchbox-content-button right-button loading-button cc_pointer route-button"
                   data-title="路线" data-tooltip="1" @click="showPanel">
<!--                <i class="el-icon-position" id="luxian"></i>-->
<!--                <i id="luxian"> </i>-->
                <button id="luxian-button"></button>
                <!--            ::before-->
              </div>
<!--              <div data-title="路线" data-tooltip="1" @click="showPanel">-->
<!--                &lt;!&ndash;                <i class="el-icon-position" id="luxian"></i>&ndash;&gt;-->
<!--                <i id="luxian"> </i>-->
<!--                &lt;!&ndash;            ::before&ndash;&gt;-->
<!--              </div>-->
              <!--          ::after-->
            </div>

            <div id="route-searchbox-content" class="searchbox-content route-searchbox-content bus" style="display: none;">

              <div class="route-header">
                <div class="searchbox-content-common route-tabs cc_cursor">
<!--                  <el-checkbox-group-->
<!--                          :min="1"-->
<!--                          :max="1">-->
                  <div class="tab-item bus-tab cc_pointer" data-index="bus">
                    <el-checkbox v-model="checkedBus">
                    <i></i>
                    <span>公交</span>
                    </el-checkbox>
                  </div>
                  <div class="tab-item drive-tab cc_pointer" data-index="drive">
                    <el-checkbox v-model="checkedDrive">
                    <i></i>
                    <span>驾车</span>
                    </el-checkbox>
                  </div>
                  <div class="tab-item walk-tab cc_pointer" data-index="walk">
                    <el-checkbox v-model="checkedWalk">
                    <i></i>
                    <span>步行</span>
                    </el-checkbox>
                  </div>
                  <div class="tab-item bike-tab cc_pointer" data-index="bike">
                    <el-checkbox v-model="checkedBike">
                    <i></i>
                    <span>骑行</span>
                    </el-checkbox>
                  </div>
<!--                  </el-checkbox-group>-->
                  <div class="arrow-wrap"></div>
                </div>
                <!--            <div class="searchbox-content-button right-button cancel-button loading-button cc_pointer" data-title="关闭路线" data-tooltip="3">-->
                <!--            </div>-->
              </div>
<!--              document.querySelector("#route-searchbox-content > div.route-header > div.searchbox-content-common.route-tabs.cc_cursor > div.tab-item.drive-tab.cc_pointer")-->

              <div class="routebox cc_cursor">

                <div class="searchbox-content-common routebox-content">

                  <div class="routebox-revert cc_pointer" title="切换起终点">
                    <div class="routebox-revert-icon cc_pointer">
                    </div>
                  </div>

                  <div class="routebox-inputs cc_cursor">

                    <div class="routebox-input route-start cc_cursor">
                      <div class="route-input-icon">
                      </div>
                      <input autocomplete="off" maxlength="256" placeholder="输入起点"
                             class="route-start-input cc_cursor" type="text"
                             v-model="startKeyword">
                      <div class="input-clear" title="清空" style="display: none;">
                      </div>
                      <div class="route-input-add-icon">
                      </div>
                    </div>

                    <div class="routebox-input route-end">
                      <div class="route-input-icon">
                      </div>
                      <input autocomplete="off" maxlength="256" placeholder="输入终点" class="route-end-input cc_cursor"
                             type="text" v-model="endKeyword">
                      <div class="input-clear" title="清空" style="display: block;">
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>


          <button id="search-button" data-title="搜索" data-tooltip="2"></button>


          <!--      <div id="toast-wrapper">-->
          <!--        <div id="toast">-->
          <!--          <img class="info-tip-img" src="/wolfman/static/common/images/transparent.gif" alt="">-->
          <!--          <span class="info-tip-text"></span>-->
          <!--        </div>-->
          <!--      </div>-->

          <!--      ::after-->
        </div>
<!--        <button id="search-button" data-title="搜索" data-tooltip="2"></button>-->
      </bm-control>

      <!--搜索地点-->
      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="北京"></bm-local-search>
      <!--输入起点终点-->
<!--      <bm-control :offset="{width: '20px', height: '20px'}">-->
<!--        <bm-auto-complete v-model="startKeyword" :sug-style="{zIndex: 1}">-->
<!--          &lt;!&ndash;          <search-field placeholder="请输入地名关键字"></search-field>&ndash;&gt;-->
<!--          <label>起点：-->
<!--            <input placeholder="请输入起点地名关键字"></input>-->
<!--          </label>-->
<!--        </bm-auto-complete>-->
<!--        <bm-auto-complete v-model="endKeyword" :sug-style="{zIndex: 1}">-->
<!--          &lt;!&ndash;          <search-field placeholder="请输入地名关键字"></search-field>&ndash;&gt;-->
<!--          <label>终点：-->
<!--            <input placeholder="请输入终点地名关键字"></input>-->
<!--          </label>-->
<!--        </bm-auto-complete>-->
<!--      </bm-control>-->


      <!--测距-->
<!--      <bm-control>-->
<!--        <button @click="openDistanceTool">开启测距</button>-->
<!--      </bm-control>-->


      <!--搜索地点-->
<!--      <bm-local-search :keyword="keyword" :auto-viewport="true"></bm-local-search>-->

      <!--点-->
      <bm-marker :position="center" :dragging="true" @click="infoWindowOpen" animation="BMAP_ANIMATION_BOUNCE">
        <bm-info-window :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
          <p v-text="infoWindow.contents"></p>
        </bm-info-window>
      </bm-marker>

      <!--绘画折线-->
<!--      <bm-polyline-->
<!--              :path="polylinePath"-->
<!--              stroke-color="blue"-->
<!--              :stroke-opacity="0.5"-->
<!--              :stroke-weight="2"-->
<!--              :editing="true"-->
<!--              @lineupdate="updatePolylinePath">-->
<!--      </bm-polyline>-->

<!--      <bm-overlay pane="">-->
<!--        <bm-polyline :path="polylinePath" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="6" :editing="true" >-->
<!--        </bm-polyline>-->
<!--      </bm-overlay>-->

      <!--路书-->
<!--      <bm-lushu :path="polylinePath" :play="play">-->

<!--      </bm-lushu>-->

      <!--公交路线规划-->
      <div v-if="checkedBus">
        <bm-transit :start="startKeyword" :end="endKeyword" :auto-viewport="true" location="北京"></bm-transit>
      </div>

      <!--驾车路线规划-->
      <div v-if="checkedDrive">
        <bm-driving :start="startKeyword" :end="endKeyword" :auto-viewport="true" location="北京"></bm-driving>
      </div>

      <!--行走路线规划-->
      <div v-if="checkedWalk">
        <bm-walking :start="startKeyword" :end="endKeyword" :auto-viewport="true" location="北京"></bm-walking>
      </div>



    </baidu-map>

  </div>


</template>

<script>

 // import MapLoader from "../js/AMap";
 import axios from 'axios';
 import DistanceTool from 'bmaplib.distancetool'
 import Transit from "../components/Transit";

  export default {
    name: "Map",
    components: {
      Transit
    },
    data(){
       return {
    //     map: null,
    //     plugins: [
    //         'AMap.Geolocation'
    //     ]
    //     // marker: null

         center: {lng: 110.91608047485352, lat: 21.661895340414247},
         zoom: 3,

         //后台发送坐标数据
        // markerPoint: {lng: 116.404, lat: 39.915},

         //图片加载不出来
         icon: {url:'../assets/people.png', size: {width: 300, height: 157}},

         //消息窗口
         infoWindow: {
           show: false,
           contents: 'xxxxx'
         },

         //搜索关键字
         keyword:'',

         //出行始终点
         startKeyword: '',
         endKeyword: '',

         //轨迹坐标
         // polylinePath: [],
         polylinePath: [
           {lng: 40.7838351, lat: -74.6143763},
           {lng: 40.8838351, lat: -74.7143763},
           {lng: 40.9838351, lat: -74.8143763}
         ],

         play: true,

         checkedBus: false,
         checkedDrive: false,
         checkedWalk: false,
         checkedBike: false
      }
     },
    unmount(){
      distanceTool && distanceTool.close()
    },
    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map)
        // this.center.lng = 116.404
        // this.center.lat = 39.915

        // function getCenter() {
        //   let config = {
        //     url: 'http://localhost:3000/location',
        //     method: 'get',
        //   }
        //
        //   axios(config)
        //       .then((response) => {
        //         console.log(response.data)
        //         this.center.lng = response.data.longitude
        //         this.center.lat = response.data.latitude
        //       })
        // }
        //
        // getCenter()

        let config = {
          url: 'http://localhost:3000/location',
          method: 'get',
        }

        axios(config)
            .then((response) => {
              console.log("中心点===========================")
              console.log(response.data)
              this.center.lng = response.data.longitude
              this.center.lat = response.data.latitude
            })

        // function addPolylinePoint() {
        //   let config = {
        //     url: 'http://localhost:3000/locations',
        //     method: 'get',
        //   }
        //
        //   axios(config)
        //       .then((response) => {
        //         console.log(response.data)
        //         // this.center.lng = response.data.longitude
        //         // this.center.lat = response.data.latitude
        //       })
        // }
        //
        // addPolylinePoint()

        let configg = {
          url: 'http://localhost:3000/locations',
          method: 'get',
        }

        axios(configg)
            .then((response) => {
              console.log("接收到的数组===========================")
              console.log(response.data)
              this.polylinePath = response.data
              console.log("polylinePath===========================")
              console.log(this.polylinePath)

             // this.polylinePath = e.target.getPath()
              //画轨迹
              // var polyLine = new BMap.BmPolyline(this.polylinePath,{
              //   strokeColor: "blue", //设置颜色
              //     strokeWeight: 5, //宽度
              //     strokeOpacity: 0.5 //透明度
              // })
              // var polyLine = new BMap.Polyline(this.polyLinePath, {
              //   strokeColor: "blue", //设置颜色
              //   strokeWeight: 5, //宽度
              //   strokeOpacity: 0.5 //透明度
              // })
              // map.addOverlay(polyLine)


              // this.center.lng = response.data.longitude
              // this.center.lat = response.data.latitude
            })

        this.zoom = 15

        //测距工具
        this.distanceTool = new DistanceTool(map, {lineStroke: 2})
      },

      //显示面板
      showPanel() {
        // console.log("showPanel")
        var data = document.getElementById('route-searchbox-content').style.cssText
        console.log(data)
        // display: none;
        if(data == "display: block;") {
          document.getElementById('route-searchbox-content').style.cssText = "display: none;"
        }else if(data == "display: none;"){
          document.getElementById('route-searchbox-content').style.cssText = "display: block;"
        }

      },

      // addMarker(e) {
      //   var marker = new BMap.Marker({e.point.lng,e.point.lat},)
      // },


      //描绘折线
      //调用时间不对
      updatePolylinePath(e) {
        console.log("触发！")
        this.polylinePath = e.target.getPath()
      },

      //为折线数组添加元素
      // addPolylinePoint() {
      //   let config = {
      //     url: 'http://localhost:3000/locations',
      //     method: 'get',
      //   }
      //
      //   axios(config)
      //       .then((response) => {
      //         console.log(response.data)
      //         // this.center.lng = response.data.longitude
      //         // this.center.lat = response.data.latitude
      //       })
      // },


      //获取中心点坐标
      // getCenter() {
      //   let config = {
      //     url: 'http://localhost:3000/location',
      //     method: 'get',
      //   }
      //
      //   axios(config)
      //       .then((response) => {
      //         console.log(response.data)
      //         this.center.lng = response.data.longitude
      //         this.center.lat = response.data.latitude
      //       })
      // },
      infoWindowClose() {
        this.infoWindow.show = false
      },
      infoWindowOpen() {
        this.infoWindow.show = true
      },
      openDistanceTool(e) {
        const {distanceTool} = this
        distanceTool && distanceTool.open()
      }

    },

     created() {
    // //  this.handle()

     },
    // methods(){
    //   //解析定位结果
    //   // function onComplete(data) {
    //   //   document.getElementById('status').innerHTML='定位成功'
    //   //   var str = [];
    //   //   str.push('定位结果：' + data.position);
    //   //   str.push('定位类别：' + data.location_type);
    //   //   if(data.accuracy){
    //   //     str.push('精度：' + data.accuracy + ' 米');
    //   //   }//如为IP精确定位结果则没有精度信息
    //   //   str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    //   //   document.getElementById('result').innerHTML = str.join('<br>');
    //   // }
    //
    //   //解析定位错误信息
    //   // function onError(data) {
    //   //   document.getElementById('status').innerHTML='定位失败'
    //   //   document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    //   // }
    // },
    mounted() {
      // let that = this
      // MapLoader(this.plugins).then(AMap => {
      //   this.map = new AMap.Map('container', {
      //     // center: [110.36506726, 21.2574631],
      //     // zoom: 11
      //
      //     //地图初始化加载定位到当前城市(只能获取到城市级别信息)
      //     resizeEnable: true
      //   })
      //
      //   //110.364977,21.274898
      //   const marker = new AMap.Marker({
      //     position: new AMap.LngLat(110.36506726, 21.2574631)
      //   });
      //
      //   this.map.add(marker)
      //
      //   // AMap.plugin(this.plugins,function () {
      //   //   var geolocation = new AMap.Geolocation({
      //   //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //   //     timeout: 10000,          //超过10秒后停止定位，默认：5s
      //   //     buttonPosition:'RB',    //定位按钮的停靠位置
      //   //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //   //     zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      //   // })
      //   //   this.map.addControl(geolocation);
      //   //   geolocation.getCurrentPosition(function(status,result){
      //   //     if(status=='complete'){
      //   //       this.onComplete(result)
      //   //     }else{
      //   //       this.onError(result)
      //   //     }
      //   //   });
      //   // });
      // }, e => {
      //   console.log('地图加载失败', e)
      // })

      // var marker = new AMap.Marker({
      //   //map: this.map,
      //   position: new AMap.LngLat(110.36506726, 21.2574631)
      // })
      //
      // this.map.add(marker)

      // var map = new AMap.Map('container', {
      //   resizeEnable: true
      // });
      // AMap.plugin('AMap.Geolocation', function() {
      //   var geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
      //     timeout: 10000,          //超过10秒后停止定位，默认：5s
      //     buttonPosition:'RB',    //定位按钮的停靠位置
      //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
      //
      //   });
      //   map.addControl(geolocation);
      //   geolocation.getCurrentPosition(function(status,result){
      //     if(status=='complete'){
      //       onComplete(result)
      //     }else{
      //       onError(result)
      //     }
      //   });
      // });
      // //解析定位结果
      // function onComplete(data) {
      //   document.getElementById('status').innerHTML='定位成功'
      //   var str = [];
      //   str.push('定位结果：' + data.position);
      //   str.push('定位类别：' + data.location_type);
      //   if(data.accuracy){
      //     str.push('精度：' + data.accuracy + ' 米');
      //   }//如为IP精确定位结果则没有精度信息
      //   str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
      //   document.getElementById('result').innerHTML = str.join('<br>');
      // }
      // //解析定位错误信息
      // function onError(data) {
      //   document.getElementById('status').innerHTML='定位失败'
      //   document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
      // }
    }
  }
</script>

<style scoped>
  /*#container{ min-width: 500px; min-height: 2000px; position: relative; }*/
  /*#container{ width: 100%; height: 100%; }*/

  .map {
    width: 100%;
    height: 850px;
  }

  .clearfix::before, .clearfix::after {
    display: table;
    content: "";
  }

  #searchbox-container {
    font-size: 12px;
    color: #4c4c4c;
    font-family: Arial,Helvetica,SimSun,sans-serif;
    position: relative;
    z-index: 2;
    pointer-events: auto;
    width: 368px;
    float: left;
    box-sizing: border-box;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  }
  #sole-searchbox-content{
    font-size: 12px;
    color: #4c4c4c;
    font-family: Arial,Helvetica,SimSun,sans-serif;
    pointer-events: auto;
    width: 368px;
    border-radius: 2px 0 0 2px;
    background: #fff;
    position: relative;
  }

  #sole-input{
    pointer-events: auto;
    outline: 0;
    font-family: inherit;
    margin: 0;
    float: left;
    width: 329px;
    box-sizing: border-box;
    border: 0;
    padding: 9px 0;
    border-left: 10px solid transparent;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 2px 0 0 2px;
    border-right: 10px solid transparent;
  }
  .input-clear {
    font-size: 12px;
    color: #4c4c4c;
    font-family: Arial,Helvetica,SimSun,sans-serif;
    pointer-events: auto;
    cursor: pointer;
    position: absolute;
    width: 27px;
    height: 38px;
    top: 0;
    background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/searchbox_5c0d97d.png) no-repeat 0 -114px #fff;
    right: 39px;
    display: none;
  }
  .searchbox-content-button .right-button .loading-button .cancel-button {
    font-size: 12px;
    color: #4c4c4c;
    font-family: Arial,Helvetica,SimSun,sans-serif;
    pointer-events: auto;
    box-sizing: border-box;
    float: left;
    height: 38px;
    width: 39px;
    cursor: pointer;
    position: relative;
    background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/searchbox_5c0d97d.png) no-repeat 0 -38px;
  }

  .searchbox-content
  .searchbox-content-button.right-button::before {
    content: '';
    position: absolute;
    width: 38px;
    left: 0;
    top: 6px;
    height: 26px;
    border-left: 1px solid #eee;
  }

  .searchbox-content::after {
    font-size: 0;
    zoom: 1;
    content: " ";
    clear: both;
    display: block;
    hieght: 0;
    visibility: hidden;
  }

   #search-button{
    outline: 0;
    font-family: inherit;
    pointer-events: auto;
    background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/searchbox_5c0d97d.png) no-repeat 0 -76px #3385ff;
    width: 57px;
    height: 38px;
    float: left;
    border: 0;
    padding: 0;
    cursor: pointer;
    border-radius: 0 2px 2px 0;
    box-shadow: 1px 2px 1px rgba(0,0,0,.15);
  }
  #luxian-button{
    outline: 0;
    font-family: inherit;
    pointer-events: auto;
    background-color: white;
    background-image: url(../assets/pic/luxian.png) ;
    width: 38px;
    height: 38px;
    float: left;
    border: 0;
    padding: 0;
    cursor: pointer;
    /*border-radius: 0 2px 2px 0;*/
    /*box-shadow: 1px 2px 1px rgba(0,0,0,.15);*/
  }

  #luxian{
    /*width: 57px;*/
    /*height: 38px;*/
    background-image: url(../assets/pic/luxian.png);
  }

  .route-searchbox-content {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-bottom-right-radius: 2px;
  }

  /*搜索框大小*/
  .searchbox-content {
    width: 368px;
    border-radius: 2px 0 0 2px;
    background: #fff;
  }

  .bus {
    zoom: 1;
  }

  .route-header {
    overflow: hidden;
  }

  .searchbox-content .searchbox-content-common {
    box-sizing: border-box;
    float: left;
    width: 368px;
    height: 38px;
  }

  .route-tabs {
    position: relative;
    border-bottom: 1px solid #A3C7FF;
    color: #333;
    text-decoration: none;
  }


  .route-searchbox-content.bus .tab-item.bus-tab {
    /*color: #3385ff;*/
  }

  .route-tabs .tab-item {
    box-sizing: border-box;
    font-size: 12px;
    float: left;
    width: 25%;
    height: 37px;
    line-height: 37px;
    text-align: center;
    cursor: pointer;
  }

  .route-searchbox-content.bus .tab-item.bus-tab i {
    background-position: 0 -51px;
  }
  .route-tabs .tab-item.bus-tab i {
    width: 13px;
    height: 15px;
    background-position: 0 -34px;
  }

  .route-tabs .tab-item i {
    display: inline-block;
    position: relative;
    top: 2px;
    background-image: url(//webmap1.bdimg.com/wolfman/static/common/images/new/route-icon_41d3af5.png);
    background-repeat: no-repeat;
  }

  .route-tabs .tab-item.drive-tab i {
    width: 15px;
    height: 14px;
    background-position: 0 -68px;
  }

  .route-tabs .tab-item i {
    display: inline-block;
    position: relative;
    top: 2px;
    background-image: url(//webmap1.bdimg.com/wolfman/static/common/images/new/route-icon_41d3af5.png);
    background-repeat: no-repeat;
  }

  .route-tabs .tab-item.walk-tab i {
    width: 15px;
    height: 17px;
    background-position: 0 -100px;
    top: 3px;
  }

  .route-tabs .tab-item i {
    display: inline-block;
    position: relative;
    top: 2px;
    background-image: url(//webmap1.bdimg.com/wolfman/static/common/images/new/route-icon_41d3af5.png);
    background-repeat: no-repeat;
  }

  .route-tabs .tab-item.bike-tab i {
    width: 18px;
    height: 15px;
    background-position: 0 -138px;
    background-position-x: 0px;
    background-position-y: -138px;
    top: 3px;
  }

  .route-tabs .tab-item i {
    display: inline-block;
    position: relative;
    top: 2px;
    background-image: url(//webmap1.bdimg.com/wolfman/static/common/images/new/route-icon_41d3af5.png);
    background-repeat: no-repeat;
  }

  .searchbox-content .searchbox-content-button.cancel-button {
    background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/searchbox_5c0d97d.png) no-repeat 0 -38px;
  }

  .routebox .routebox-content .routebox-revert {
    width: 39px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }

  /*.routebox .routebox-content .routebox-revert .routebox-revert-icon {*/
  /*  position: absolute;*/
  /*  left: 50%;*/
  /*  top: 50%;*/
  /*  width: 18px;*/
  /*  height: 14px;*/
  /*  margin-left: -9px;*/
  /*  margin-top: -7px;*/
  /*  background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/revert_172bb58.png) no-repeat 0 0;*/
  /*}*/

  .routebox .routebox-content .routebox-input input {
    box-sizing: border-box;
    border: 0;
    height: 100%;
    width: 100%;
    padding: 10px 0;
    font-size: 14px;
    border-left: 20px solid transparent;
    border-right: 27px solid transparent;
    line-height: 20px;
  }

  /*form, p, ol, ul, li, dl, dt, dd, h1, h2, h3, h4, tr, th, td, input {*/
  /*  margin: 0;*/
  /*  padding: 0;*/
  /*}*/
  input, button, select, textarea {
    outline: 0;
    font-family: inherit;
  }

  /*.routebox .routebox-content .routebox-input.route-end .route-input-icon {*/
  /*  background: url(//webmap0.bdimg.com/wolfman/static/common/images/new/end_e68ad9a.png) no-repeat 0 0;*/
  /*}*/
  /*.routebox .routebox-content .routebox-input .route-input-icon {*/
  /*  width: 11px;*/
  /*  height: 10px;*/
  /*  background: url(//webmap1.bdimg.com/wolfman/static/common/images/new/start_ee17f81.png) no-repeat 0 0;*/
  /*  position: absolute;*/
  /*  top: 15px;*/
  /*  left: 3px;*/
  /*}*/

  .searchbox-content .searchbox-content-button {
    box-sizing: border-box;
    float: left;
    height: 38px;
    width: 39px;
    cursor: pointer;
    position: relative;
  }

  .searchbox-content .searchbox-content-button.right-button:before {
    content: '';
    position: absolute;
    width: 38px;
    left: 0;
    top: 6px;
    height: 26px;
    border-left: 1px solid #eee;
  }

  .clearfix::after {
    clear: both;
  }

  .clearfix::before, .clearfix::after {
    display: table;
    content: "";
  }
</style>


<!--{-->
<!--"location": [-->
<!--{-->
<!--"latitude": 407838351,-->
<!--"longitude": -746143763-->
<!--}-->
<!--]-->
<!--}-->
