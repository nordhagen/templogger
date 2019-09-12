const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')
const add = admin.firestore.FieldValue.arrayUnion

const bootTime = new Date()
let mockTemp = 20
let logfn

const getElapsed = () => new Date().getTime() - bootTime.getTime()
const createDataObj = () => ({ tempC: mockTemp++, time: getElapsed() })

const logToFirebase = () => {
  let data = createDataObj()
  db.collection('templogger')
    .doc(docName)
    .update({ data: add(data) })
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const docName = `log_${bootTime.toISOString()}`
console.log(`Attempting to create ${docName}`)
db.collection('templogger')
  .doc(docName)
  .set({ bootTime: bootTime, data: [] }, { merge: true })

const constmockInterval = setInterval(logToFirebase, 5000)
