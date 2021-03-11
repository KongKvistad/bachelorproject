<template>
    <div class="about">
        <h2>{{name}}</h2>
        <p>Om</p>
        
        <p>{{description}}</p>
        
    </div>
    
        
        

    
</template>
<script>
export default {
    name: "About",
    props:["name", "description"]
}

</script>