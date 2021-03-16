<template>
    <div class="about">
        <h1>{{name}}</h1>
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