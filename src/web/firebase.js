import * as firebase from 'firebase/app'
import 'firebase/firestore'
import config from '../../firebase_config'

firebase.initializeApp(config)
const firestore = firebase.firestore()

export default {
  async getLogfiles() {
    const ref = await firestore.collection('templogger').get()
    return ref.docs.map(doc => doc.id)
  },
  async getLogfile(id) {
    const ref = await firestore
      .collection('templogger')
      .doc(id)
      .get()
    return ref
  }
}
