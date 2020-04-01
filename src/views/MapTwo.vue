<template>
  <div id="container">

    <baidu-map class="map"
               :center="center"
               :zoom="15"
               :scroll-wheel-zoom="true">

      <!--交通流量-->
      <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>

<!--    <baidu-map class="map"-->
<!--               :center="center"-->
<!--               :zoom="15"-->
<!--               :scroll-wheel-zoom="true"-->
<!--                @click="getPoint">-->
<!--               @ready="getPoints"-->

      <!--点-->
      <bm-marker :position="markerPoint" :dragging="true"  animation="BMAP_ANIMATION_BOUNCE">
        <bm-info-window :show="infoWindow.show" @close="infoWindowClose" @open="infoWindowOpen">
<!--          <p v-text="infoWindow.contents"></p>-->
<!--          <p>站点：{{ infoWindow.contents.siteName }}</p>-->
          <p>地址：{{ infoWindow.contents.jd }}</p>
          <p>地址：{{ infoWindow.contents.wd }}</p>
<!--          周边:-->
<!--          <p v-for="p in surroundingPoints">-->
<!--            {{p.title}}-->
<!--            {{p.Si}}-->
<!--          </p>-->
        </bm-info-window>
      </bm-marker>

<!--      @mousemove="syncPolyline"-->
<!--      @click="paintPolyline"-->
<!--      @rightclick="stopPaint"-->
<!--                @dbclick="stoppaint"-->

      <!-- 使用bm-polyline和bml-lushu结合实现轨迹绘制？,这个是接收后台数据-->
      <bm-polyline
              stroke-color="blue"
              :stroke-opacity="0.5"
              :stroke-weight="6"
              :path="path">
      </bm-polyline>
<!--      <bml-lushu :path="path"  :play="play">-->
<!--      </bml-lushu>-->


      <bm-control>
        <div id="searchbox" class="clearfix">
          <!--      ::before-->
          <div id="searchbox-container">

            <div id="sole-searchbox-content" class="searchbox-content" style="display: block;">
              <input id="sole-input" class="searchbox-content-common cc_cursor" type="text" name="word" autocomplete="off" maxlength="256"
                     placeholder="搜地点"
                     v-model="keyword">
              <div class="input-clear cc_pointer" title="清空" style="display: block;" @click="clearInput"></div>
              <div class="searchbox-content-button right-button loading-button cc_pointer route-button"
                   data-title="路线" data-tooltip="1" @click="showPanel">
                <!--                <i class="el-icon-position" id="luxian"></i>-->
                <!--                <i id="luxian"> </i>-->
                <button id="luxian-button" ></button>

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


<!--          <button id="search-button" data-title="搜索" data-tooltip="2"></button>-->

          <!-- 关于围栏-->
<!--          <el-button type="info" plain @click="showFencePanel">查看围栏</el-button>-->
<!--          <el-button type="info" plain @click="showAddFencePanel">添加围栏</el-button>-->


          <!--      <div id="toast-wrapper">-->
          <!--        <div id="toast">-->
          <!--          <img class="info-tip-img" src="/wolfman/static/common/images/transparent.gif" alt="">-->
          <!--          <span class="info-tip-text"></span>-->
          <!--        </div>-->
          <!--      </div>-->

          <!--      ::after-->
        </div>
        <!--        <button id="search-button" data-title="搜索" data-tooltip="2"></button>-->

        <!--搜索地点-->
        <bm-local-search :keyword="keyword" :auto-viewport="true" :location="searchLocation"></bm-local-search>

        <!--公交路线规划-->
        <div v-if="checkedBus">
          <bm-transit :start="startKeyword" :end="endKeyword" :auto-viewport="true" :location="transitLocation"></bm-transit>
        </div>

        <!--驾车路线规划-->
        <div v-if="checkedDrive">
          <bm-driving :start="startKeyword" :end="endKeyword" :auto-viewport="true" :location="driveLocation"></bm-driving>
        </div>

        <!--行走路线规划-->
        <div v-if="checkedWalk">
          <bm-walking :start="startKeyword" :end="endKeyword" :auto-viewport="true" :location="walkLocation"></bm-walking>
        </div>
      </bm-control>


    </baidu-map>
  </div>
</template>

