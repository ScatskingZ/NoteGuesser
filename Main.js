let NoteName = "IT";
let Clef = "TREBLE";
let Note = document.getElementById("note");
let NoteIndex = Math.floor(Math.random() * 11);
let Alteration = 0;
let NoteSpaceIndex = 0;
let NoteRealPosition = 0;
let pos;
let Alt = document.getElementById("alt")
let streak = 0;

let SheetNoteName = (o = false) => {
    pos = [
        1, 1,
        2, 2,
        3,
        4, 4,
        5, 5,
        6, 6,
        7,
        8, 8,
        9, 9,
        10,
        11, 11,
        12, 12
    ]
    
    
    if (Clef == "TREBLE") pos = pos[NoteSpaceIndex % 20];
    if (Clef == "BASS") pos = pos[(NoteSpaceIndex % 20)+2];
    if (Clef == "ALTO") pos = pos[(NoteSpaceIndex % 20)+1];

    if (NoteName == "EN" || o) {
        return [
            'C',
            'D',
            'E',
            'F',
            'G',
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'A',
            'B',
        ][pos - 1] + GetFos();
    }
    else if (NoteName == "IT") {
        return [
            'Do',
            'Re',
            'Mi',
            'Fa',
            'Sol',
            'La',
            'Si',
            'Do',
            'Re',
            'Mi',
            'Fa',
            'Sol',
            'La',
            'Si',
        ][pos - 1] + GetFos();
    }
}

let GetFos = () => {
    if (Alteration == 1) return '♯';
    else if (Alteration == -1) return '♭';
    else return '';
}

const getClefImg = () => {
    return `img/${Clef}.png`;
}

let post = (fos, n) => {
    Alteration = fos;
    return n;
}

let newNote = () => {

    if (document.getElementById("noteselect").value + document.getElementById("altselect").value == SheetNoteName(true))
        streak++;
    else streak = 0;

    console.log(document.getElementById("noteselect").value + document.getElementById("altselect").value + "\n" + SheetNoteName())

    NoteIndex = Math.floor(Math.random() * 16);
    if (Clef == "BASS")
    {
        NoteSpaceIndex += 2;
    }
    NoteSpaceIndex = NoteIndex;

    NoteRealPosition = getNotePosition();
}

let Fos = (n) => {
    let c;

    if (Math.random() > 0.25) {
        if (Math.random() > 0.5) c = 1;
        else { c = -1; NoteSpaceIndex++; }
    }
    else c = 0;
    return post(c, n);
}

let getNotePosition = () => {
    [
        0,
        Fos(1),
        2,
        Fos(2),
        3,
        4,
        Fos(4),
        5,
        Fos(5),
        6,
        Fos(6),
        7,
        8,
        Fos(8),
        9,
        Fos(9),
        10,
        11,
        Fos(11),
        12
    ][NoteIndex];
}

let clefh = document.getElementById("clefimg").height;

let NotePixel = () => {
    return clefh / 15.8;
}

newNote();

let changeAnswers = () => {
    if (NoteName == "IT" && document.getElementById("C").innerHTML == "C")
    {
        let notes = [
            "C","D","E","F","G","A","B"
        ]
        for (let i = 0; i < notes.length; i++)
        {
            document.getElementById(notes[i]).innerHTML = ["Do","Re","Mi","Fa","Sol","La","Si"][i];
        }
    }
    if (NoteName == "EN" && document.getElementById("C").innerHTML == "Do")
    {
        let notes = [
            "C","D","E","F","G","A","B"
        ]
        for (let i = 0; i < notes.length; i++)
        {
            document.getElementById(notes[i]).innerHTML = notes[i];
        }
    }
}

setInterval(() => {
    NoteName = document.getElementById("notename").value;
    Clef = document.getElementById("clef").value;

    document.getElementById("clefimg").src = getClefImg();

    SheetNoteName();
    clefh = document.getElementById("clefimg").height;
    
    Alt.src = `img/ALT${Alteration}.png`;

    changeAnswers();

    document.getElementById("streak").innerHTML = `Streak: ${streak}`;
    
    Note.style.transform = `translate(0, ${NotePixel() * (12 - pos + {
        "TREBLE": 1,
        "BASS": 3,
        "ALTO": 2
    }[Clef])}px)`;

    
    Alt.style.transform = `translate(0, ${NotePixel() * (10 - pos + {
        "TREBLE": 1,
        "BASS": 3,
        "ALTO": 2
    }[Clef])}px)`;

}, 10);