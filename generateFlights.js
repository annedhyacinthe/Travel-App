async function getArrOfTrips(origin, departureDate, returnDate, budgetPrice){
    let arrOfTrips = []
    //once as the the function is called it enters a while loop that goes up to the length of the array arrOfTrips an amount that we control and each while loop generates a trip through the getTrips function that generates the flights and hotels go to searchForTrips.js
    while(arrOfTrips.length <= 1){
        let trip = await getTrips(origin, departureDate, returnDate, budgetPrice)
        //step 8: once getTrip is resolved if its not null the trip is then pushed into arrOfTrips 
        if(trip){
            arrOfTrips.push(trip)
        }
    }
    console.log(arrOfTrips)
    //step 9: once the while loop criteria is meant the function returns arrOfTrips to be the value of the variable arrOfTrips in generateCities.js
    return arrOfTrips
}