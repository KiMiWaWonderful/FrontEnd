<template>
  <div class="video">
    <video ref="myvideo" @canplay="getTotal" @timeupdate="timeupdate" @click="showControls">
      <source src="https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4"/>
    </video>
<!--    <video -->
<!--            webkit-playsinline="" -->
<!--            playsinline="" -->
<!--            x-webkit-airplay="" -->
<!--            autoplay="autoplay" -->
<!--            src="https://video.pearvideo.com/mp4/short/20200209/cont-1650197-14888002-hd.mp4" -->
<!--            style="width: 100%; height: 100%;"></video>-->
    <transition
            enter-active-class="animated fadeIn slow"
            leave-active-class="animated fadeOut slow"
      >
    <div class="controls" v-show="isShow">
      <div class="con_left">
        <!--播放与暂停-->
        <span :class="{'icon-play3':!isPaused,'icon-pause2':isPaused}" @click="togglePlay"></span>
<!--        <i class="el-icon-caret-right" @click="togglePlay"></i>-->
        <!--停止-->
        <span class="icon-stop2" @click="stopPlay"></span>
<!--        <i class="el-icon-video-pause" @click="stopPlay"></i>-->
        <!--播放时间/总时长-->
        <span>{{currentTime}}/{{totalTime}}</span>
      </div>

      <div class="con_right">
        <!--声音-->
        <span :class="{'icon-volume-low':!isMuted,'icon-volume-mute2':isMuted}" @click="toggleMuted"></span>
<!--        <i class="el-icon-bell" @click="toggleMuted"></i>-->
        <!--全屏-->
        <span class="icon-loop" @click="toggleFullScreen"></span>
<!--        <i class="el-icon-full-screen" @click="toggleFullScreen"></i>-->
      </div>
    </div>
    </transition>
  </div>
</template>

<script>
  //动画 npm i animate.css
  import "animate.css";
  // 引入字体样式文件
  import '../styles/style.css'
  export default {
    name: "Drive",
    data () {
      return {
        myvideo: null,

        //标记当前的播放状态
        isPaused: false,
        //标记当前是否静音
        isMuted: false,
        //当前播放时间
        currentTime: '00:00',
        //总时长
        totalTime: '00:00',
        //标记控制面板是否可见
        isShow: true,
        //开始时间，毫秒为单位
        startTime: 0
      }
    },
    mounted () {
      //获取播放器元素
      this.myvideo = this.$refs.myvideo

      //记住起始时间，这个时间可以作为时间间隔的参照
      this.startTime = Date.now()

      //开启一个定时器
      setInterval(() => {
        if(Date.now() - this.startTime > 5000) {
          this.isShow = false
        }
      },1000)
    },
    methods :{
      //播放与暂停
      togglePlay() {
        //console.log("click")

        //视频标签（video）原生方法：
        //play():让视频播放
        //pause():让视频暂停

        //修改当前的播放状态
        this.isPaused = !this.isPaused
        if(this.isPaused) {
          this.myvideo.play()
        }else {
          this.myvideo.pause()
        }

      },
      //停止播放
      stopPlay() {
        //没有提供原生的stop方法
        //this.myvideo.stop()
        this.myvideo.pause()
        //currentTime这个属性就是用来标记当前视频播放到的时间，以秒为单位
        this.myvideo.currentTime = 0
        //重置播放状态为初始值
        this.isPaused = false
      },
      //时间格式化处理
      timeFormat(time) {
        let minute = Math.floor((time % 3600) / 60)
        let second = Math.floor(time % 60)
        minute = minute < 10 ? "0" + minute : minute
        second = second < 10 ? "0" + second : second
        return `${minute}:${second}`
      },
      //获取总时长
      getTotal() {
        console.log(this.myvideo.duration)
        this.totalTime = this.timeFormat(this.myvideo.duration)
      },
      //获取当前视频播放到的时间
      timeupdate() {
        this.currentTime = this.timeFormat(this.myvideo.currentTime)
      },
      //静音操作
      toggleMuted() {
        //修改图标
        this.isMuted = !this.isMuted
        //静音
        this.myvideo.muted = !this.myvideo.muted
      },
      //全屏切换
      toggleFullScreen(event) {
        const myvideo = this.$refs.myvideo
        //如果当前是全屏状态，就退出全屏，否则进入全屏状态
        //获取当前的全屏状态
        let isFullscreen = document.webkitIsFullScreen || document.fullscreen
        if(!isFullscreen) {
          const inFun = myvideo.requestFullscreen || myvideo.webkitRequestFullScreen
          //让当前播放器进入全屏状态
          inFun.call(myvideo)
        }else {
          const exitFun = document.exitFullscreen || document.webkitExitFullScreen
          //退出全屏状态要使用document
          exitFun.call(document)
        }
      },
      //显示控制面板
      showControls() {
        this.isShow = true
        // 一定要记得更新起始时间的参照
        this.startTime = Date.now()
      }
    }
  }
</script>

<style scoped>
  .video {
    position: relative;
  }

  video {
    width: 100%;
    height: 100%;
  }

  .controls {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      padding: 0 5px;
      color: #ffffff;
    }
  }
</style>
