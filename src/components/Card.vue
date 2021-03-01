<template>
    
    <div class="cards">
        <div class="left-column">
            <img :src=imageLink alt="Bedrift logo">
        </div>
        <div class="right-column">
            <h3>{{ tittel }}</h3>
            <p>{{ beskrivelse }}</p>
        </div>
    </div>

</template>

<script>

export default {
    name: 'Card',
    props: [
        "tittel",
        "beskrivelse"
    ],
    methods: {

    }
}
</script>