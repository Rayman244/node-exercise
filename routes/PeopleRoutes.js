const express = require('express');
const axios = require('axios')
const app = express();
app.get('/:id', async (req,res)=>{
    let data
    try{
        axios.get(`https://swapi.dev/api/people/${req.params.id}`).then((res)=>{
            data = res.data
            console.log(data);
        })
        return data
        // const response = await fetch(`https://swapi.dev/api/people/${req.params.id}`)
        // const data = await response.json()
        // console.log(data)
        // return data
    }catch(err){
        console.log("Error fetching people by ID",err)
    }
})
app.get('/',(req,res)=>{
    let data=[]
    let count
    try{
        axios.get('https://swapi.dev/api/people/').then((res)=>{
            console.log(res.data);
            data = data.push( res.data.results)
            count= res.data.count
            console.log({data});
            if(res.data.next){
                axios.get(`${res.data.next}`).then((res)=>{
                    data = res.concat(data)
                    console.log(data);
                })
            }
            
    })
    return data
    }catch(err){
        console.log('Error fetching people' )
    }
    
})


module.exports = app;