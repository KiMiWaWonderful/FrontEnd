<template>
  <div class="container">
    <div class="select_type" style="display: block;">
      <el-select v-model="value" placeholder="请选择检测对象" @change="changeUrl">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </div>

    <el-divider></el-divider>

    <div id="video_play" >
      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions">
      </video-player>
    </div>


  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  export default {
    name: "DriveVideo",
    components: {
      videoPlayer
    },
    data() {
      return {
        options: [{
          value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/259246bd5285890798836639224/v.f20.mp4',
          label: '移动对象检测'
        }, {
      //    value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/2315b4605285890798836513668/v.f20.mp4',
          value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/8f294eb85285890799002708929/v.f20.mp4',
          label: '交通灯检测'
        }, {
         // value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/234f54265285890798836549908/v.f20.mp4',
          value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/ce6988e15285890799003142004/v.f20.mp4',
          label: '车道检测'
        }, {
          value: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/8d64495e5285890799002687497/v.f20.mp4',
          label: '车辆检测'
        }],
        value: '',

        playerOptions: {
          playbackRates: [0, 0.5, 1.0, 1.5, 2.0],
          // 如果为true,浏览器准备好时开始回放。
          //不需要手动开始
          autoplay: true,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 是否视频一结束就重新开始。
          loop: true,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto',
          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9',
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [{
            src: ''
            // type: "video/mp4", // 类型
            // src: 'https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4' // url地址

            //移动对象检测
           // src: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/259246bd5285890798836639224/v.f20.mp4'
            //交通灯检测
           // src: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/2315b4605285890798836513668/v.f20.mp4'
            //车道检测
           // src: 'http://1300084903.vod2.myqcloud.com/5b1b9846vodtranscq1300084903/234f54265285890798836549908/v.f20.mp4'
          }],
          // 封面地址
          poster: '',
          // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          // notSupportedMessage: '此视频暂无法播放，请稍后再试',
          notSupportedMessage: '暂时没有视频播放',
          controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
          }
        }
      }
    },
    methods :{
      changeUrl(){
        console.log(this.value)
        this.playerOptions.sources[0].src = this.value

      },
      //显示播放器
      showPanel() {
        // console.log("showPanel")
        var data = document.getElementById('video_play').style.cssText
        console.log(data)
        // display: none;
        if(data == "display: block;") {
          document.getElementById('video_play').style.cssText = "display: none;"
        }else if(data == "display: none;"){
          document.getElementById('video_play').style.cssText = "display: block;"
        }

      },
    }
  }
</script>

<style scoped>

</style>
