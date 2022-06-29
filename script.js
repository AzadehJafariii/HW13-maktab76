let API_URL = "https://62ab6beda62365888bdc2f11.mockapi.io/Hw13";
document.addEventListener("DOMContentLoaded", () => {
  getData();
});
function getData() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createDOMTable(data);
    });
}
function createDOMTable(data) {
  let table = document.createElement("table");
  let tr = document.createElement("tr");
  let siteIdValues = [];
  for (i = 0; i < data.length; i++) {
    siteIdValues.push(data[i].SiteId);
  }

  let projectIdValues = [];
  for (j = 0; j < data.length; j++) {
    projectIdValues.push(data[j].ProjectId);
  }

  let newSiteArray = [];
  let newProjectArray = [];

  for (x of siteIdValues) {
    if (!newSiteArray.includes(x)) {
      newSiteArray.push(x);
    }
  }

  newSiteArray.sort(function (a, b) {
    return a - b;
  });

  for (x of projectIdValues) {
    if (!newProjectArray.includes(x)) {
      newProjectArray.push(x);
    }
  }
  newProjectArray.sort(function (a, b) {
    return a - b;
  });

  console.log(newSiteArray);
  console.log(newProjectArray);

//header site ID
  for (j = 0; j < newSiteArray.length; j++) {
     if (j == 0) {
       let td = document.createElement("td");
       tr.appendChild(td);
     }
    let th = document.createElement("th");
    th.innerHTML = newSiteArray[j];
    tr.appendChild(th);
  }
  table.appendChild(tr);

  //next rows
  for (let i = 0; i < newProjectArray.length; i++) {
    tr = table.insertRow();
    for (let j = 0; j < newSiteArray.length + 1; j++) {
      if (j == 0) {
        let ProjectCell = tr.insertCell();
        ProjectCell.innerHTML = newProjectArray[i];
      } else {
        let targetCell = tr.insertCell();
        targetCell.innerHTML = data.find(
          (p) =>
            p.ProjectId == newProjectArray[i] && p.SiteId == newSiteArray[j - 1]
        ).Target;
      }
    }
  }

  let divContainer = document.getElementById("tableInfo");
  divContainer.appendChild(table);
}
