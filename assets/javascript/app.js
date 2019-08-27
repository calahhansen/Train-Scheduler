//Global variables
var array = [];
var trainName;
var destination;
var firstTrainTime;
var frequencyMins;
var count = 0;
// var currentTime = moment().format('HH:mm');
// console.log('Current Time is ', currentTime);

//Submit Button - prevents 
// document.querySelector("#submitButton").addEventListener("click", function (event) {
//   event.preventDefault();
//   submitInfo();
// })

function submitInfo() {
  //clear the table first before populating
  document.getElementById("trainInfoTable").innerHTML = "";
  console.log("button was clicked")
  trainName = document.getElementById("train-name").value
  destination = document.getElementById("destination").value
  firstTrainTime = document.getElementById("first-train-time").value
  frequencyMins = document.getElementById("frequency-mins").value
  array.push(trainName, destination, firstTrainTime, frequencyMins);
};


console.log(array);
//add click listener on submitbutton
document.querySelector("#submitButton").addEventListener("click", function () {
  event.preventDefault();
  submitInfo();
  //make an object to put the array
  let dataIn = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequencyMins: frequencyMins,

  }
  console.log(document.getElementById("submitButton"));
  console.log(dataIn);
  //const value = document.querySelector(".form-control").value;
  localforage.getItem("saved").then(function (result) {
    console.log(result);
    if (!result) {
      result = [];
    }
    result.push(dataIn);

    localforage.setItem("saved", result)
      .then(function () {
        //console.log("saved");
     
        console.log(result);
        displayTableRusults();   
      });
  });
  
 
})
function displayTableRusults(){
  localforage.getItem("saved").then(function (result) {
    console.log(result);
    if (!result) {
      result = [];
    }
    // result.push(dataIn);

    localforage.setItem("saved", result)
      .then(function () {
        //console.log("saved");
     
        console.log(result);
        // displayTableRusults();
        for(var i=0; i<result.length;i++){
          console.log(result[i]);
           
          
    
          const currentTime = moment().format('HH:mm');
          const firstTrainConverted = moment(result[i].firstTrainTime, "HH:mm").subtract(1, "day");
          // Difference between the times
          var dif = moment().diff(moment(firstTrainConverted), "minutes");
          console.log("diff: " +dif)
          // Leftover minutes
          var leftover = dif % result[i].frequencyMins;
          console.log("left over: "+leftover);
          // Minutes away
          var minsaway = result[i].frequencyMins - leftover;
          console.log("mins away: " +minsaway);
          // Next Train
          var nexttrain = moment().add(minsaway, "m").format("hh:mm A");
          console.log("next train: " +nexttrain);

          
          //displaying data on to the table
          var table = document.getElementById("trainInfoTable");
          var row = table.insertRow(0);
          var cell1  = row.insertCell(0);
          var cell2  = row.insertCell(1);
          var cell3  = row.insertCell(2);
          var cell4  = row.insertCell(3);
          var cell5 = row.insertCell(4);
          cell1.innerHTML = result[i].trainName;
          cell2.innerHTML = result[i].destination;
          cell3.innerHTML = result[i].frequencyMins;
          cell4.innerHTML = nexttrain;
          cell5.innerHTML = minsaway;
    
        }   
      });
  });
  
  // localforage.setItem("saved", result)
  //   .then(function () {
  //   for(var i=0; i<result.length;i++){
  //     console.log(result[i]);
  //      //displaying data on to the table
  //      var table = document.getElementById("trainInfoTable");
  //      var row = table.insertRow(0);
  //      var cell1  = row.insertCell(0);
  //      var cell2  = row.insertCell(1);
  //      var cell3  = row.insertCell(2);
  //     //  var cell4  = row.insertCell(3);
  //     //  var cell5 = row.insertCell(4);
  //      cell1.innerHTML = result[i].trainName;
  //      cell2.innerHTML = result[i].destination;
  //      cell3.innerHTML = result[i].frequencyMins;
      

  //     const currentTime = moment().format('HH:mm');
  //     // Difference between the times
  //     var dif = moment().diff(moment(result[i].firstTrainTime), "minutes");
  //     // Leftover minutes
  //     var leftover = dif % result[i].frequencyMins;
  //     // Minutes away
  //     var minsaway = result[i].frequencyMins - leftover;
  //     // Next Train
  //     var nexttrain = moment().add(minsaway, "m").format("hh:mm A");
  //     // cell4.innerhtml = nextrain;

  //     // cell5.innerHTML = minsaway;
     
  //       // cell4.innerHTML = nexttrain;
  //       // cell5.innerHTML = minsaway;

  //   }
  //})
};
 
displayTableRusults();