// denne fila bruker jeg så jeg slipper å skrive firebase-requests i hver eneste vue-fil.
// Get.js dreier seg spesifikt om å HENTE data. funksjoner for SKRIVE data er definert i create.js

import { db } from '@/firebase.js'

const getData = async (limit, collection) => {
  let ref;

  if (limit) {
    ref = db.collection(collection).limit(limit)
  } else {
    ref = db.collection(collection)
  }

  const res = []

  await ref.get().then((querySnapshot) => {
    querySnapshot.forEach(function (doc) {
      const obj = doc.data()
      obj.id = doc.id
      res.push(obj)
    })
  })
  return res
}

const multipleCols = async (limit, collections) => {
    return Promise.all(collections.map(col => {
        const res =  getData(limit, col)
        return res
    }))
}

export {
  getData,
  multipleCols
}