const flightData=[
{"from":"Delhi","to":"Mumbai","departure":{"departureTime":"06:00PM","departureDate":"2023-02-10"},"return":{"returnTime":"10:00PM","returnDate":"2023-02-11"},"airlineName":"Vistara","via":["Ahmedabad"],"price":"5500","duration":"2hr 15min"},
{"from":"Delhi","to":"Goa","departure":{"departureTime":"02:00PM","departureDate":"2023-02-12"},"return":{"returnTime":"10:00PM","returnDate":"2023-02-12"},"airlineName":"Indigo","via":["Mumbai"],"price":"7500","duration":"2hr 45min"},
{"from":"Mumbai","to":"Kolkata","departure":{"departureTime":"09:00AM","departureDate":"2023-02-10"},"return":{"returnTime":"11:00AM","returnDate":"2023-02-12"},"airlineName":"Air Asia","via":[],"price":"9000","duration":"2hr 30min"},
{"from":"Kolkata","to":"Bangalore","departure":{"departureTime":"03:00PM","departureDate":"2023-02-14"},"return":{"returnTime":"11:00AM","returnDate":"2023-02-18"},"airlineName":"Vistara","via":[],"price":"7000","duration":"1hr 55min"},
{"from":"Chennai","to":"Kolkata","departure":{"departureTime":"01:00AM","departureDate":"2023-02-15"},"return":{"returnTime":"11:00AM","returnDate":"2023-02-18"},"airlineName":"Air India","via":["Bhuvneshwar"],"price":"5600","duration":"2hr 15min"}];

const flightInput={'trip-type':'OneWay', from: 'Delhi', to: 'mumbai', 'travel-date': '2023-02-10', class: 'delhi'};


const filterFlightData=flightData.filter(data=>data.from===flightInput.from||
    data.to===flightInput.to || data.departure.departureDate===flightInput["travel-date"]
);

console.log(filterFlightData);



const filterTrainData=[];
const filterHotelData=[];