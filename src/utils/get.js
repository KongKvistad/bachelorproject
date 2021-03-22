// denne fila bruker jeg så jeg slipper å skrive firebase-requests i hver eneste vue-fil.
// Get.js dreier seg spesifikt om å HENTE data. funksjoner for SKRIVE data er definert i create.js

// må importeres i den componenten du ønsker, feks:
//import {getData} from '@/utils/get.js'

// når du skal bruke den, skriver du:

//    getData(3, "praksis").then(res => {
//          console.log(res)
//    })

import { db } from '@/firebase.js'

// bare en collection
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

// flere collections. @param collections forventes som array, f.eks ["users", "prosjekter"]
const multipleCols = async (limit, collections, filter, filterVal) => {
    
  if(!filter){
    
    return Promise.all(collections.map(col => {
      const res =  getData(limit, col)
      return res
    }))

  } else {

    return Promise.all(collections.map(col => {
      const res =  filterByField(col, filter, filterVal)
      return res
    }))
  }
  
}

// get specific doc

async function getDoc(doctype, refId) {
    
  const ref = db.collection(doctype).doc(refId)
  const res = await ref.get().then(doc => {
      let newObj = doc.data()
      if(newObj != undefined){
          newObj.id = doc.id
      }
     
      return newObj
  })
  return res

}


//filtrer i backend basert på felt

const filterByField = async (collection, field, filterVal) => {

  const res = []

  const ref = db.collection(collection)
  var query = await ref.where(field, "==", filterVal)
  .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const obj = doc.data()
          obj.id = doc.id  
          res.push(obj)
        });
    })
  return res

}


export {
  getData,
  multipleCols,
  getDoc,
  filterByField
}