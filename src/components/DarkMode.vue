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

    /* data() {
        return {
            theme: 'lightMode' //When this property is empty, the theme is set to the default theme i.e. light mode.
        };
    },
    mounted() {
        let localTheme = localStorage.getItem('theme'); //gets stored theme value if any
        document.documentElement.classList.add(localTheme); // updates the data-theme attribute
        //document.documentElement.classList.add('darkMode');
    },
    methods: {
        toggleTheme() {
            if(this.theme == 'lightMode'){ this.theme = 'darkMode'} else {this.theme = 'lightMode'} //toggles theme value
            document.documentElement.classList.toggle(this.theme); // sets the data-theme attribute
            localStorage.setItem('theme', this.theme); // stores theme value on local storage
        },
     */
    /* _addDarkTheme() {
        let setMode = 'darkMode';
        document.body.classList.add(setMode);
        localStorage.setItem("mode", setMode);
    },
    _removeDarkTheme() {
        let getMode = localStorage.mode;
        document.body.classList.remove(getMode);
    },
    darkThemeSwitch() {
      let isDarkMode = document.querySelector('.darkMode');
      if (!isDarkMode) {
        this._addDarkTheme();
      } else {
        this._removeDarkTheme();
      }
    } */
        /* _addDarkTheme() {
            let darkThemeLink = document.createElement("style");
            darkThemeLink.setAttribute("lang", "scss");
            darkThemeLink.innerText('@import "@/assets/scss/darkTheme.scss";')
            darkThemeLink.setAttribute("id", "dark-theme-style");
            console.log(darkThemeLink);
            let docHead = document.querySelector("head");
            docHead.appendChild(darkThemeLink);
        },
        _removeDarkTheme() {
            let darkThemeLink = document.querySelector("#dark-theme-style");
            let parentNode = darkThemeLink.parentNode;
            parentNode.removeChild(darkThemeLink);
        },
        darkThemeSwitch() {
            let darkThemeLink = document.querySelector("#dark-theme-style");
            if (!darkThemeLink) {
                this._addDarkTheme()
            } else {
                this._removeDarkTheme()
            }
        } */
    }
}
</script>