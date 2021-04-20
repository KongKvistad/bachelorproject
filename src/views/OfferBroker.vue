<template>
<div></div>
</template>

<script>

import {getData} from '@/utils/get.js'

export default {
    name:"offerbroker",
    data(){
        return{
            compPrios: false, //id: id of post | prios: prio of students
            studPrios: false, //id: id of student | prios: prio of companies
            type: 'praksis',
            maxSpot: false
        }
    },

    methods:{
        partnerService(maxSpots, studPrios, compPrios){
            for(var i = 0; i < maxSpots; i++){
                compPrios.forEach(comp => {
                    //
                })
            }
        }
    },

    computed:{
        dataFetched(){
            if(this.compPrios && this.studPrios){
                return true
            } else {
                return false
            }
        }
    },


    created(){

        //get and clean company prios
        
        getData(false, 'company_priorities').then(res => {
            this.compPrios = res.map(x => {
                
                let resObj = {
                    id: x.id,
                    prios: x[this.type]   
                }

                return resObj
            
                
            }).filter(x => x.prios)
        })

        // get and clean student data
        getData(false, 'priorities').then(res => {
            this.studPrios = res.map(x => {
                
                let resObj = {
                    id: x.id,
                    prios: x[this.type]   
                }

                return resObj
            
                
            }).filter(x => x.prios)
        })
    },
    watch:{
        dataFetched(deed){
            if (deed == true){
                
                this.studPrios.forEach(x => {
                    x.prios.forEach(y => {
                        if(y.spots && y.spots > this.maxSpot){
                            this.maxSpot = y.spots
                        }
                    })  
                })
            }
        },
        maxSpot(max) {
            if(max){
                this.partnerService(max, this.studPrios, this.compPrios);
            }
        }
    }

    
}
</script>