<script>

  import axios from 'axios';
 import {mapMutations} from 'vuex'
 import jsonpAdapter from 'axios-jsonp';

  export default {
    name: "MapTwo",
    data() {
      return {
        //地图中心
        center: {lng: 0, lat: 0},
        //center: {lng: 110.91608047485352, lat: 21.661895340414247},
        //点
        markerPoint: {lng: 0, lat: 0},
        //消息窗口
        infoWindow: {
          show: false,
          contents: {
            siteName: '',
            //详细地址
            address: '',
            //经度
            jd: '',
            //纬度
            wd: '',
            desce: '',
            type: '',
            jgName:'',
            jgNum:''
          }
        },

        //周边景点
        surroundingPoints: [],

        //这个现在没用到
        polylinePath: [
          // {lng: 116.404, lat: 39.915},
          // {lng: 116.405, lat: 39.920},
          // {lng: 116.423493, lat: 39.907445}
        ],

        //这个现在没用到
        play: true,

        //轨迹路线数组
        path: [
           {lng: 110.91608047485352, lat: 21.661895340414247},
            // this.center,
            //如果初始为空，好像数组里面添加进去也不描绘轨迹
          // {lng: 116.404, lat: 39.915},
          // {lng: 117.405, lat: 39.920},
          // {lng: 118.423493, lat: 39.907445}
        ],

        websocket: null,

        //搜索关键字
        keyword:'',

        //出行始终点
        startKeyword: '',
        endKeyword: '',

        //搜索地区范围
        searchLocation: '',
        //公交地区范围
        transitLocation: '',
        //驾车地区范围
        driveLocation: '',
        //行走地区范围
        walkLocation: '',

        //选择出行方式
        checkedBus: false,
        checkedDrive: false,
        checkedWalk: false,
        checkedBike: false,

        //围栏表格数据
        fenceData:[],

        sizeForm: {
          name: '',
          // region: '',
          // date1: '',
          // date2: '',
          // delivery: false,
          // type: [],
          // center: '',
          // fence_name:'',
          lng:'',
          lat:'',
          radius: '',
          resource: false,
          desc: ''
        }
      };
    },

    destroyed() {
      this.websocket.close()
   //   this.path.c
    },
    methods: {
      //设置城市名称
      ...mapMutations(["setCity"]),

      //根据经纬度查找到所在的城市
      getCityName() {
        let config = {
          url: 'http://api.map.baidu.com/reverse_geocoding/v3/?ak=qVixkQ96uQ7eQ2WpRYzGeaV4LfOqByaw&output=json&coordtype=wgs84ll&location=' + this.center.lat +' ,' + this.center.lng,
          method: 'get',
          adapter: jsonpAdapter,
        }

        axios(config)
            .then((response) => {
              console.log('--------------getCityName')
              console.log(response)
              console.log(response.result.addressComponent.city)
              // console.log(response.data)
              // console.log(response.data.result.addressComponent.city)
              let city = response.result.addressComponent.city
              this.searchLocation = city
              this.transitLocation = city
              this.driveLocation = city
              this.walkLocation = city
              this.setCity(city)
            })
      },

      //地图点击事件
      getPoint(e) {
        this.infoWindow.show = true
        // this.markerPoint.lng = e.point.lng
        // this.markerPoint.lat = e.point.lat
        //
        // this.infoWindow.contents.jd = e.point.lng
        // this.infoWindow.contents.wd = e.point.lat

        //this.infoWindow.contents.address = e.point.lat

        let geocoder = new BMap.Geocoder()
        geocoder.getLocation(e.point, res => {
          console.log(res)
          // console.log(res.addressComponents);
          this.infoWindow.contents.address = res.address
          this.surroundingPoints = res.surroundingPois
        })
      },

      //清空输入框
      clearInput() {
        this.keyword = ''
      },

      //显示面板
      showPanel() {
        var data = document.getElementById('route-searchbox-content').style.cssText
        console.log(data)
        if(data == "display: block;") {
          document.getElementById('route-searchbox-content').style.cssText = "display: none;"
        }else if(data == "display: none;"){
          document.getElementById('route-searchbox-content').style.cssText = "display: block;"
        }
      },

      initWebSocket() {
        if(typeof (WebSocket) == 'undefined'){
          alert('不支持websocket')
          return false
        }

        const wsuri = 'ws://localhost:8080/websocket/location'
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
        console.log('array数组：')
        console.log(this.path)
        console.log("message-----------")
       // console.log(e)

        //收到的数据：
        // {
        //   "lat" : 40.7838351,
        //     "lng" : -74.6143763
        // }
        console.log(e.data)
        var obj = JSON.parse(e.data)

        //转换后的对象：
        //{lat: 40.7838351, lng: -74.6143763}

       // {x:110.92028617858887,y:21.661975109568683}
        console.log(obj)
         this.path.push(obj)
         this.markerPoint.lat = obj.lat
         this.markerPoint.lng = obj.lng

        console.log('增加后的array数组：')
        console.log(this.path)
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

      infoWindowClose() {
        this.infoWindow.show = false
        // setInterval(() => {
        //   this.infoWindow.show = true
        // }, 300)
      },
      infoWindowOpen() {
        // this.infoWindow.show = true
        setInterval(() => {
          this.infoWindow.show = true
        }, 100)
      },

      //从后台获取中心坐标点
      getCenterFromBack() {
        let config = {
          url: 'http://localhost:8080/ws/sendCenter',
          method: 'get',
        }

        axios(config)
            .then((response) => {
              console.log('-------------getCenterFromBack---------')
              console.log(response.data)
               this.center.lng = response.data.lng
               this.center.lat = response.data.lat

              this.getCityName()
            })
        console.log("now the center is -----------")
        console.log(this.center)

      },

    },
    created() {
      this.initWebSocket()
      //暂时屏蔽,从后台获取中心点
       this.getCenterFromBack()
     // this.getCityName()

    }
  }
</script>

<style scoped>
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
  #weilan-button{
    outline: 0;
    font-family: inherit;
    pointer-events: auto;
    background-color: white;
    background-image: url(../assets/pic/fence.png) ;
    width: 46px;
    height: 38px;
    float: left;
    border: 0;
    padding: 0;
    cursor: pointer;
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

  input, button, select, textarea {
    outline: 0;
    font-family: inherit;
  }

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
