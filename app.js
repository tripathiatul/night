// Get a reference to the table body
var tbody = d3.select("tbody");
var dataTable = data;

//input data into table
function loadData(data) {
  tbody.text("")
  data.forEach((sighting) => {
    var row = tbody.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}
loadData(dataTable);

//find the filter button
var filt = d3.select("#filter-btn");

var reset = d3.select("#reset-btn");

filt.on("click", function() {
  
  d3.event.preventDefault();
  //identify each value input
  var inputDate = d3.select("#datetime").property("value");
  var inputCity = d3.select("#city").property("value");
  var inputState = d3.select("#state").property("value");
  var inputShape = d3.select("#shape").property("value");

  
  console.log(inputDate,inputCity,inputShape,inputState)
  //check if inputs are in data
  var found_data = dataTable.filter( row => {
    //check if input is empty
    if (inputDate !== '' && row.datetime !== inputDate ) return false;
    if (inputCity !== '' && row.city !== inputCity.toLowerCase() ) return false;
    if (inputShape !== '' && row.shape !== inputShape.toLowerCase() ) return false;
    if (inputState !== '' && row.state !== inputState.toLowerCase() ) return false;
    return true;
  } );
  //load found data into table
  loadData(found_data);

});
//reset table
reset.on("click", function() {
  loadData(dataTable);
  //reset values to be empty
  d3.select("#datetime").property("value", '');
  d3.select("#city").property("value", '');
  d3.select("#state").property("value", '');
  d3.select("#shape").property("value", '');
});