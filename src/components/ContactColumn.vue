<template>
    <div class="contactColumn">
    <img :src="img"/>
    <div class="info">
        <h3>Kontakt</h3>
        <span>
            <em> navn</em>
            <p>{{name}}</p>
        </span>
        <span>
            <em> telefon</em>
            <p>{{phone}}</p>
        </span>
        <span>
            <em> email</em>
            <p>{{email}}</p>
        </span>
    </div>
    
        
        

    
    </div>
</template>
<script>
export default {
    name: "ContactColumn",
    props:["img", "email", "phone", "editable", "name"]
}

</script>