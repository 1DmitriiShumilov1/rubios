if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', runCode());
} else {
    runCode();
}

function runCode(){

    const contacts = [
    {
        "name": "Jordan", 
        "phoneNumber": "9999991234", 
        "city": "Los Angeles"
    },
    {
        "name": "Alex", 
        "phoneNumber": "1234567890", 
        "city": "San Francisco"
    }, 
    {
        "name": "Sarah", 
        "phoneNumber": "9876543210", 
        "city": "Auburn"
    }
    ];

    const addContactButton = document.getElementsByClassName("add-contact")[0];
    const updateContactButton = document.getElementsByClassName("update-contact")[0];
    const removeContactButton = document.getElementsByClassName("remove-contact")[0];

    const addContactButton_done = document.getElementsByClassName("add-done")[0];
    const cancelButton = document.getElementsByClassName("cancel")[0];
    const cancelButton_update = document.getElementsByClassName("cancel-update")[0];

    const invisibleObjectAdd = document.getElementsByClassName("invisible-add")[0];
    const invisibleObjectUpdate = document.getElementsByClassName("invisible-update")[0];

    const editCells = document.getElementsByClassName("edit-cell");

    addContactButton.addEventListener('click', () => {
        invisibleObjectAdd.classList.add("add-contact-form");
    });

    updateContactButton.addEventListener('click', () => {
        document.getElementsByClassName("update-input-name")[0].value = "";
        cancelButton_update.addEventListener('click', closeWindowUpdate, {once: true});
        invisibleObjectUpdate.classList.add("update-form-1");
            for (var i = 0; i < editCells.length; i++){
                editCells[i].classList.add("hover-cell");
                editCells[i].addEventListener('click', runFunction, {once: true});
            }
    });

    function runFunction(event){
        for (var i = 0; i < editCells.length; i++){
            editCells[i].classList.remove("hover-cell");
            editCells[i].removeEventListener('click', runFunction, {once: true});
        }
        var target = event.target;
        updateInfo(editCells, target);
        return;
    }

    cancelButton.addEventListener('click', closeWindow);

    addContactButton_done.addEventListener('click', addContact);

    function addContact(){
        var inputName = document.getElementsByClassName("input-name")[0].value;
        var inputPhone = document.getElementsByClassName("input-phone")[0].value;
        var inputCity = document.getElementsByClassName("input-city")[0].value;

        if (inputPhone.length < 10){
            alert("Phone number should contain 10 digits");
            return;
        }

        if (/[^a-z]/i.test(inputName) || /[^a-z]/i.test(inputCity)) {
            alert("PLease use letters for name and city");
            return;
         }

        if(inputName == "" || inputCity == ""){
            alert("Please fill up all the fields");
            return;
        }

        var duplicateNumber = false;
        
        for (i = 0; i < contacts.length; i++){
            if (contacts[i].phoneNumber == inputPhone){
                duplicateNumber = true;
            }
        }

        switch(duplicateNumber){
            default:
                alert("This number is already in the list");
                break;

            case false:
                var parent = document.getElementsByClassName("contact-list")[0];
                var newName = document.createElement('span');
                var newPhone = document.createElement('span');
                var newCity = document.createElement('span');

                newName.classList.add("cell", "edit-cell");
                newPhone.classList.add("cell", "edit-cell");
                newCity.classList.add("cell", "edit-cell");

                newName.innerHTML = inputName;
                newPhone.innerHTML = inputPhone;
                newCity.innerHTML = inputCity;

                parent.appendChild(newName);
                parent.appendChild(newPhone);
                parent.appendChild(newCity);

                contacts.push({"name": inputName, "phoneNumber": inputPhone, "city": inputCity});

                closeWindow();
                break;
            }
        }


    function updateInfo(editCells, target){
        var header = document.getElementsByClassName("text-update")[0];
        var newInfo = document.getElementsByClassName("update-text")[0];
        var newPhone = document.getElementsByClassName("update-phone")[0];
        var buttonReadyToUpdate = document.getElementsByClassName("update-done")[0];

        cancelButton_update.classList.add("invisible-update");

        target.classList.add("input-cell");
        console.log(target.innerHTML)

        if (isNaN(target.innerHTML)){
            header.innerHTML = "Enter the new info";
            newInfo.classList.add("update-text-visible");
            buttonReadyToUpdate.addEventListener('click', () => {
                realTarget = document.getElementsByClassName("input-cell")[0];
                newNameOrCityInput = document.getElementsByClassName("update-input-name")[0];
                realTarget.innerText = newNameOrCityInput.value;
                realTarget.classList.remove("input-cell");

                invisibleObjectUpdate.classList.remove("update-form-1");
                newInfo.classList.remove("update-text-visible");
                header.innerHTML = "Click on the item you want to update";
                cancelButton_update.classList.remove("invisible-update");

                return;
            }, {once: true});
        } else {
            header.innerHTML = "Enter the new number";
            newPhone.classList.add("update-phone-visible");
            buttonReadyToUpdate.addEventListener('click', () => {
                realTarget = document.getElementsByClassName("input-cell")[0];
                newPhoneInput = document.getElementsByClassName("update-input-phone")[0];
                realTarget.innerHTML = newPhoneInput.value;
                realTarget.classList.remove("input-cell");

                invisibleObjectUpdate.classList.remove("update-form-1");
                newPhone.classList.remove("update-phone-visible");
                header.innerHTML = "Click on the item you want to update";
                cancelButton_update.classList.remove("invisible-update");

                return;
            }, {once: true});
        }
        
    };

    function closeWindow(){
        invisibleObjectAdd.classList.remove("add-contact-form");
    }

    function closeWindowUpdate(){
        invisibleObjectUpdate.classList.remove("update-form-1");
    }
}

