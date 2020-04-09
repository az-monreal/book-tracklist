function setup() {}

function draw() {}

function windowResized() {}

var script_url =
  "https://script.google.com/macros/s/AKfycbwiwO6SWP7JswJ3AePYptAmFE8ZZ1R-NzhjCiQ8U054p3AJegjS/exec";

function addEntry() {
  var s_url = [];

  for (let i = 1; i <= 9; i++) {
    let element = document.getElementById("new_entry").elements[i];

    name = element.name;
    value = element.value;

    s_url += "&" + name + "=" + value;

    if (element.name != "") {
      element.value = "";
    }
  }

  console.log(s_url);

  var url = script_url + "?callback=ctrlq" + s_url + "&action=newEntry";

  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function viewEntries() {
  var url = script_url + "?callback=ctrlq&action=viewEntries";

  var request = jQuery.ajax({
    crossDomain: true,
    url: url,
    method: "GET",
    dataType: "jsonp",
  });
}

function ctrlq(e) {
  if (e.result != null) {
    alert(e.result);

    viewEntries();
  }
  if (e.return != null) {
    let table = document.querySelector("table");
    let data = e.return[0];
    while (table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
    generateTableHead(table, data);
    generateTable(table, e.return);
  }
}

function displayMore() {
  console.log("more");
  var x = document.getElementById("new_entry_more");
  var y = document.getElementById("down");
  var z = document.getElementById("up");

  x.style.display = "block";
  y.style.display = "none";
  z.style.display = "block";
}
function displayLess() {
  console.log("less");
  var x = document.getElementById("new_entry_more");
  var y = document.getElementById("down");
  var z = document.getElementById("up");

  x.style.display = "none";
  y.style.display = "block";
  z.style.display = "none";
}

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let r = 0; r < data.length; r++) {
    let th = document.createElement("th");
    let text = document.createTextNode(data[r]);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let c = 1; c < data.length; c++) {
    let row = table.insertRow();
    for (let r = 0; r < data[c].length; r++) {
      let cell = row.insertCell();
      let text = document.createTextNode(data[c][r]);
      cell.appendChild(text);
    }
  }
}
