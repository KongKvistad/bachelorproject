<!--Profil komponent-->

<template>
    <div class="container about">

<div class="row">
        <div class="row">
            <div class="col-md-9">
                <h1>{{name}}</h1>
            </div>
             <div class="col-3 d-flex justify-content-end">
                <button class="secondary-button">Rediger profil</button>
            </div>
        </div>
            <div class="col-md-12">
                <p>Bachelor i {{study}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <p>{{description}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h4>Foretrukket arbeid</h4>
                <p>{{wanted_work}}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h4>Mine ferdigheter</h4>
                <ul>
                    <li>Prosjektledelse</li>
                    <li>Visual Studio Code</li>
                </ul>
            </div>
        </div>
        
    </div>
    
        
        

    
</template>
<script>
export default {
    name: "About",
    props:["name", "description", "study", "wanted_work"]
}

</script>