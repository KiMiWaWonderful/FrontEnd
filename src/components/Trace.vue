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
              label="日期">
      </el-table-column>
      <el-table-column
              prop="start"
              label="起点">
      </el-table-column>
      <el-table-column
              prop="end"
              label="终点">
      </el-table-column>
      <el-table-column>
<!--  以后做搜索"/>-->
        <template slot="header" slot-scope="scope">
          <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
                  size="mini"
                  @click="handleCheck(scope.row._id)">查看详情</el-button>
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
                 :scroll-wheel-zoom="true">

<!--        <bm-marker-->
<!--                :position="center"-->
<!--                :dragging="true"-->
<!--                animation="BMAP_ANIMATION_BOUNCE" >-->
<!--        </bm-marker>-->

        <!--交通流量-->
        <bm-traffic :predictDate="{weekday: 7, hour: 12}"></bm-traffic>

        <!--路书,查看历史轨迹-->
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
  import axios from 'axios';
  import jsonpAdapter from 'axios-jsonp';

  export default {
    name: "Trace",
    data() {
      return{
        center: {lng: 110.91989994049072, lat: 21.661915282707003},
        tableData: [],
        polylinePath: [
          // {lng: 110.91989994049072, lat: 21.661915282707003},
          // {lng: 110.92698097229004, lat: 21.66181557121569},
          // {lng: 110.92715263366699, lat: 21.67198578827035}
        ],
        play: true,
        icon: {
          url: 'http://api.map.baidu.com/library/LuShu/1.2/examples/car.png',
          size: {width: 52, height: 26},
          opts: {anchor: {width: 27, height:13}}
        },
      }
    },
    methods : {
      fetch(){
        this.$http.get('trace').then(res => {
          console.log(res.data)
          this.tableData = res.data
         // this.arr = res.data
        })
      },
      handleCheck(id) {
      //  console.log(index, row);
        this.$http.get(`trace/${id}`).then(res => {
          console.log(res.data.coordinates)
          this.polylinePath = res.data.coordinates
        })
      },
      handleDelete(id) {
        //console.log(index, row);
        this.$http.delete(`trace/${id}`).then(res => {
          this.$message({
            message: '删除轨迹成功',
            type: 'success'
          });
          this.fetch()
        })
      }
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
