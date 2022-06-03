const express = require('express');
const axios = require('axios')
const app = express();

let finalArr = []
let count = 0
let next = null
let offset = 0
const pageSize=10
const apiCall = (url)=>{
    axios.get(`${url}`).then((res)=>{
        finalArr = finalArr.concat(res.data.results)
    }).catch(error=>console.log(error))
}


app.get('/',(req,res)=>{
    
   
        axios.get('https://swapi.dev/api/planets/').then((res)=>{
            console.log(res.data);
            const data = res.data.results
            count = res.data.count
            console.log(data);
            if(res.data.next){
                next=res.data.next
            }
            
    }).catch((err)=>console.log("Error fetching Planet",err))
   finalArr = finalArr
        offset += pageSize
        if(finalArr.length< count || next != null){
            apiCall(next)
        }
   
    
})

app.get('/:id', async (req,res)=>{
    let data
    try{
        axios.get(`https://swapi.dev/api/planets/${req.params.id}`).then((res)=>{
            data = res.data
            console.log(data);
        })
        // const response = await fetch(`https://swapi.dev/api/people/${req.params.id}`)
        // const data = await response.json()
        // console.log(data)
        // return data
    }catch(err){
        console.log("Error fetching people by ID",err)
    }
})
module.exports = app;