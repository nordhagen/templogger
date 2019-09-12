const admin = require('firebase')
const serviceAccount = require('./serviceAccountKey.json')

const bootTime = new Date()
let mockTemp = 20
let logfn

const getElapsed = () => new Date().getTime() - bootTime.getTime()
const createDataObj = () => ({ tempC: mockTemp++, time: getElapsed() })

const logToFirebase = () => {
  let dataObj = createDataObj()
  let db = admin.database()
  let ref = db.ref('/temps')
  ref.update(dataObj, console.log)
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://templogger-f414b.firebaseio.com'
})

const constmockInterval = setTimeout(logToFirebase, 5000)
