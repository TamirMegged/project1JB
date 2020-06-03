//constructor for tasks info objects
function Task(details, date, time) {
    this.details = details;
    this.date = date;
    this.time = time;
}


//get info from inputs and create a new note containing this info
Task.prototype.toNote = function () {
    var notesArea = document.getElementById('notesArea');
    var note = document.createElement('div');
    note.classList.add('note');
    var button = document.createElement('button');
    button.innerHTML = '&times;';
    button.onclick = deleteNote;
    var noteText = document.createElement('div');
    noteText.classList.add('noteText');
    var finishTime = document.createElement('div');
    finishTime.classList.add('finishTime');
    noteText.innerText = this.details;
    finishTime.innerHTML = `${this.date}<br>${this.time}`;
    notesArea.appendChild(note);
    note.appendChild(button);
    note.appendChild(noteText);
    note.appendChild(finishTime);
}