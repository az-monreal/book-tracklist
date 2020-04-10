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

    generateTable(table, e.return, generateTableHead(table, data));
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
  thead.classList.add("header");
  let row = thead.insertRow();

  let c_header = ["Sex", "Year of Publication", "#"];
  let c_col = [];

  for (let c = 0; c < data.length; c++) {
    let th = document.createElement("th");
    let text = document.createTextNode(data[c]);
    if (c_header.includes(data[c])) {
      c_col.push(c);
    }
    th.appendChild(text);
    row.appendChild(th);
  }
  return c_col;
}

function generateTable(table, data, c_col) {
  for (let r = 1; r < data.length; r++) {
    let row = table.insertRow();
    for (let c = 0; c < data[r].length; c++) {
      let cell = row.insertCell();
      let text = document.createTextNode(data[r][c]);

      if (c_col.includes(c)) {
        cell.classList.add("center");
      }

      cell.appendChild(text);
    }
  }
}
