var siteNameInput= document.getElementById("siteNameInput");
var siteUrlInput= document.getElementById("siteUrlInput");
var sites= []
var regExUrl= /^(www)\.[a-zA-Z0-9]{3,10}\.com$/;
var regExName= /^[a-zA-Z]{3,15}$/;

if(localStorage.getItem("sites") != null){
  sites= JSON.parse(localStorage.getItem("sites"))
  displaySite();
}

// Start Button Submit

function addSite(){

if(validateName(siteNameInput.value) && validateUrl(siteUrlInput.value)){
  var site={
    name: siteNameInput.value,
    url: siteUrlInput.value
   }
  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites))
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid")
  clear();
  displaySite()
}else{
    Swal.fire({
      title: `<div class="text-start">Site Name or Url is not valid, Please follow the rules below :</div>`,
      html: `<div class="text-start mt-3"><p><i class="fa-regular fa-circle-right mx-2 text-danger"></i>Site name must contain at least 3 characters.</p> <p><i class="fa-regular fa-circle-right mx-2 text-danger"></i>Site URL must be a valid one.</p></div>`,
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  
}

}

// End Button Submit


//Start Change Border Color to Inputs

function classNameInput(input){
  if(regExName.test(input.value)){
    siteNameInput.classList.add("is-valid")
    siteNameInput.classList.remove("is-invalid")
   
  }else {
    siteNameInput.classList.add("is-invalid")
    siteNameInput.classList.remove("is-valid")
  }

  }
  
  function classUrlInput(input){
    if(regExUrl.test(input.value)){
      siteUrlInput.classList.add("is-valid")
      siteUrlInput.classList.remove("is-invalid")
    }else{
      siteUrlInput.classList.add("is-invalid")
      siteUrlInput.classList.remove("is-valid")
    }
  }

//End Change Border Color to Inputs

// Start Clear Inputs

function clear(){
  siteNameInput.value="";
  siteUrlInput.value="";
}
// End Clear Inputs

//Start Show Inputs value in table

function displaySite(){
  var trs="";
  for(var i=0; i< sites.length; i++){
    trs += `<tr>
    <td>${i+1}</td>
    <td>${sites[i].name}</td>
    <td><button onClick="visitSite(${i})" class="btn btn-visit text-center"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
    <td><button onClick="deleteSite(${i})" class="btn btn-danger text-center"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
    </tr>`
  }
  document.getElementById("tBody").innerHTML=trs

}
//End Show Inputs value in table

//Start Delete Button

function deleteSite(index){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-success mx-2"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      sites.splice(index,1);
      displaySite();
      localStorage.setItem("sites", JSON.stringify(sites))
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your site has been deleted.",
        icon: "success"
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary site is safe :)",
        icon: "error"
      });
    }
  });

}

//End Delete Button

//Start Visit Button

function visitSite(index){
if(regExUrl.test(sites[index].url)){
  var siteUrl= "https://" + sites[index].url
 open(siteUrl)
}
}
//Start Visit Button

//Start Validate Url
function validateUrl(siteUrl){
  return regExUrl.test(siteUrl);
 
}
//End Validate Url

//Start Validate Name

function validateName(siteName){
  return regExName.test(siteName);
}
//End Validate Name