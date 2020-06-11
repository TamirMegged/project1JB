//constructor for tasks info objects
function Task(details, date, time, counter) {
    this.details = details;
    this.date = date;
    this.time = time;
    this.dataId = `${counter}`;
}


//get info from inputs and create a new note containing this info
Task.prototype.toNote = function (isNoteNew = false) {
    var note = document.createElement('div');
    note.classList.add('note');
    var noteId = document.createAttribute('data-id');
    noteId.value = this.dataId;
    note.setAttributeNode(noteId);
    var button = document.createElement('button');
    button.innerHTML = '&times;';
    button.onclick = deleteNote;
    var noteText = document.createElement('div');
    noteText.classList.add('noteText');
    var finishTime = document.createElement('div');
    finishTime.classList.add('finishTime');
    noteText.innerText = this.details;
    finishTime.innerHTML = `${this.date}<br>${this.time}`;
    note.appendChild(button);
    note.appendChild(noteText);
    note.appendChild(finishTime);
    if (isNoteNew) {
        setTimeout(function () {
            note.classList.add('active');
        }, 0);
    } else {
        note.classList.add('active');
    }
    document.getElementById('notesArea').appendChild(note);

}