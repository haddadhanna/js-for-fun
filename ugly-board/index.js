'use strict'
let colorPool = ['#bf0000', '#bf6f00', '#83bf00', '#0a8a16', '#0a8a7b', '#0a558a', '#4a0a8a', '#900fb8', '#c400a4', '#91072e'];
function Note(title, content){
    this.title = title;
    this.content = content;
    this.draw = function(){
        let divNote = document.createElement('div');
        divNote.className = 'note';
        divNote.style.backgroundColor = colorPool[Math.floor(Math.random() * 10)];
        let noteTitle = document.createElement('h4');
        noteTitle.appendChild(document.createTextNode(this.title));
        let noteP = document.createElement('p');
        noteP.appendChild(document.createTextNode(this.content));
        divNote.appendChild(noteTitle);
        divNote.appendChild(noteP);
        return divNote;
    };
}
(function(){
    let board = document.getElementById('board');
    for(let i =0; i <= 17; i++){
        board.appendChild(new Note('title1', 'some content').draw());
    }
})();