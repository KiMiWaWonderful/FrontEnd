const express = require('express')
const app = express()

app.use(require('cors') ())
app.use(express.json())

const mongoose = require('mongoose')
//const GeoJSON = require('mongoose-geojson-schema')

mongoose.connect('mongodb://learn:123456@localhost:27017/learning',{
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
})

//行车轨迹
// const Trace = mongoose.model('Trace',new mongoose.Schema({
//   //名称
//   name: String,
//   type: {
//     type: String,
//     enum: ['LineString'],
//     required: true
//   },
//   coordinates: {
//     type: [[Array]], // Array of arrays of arrays of numbers
//     required: true
//   }
// }));

const Trace = mongoose.model('Trace',new mongoose.Schema({
  geoJsonLineString: {
    type: {
      type: String,
      enum: ['LineString'],
      required: true
    },
    coordinates: {
      type: [[Number]], // Array of arrays of arrays of numbers
      required: true
    }
  }
}), 'Trace');

//地理围栏
const Fence = mongoose.model('Fence',new mongoose.Schema({
  //名称
  name: String,
  type: {
    type: String,
    enum: ['Polygon'],
    required: true
  },
  coordinates: {
    // type: [[Array]], // Array of arrays of arrays of numbers
    type: Array,
    required: true
  },
  // date: String
}));

//显示历史轨迹列表
app.get('/api/trace', async(req, res) => {
  const traces = await Trace.find()
  res.send(traces)
})

//删除轨迹
app.delete('/api/trace/:id', async (req, res) => {
  await Trace.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

//查看轨迹详情
app.get('/api/trace/:id', async(req, res) => {
  const traces = await Trace.findById(req.params.id)
  res.send(traces)
})

//显示历史围栏列表
app.get('/api/fence', async(req, res) => {
  const fences = await Fence.find()
  res.send(fences)
})

//删除围栏
app.delete('/api/fence/:id', async (req, res) => {
  await Fence.findByIdAndDelete(req.params.id)
  res.send({
    status: true
  })
})

//查看围栏详情
app.get('/api/fence/:id', async(req, res) => {
  const fence = await Fence.findById(req.params.id)
  res.send(fence)
})

//新增地理围栏
app.post('/api/fence', async(req, res) => {
  const fence = await Fence.create(req.body)
  res.send(fence)
})

app.listen(3001,() => {
  console.log('http://localhost:3001')
})
// const citySchema = new mongoose.Schema({
//   name: String,
//   location: polygonSchema
// });
//
// const Fence = mongoose.model('Fence',new mongoose.Schema({
//   //围栏名称
//   title: {type: String},
//   //围栏初步定位多边形，有很多数组
//   body: {
//     type: Polygon,
//     coordinates: []
//   },
// }))

//--------------------------------------------
// {
//   "type": "FeatureCollection",
//     "features": [
//   {
//     "type": "Feature",
//     "properties": {},
//     "geometry": {
//       "type": "LineString",
//       "coordinates": [
//    [110.91994285583496,21.666302520088177],[110.9269380569458,21.666242695021335],[110.92713117599487,21.671945906467034],[110.93322515487671,21.672025670062624]
//       ]
//     }
//   },
//   {
//     "type": "Feature",
//     "properties": {},
//     "geometry": {
//       "type": "LineString",
//  "coordinates": [
//  [110.91989994049072,21.661915282707003],[110.92698097229004,21.66181557121569],[110.92715263366699,21.67198578827035]
//       ]
//     }
//   },
//   {
//     "type": "Feature",
//     "properties": {},
//     "geometry": {
//       "type": "LineString",
//       "coordinates": [
//  [110.9089994430542,21.65754785479067],[110.91356992721558,21.65756779768436],[110.91354846954344,21.665604559430992]
//       ]
//     }
//   }
// ]
// }
