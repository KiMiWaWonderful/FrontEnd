<template>
  <div>
    <el-select
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="loading">
<!--      <el-option-->
<!--              v-for="item in options"-->
<!--              :key="item.value"-->
<!--              :label="item.label"-->
<!--              :value="item.value">-->
<!--      </el-option>-->
      <el-option
              v-for="item in options"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import axios from 'axios';
  import jsonpAdapter from 'axios-jsonp';

  export default {
    name: "Select",
    data() {
      return {
        //用关键字搜索返回的数据
        options: [],
        value: [],
        //搜索列表中所有数据
        list: [],
        loading: false,
        states: []
      }
    },
    mounted() {
      // this.list = this.states.map(item => {
      //   return { value: `value:${item}`, label: `label:${item}` };
      // });
    },
    methods: {
      // showData(e) {
      //   console.log(e)
      // },
      //输入框有数据时候调用
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;

          setTimeout(() => {
            this.loading = false;

            // this.options = this.list.filter(item => {
            //   return item.name.toLowerCase()
            //       .indexOf(query.toLowerCase()) > -1;
            // });

            //调用搜索接口，把拿到的返回list中
            let config = {
              url: 'http://api.map.baidu.com/place/v2/suggestion?query='+query+'&region=北京&city_limit=true&output=json&ak=qVixkQ96uQ7eQ2WpRYzGeaV4LfOqByaw',
              method: 'get',
              // data: param,
              adapter: jsonpAdapter,
              // timout: 10000,
              headers:{
                // "Content-Type":"application/j",
                "Access-Control-Allow-Origin":"Authorization,Origin,X-Requested-With,Content-Type,Accept",
                // "X-Requested-With":"XMLHttpRequest"
              }
            }

            // axios.defaults.withCredentials = true // 若跨域请求需要带 cookie 身份识别
            // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

            axios(config)
                .then((response) => {
                  console.log("返回的数据===========================")
                  console.log(response.data)
                  this.options = response.data.result
                  // this.center.lng = response.data.longitude
                  // this.center.lat = response.data.latitude
                })
                .catch(err=>{
                  console.log(err)
                })

            // console.log("options===========================")
            // console.log(this.options)

          }, 200);


        } else {
          this.options = [];
        }
      }
    }
  }
</script>

<style scoped>

</style>
