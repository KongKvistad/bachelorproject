import { db } from '@/firebase.js'

async function createPost(type, obj){

    const res = await db.collection(type).add(obj)
    .then(res => res)
}
