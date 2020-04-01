<template>

  <div>
<!--  <bm-control>-->
<!--    <button @click="addZoom(19)">缩放至最大</button>-->
<!--    <button @click="addZoom(10)">还原</button>-->
<!--    <button @click="addZoom(3)">缩放至最小</button>-->

<!--    <label>关键词：<input v-model="keyword"></label>-->
<!--    <label>地区：<input v-model="location"></label>-->
<!--    <baidu-map>-->
<!--      <bm-view class="map"></bm-view>-->
<!--      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>-->
<!--    </baidu-map>-->

<!--    <div id="searchbox-container">-->
<!--      <div id="sole-searchbox-content" class="searchbox-content is-complete">-->
<!--        <input id="sole-input"-->
<!--               class="searchbox-content-common cc_cursor"-->
<!--               type="text" name="word" autocomplete="off" maxlength="256"-->
<!--               placeholder="搜地点、查公交、找路线"-->
<!--               v-model="keyword">-->


<!--&lt;!&ndash;        <div class="input-clear" title="清空" style="display: none;"></div>&ndash;&gt;-->
<!--&lt;!&ndash;        <div class="searchbox-content-button right-button loading-button cancel-button" data-title="清空" data-tooltip="1">&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;          ::before&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;        ::after&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->

<!--    <button id="search-button" data-title="搜索" data-tooltip="2"></button>-->

<!--    <baidu-map :center="{lng: 116.404, lat: 39.915}" :zoom="zoom" :scroll-wheel-zoom="true" >-->
<!--      <bm-view class="map"></bm-view>-->

<!--      <bm-control>-->
<!--        <div id="searchbox-container">-->
<!--          <div id="sole-searchbox-content" class="searchbox-content is-complete">-->
<!--            <input id="sole-input"-->
<!--                   class="searchbox-content-common cc_cursor"-->
<!--                   type="text" name="word" autocomplete="off" maxlength="256"-->
<!--                   placeholder="搜地点、查公交、找路线"-->
<!--                   v-model="keyword">-->


<!--                    <div class="input-clear" title="清空" style="display: none;"></div>-->
<!--                    <div class="searchbox-content-button right-button loading-button cancel-button" data-title="清空" data-tooltip="1">-->
<!--                      ::before-->
<!--                    </div>-->
<!--                    ::after-->

<!--            <div id="route-searchbox-content" class="searchbox-content route-searchbox-content bus" style="display: none;">-->
<!--              <div class="route-header">-->
<!--                <div class="searchbox-content-common route-tabs cc_cursor">-->
<!--                  <div class="tab-item bus-tab cc_pointer" data-index="bus">-->
<!--                    <i></i><span>公交</span>-->
<!--                  </div>-->
<!--                  <div class="tab-item drive-tab cc_pointer" data-index="drive">-->
<!--                    <i></i><span>驾车</span>-->
<!--                  </div>-->
<!--                  <div class="tab-item walk-tab cc_pointer" data-index="walk">-->
<!--                    <i></i><span>步行</span>-->
<!--                  </div>-->
<!--                  <div class="tab-item bike-tab cc_pointer" data-index="bike">-->
<!--                    <i></i><span>骑行</span>-->
<!--                  </div>-->
<!--                  <div class="arrow-wrap"></div>-->
<!--                </div>-->
<!--                <div class="searchbox-content-button right-button cancel-button loading-button cc_pointer" data-title="关闭路线" data-tooltip="3">-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="routebox cc_cursor">-->
<!--                <div class="searchbox-content-common routebox-content">-->
<!--                  <div class="routebox-revert cc_pointer" title="切换起终点">-->
<!--                    <div class="routebox-revert-icon cc_pointer">-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="routebox-inputs cc_cursor">-->
<!--                    <div class="routebox-input route-start cc_cursor">-->
<!--                      <div class="route-input-icon">-->
<!--                      </div>-->
<!--                      <input autocomplete="off" maxlength="256" placeholder="输入起点或在图区上选点" class="route-start-input cc_cursor" type="text" value="">-->
<!--                      <div class="input-clear" title="清空" style="display: none;">-->
<!--                      </div>-->
<!--                      <div class="route-input-add-icon">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                    <div class="routebox-input route-end">-->
<!--                      <div class="route-input-icon">-->
<!--                      </div>-->
<!--                      <input autocomplete="off" maxlength="256" placeholder="输入终点" class="route-end-input cc_cursor" type="text" value="">-->
<!--                      <div class="input-clear" title="清空" style="display: block;">-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <button id="search-button" data-title="搜索" data-tooltip="2"></button>-->




    <div id="searchbox" class="clearfix">
<!--      ::before-->
      <div id="searchbox-container">

        <div id="sole-searchbox-content" class="searchbox-content" style="display: block;">
          <input id="sole-input" class="searchbox-content-common cc_cursor" type="text" name="word" autocomplete="off" maxlength="256"
                 placeholder="搜地点、查公交、找路线" value="">
          <div class="input-clear cc_pointer" title="清空" style="display: block;"></div>
          <div class="searchbox-content-button right-button loading-button cc_pointer route-button" data-title="路线" data-tooltip="1" @click="showPanel">
<!--            ::before-->
          </div>
<!--          ::after-->
        </div>

        <div id="route-searchbox-content" class="searchbox-content route-searchbox-content bus" style="display: none;">

          <div class="route-header">
            <div class="searchbox-content-common route-tabs cc_cursor">
              <div class="tab-item bus-tab cc_pointer" data-index="bus">
                <i></i><span>公交</span>
              </div>
              <div class="tab-item drive-tab cc_pointer" data-index="drive">
                <i></i><span>驾车</span>
              </div>
              <div class="tab-item walk-tab cc_pointer" data-index="walk">
                <i></i><span>步行</span>
              </div>
              <div class="tab-item bike-tab cc_pointer" data-index="bike">
                <i></i><span>骑行</span>
              </div>
              <div class="arrow-wrap"></div>
            </div>
<!--            <div class="searchbox-content-button right-button cancel-button loading-button cc_pointer" data-title="关闭路线" data-tooltip="3">-->
<!--            </div>-->
          </div>


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
                  <input autocomplete="off" maxlength="256" placeholder="输入起点或在图区上选点"
                         class="route-start-input cc_cursor" type="text" value="">
                  <div class="input-clear" title="清空" style="display: none;">
                  </div>
                  <div class="route-input-add-icon">
                  </div>
                </div>

                <div class="routebox-input route-end">
                  <div class="route-input-icon">
                  </div>
                  <input autocomplete="off" maxlength="256" placeholder="输入终点" class="route-end-input cc_cursor" type="text" value="">
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
<!--      </bm-control>-->
<!--      &lt;!&ndash;keyword:输入框输入的文字 location:可以是自己当前所在地（location可以存入vuex中？）&ndash;&gt;-->
<!--      <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search>-->
<!--    </baidu-map>-->
<!--  </bm-control>-->
  </div>
</template>

<script>
  export default {
    name: "Transit",
    data () {
      return {
        zoom: 3,
        location: '北京',
        keyword: ''
      }
    },
    methods : {
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

      }
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
    color: #3385ff;
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
