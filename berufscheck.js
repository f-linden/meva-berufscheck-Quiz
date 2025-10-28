var questions = [
    {
        question: "Wo arbeitest du am liebsten?",
        image: "images/1.png",
        options: ["Am Schreibtisch", "In der Produktion", "Draußen, im Außeneinsatz"],
        category: 0  // 0 = erste Option ist Büro, 1 = zweite Option ist Technik, 2 = dritte Option ist Produktion
    },
    {
        question: "Welche Aufgabe motiviert dich am meisten?",
        image: "images/2.png",
        options: ["Planung und Organisation", "Technisches Zeichnen und Design", "Körperliche Arbeit und Bewegung"],
        category: 0
    },
    {
        question: "Arbeitest du lieber im Team oder alleine?",
        image: "images/3.png",
        options: ["Im Team", "Alleine", "Gemischt, je nach Situation"],
        category: 0
    },
    {
        question: "Welche Werkzeuge findest du spannend?",
        image: "images/4.png",
        options: ["Computer", "Handwerkzeuge", "Gabelstapler oder Maschinen"],
        category: 0
    },
    {
        question: "Welche Fähigkeit möchtest du weiterentwickeln?",
        image: "images/5.png",
        options: ["Kommunikation und Kundenkontakt", "Technisches Wissen und Zeichnen", "Mechanik und handwerkliches Geschick"],
        category: 0
    },
    {
        question: "In welcher Umgebung arbeitest du am produktivsten?",
        image: "images/6.png",
        options: ["Ruhiges Büro", "Lebhafte Produktionshalle", "Abwechslungsreiche Außeneinsätze"],
        category: 0
    },
    {
        question: "Welche Themen interessieren dich am meisten?",
        image: "images/7.png",
        options: ["Wirtschaft und Betriebsführung", "Technik und Konstruktion", "Logistik und Organisation"],
        category: 0
    },
    {
        question: "An welchen Projekten würdest du gerne teilnehmen?",
        image: "images/8.png",
        options: ["Digitale Projekte", "Technische Produktionsprojekte", "Prozessmanagement-Projekte"],
        category: 0
    },
    {
        question: "Welche Ausbildungsform spricht dich an?",
        image: "images/9.png",
        options: ["Duales Studium", "Ausbildung", "Zertifikatskurse"],
        category: 0
    },
    {
        question: "Welche Fähigkeit nutzt du am liebsten?",
        image: "images/10.png",
        options: ["Analytisches Denken", "Technisches Zeichnen", "Körperliche Kraft und Geschick"],
        category: 0
    },
    {
        question: "Wo fühlst du dich am wohlsten?",
        image: "images/1.png",
        options: ["Am Computer", "In der Werkstatt", "Im Lager"],
        category: 0
    },
    {
        question: "Welche Aufgabe erfüllt dich am meisten?",
        image: "images/2.png",
        options: ["Kundenkommunikation", "Teile herstellen oder reparieren", "Produkte organisieren und verfolgen"],
        category: 0
    },
    {
        question: "Welche Software interessiert dich?",
        image: "images/3.png",
        options: ["ERP-Systeme", "CAD-Programme", "Programmierung und Softwareentwicklung"],
        category: 0
    },
    {
        question: "Welche Arbeit fällt dir am schwersten?",
        image: "images/4.png",
        options: ["Körperliche Arbeit", "Technisches Zeichnen", "Kundenkontakt"],
        category: 0
    },
    {
        question: "In welchem Bereich möchtest du dich weiterentwickeln?",
        image: "images/5.png",
        options: ["Betriebswirtschaft", "Technisches Design", "Logistikprozesse"],
        category: 0
    },
    {
        question: "Mit welchen Maschinen würdest du gerne arbeiten?",
        image: "images/6.png",
        options: ["CNC-Maschinen", "Computersysteme", "Lagertechnik"],
        category: 0
    },
    {
        question: "Welche Arbeit macht dir am meisten Spaß?",
        image: "images/7.png",
        options: ["Planung und Analyse", "Design und Produktion", "Organisation und Versand"],
        category: 0
    },
    {
        question: "Welche Lernform motiviert dich?",
        image: "images/8.png",
        options: ["Theoretisches Wissen", "Praktische Anwendung", "Mischung aus Theorie und Praxis"],
        category: 0
    },
    {
        question: "Welche Arbeitsumgebung bevorzugst du?",
        image: "images/9.png",
        options: ["Büro", "Werkstatt", "Logistikzentrum"],
        category: 0
    },
    {
        question: "Bei welcher Aufgabe bist du besonders erfolgreich?",
        image: "images/10.png",
        options: ["Berichte und Analysen", "Technisches Zeichnen und Produktion", "Materialverwaltung und Organisation"],
        category: 0
    }
];

