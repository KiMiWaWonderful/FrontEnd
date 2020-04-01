class CreatePoint {
  constructor (initPoint={
    lng: 116.404,
    lat: 39.915
  }) {
    // this.initPoint = initPoint
    this.randomPoint = initPoint
  }
  // 每次执行会在上一次坐标的基础上随机加减一个随机值
  randomAction () {
    let lng = this.randomComputed() === 'addition' ? this.randomPoint.lng + this.randomNum() : this.randomPoint.lng - this.randomNum()
    let lat = this.randomComputed() === 'addition' ? this.randomPoint.lat + this.randomNum() : this.randomPoint.lat - this.randomNum()
    this.randomPoint = {
      lng,
      lat
    }
    return this.randomPoint
  }
  randomComputed () {
    let sign = Math.random() > 0.5 ? 'addition' : 'subtraction'
    return sign
  }
  randomNum () {
    let num = Math.random() * 0.03
    return num
  }
}

var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)

app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>')
})

io.on('connection', (client) => {
  //console.log(point)
  console.log('a user connected');
  // 1. 创建一个创造坐标的实例
  let CreateCustomPoint = new CreatePoint()
  console.log(CreateCustomPoint);
  // 每隔3秒向客户端推送一次坐标
  setInterval(() => {
    client.emit('newPoint', CreateCustomPoint.randomAction())
  }, 3000)
})
// })

http.listen(3000, function(){
  console.log('listening on *:3000')
})
