<template>
<div class="imgUpload-cont">

    <div class="top">
        <!-- File inpput accepting images -->
       
        <input id="imgInput" type="file" ref="imgInput" @change="newPic" accept="image/*" >
         <!-- Upload progress bar -->
        <p>Progress: {{ uploadValue.toFixed()+"%" }}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  
        </p>
       
    </div>
    <div v-if="imageUrl != null" class="bottom">
            <img class="preview" :src="imageUrl">
    </div>
    <div v-else class="bottom">
            <div @click="$refs.imgInput.click()" class="empty">
            <p>upload image</p>
            </div>
    </div>
    
    
    
    
</div>
</template>

<script>
import firebase from 'firebase';


export default {
name: 'imgUpload',
props:["shouldReset"],
data() {
    return {
        imageData: null,
        imageUrl: null,
        uploadValue: 0,
        showBtn: false
        
    }
},

methods: {
    // State change and Preview of image after uplaod
    newPic(event) {
        this.reset()
        this.imageData = event.target.files[0];
        this.onUpload()
        
    },
    notifyParent(val1, val2){
        this.$emit("imgUpload", [val1, val2])
    },

    //resets the image-related data
    reset(){
        
        this.imageUrl = null;
        this.imageData= null;
        this.uploadValue= 0;
    },
    // Uploads image to firebase storage
    onUpload() {
        this.imageUrl = null;
        console.log(this.imageData.name);
        // Storing img in firebase storage referenced by 10 random characters + filename.
        const storageRef = firebase.storage().ref(`${this.randomChars(9) + '_' + this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`, snapshot => {
            // Upload progress bar
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error => {
            console.log(error.message)},
            ()=>{this.uploadValue = 100;
                storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                    // Set url to imageUrl which is used for adding image to firebase collection
                    this.imageUrl = url;
                    
                    
                    this.notifyParent(this.imageUrl, this.imageData);
                });
            }   
        );
    },
    
    // Generates random characters which is added to image name as reference to firebase storage as firebase storage don't accept name duplicates
    randomChars(length) {
        let result = '';
        let char = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let charLenght = char.length;
        for (let i = 0; i < length; i++) {
            result += char.charAt(Math.floor(Math.random()* charLenght));
        }
        return result;
    },
},
watch:{
    shouldReset: function(){
        this.reset()
        this.$refs.imgInput.value = ""
    },

    
    
}

}

</script>
<style lang="scss">
 
</style>