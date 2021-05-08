<!--Profil komponent-->

<template>
    <div class="col-md-8">

            <div class="row" style="margin-bottom:30px;">
                <div class="col-md-9">
                    <h1>{{name}}</h1>
                </div>
            </div>

            <div class="row" style="margin-bottom:30px;">
                <div class="col-md-12">
                    <p>{{description}}</p>
                </div>
            </div>

            <div class="row" style="margin-bottom:30px;">
                <div class="col-md-12">
                    <h4>Foretrukket arbeid</h4>
                    <p>{{wantedWork}}</p>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <h4>Mine ferdigheter</h4>
                    <ul>
                        <li v-for="(skill, idx) in quali" :key="'skill' + idx" >{{skill}}</li>
                    </ul>
                </div>
            </div>
        
    </div>
    
        
        

    
</template>
<script>
export default {
    name: "About",
    props:["name", "description", "study", "wanted_work", "quali"]
}

</script>