const indexForm = document.getElementById('myForm');	
const section = document.getElementById('display');	
indexForm.addEventListener('submit', async(e) => {	
  e.preventDefault();	
  const input1 = document.getElementById('budget');	
  const budget = Number(input1.value);	
  const label = document.getElementsByTagName('label')
  // const exForCit = document.getElementById('dest')
  const origin = document.getElementById('city').value
  const arrivalDate = document.getElementById('departure').value;	
  const departureDate = document.getElementById('arrival').value;	
  console.log(origin)
  // console.log(destination)
  console.log(departureDate)
  console.log(arrivalDate)
  if (Number.isNaN(budget)) {	
    window.alert('Please enter a number')	
  }	
  if (budget < 500) {	
    window.alert('We apologize but to use this app correctly please enter $500 or greater')	
  }	
  if (budget >= 500){
    // Once the submit eventListener has fired off and they have the minimum budget of 500 all of the data(flight and hotel prices) are then retrieved through the getArrOfTrips and the inputs are used as the parameters, go to generateFlights.js for next step
    let arrOfTrips = await getArrOfTrips(origin,arrivalDate,departureDate,budget)
    //returned from getArrOfTrips is an array that holds objects that are each different trips
    getCities(arrOfTrips,chooseFlight)
  function getCities(arrOfData,event){
    let str = ''
  for(let i = 0;i < arrOfData.length;i++){

    // str += `<div class="col s1 button", id = ${i}>${topForty[arrOfTrips[i]["destination"]]}</div>`
   str += `<li class="collection-item"><div class="button" id = ${i}>${topForty[arrOfTrips[i]["destination"]]}</div></li>`

  }
  // document.body.innerHTML = ` <div class="container"> 
  // <div class="row">
  // ${str}
  // </div>
  // </div>`
  // addEvent('button',event)
  
  document.body.innerHTML = `
  <div class="container"> 
<div class="row">
  <ul class="collection with-header">
  <li class="collection-header"><h4>Cities</h4></li>
  ${str}
  </ul>
  </div>
  </div>`
  addEvent('button',chooseFlight)


}
  function addEvent(classname,callbackFunction){
    let allElements = document.getElementsByClassName(classname)
    for(let i = 0;i < allElements.length; i++){
      allElements[i].addEventListener('click',callbackFunction)
    }
  }
 
  function chooseFlight(e){
    // let str = ''
    let trip = arrOfTrips[e.toElement.id]
    let roundFlights = trip['roundTrip']
    // getFlightPage is called in this order with o and 1 because roundFlights[0] is the departure flight and vise versa
    thirdPage()
    function thirdPage(){
    let first = getFlightPage(0)
    let second = getFlightPage(1)
    function getFlightPage(i){
        let str = ''
            let leavingDate = roundFlights[i]['Dates']['OutboundDates'][0]['PartialDate']//Date
            //this loop is going through the quotes because for each trip there can be a selection of flights that can be taken
            for(let q = 0; q < roundFlights[i]['Quotes'].length; q++){
            let isDirect =roundFlights[i]['Quotes'][q]['Direct']//is direct?
            let price = roundFlights[i]['Quotes'][q]['MinPrice']//price?
            let id = roundFlights[i]['Quotes'][q]['OutboundLeg']['CarrierIds'][0]
            let carriers = roundFlights[i]['Carriers']
            //this loop is used to find the carriers name, I must first grab the carrier id for each flight and then take that ID and go to the carriers object
              for(let c = 0;c < carriers.length; c++){
                if(carriers[c]['CarrierId'] === id){
                  let carrierName = carriers[c]['Name']// name?
                  str += `
                  <li class="collection-item toHotel">
                <span class="title">${carrierName}</span>
                 <p>$${price} <br>
                 Is Direct:${isDirect}
                  </p>
                <a href="#!" class="secondary-content toHotel"><i class="material-icons">grade</i></a>
                </li>
                  `
                }
              }
              
            }
            return str
    }
    document.body.innerHTML = ` 
    <div class="container"> 
    <ul class="collection with-header">
    <li class="collection-header"><h4>Departure</h4></li>
    <ul class="collection">
    ${first}
    </ul>
    <li class="collection-header"><h4>Return</h4></li>
    <ul class="collection">
    ${second}
    </ul>
    </ul>
  </div>
  `
  addEvent('toHotel',chooseHotel(trip))
    }
}
function chooseHotel(trip){
  
    fourthPage()
    function fourthPage(){
      let hotels = getHotelPage()
      function getHotelPage(){
        let str = ''
            for(let q = 0; q < trip['hotels'].length; q++){
            
                  str += `
                  <li class="collection-item">
                <span class="title">${trip['hotels'][q]['name']}</span>
                <a href="#!" class="secondary-content toHotel"><i class="material-icons">grade</i></a>
                </li>
                  `
                }
                return str
              }
    document.body.innerHTML = ` 
    <div class="container"> 
    <ul class="collection with-header">
    <li class="collection-header"><h4>Hotels</h4></li>
    <ul class="collection">
    ${hotels}
    </ul>
  </div>
  `
 }
 }
  }
}   


)

