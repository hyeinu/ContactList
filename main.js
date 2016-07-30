
$(() => {
    getContacts();

    $('#addNew').click(openAddModal);
    $('#append').on('click', '.delete', removeContact);
    $('#append').on('click', '.edit', openEditModal)
    $('#newContact').submit(addContact);
    $('#editContactForm').submit(saveUpdate);
})

function saveUpdate(e){
    event.preventDefault();
    let newName = $('#updateName').val();
    $('#updateName').val("");

    let newEmail = $('#updateEmail').val();
    $('#updateEmail').val("")

    let checkImg = $('#updateImg').val();
    let newImg = setImg(checkImg);
    $('#updateImg').val("");

    //$newContact is html
    let $newContact = updateContact(newName, newEmail, newImg);
    let editIndex = $('.editDiv');
    let totalArr = $('.newDiv');

    totalArr.splice(editIndex, 1, $newContact);

    updateToLocalStorage({newName, newEmail, newImg});

    $('#editContactModal').click();
}

function updateToLocalStorage(obj){
  // 1. Read
  // 2. Parse
  let updateContact = {name:obj.newName, email:obj.newEmail, newImg:obj.newImg}
  let index = $('.edit').index();
debugger;
  let contacts = contactsFromStorage();
  //.log(contact);
  //an array of names
  // 3. Modify
  contacts.splice(index, 1, updateContact);
  // 4. Stringify
  // 5. Write
  writeToStorage(contacts);
}

function updateContact(name, email, newImg){
  let $div = $('.editDiv');

    $div.find('.name').text(name);
    $div.find('.email').text(email);
    $div.find('.newImg').attr("src", newImg);

  return $div;
}


function getContacts(){
  let arrContacts = contactsFromStorage();
      arrContacts.forEach(contact => {
    let $contact = createContact(contact.name, contact.email, contact.newImg);
    $('#append').append($contact);
  })
}

// Open Add Modal >> Open Edit Modal
function openAddModal(){
  $('#newContactModal').modal();
}

function openEditModal(){
  $('.editDiv').removeClass('editDiv');
  $('#editContactModal').modal();
  $(this).parent().parent().parent().addClass('editDiv');

  let name = $('.editDiv').find(".name").text();
  let email = $('.editDiv').find(".email").text();
  let newImg = $('.editDiv').find(".newImg").attr('src');

  $('#updateName').val(name);
  $('#updateEmail').val(email);
  $('#updateDiv').val(newImg);

  //$('#nameEditModal').data('index', index);
}

function createContact(name, email, newImg){
  let $div = $('#template').clone();
    $div.removeAttr('id');
    $div.addClass('newDiv')
    $div.find('.name').text(name);
    $div.find('.email').text(email);
    $div.find('.newImg').attr("src", newImg);
  return $div;
}

function addContact(event){
  event.preventDefault();

  let newName = $('#newName').val();
  $('#newName').val("");

  let newEmail = $('#newEmail').val();
  $('#newEmail').val("")

  //like if there's no newImg
  let checkImg = $('#newImg').val();
  let newImg = setImg(checkImg);
  $('#newImg').val("");

  //$newContact is html
  let $newContact = createContact(newName, newEmail, newImg);

  $('#append').append($newContact);
  // debugger;
  addToLocalStorage({newName, newEmail, newImg});
  $('#closeModalAdd').click();
  //$('#newContactModal').modal().toggle();

}

function setImg(x){
  if(x){
      return x;
    } else {
      return 'unknownProfile.png';
    }
  }


function addToLocalStorage(obj){
  // 1. Read
  // 2. Parse
  let actualContact = {name:obj.newName, email:obj.newEmail, newImg:obj.newImg}

  let contacts = contactsFromStorage();
  //.log(contact);
  //an array of names
  // 3. Modify
  contacts.push(actualContact);
  // 4. Stringify
  // 5. Write
  writeToStorage(contacts);
}

function contactsFromStorage(){
  //read
  let json = localStorage.contacts;
  //declare let names; outside function
  let contacts;

  //parse
  try{
    contacts = JSON.parse(json);
    //var names = JSON.parse(json)
  } catch(error) {
    contacts = [];
    //var names = [];
    //error tolerant will make an empty array
    //if it was the first time/error
  }
  return contacts;

}


function writeToStorage(contacts){
  localStorage.contacts = JSON.stringify(contacts);
}


// remove contact line 8
function removeContact(event){
  let divArrs = $('.newDiv')
  let parentDiv = $(event.target).closest('.newDiv');
  parentDiv.addClass("remove")
  let index = $('.remove').index()
  removeFromStorage(index)
  $('.remove').remove();
}

function removeFromStorage(index){
  let contacts = contactsFromStorage();
  contacts.splice(index, 1);
  writeToStorage(contacts);
}
