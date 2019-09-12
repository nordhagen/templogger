const fs = require('fs')
const file = fs.readFileSync('./log-corrected.json')
var os = require('os')
const data = JSON.parse(file)

const json = data.map(item => {
  let pts = item.time.split(':')
  let h = parseInt(pts[0]) - 11
  let m = parseInt(pts[1])

  // let date = new Date()
  // date.setHours(h)

  return { time: h * 60 + m - 30, temp: item.temp }
})

let csv = 'Elapsed,Temp,'
json.forEach(item => {
  csv += item.time + ',' + item.temp + ',' + os.EOL
})

fs.writeFileSync('log-elapsed.json', JSON.stringify(json))
fs.writeFileSync('log-elapsed.csv', JSON.stringify(csv), 'utf-8')
console.log(csv)
