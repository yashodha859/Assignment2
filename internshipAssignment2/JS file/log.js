//login 
function validCheck() {
  var mail = document.getElementById("email").value;
  var pass = document.getElementById("password").value;
  var registeredpass = localStorage.getItem(mail);
  console.log(registeredpass);
  if (pass == registeredpass) {

    sessionStorage.setItem("loginEmail", mail);

  }
  window.location.assign("C:/Users/User/yashu/internshipAssignment2/HTML files/contactbook.html");
}


// signup
function store() {


  var mail = document.getElementById("email");
  var pass = document.getElementById("password");
  localStorage.setItem(mail.value, pass.value);
  window.location.assign("C:/Users/User/yashu/internshipAssignment2/HTML files/login.html");
}
function validateForm() {

  var x = document.myForm.email.value;
  var pass = document.myForm.pass.value

  var atposition = x.indexOf("@");
  var dotposition = x.lastIndexOf(".");
  if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
    alert("Please enter a valid e-mail address \n atpostion:" + atposition + "\n dotposition:" + dotposition);
    return false;
  }
  else if (pass.length < 6) {
    alert("Password must be at least 6 characters long.");
    return false;
  }
  store();

}

//addcontact

var count = "counter:" + sessionStorage.getItem("loginEmail");
var key = "list : " + sessionStorage.getItem("loginEmail");

var id;
var arr = new Array();

function addData() {

  var str = localStorage.getItem(key);
  var arr = JSON.parse(str);
  if (!arr) {
    arr = [];

  }

  if (localStorage.getItem(count)) {
    id = parseInt(localStorage.getItem(count));
    id = id + 1;
  }
  else {
    localStorage.setItem(count, 1);
    id = 1;
  }
  arr.push({
    name: document.getElementById("name").value,
    phn: document.getElementById("phn").value,
    place: document.getElementById("place").value,
    id1: id
  });

  localStorage.setItem(key, JSON.stringify(arr));
  localStorage.setItem(count, id);
  window.location.assign("C:/Users/User/yashu/internshipAssignment2/HTML files/contactbook.html")
}


// contactbk
function loadNewDoc(id1, name, phn, place) {


  let loc = new URL("C:/Users/User/yashu/internshipAssignment2/HTML files/addcontact.html");
  loc.searchParams.append("id", id1);
  loc.searchParams.append("name", name);
  loc.searchParams.append("phn", phn);
  loc.searchParams.append("place", place);
  window.location.assign(loc);
}
function newOrExist() {
  let url = new URL(window.location.href);
  let parameter = url.searchParams;
  let id = parameter.get("id");
  if (id) {
    edit(id);
  } else {
    addData();
  }

}
function getparas(url1) {
  let url = new URL(url1);

  let parameter = url.searchParams;
  let id2 = parameter.get("id");
  let name1 = parameter.get("name");
  let phn1 = parameter.get("phn");
  let place1 = parameter.get("place");
  if (id2) {
    document.getElementById("name").value = name1;
    document.getElementById("phn").value = phn1;
    document.getElementById("place").value = place1;

  }

}
function edit(id2) {

  let name = document.getElementById("name").value;
  console.log(name);
  let phn = document.getElementById("phn").value;
  let place = document.getElementById("place").value;

  var key = "list : " + sessionStorage.getItem("loginEmail");
  let contact = JSON.parse(localStorage.getItem(key));

  let updatedData = {
    id1: id2,
    name: name,
    phn: phn,
    place: place,
  };

  contact.forEach((object) => {
    if (object.id1 == id2) {

      const a = Object.assign(object, updatedData);
      //console.log(a);
    }
  });
  localStorage.setItem(key, JSON.stringify(contact));
  window.location.assign(
    "C:/Users/User/yashu/internshipAssignment2/HTML files/contactbook.html"
  );

}

function remove(id) {

  let contact = JSON.parse(localStorage.getItem(key));

  // let contactList = objectToList(contact);

  let newlist = contact.filter(function (i) {
    return i.id1 != id;
  });
  let ok = confirm("Are u sure?");
  if (ok) {
    localStorage.setItem(key, JSON.stringify(newlist));
  }
  window.location.assign(
    "C:/Users/User/yashu/internshipAssignment2/HTML files/contactbook.html"
  );
}

