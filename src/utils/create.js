// motsetning til get.js

import { db } from '@/firebase.js'


async function writeToCol(col, obj){

    const res = await db.collection(col).add(obj)
    .then(docRef => {
        return docRef.id
    })
    
    return res
}

async function editDoc(col, id, obj){

    const res = await db.collection(col).add(obj)
    .then(docRef => {
        return docRef.id
    })
    
    return res
}

export {
    writeToCol,
    editDoc
  }