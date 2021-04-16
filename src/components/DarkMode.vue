<template>
    <div>
        <!-- <button @click="toggleTheme" id="darkModeBtn" class="primary-button">Bytt tema</button> -->
        <label class="switch">
        <input type="checkbox" class='theme-switch' v-model="darkMode"/>
        <span class="slider round">
            <span v-if="!this.darkMode"> <b-icon-moon class="b-icon-sun" shift-h="38" shift-v="-4" scale="1.4"></b-icon-moon></span>
            <span v-else><b-icon-sun class="b-icon-moon" shift-h="6" shift-v="-4" scale="1.2"></b-icon-sun></span>  
        </span>
        </label>
       
    </div>
</template>

<script>
export default {
    data() {
        return {
            darkMode: false,
        }
    },
    mounted() {
        //Se etter aktiv theme i localStorage
        let htmlElement = document.documentElement;
        let theme = localStorage.getItem("theme");

        //Sett aktiv theme fra localStorage
        if (theme === 'darkMode') {
            htmlElement.setAttribute('theme', 'darkMode');
            this.darkMode = true;
        } else {
            htmlElement.setAttribute('theme', 'lightMode');
            this.darkMode = false;
        }
    },
    watch: {
        darkMode: function () {
            //Legg til attribute på html-elementet
            let htmlElement = document.documentElement;

            if (this.darkMode) {
                localStorage.setItem("theme", 'darkMode');
                htmlElement.setAttribute('theme', 'darkMode');
            } else {
                localStorage.setItem("theme", 'lightMode');
                htmlElement.setAttribute('theme', 'lightMode');
            }
        }
    }
}
</script>