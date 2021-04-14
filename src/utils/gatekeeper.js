//gatekeeper er ment for profilsidene og
//henter riktige data basert på rolle og eierstatus

//EXCEPTION: priorities-cards. disse dataene er håndtert av vuex store,
// fordi de må kunne skrives til / leses av på tvers av applikasjonen

import { getDoc, filterByField, multipleCols} from "@/utils/get.js"


const gateKeeper = async (isOwner, uri) => {

    // "om"-data trengs for samtlige sider uavhengig av tilgang og rolle.
        // den trengs dessuten for å bestemme hvilken type page denne uri-en hører til.
    if(isOwner == false){
        console.log("this")
        return getDoc("users", uri).then(res =>  {
        
            let dataObj = {}
            dataObj.pageUserData = res
            return dataObj
        })
    } else {
        
        let dataObj = {
            praksis: {},
            prosjekt:{}
        }

        let user = await getDoc("users", uri)
            
        let pageType = user.role
            
        dataObj.pageUserData = user

        console.log(dataObj)
        
        if(pageType == 'company'){

        let data = await multipleCols(false, ["praksis", "prosjekt"], 'created_by', uri)
              
        dataObj.praksis.approved = data[0].filter(x => x.approved == true)
        dataObj.praksis.denied = data[0].filter(x => x.approved != true)
        dataObj.prosjekt.approved = data[1].filter(x => x.approved == true)
        dataObj.prosjekt.denied = data[1].filter(x => x.approved != true)
        dataObj.historikk = { praksis: dataObj.praksis, prosjekt: dataObj.prosjekt}


        }

        return dataObj;
                
        
    }
}

export default gateKeeper;