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
let tasksArr = [];
function addTask() {
    let details = document.querySelector('textarea').value;
    let date = sortDate(document.getElementById('dateInput').value);
    let time = document.getElementById('timeInput').value;
    if (checkMustInputs(date, details)) {
        let task = new Task(details, date, time);
        task.toNote();
        resetInputs();
        tasksArr.push(task);
        localStorage.setItem("all", JSON.stringify(tasksArr));
    }
}


//when user click reset - reset all inputs
function resetInputs() {
    document.querySelector('textarea').value = "";
    document.getElementById('dateInput').value = "";
    document.getElementById('timeInput').value = "";
}


//when user click on x (in note) - delete note from HTML and local storage
function deleteNote(e) {
    e.target.parentElement.remove();
    for (var i = 0; i < tasksArr.length; i++) {
        if (e.target === tasksArr[i]) {
            localStorage.removeItem(`${i}`);
        }
    }
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
    let temp = localStorage.getItem("all");
    if (!temp) {
        return;
    }
    let tempTasksArr = JSON.parse(temp);
    tasksArr = [];
    for (let i = 0; i < tempTasksArr.length; i++) {
        let task = new Task(tempTasksArr[i].details , tempTasksArr[i].date, tempTasksArr[i].time);
        tasksArr.push(task);
        tasksArr[i].toNote();
    }
}