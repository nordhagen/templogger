const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const admin = require('firebase-admin')
const fs = require('fs')

const shutdownTime = new Date(2019, 8, 12, 18, 9, 0)
let mockTemp = 20
let logfn

const createMockDataObj = () => ({ tempC: mockTemp++ })

const addTimeStamp = dataObj => {
  dataObj.timeStamp = new Date().toISOString()
  return dataObj
}

const initDestFile = () => {
  const logStream = fs.createWriteStream('log.csv')
  logStream.write('Time Stamp,Temperature C,\n')
  logfn = logToFile
}

const initDestConsole = () => (logfn = logToConsole)

const initDestFirebase = () => {
  const serviceAccount = require('./serviceAccountKey.json')

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://templogger-f414b.firebaseio.com'
  })

  logfn = logToFirebase
}

const initSourceSerial = () => {
  const port = new SerialPort('/dev/cu.usbmodem144101', { baudRate: 9600 })
  const parser = port.pipe(new Readline({ delimeter: '\n' }))

  port.on('open', () =>
    console.log('Connected. Will shut down at ' + shutdownTime.toISOString())
  )
  parser.on('data', handleDataSerial)
}

const initSourceMock = () => {
  console.log('Connected. Will shut down at ' + shutdownTime.toISOString())
  handleDataMock()
  const constmockInterval = setTimeout(handleDataMock, 60000)
}

const handleDataSerial = data => {
  let dataObj
  try {
    dataObj = JSON.parse(data)
  } catch (e) {
    console.warn('Malformed data: ' + data)
    dataObj = { tempC: null }
  }
  addTimeStamp(dataObj)
  logfn(dataObj)
  evaluateShutdown()
}

const handleDataMock = () => {
  let dataObj = createMockDataObj()
  addTimeStamp(dataObj)
  logfn(dataObj)
  evaluateShutdown()
}

const logToFile = dataObj => {
  logStream.write(dataObj.timeStamp + ',' + dataObj.tempC + ',\n')
}

const logToConsole = dataObj => {
  console.log(dataObj)
}

const logToFirebase = dataObj => {
  let db = admin.database()
  let ref = db.ref('/temps')
  ref.update(dataObj, console.log)
}

const evaluateShutdown = () => {
  if (new Date().getTime() >= shutdownTime.getTime()) {
    console.log('Shut down at ' + shutdownTime.toISOString())
    clearInterval(mockInterval)
    process.exit(0)
  }
}

process.on('exit', () => logStream.end())
initDestFirebase()
initSourceMock()
