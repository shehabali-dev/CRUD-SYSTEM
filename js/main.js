let sitNameInput = document.getElementById("inputName");
let urlNameInput = document.getElementById("inputUrl");
let btnSubmit = document.getElementById("adding");
let array = [];
if (localStorage.getItem("site") == null) {
  array = [];
} else {
  array = JSON.parse(localStorage.getItem("site"));
  display();
}
btnSubmit.addEventListener("click", () => {
   if(validation(sitNameInput) & validation(urlNameInput)){
                   let getValue = {
    name: sitNameInput.value,
    url: urlNameInput.value,
  };

  array.push(getValue);
  localStorage.setItem("site", JSON.stringify(array));
  clear();
  display();
   }




});
function clear() {
  sitNameInput.value = "";
  urlNameInput.value = "";
}

function display() {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `<tr>
      <td>${i}</td>
      <td>${array[i].name}</td> 
      <td><a href="${array[i].url}" target="_blank"><button class="btn btn-outline-info">Visit</button></a></td> 
       <td><button onclick="del(${i})" class="btn btn-outline-danger">Delete</button></td> 
    
      </tr>`;
  }
  document.getElementById("tableData").innerHTML = box;
}

function del(index) {
  array.splice(index, 1);
  localStorage.setItem("site", JSON.stringify(array));
  display();
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => {
    validation(input);
  });
});
function validation(element) {
  let regex = {
    inputName: /^[a-zA-Z0-9\-_\s]{3,30}$/,
    inputUrl: /^https?:\/\/(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})+$/,
  };
  if(regex[element.id].test(element.value)==true){
    element.classList.add('is-valid')
    element.classList.remove('is-invalid')
    element.nextElementSibling.classList.replace('d-block','d-none')
    return true;
  }
  else{
 element.classList.remove('is-valid')
    element.classList.add('is-invalid')
     element.nextElementSibling.classList.replace('d-none','d-block')
     return false;
  }
}
