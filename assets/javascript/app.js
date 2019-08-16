var currentTime = moment().format('HH:mm');
console.log('Current Time is ', currentTime);



document.querySelector("#submitButton").addEventListener("click", function (event) {
  event.preventDefault();
  submitInfo();
})
var array = [];
var trainName;
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
document.querySelector("#submitButton").addEventListener("click", function () {
  //make an object to put the array
  let dataIn = {
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequencyMins: frequencyMins,

  }
  console.log(dataIn);
  //const value = document.querySelector(".form-control").value;
  localforage.getItem("saved").then(function (result) {
    if (!result) {
      result = [];
    }
    result.push(dataIn);

    localforage.setItem("saved", result)
      .then(function () {
        console.log("saved");
        console.log(result);
        //do i need a for loop to create the new rows and table details....then maybe it will append??
        // Looping through the array of results
        for (let i = 0; i < result.length; i++) {
          // Then dynamically add new row
          const newRow = document.createElement("train-row");
          // Adding a class to tr - train row
          newRow.classList.add("train-row");
          // Adding cells to table row
          // for (let i = 0; i < result.length; i++) {
          //   const newcells = newRow.insertCell(result[i]);
          //   newcells.innerHtml = "result[i].key";
          // }
          // Adding a data-attribute to tr - train row
          newRow.setAttribute("data-key", result[i]);
          // Providing the initial data from local forage result array
          newRow.innerHTML = result[i];
          // Adding the new row to the table
          document.getElementById("train-row").appendChild(newRow);
          console.log(newRow);
        }
        var newRow = document.createElement("tr");//<tr></tr>
        var td1 = document.createElement("td1").innerHTML;//<td>trainName</td>
        var td2 = document.createElement("td2").innerHTML;//<td>destination</td>
        var td3 = document.createElement("td3").innerHTML;//<td>firstTrainTime</td>
        var td4 = document.createElement("td4").innerHTML;//<td>frequencyMins</td>
        console.log(td1, td2, td3, td4); //nothing is consoling - check in with TA's
        newRow.append(td1, td2, td3, td4);
        // newRow.append(td2);
        // newRow.append(td3);
        // newRow.append(td4);
      
        //not sure when i add cells and cell innards to the rows....could probably make this dryer...or wetter?? can't remember
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        //now I can append?
        document.querySelector("tbody").append(newRow);
        //add the innards or maybe values that match the key??
        cell1.innerHTML = td1;
        cell2.innerHTML = td2;
        cell3.innerHTML = td4;
        
        // Cell 4 Math - Current Time
        const currentTime = moment().format('HH:mm');
        // Difference between the times
        var dif = moment().diff(moment(td3), "minutes");
        // Leftover minutes
        var leftover = dif % td4;
        // Minutes away
        var minsaway = td4 - leftover;
        // Next Train
        var nexttrain = moment().add(leftover, "minutes");
        cell4.innerhtml = nextrain;
        
        cell5.innerHTML = minsaway;
      });
  });
});
