const getTrips = async (origin, departureDate, returnDate, budgetPrice)=>{
    //step 1: getRandomAirport() is called and it returns an Airport code that destination is then assigned the value to, function begins below getRoundTripFlight()
    const destination = getRandomAirport()
    //step 2: getRoundTripFlight returns an array that contains 2 objects the first being the departure info and the second being the return info
    let flights = await getRoundTripFlight(origin,destination,departureDate, returnDate,budgetPrice)
    //step 3: the initial if statement will then make sure that flights does not equate to null 
    if (flights) {
        // step 4:im taking the route of going from the flight -> Dates -> OutboundDate -> 0 -> Price because that returns the lowest price for the flight going to the destination leaving form the origin and vice versa
        let roundTripPrice = flights[0]['Dates']['OutboundDates'][0]['Price'] + flights[1]['Dates']['OutboundDates'][0]['Price']
        //step 5: if the roundTripPrice is over the budget we can automatically return null because they cant afford to also add a hotel at their budget
        if(roundTripPrice < budgetPrice){
            //step 6: once the roundTripPrice is valid the process of getting the hotel then happens
           let arrHotels = await getCityByLatLng(topForty[destination])
           let hotelPriceStr = await getMinPrice(arrHotels)
           let hotelPriceNum = parseInt(hotelPriceStr.substring(1))
            console.log(`lowest flight price:${roundTripPrice} lowest hotel price:${hotelPriceNum}`)
           let totalPrice = hotelPriceNum + roundTripPrice
           if(totalPrice <= budgetPrice){
            //step 7: if the totalPrice is within the budget an object is then returned to the getArrOfTrips function
               return {hotels:arrHotels,roundTrip:flights,lowestPrice:totalPrice,origin:origin,destination:destination}
           }else{
               return null
           }
    }
} 
return null
} 

const getRoundTripFlight = async (origin,destination,departureDate, returnDate) =>{
    const departureQuotes = await getFlights(origin, destination, departureDate)
    const returnQuotes = await getFlights(destination, origin, returnDate);
    let roundTripOptions = [departureQuotes, returnQuotes]
    if (departureQuotes['Quotes'].length === 0 || returnQuotes['Quotes'].length === 0){
        return null
    }
    // console.log(roundTripOptions)
    return roundTripOptions
    
  }

  function getRandomAirport(){
    let lengthOfTopObject = Object.keys(topForty).length
    let index = Math.floor(Math.random() * Math.floor(lengthOfTopObject))
    let airportChoosenAtRandom = Object.keys(topForty)[index]
    return airportChoosenAtRandom
  }