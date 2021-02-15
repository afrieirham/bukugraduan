const functions = require('firebase-functions')
const algoliasearch = require('algoliasearch')

const APP_ID = functions.config().algolia.app
const ADMIN_KEY = functions.config().algolia.key

const client = algoliasearch(APP_ID, ADMIN_KEY)
const index = client.initIndex('dev_LISTINGS')

exports.addToIndex = functions.firestore.document('booklist/{booklistId}').onCreate((snapshot) => {
  const data = snapshot.data()
  const objectID = snapshot.id
  return index.saveObject({ ...data, objectID })
})

exports.updateIndex = functions.firestore.document('booklist/{booklistId}').onUpdate((change) => {
  // Get updated data
  const newData = change.after.data()
  const objectID = change.after.id
  const isSold = change.after.data().isSold

  // Delete from algolia if sold
  if (!isSold) {
    return index.saveObject({ ...newData, objectID })
  } else {
    return index.deleteObject(objectID)
  }
})

exports.deleteFromIndex = functions.firestore
  .document('booklist/{booklistId}')
  .onDelete((snapshot) => index.deleteObject(snapshot.id))
