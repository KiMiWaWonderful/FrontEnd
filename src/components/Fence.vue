<template>
  <div>
    <div>
      <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
        <el-table-column
                type="index"
                width="50">
        </el-table-column>
        <el-table-column
                property="date"
                sortable
                label="添加/修改日期">
        </el-table-column>
<!--        <el-table-column-->
<!--                prop="name"-->
<!--                label="围栏名称">-->
<!--        </el-table-column>-->
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleAdd">添加围栏</el-button>
          </template>
          <template slot-scope="scope">
            <el-button
                    size="mini"
                    @click="handleCheck(scope.row._id)">查看详情</el-button>
<!--            <el-button-->
<!--                    size="mini"-->
<!--                    @click="handleEdit(scope.row._id)">编辑</el-button>-->
            <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-divider><i class="el-icon-s-promotion"></i></el-divider>

    <div>
      <baidu-map class="map"
                 :center="center"
                 :zoom="15"
                 :scroll-wheel-zoom="true"
                 @mousemove="syncPolyline"
                 @click="paintPolyline"
                 @rightclick="stopPaint">

        <!--交通流量-->
        <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>

        <!--描绘围栏-->
        <bm-polyline
                stroke-color="blue"
                :stroke-opacity="0.5"
                :stroke-weight="6"
                :path="path"
                v-for="path of polyline.paths">
        </bm-polyline>

        <!--路书,查看历史围栏-->
        <bm-polyline
                stroke-color="blue"
                :stroke-opacity="0.5"
                :stroke-weight="6"
                :path="polylinePath">
        </bm-polyline>
        <bm-lushu :path="polylinePath" :play="play" :icon="icon"></bm-lushu>
      </baidu-map>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Fence",
    data() {
      return {
        center: {lng: 110.91989994049072, lat: 21.661915282707003},
        tableData: [],
        polyline: {
          editing: false,
          paths: []
        },
        polylinePath: [],
        play: true,
        icon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: {width: 52, height: 26},
          opts: {anchor: {width: 27, height:13}}
        },
      }
    },
    methods :{
      fetch(){
        this.$http.get('fence').then(res => {
          console.log(res.data)
          this.tableData = res.data
          // this.arr = res.data
        })
      },
      handleAdd() {
        this.polyline.editing = true
        this.$message({
          message: '请在地图上绘制围栏'
        });
      },
      handleDelete(id) {
        this.$http.delete(`fence/${id}`).then(res => {
          this.$message({
            message: '删除围栏成功',
            type: 'success'
          });
          this.fetch()
        })
      },
      handleCheck(id) {
        this.$http.get(`fence/${id}`).then(res => {
          console.log(res.data.coordinates)
          this.polylinePath = res.data.coordinates
        })
      },
      //鼠标移动
      syncPolyline(e) {
        //console.log("syncPolyline")
        if (!this.polyline.editing) {
          console.log("no move")
          return
        }
        //console.log(this.polyline)
        const {paths} = this.polyline
        if(!paths.length){
          return
        }
        const path = paths[paths.length - 1]
        if(!path.length){
          return;
        }
        if(path.length == 1){
          path.push(e.point)
        }
        this.$set(path, path.length - 1, e.point)
      },

      //右键单击
      stopPaint(e) {
        if (!this.polyline.editing) {
          console.log("no move")
          return
        }

        this.polyline.editing = !this.polyline.editing

        const {paths} = this.polyline
        if(!paths.length) {
          paths.push([])
        }
        const path = paths[paths.length - 1]
        path.pop()
        if (path.length) {
          paths.push([])
        }
        //用这个
        console.log(path)

        //-------------------------------------------------------------------
        //处理数组，保存到数据库中
         let arrReplace = new Array()
        for(let i = 0, len = path.length; i < len; i ++){
          console.log(path[i])
          // let point = arr[i]
          let point = {}
          let lng = Number(path[i].lng)
          let lat = Number(path[i].lat)
          point['lng'] = lng
          point['lat'] = lat
          console.log(point)
          // var a = new Array()
          // a.push(lng)
          // a.push(lat)
          // arrReplace.push(a)
           arrReplace.push(point)
        }

        const fence = {
          // name: 'fence1',
           type: 'Polygon',
          coordinates: arrReplace,
          date: new Date()
        }
        this.$http.post('/fence',fence).then(res => {
          console.log(res.data);
          this.$message({
            message: '围栏创建成功',
            type: 'success'
          });
          this.fetch()
        })
      },

      //左键单击
      paintPolyline(e){
        console.log("paintPolyline")
        if (!this.polyline.editing) {
          console.log("no click")
          return
        }

        const {paths} = this.polyline
        !paths.length && paths.push([])
        paths[paths.length - 1].push(e.point)
      },
    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped>
  .map{
    width: 100%;
    height: 600px;
  }
</style>
