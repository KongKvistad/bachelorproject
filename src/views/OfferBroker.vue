<template>
<div>

<b-row class="mt-5">
    <h2 class="h2">1-grad</h2>
</b-row>
<b-row class="mt-3">
        
        <b-col cols="8" >
        <b-row class="applicantName">
            <p>Bedrift</p>
        </b-row>
        
            
        </b-col>
        <b-col cols="4" class="applicantName">
            <p>Student</p>
        </b-col>

</b-row>
<b-row class="mt-2" id="firstDegList">
    <b-list-group style="width: 100%;">
        <Match
        v-for="comp in mapNames(firstDegMatches)"
        :key="comp.comp"
        :item="comp"
        type="first"
        />
    </b-list-group>
</b-row>
<b-row class="mt-5">
    <h2 class="h2">2-grad</h2>
</b-row>
<b-row class="mt-3">
        
        <b-col cols="8" >
        <b-row class="applicantName">
            <p>Bedrift</p>
        </b-row>
        
            
        </b-col>
        <b-col cols="4" class="applicantName">
            <p>Student</p>
        </b-col>

</b-row>
<b-row class="mt-2" id="secDegList">
    <b-list-group style="width: 100%;">
        <Match
        v-for="comp in mapNames(secDegMatches)"
        :key="comp.comp"
        :item="comp"
        type="second"
        />
    </b-list-group>
</b-row>
<b-row>
<button @click="sendData" class="button primary-button ml-auto mt-4">Godkjenn</button>
</b-row>
</div>
</template>

<script>

import {getData} from '@/utils/get.js'
import {writeToCol, editDoc} from '@/utils/create.js'
import Match from '@/components/Match'

export default {
    name:"offerbroker",
    components: {
        Match
    },
    data(){
        return{
            compPrios: false, //id: id of post | prios: prio of students
            studPrios: false, //id: id of student | prios: prio of companies
            type: 'praksis',
            maxSpot: false,
            firstDegMatches:[],
            secDegMatches:[],
            restStudents:[],
            users:{
                comps: [],
                studs: []
            }
        }
    },

    methods:{
        mapNames(data){
            
            let result = data.map(entry => {
                
                
                this.users.comps[0].forEach(elem => {
                    let hit = elem.find(x => x.id == entry.comp)
                    if(hit){
                        entry.compName = hit.name
                        entry.compPic = hit.image_url
                    }
                })

                this.users.studs[0].forEach(elem => {
                    let hit = elem.find(x => x.id == entry.stud)
                    if(hit){
                        entry.studName = hit.name
                        entry.studPic = hit.image_url
                        entry.study = hit.study ? hit.study : false
                    }
                })
                
                return entry
            })
            console.log("here",result)
            return result
        },

        sendData(){
            let obj = {
                result:this.firstDegMatches.concat(this.secDegMatches),
                rest_students: this.restStudents,
                date: new Date(),
            }
            //console.log(obj)

            writeToCol("matches", obj).then(res => {
                editDoc('state_flags', 'pairing_complete', {state: true}).then(state => {
                    //console.log(state)
                
                })
                editDoc('state_flags', 'companies_can_prioritize', {state: false}).then(state => {
                    //console.log(state)
                
                })
            })
            this.$toast.success('Matching godkjent!', {
            position: "top",
            }); 

        },

        //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        shuffle(array){
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }

            return array
        },


        flatten (key, data) {
            let result = data.map(x => {
            
            let prioArr = Array.isArray(x[this.type])?  x[this.type].map(x => x.id) : Object.values(x[this.type]).map(x => x.id)
            
            prioArr = prioArr.filter(x => x!= undefined)

                let resObj = {
                    id: x.id,
                    prios: prioArr,
                    spots: key == 'studPrios' ? x.spots = false : x.spots
                }

                return resObj    

            }).filter(x => x.prios)

            // arrays needs to be shuffled, because query from firebase returns the entries
            // on a first-in-last-out basis, which would make the matching algorithm unfair
            
            this[key] = this.shuffle(result)

        },

       

        firstDeg(studPrios, comp){
            //target is the applicant the comp wants
            let target = comp.prios[0]
            let match = studPrios.findIndex(x =>x.prios[0] == comp.id && target == x.id)

            if(match != -1){
                comp.spots --
                let pair = {comp: comp.id, stud: studPrios[match].id}
                this.firstDegMatches.push(pair)
                studPrios.splice(match, 1)
            } 
        },
        secondDeg(students, comp){
            //   company pointer starts at prio[0] and cascades down the company list to look for matches.
            // prioritizes the comp wishes as opposed to the student
           
            let possibles = []
            if(students.length > 0){
               
                // find all possible matches based on wheter compID is in studprio array
                for(var i = 0; i < comp.prios.length; i++){
                    
                    students.forEach((stud, idx, orgArr) => {
                        let possible = stud.prios.findIndex(x => x == comp.id && comp.prios[i] == stud.id)
                        
                        
                        if (possible != -1){
                            possibles.push({comp: comp.id, compPrioIndex: i, studIndex: idx, studPrioIndex: possible, stud: stud.id})
                        }
                            
                    })

                }
            }
            if(possibles.length > 0){
                let bestmatch = possibles.reduce(function(prev, curr) {
                return prev.compPrioIndex < curr.compPrioIndex ? prev : curr;
                });
                
                comp.spots--
                this.secDegMatches.push(bestmatch)
                students.splice(bestmatch.studIndex, 1)
            
            }
            
            

        },
        

        // main functionality for pairing the different students with companies.
        partnerService(maxSpots, studPrios, compPrios){
            
            for(var i = 1; i <= maxSpots; i++){
                console.log("itterations")
                compPrios.forEach((comp, idx, orgArr) => {
                    //comp.spots >= i
                    if(comp.spots > 0){
                        
                        // 1: both student and company put each other in 1st
                        this.firstDeg(studPrios, comp)
                        
                        
                    }
                })
                compPrios.forEach((comp, idx, orgArr) => {
                     //comp.spots >= i
                    if(comp.spots > 0){
                        
                        //2: company 1st choice is taken, but student has company in their list,
                        this.secondDeg(studPrios, comp)
                        
                        
                    }
                })
            }
            //3: put remaining students and companies in unfilled arrays 
            if(studPrios.length > 0) {
                this.restStudents = studPrios 
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

        // //needed to map user names
        // getData(false, 'users').then(res => {
            
        // })
    
        //get and clean company prios
        getData(false, 'company_priorities').then(res => {
            this.flatten("compPrios", res)
            let comps = res.map(x => x.praksis)
            this.users.studs.push(comps) 
            
        })

        // get and clean student data
        getData(false, 'priorities').then(res => {
            this.flatten("studPrios", res)
            let studs = res.map(x => x.praksis)
            this.users.comps.push(studs) 

        })

        
        
    },

    watch:{
        dataFetched(deed){
            if (deed == true){
                
                this.compPrios.forEach(x => {
                    
                        if(x.spots && x.spots > this.maxSpot){
                            this.maxSpot = x.spots
                        }
                    
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