var currentTime = moment().format('HH:mm'); 
console.log('Current Time is ', currentTime);



document.querySelector("#submitButton").addEventListener("click", function(event) {
    event.preventDefault();
    submitInfo();
})
var array = [];
var  trainName;
var destination;
var firstTrainTime;
var frequencyMins;
function submitInfo() {
    console.log("button was clicked")
     trainName = document.getElementById("train-name").value
     destination = document.getElementById("destination").value
     firstTrainTime = document.getElementById("first-train-time").value
     frequencyMins = document.getElementById("frequency-mins").value
    array.push(trainName, destination, firstTrainTime, frequencyMins);
};


console.log(array);
//add click listener on submitbutton
document.querySelector("#submitButton").addEventListener("click", function(){
    //make an object to put the array
    let data = {
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequencyMins: frequencyMins,
        
    }
    console.log(data);
    //const value = document.querySelector(".form-control").value;
    localforage.getItem("saved").then(function(result){
      if(!result){
        result = [];
      }
      result.push(data);
      localforage.setItem("saved", result)
        .then(function(){
          console.log("saved")
          console.log(result);
          //do i need a for loop to create the new rows and table details....then maybe it will append??
        });
    });
    var newRow = document.createElement("tr");//<tr></tr>
    var td1 = document.createElement("td").innerHTML;//<td>trainName</td>
    var td2 = document.createElement("td").innerHTML;//<td>destination</td>
    var td3 = document.createElement("td").innerHTML;//<td>firstTrainTime</td>
    var td4 = document.createElement("td").innerHTML;//<td>frequencyMins</td>
    console.log(td1, td2, td3, td4); //nothing is consoling - check in with TA's
    newRow.append(td1, td2, td3, td4);
    // newRow.append(td2);
    // newRow.append(td3);
    // newRow.append(td4);
    document.querySelector("tbody").append(newRow);

    //not sure when i add cells and cell innards to the rows....could probably make this dryer...or wetter?? can't remember
    const cell1 = newRow.insertCell (0);
    const cell2 = newRow.insertCell (1);
    const cell3 = newRow.insertCell (2);
    const cell4 = newRow.insertCell (3);
    const cell5 = newRow.insertCell (4);

    //add the innards or maybe values that match the key??
    cell1.innerHTML = td1;
    cell2.innerHTML = td2;
    cell3.innerHTML = td4;
    cell4.innerhtml = //yucky math stuff
    cell5.innerHTML = //yucky math stuff
  });
  