//sort date as dd/mm/yyyy
function sortDate(date) {
    if (date === "") {
        return;
    }
    dateArr = date.split('-');
    var year = dateArr[0];
    var month = dateArr[1];
    var day = dateArr[2];
    return `${day}/${month}/${year}`;
}


//when user click add - add task by executing toNote() method on current inputs' values
let tasksArr = [];

function addTask() {
    let details = document.querySelector('textarea').value;
    let date = document.getElementById('dateInput').value;
    let sortedDate = sortDate(date);
    let time = document.getElementById('timeInput').value;
    if (checkMustInputs(date, details)) {
        let counter = JSON.parse(localStorage.getItem('notes')).length;
        let task = new Task(details, sortedDate, time, counter);
        task.toNote();
        tasksArr.push(task);
        localStorage.setItem('notes', JSON.stringify(tasksArr));
        resetInputs();
    }
}


//when user click reset - reset all inputs
function resetInputs() {
    document.querySelector('textarea').value = "";
    document.getElementById('dateInput').value = "";
    document.getElementById('timeInput').value = "";
    document.querySelector('textarea').focus();
}


//when user click on x (in note) - delete note from HTML and local storage
function deleteNote(e) {
    let temp = localStorage.getItem('notes');
    let tempTasksArr = JSON.parse(temp);
    document.getElementById('notesArea').innerHTML = "";
    tasksArr = [];
    let index = 0;
    for (let i = 0; i < tempTasksArr.length; i++) {
        if (e.target.parentElement.getAttribute('data-id') !== tempTasksArr[i].dataId) {
        let task = new Task(tempTasksArr[i].details , tempTasksArr[i].date, tempTasksArr[i].time, index);
        tasksArr.push(task);
        tasksArr[index].toNote();
        index++
        }
    }
    localStorage.setItem('notes', JSON.stringify(tasksArr));
}


//check if must inputs are filled and show popups and remarks if not
function checkMustInputs(date, details) {
    if (date === "" && details === "") {
        document.getElementById('noBothPopup').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('noBothPopup').style.visibility = 'hidden'
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
        document.getElementById('dateInput').focus();
    } else {
        document.getElementById('noDateRemark').style.visibility = 'hidden';
    }
    if (details === "") {
        document.getElementById('noDetailsPopup').style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById('noDetailsPopup').style.visibility = 'hidden'
        }, 3000);
        document.getElementById('noDetailsRemark').style.visibility = 'visible';
        document.querySelector('textarea').focus();
    } else {
        document.getElementById('noDetailsRemark').style.visibility = 'hidden';
    }
    if (date === "" || details === "") {
        return false;
    } else {
        return true;
    }
}


//reload notes from local storage and show them
window.onload = function (e) {
    let temp = localStorage.getItem('notes');
    if (!temp) {
        return;
    }
    let tempTasksArr = JSON.parse(temp);
    tasksArr = [];
    for (let i = 0; i < tempTasksArr.length; i++) {
        let task = new Task(tempTasksArr[i].details , tempTasksArr[i].date, tempTasksArr[i].time, tempTasksArr[i].dataId);
        tasksArr.push(task);
        tasksArr[i].toNote();
    }
}