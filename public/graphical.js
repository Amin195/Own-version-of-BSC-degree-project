// https://stackoverflow.com/questions/58892097/how-to-make-an-image-selection-with-ejs-and-express


const allPics = document.getElementById("pictures")
const sendbtn = document.getElementById("sendGp") 
var numberOfPicsSelected = 0 //to check when hit 4 selected
var paswordNumbers = [] //array for selected id

// event listener for all images
allPics.addEventListener('click', (e) => {
    console.log("Clicked image with id:",e.target.id)
    //if already selected, remove border and from array
    if(e.target.style.border === "3px solid yellow"){
        e.target.style.border = "none"
        removeSelection(e.target.id)
        numberOfPicsSelected--;
    }else{
        e.target.style.border = "3px solid yellow"
        paswordNumbers.push(e.target.id)
        numberOfPicsSelected++;
    }
    
    console.log("number of Selected: ", numberOfPicsSelected)
    // if(numberOfPicsSelected===4){postGP('http://localhost:3000/gp', {paswordNumbers})}
  });

//need to add some more logic for sending less or more images? 
  sendbtn.addEventListener('click', async () => {
    await postGP('http://localhost:3000/gp', {paswordNumbers: paswordNumbers})
  })

// overcomplicated removal for a selection
function removeSelection(id){
    for(var i = 0; i < paswordNumbers.length;i++){
        if(paswordNumbers[i] === id){
            paswordNumbers.splice(i, 1)
        }
    }
    console.log('got in remove', paswordNumbers)
}
// same logic ish as fingerprinting.js
async function postGP(url, body) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    console.log('the data being posted to, ', url, 'is the following: ', data)
    const response = await fetch(url, data)

    if (!response.ok) {
        const data = await response.json()
        console.log(response)
        console.log(JSON.stringify(data, null, 4))
        throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
}