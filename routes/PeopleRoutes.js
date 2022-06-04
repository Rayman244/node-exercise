const express = require('express');
const axios = require('axios')
const app = express();


const baseUrl = 'https://swapi.dev/api/people/'

let finalArr=[]

const getPeople = async (page = 1)=>{
    let url= `${baseUrl}?page=${page}`
    let apiResults = await axios.get(url)
    // console.log(apiResults?.data);
    return apiResults?.data
}
const getAllPeople = async function(pageNo = 1,) {
    try{
    const results = await getPeople(pageNo);
        // console.log(results.results);
            finalArr = finalArr.concat(results.results)

        // console.log("Retreiving data from API for page : " + pageNo);
        if (results.result || results.results.length>0) {
        return results?.concat(await getAllPeople( pageNo+1));

        } else {
            // console.log(finalArr);
            // console.log(customSort(finalArr,sortBy));
            return finalArr
        
        }
    }catch(err){
        // console.log(finalArr);
    }
  
  };

  const customSort = (arr, value) => {
      console.log(arr);
    if (value === "name") {
      let sorted = arr.sort((a, b) => {
        nameA = a[value].toLowerCase();
        nameB = b[value].toLowerCase();
        // left out 0, no two names will be the same
        return nameA < nameB ? -1 : 1;
      });
      return sorted;
    } else {
      let sorted = arr.sort((a, b) => {
        return Number(a[value]) - Number(b[value]);
      });
      return sorted;
    }
  };
 

app.get('/:id', async (req,res)=>{
    let data
    try{
        axios.get(`${baseUrl}${req.params.id}`).then((res)=>{
            data = res.data
            console.log(data.name);
        })
        return res.json(data)
       
    }catch(err){
        console.log("Error fetching people by ID",err)
    }
})

app.get('/', async (req,res)=>{
    getAllPeople(); 
    console.log(finalArr[1]); 
    	return res.status(200).json(finalArr);
   
})
app.get('/:sortBy', async (req,res)=>{
    const { sortBy } = req.params;
    console.log({sortBy});
  // allowed params
  const allowedParams = ["name", "height", "mass"];
  if (!allowedParams.includes(sortBy)) {
    return res.status(400).json({ message: "Sort by params not allowed." });
  }
  getAllPeople()
  try {
    
    // conditions to sort based on value passed into the custom sort function
    if (sortBy === "name") {
      finalArr = customSort(finalArr, "name");
    }
    if (sortBy === "height") {
      finalArr = customSort(finalArr, "height");
    }
    if (sortBy === "mass") {
        finalArr = customSort(finalArr, "mass");
    }
    return res.status(200).json(finalArr);
  } catch (error) {
    res.status(500).json({ error: "API not able to get people" });
  }
})

module.exports = app;