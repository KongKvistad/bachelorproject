//gatekeeper er ment for profilsidene og
//henter riktige data basert på rolle og eierstatus

//EXCEPTION: priorities-cards. disse dataene er håndtert av vuex store,
// fordi de må kunne skrives til / leses av på tvers av applikasjonen

import { getDoc, filterByField, multipleCols} from "@/utils/get.js"


const gateKeeper = async (isOwner, uri) => {

    
    if(isOwner == false){
        return getDoc("users", uri).then(res =>  {
        
            let dataObj = {}
            dataObj.pageUserData = res
            return dataObj
        })
    } else {
        // "om"-data trengs for samtlige sider uavhengig av tilgang og rolle.
        // den trengs dessuten for å bestemme hvilken type page denne uri-en hører til.
        return getDoc("users", uri).then(res =>  {
            
            let dataObj = {
                praksis: {},
                prosjekt:{}
            }
            
            let pageType = res.role
            
            dataObj.pageUserData = res
            console.log(pageType, isOwner)
            if((pageType == 'company' || pageType == 'student') && isOwner){
                
                // return (async() => {
                //     const data = await multipleCols(false, ["praksis", "prosjekt"], 'created_by', uri)
                //     return data
                // })()

                multipleCols(false, ["praksis", "prosjekt"], 'created_by', uri)
                .then(data => {
                        dataObj.praksis.approved = data[0].filter(x => x.approved == true)
                        dataObj.praksis.denied = data[0].filter(x => x.approved != true)
                        dataObj.prosjekt.approved = data[1].filter(x => x.approved == true)
                        dataObj.prosjekt.denied = data[1].filter(x => x.approved != true)
                        dataObj.historikk = { praksis: dataObj.praksis, prosjekt: dataObj.prosjekt}
                })
                
            }


            return dataObj
                
        
        })
    }
}

export default gateKeeper;