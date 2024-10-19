document.addEventListener('DOMContentLoaded', function() {
    const noteDiv = document.getElementById('note');
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const savedContent = getCookie('noteContent');

    if (savedContent) {
        noteDiv.innerHTML = savedContent;
    }

    noteDiv.addEventListener('input', function() {
        setCookie('noteContent', noteDiv.innerHTML, 365);
        adjustNoteHeight();
        updateButtonStates();
        updateWordCount();
    });

    noteDiv.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'b') {
            e.preventDefault();
            formatText('bold');
        } else if (e.ctrlKey && e.key === 'i') {
            e.preventDefault();
            formatText('italic');
        }
    });

    adjustNoteHeight();
    updateButtonStates();
    updateWordCount();
    
    document.addEventListener('selectionchange', updateButtonStates);
});

function adjustNoteHeight() {
    const noteDiv = document.getElementById('note');
    noteDiv.style.height = 'auto';
    noteDiv.style.height = noteDiv.scrollHeight + 'px';
}

function formatText(style) {
    document.execCommand(style, false, null);
    setCookie('noteContent', document.getElementById('note').innerHTML, 365);
    adjustNoteHeight();
    updateButtonStates();
    updateWordCount();
}

function alignText(alignment) {
    document.execCommand('justify' + alignment.charAt(0).toUpperCase() + alignment.slice(1), false, null);
    setCookie('noteContent', document.getElementById('note').innerHTML, 365);
    adjustNoteHeight();
    updateWordCount();
}

function updateButtonStates() {
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    
    boldBtn.classList.toggle('active', document.queryCommandState('bold'));
    italicBtn.classList.toggle('active', document.queryCommandState('italic'));
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

function updateWordCount() {
    const noteDiv = document.getElementById('note');
    const text = noteDiv.innerText || noteDiv.textContent;
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    const charCount = text.length;
    
    document.getElementById('wordCount').textContent = `Words: ${wordCount} | Characters: ${charCount}`;
}