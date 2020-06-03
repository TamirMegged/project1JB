//sort date as dd/mm/yyyy
function sortDate(date) {
    if (date === "") {
        return;
    }
    dateArr = date.split('-');
    console.log(dateArr);
    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2];
    return `${day}/${month}/${year}`;
}


//when user click add - add task by executing toNote() method on current inputs' values
function addTask() {
    let details = document.querySelector('textarea').value;
    let date = document.getElementById('dateInput').value;
    let time = document.getElementById('timeInput').value;
    if (checkMustInputs(date, details)) {
    let task = new Task(details, date, time);
    task.toNote()
    }
}


//when user click reset - reset all inputs
function resetInputs() {
    document.querySelector('textarea').value = "";
    document.getElementById('dateInput').value = "";
    document.getElementById('timeInput').value = "";
}


//when user click on x (in note) - delete note
function deleteNote(e) {
    e.target.parentElement.remove();
}


//check if must inputs are filled and show popups and remarks if not
function checkMustInputs(date, details) {
    if (date === "" && details === "") {
        document.getElementById('noMustPopup').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('noMustPopup').style.visibility = 'hidden'
        }, 3000);
        document.getElementById('noDateRemark').style.visibility = 'visible';
        document.getElementById('noDetailsRemark').style.visibility = 'visible';
    } 
    if (date === "") {
        document.getElementById('noDatePopup').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('noDatePopup').style.visibility = 'hidden'
        }, 3000);        
        document.getElementById('noDateRemark').style.visibility = 'visible';        
    } else {
        document.getElementById('noDateRemark').style.visibility = 'hidden';
    }
    if (details === "") {
        document.getElementById('noDetailsPopup').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('noDetailsPopup').style.visibility = 'hidden'
        }, 3000);
        document.getElementById('noDetailsRemark').style.visibility = 'visible';
    } else {
        document.getElementById('noDetailsRemark').style.visibility = 'hidden';
    }
    if (date === "" || details === "") {
        return false;
    } else {
        return true;
    }
}