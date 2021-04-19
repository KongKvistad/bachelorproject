<template>
    <div class="contactColumn">
    <img :src="img"/>
    <div class="info">
        <h3>Kontakt</h3>
        <ul class="profile-contact">
            <li>{{name}}</li>
        
            <li>{{study}}</li>
        
            <li>{{phone}}</li>
       
            <li>{{email}}</li>
        </ul>
        <ul class="profile-links">
            <a><li><b-icon icon="linkedin"></b-icon></li></a>
            <a><li><b-icon icon="github"></b-icon></li></a>
            <a><li><b-icon icon="globe"></b-icon></li></a>
        </ul>
        <p><b-icon icon="pencil"></b-icon>Rediger profil</p>

    </div>
    
        
        

    
    </div>
</template>
<script>
export default {
    name: "ContactColumn",
    props:["img", "email", "phone", "editable", "name", "study"]
}

</script>