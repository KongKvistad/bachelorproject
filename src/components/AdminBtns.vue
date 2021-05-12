<template>
<b-row style="margin-top: 5em;" v-if=" compCanPrio != undefined && pairComplete != undefined">
                        
    <b-col>
        <b-row align-h="Start" class="px-5" style="min-height:11em;">
        <h2>Bedrifter kan prioritere</h2>
        <p class="pr-4">Bestemmer hvorvidt bedrifter kan prioritere / studenter kan søke. I fremtiden kommer dette til å bestemmes av en dato/kalender.</p>
            <b-row align-h="center" class="w-100">
            <b-button @click.prevent="changeState(compCanPrio)" v-if="compCanPrio.state" variant="danger">Slå av</b-button>
            <b-button @click.prevent="changeState(compCanPrio)" v-else variant="primary">Slå på</b-button>
            </b-row>
        </b-row>
    </b-col>
        <b-col>
        <b-row align-h="Start" class="px-5" style="min-height:11em;">
        <h2>Matching gjennomført</h2>
        <p class="pr-4">Denne blir satt til True når admin har godkjent matching for sesongen. Partene kan dernest ikke søke/prioritere lengre.</p>
            <b-row align-h="center" class="w-100">
            <b-button @click.prevent="changeState(pairComplete)" v-if="pairComplete.state" variant="danger">Slå av</b-button>
            <b-button @click.prevent="changeState(pairComplete)" v-else variant="primary">Slå på</b-button>
            </b-row>
        </b-row>
    </b-col>
                          
                    
</b-row>
</template>
<script>

import {getData} from '@/utils/get.js'
import {editDoc} from '@/utils/create.js'

export default {
    name:"adminbtns",
    data() {
        return {
            compCanPrio:undefined,
            pairComplete: undefined
        }
    },
    mounted(){
        getData(false, 'state_flags').then( res => {
            this.compCanPrio = res.find(x => x.id == 'companies_can_prioritize')
            this.pairComplete = res.find(x => x.id == 'pairing_complete')

        })
    },
    methods:{
        
        changeState(stateObj){
            let scope = this
            editDoc('state_flags', stateObj.id, {state: !stateObj.state}).then(state => {
                    if(stateObj.id == 'companies_can_prioritize'){
                        stateObj.state = !stateObj.state
                        scope.compCanPrio = stateObj
                    } else if (stateObj.id == 'pairing_complete'){
                        stateObj.state = !stateObj.state
                        scope.pairComplete = stateObj
                    }
                })
        }
    }
}
</script>