var scores = [0, 0, 0]; // [Büro/BWL, Technik/Design, Produktion/Lager/IT]
var current = 0;

function displayQuestion() {
    var questionEl = document.getElementById("question");
    var imgEl = document.getElementById("question-image");
    var optionsContainer = document.getElementById("options");

    questionEl.innerText = questions[current].question;
    imgEl.src = questions[current].image;

    var buttons = optionsContainer.getElementsByTagName("button");
    for(var i = 0; i < buttons.length; i++) {
        buttons[i].innerText = questions[current].options[i];
        buttons[i].setAttribute("data-index", i);
    }

    optionsContainer.onclick = function(e) {
        var target = e.target;
        if(target.tagName.toLowerCase() === "button") {
            var choiceIndex = parseInt(target.getAttribute("data-index"));
            answer(choiceIndex);
        }
    };

    var progressPercent = (current/questions.length)*100;
    document.getElementById("progress").style.width = progressPercent + "%";
    
    // Soru sayacını güncelle
    var progressBar = document.querySelector('.progress-bar');
    var counter = progressBar.querySelector('.question-counter');
    if (!counter) {
        counter = document.createElement('div');
        counter.className = 'question-counter';
        progressBar.appendChild(counter);
    }
    counter.textContent = `Frage ${current + 1} von ${questions.length}`;
}

function answer(choiceIndex) {
    // Addiere einen Punkt zur entsprechenden Kategorie
    scores[choiceIndex]++;
    
    current++;
    if(current < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    var resultText = [
        "<strong>Büro / Betriebswirtschaft:</strong><br>Du passt am besten zu einem kaufmännischen Beruf wie<br>Industriekaufmann/-frau oder einem DH-Studium in BWL.",
        "<strong>Technik / Design:</strong><br>Du passt am besten zu einem technischen Beruf wie<br>Technischer Produktdesigner oder einem DH-Studium in Maschinenbau.",
        "<strong>Produktion / Lager / IT:</strong><br>Du passt am besten zu einem praktischen Beruf wie<br>Fachkraft für Lagerlogistik, Konstruktionsmechaniker,<br>Industriemechaniker oder Fachinformatiker."
    ];

    var maxScore = Math.max.apply(null, scores);
    var equalMaxScores = scores.filter(score => score === maxScore).length;
    
    var questionBox = document.getElementById("question-box");
    questionBox.style.display = "none";
    
    // Sonuç container'ını oluştur
    var resultContainer = document.createElement("div");
    resultContainer.className = "result-container";
    
    // Resmi ekle
    var resultImage = document.createElement("img");
    resultImage.src = "images/11.png";
    resultImage.className = "result-image";
    resultContainer.appendChild(resultImage);
    
    // Sonuç metnini ekle
    var result = document.createElement("div");
    result.className = "result";
    
    if (equalMaxScores > 1) {
        // Wenn zwei oder mehr Bereiche die gleiche Punktzahl haben
        result.innerHTML = "<strong>Du bist sehr vielseitig!</strong><br>Deine Interessen und Fähigkeiten verteilen sich gleichmäßig auf mehrere Bereiche.<br>" +
            "Das bedeutet, du könntest in verschiedenen Berufsfeldern erfolgreich sein.<br><br>Hier sind deine Stärken:<br>" +
            scores.map((score, index) => {
                if (score === maxScore) {
                    return "• " + resultText[index].split(":")[0];
                }
                return null;
            }).filter(text => text !== null).join("\n");
    } else {
        // Wenn ein Bereich klar die höchste Punktzahl hat
        var index = scores.indexOf(maxScore);
        result.innerHTML = resultText[index];
    }
    
    resultContainer.appendChild(result);
    
    // Başvuru butonu ekle
    var applyButton = document.createElement("a");
    applyButton.className = "apply-button";
    applyButton.href = "https://meva.net/de-de/karriere/"; // Buraya gerçek başvuru linki gelecek
    applyButton.textContent = "Jetzt bewerben";
    resultContainer.appendChild(applyButton);
    
    // Eski sonuç elementini kaldır ve yenisini ekle
    var oldResult = document.getElementById("result");
    if (oldResult) oldResult.remove();
    
    questionBox.parentNode.appendChild(resultContainer);
    result.style.opacity = 1;
}

window.onload = displayQuestion;