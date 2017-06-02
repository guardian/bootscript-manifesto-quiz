import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var el;
var headerContent;
var submitButton;

export function init(dom, context, config, mediator) {
    var context = document;
    var questions = context.querySelectorAll('.atom-quiz__question');

    var headerContent = [
        {
            n: 1,
            group: "Brexit,",
            highlight: "#7D7569",
            image: "https://uploads.guim.co.uk/2017/05/17/brexit.svg"
        }, {
            n: 2,
            group: "Economy",
            highlight: "#00456E",
            image: "https://uploads.guim.co.uk/2017/05/17/economy.svg"
        }, {
            n: 3,
            group: "Housing",
            highlight: "#FFBB00",
            image: "https://uploads.guim.co.uk/2017/05/26/housing.svg"
        }, {
            n: 4,
            group: "Health",
            highlight: "#CC2B12",
            image: "https://uploads.guim.co.uk/2017/05/17/health.svg"
        }, {
            n: 5,
            group: "Renationalisation",
            highlight: '#951C55',
            image: false
        }, {
            n: 6,
            group: "Foreign and defence",
            highlight: "#717D85",
            image: "https://uploads.guim.co.uk/2017/05/26/defence.svg"
        }, {
            n: 7,
            group: "Immigration",
            highlight: "#B51800",
            image: "https://uploads.guim.co.uk/2017/05/26/immigration.svg"
        }, {
            n: 8,
            group: "Tax and spending",
            highlight: "#1C6326",
            image: "https://uploads.guim.co.uk/2017/05/26/tax.svg"
        }, {
            n: 9,
            group: "Education",
            highlight: "#197CAA",
            image: "https://uploads.guim.co.uk/2017/05/26/education.svg"
        }, {
            n: 10,
            group: "Secondary School",
            highlight: "#4BC6DF",
            image: false
        }, {
            n: 11,
            group: "Environment",
            highlight: "#5EBFBA",
            image: "https://uploads.guim.co.uk/2017/05/26/environment.svg"
        }, {
            n: 12,
            group: "Workers rights",
            highlight: "#B82266",
            image: false
        }
    ];


    for (var i = 0, len = questions.length; i < len; i++) {
        var question = questions[i];
        var d = headerContent[i];

        var questionText = question.querySelector('.atom-quiz__question-text');
        var questionAnswers = question.querySelector('.atom-quiz__answers');

        var header = document.createElement("div");
        header.setAttribute('class', 'question-header');

        var graphic = document.createElement("div");
        graphic.setAttribute('class', 'graphic');

        if (d['image']) {
            var image = document.createElement("img");
            image.setAttribute('class', 'illustration');
            image.setAttribute('src', d['image']);
            graphic.appendChild(image);
        }

        var bars = document.createElement('div');
        bars.setAttribute('class', 'bars');
        bars.innerHTML = '<div class="bar bar-1" style="background-color:'+d['highlight']+'"></div><div class="bar bar-2" style="background-color:'+d['highlight']+'"></div><div class="bar bar-3" style="background-color:'+d['highlight']+'"></div><div class="bar bar-4" style="background-color:'+d['highlight']+'"></div>';
        graphic.appendChild(bars);


        header.appendChild(graphic);
        question.insertBefore(header, questionAnswers);
        header.appendChild(questionText);
    }

    submitButton = document.createElement('div');
    submitButton.setAttribute('id', 'submit-answers');
    submitButton.innerText = 'Submit answers';
    var quizAtom = document.querySelector('.element-atom');
    quizAtom.appendChild(submitButton);

    submitButton.addEventListener('click', function() {
        if (submitButton.classList.contains('active')) {
            scoreQuiz();
            submitButton.classList.add('hidden')
        }
    });

    var labels = document.querySelectorAll('.element-atom label');
    for (var j = 0; j < labels.length; j++) {
        labels[j].addEventListener('click', function() {
            setTimeout(function() {
                updateSubmitButton();
            }, 100);
        })
    }


    setTimeout(function() {
        updateSubmitButton();
    }, 1000);
}


function scoreQuiz() {
    var resultKey = ([
        [['con'], ['libdem','green'], ['lab'], ['ukip']],
        [['con'], ['ukip'], ['lab','libdem'], ['green']],
        [['green'], ['lab'], ['ukip'], ['con'], ['libdem']],
        [['libdem'], ['con'], ['ukip'], ['lab'], ['green']],
        [['lab','green'], ['con'], ['green'], ['ukip']],
        [['green'], ['libdem'], ['con'], ['ukip'], ['lab']],
        [['ukip'], ['con'], ['lab'], ['green'], ['libdem']],
        [['lab green'], ['con'], ['ukip'], ['libdem']],
        [['libdem'], ['lab'], ['con'], ['green'], ['ukip']],
        [['ukip'], ['con'], ['lab','libdem'], ['green']],
        [['con'], ['lab'], ['green'], ['libdem']],
        [['ukip'], ['lab'], ['green'], ['con'], ['libdem']]
    ]);

    var points = {
        green: 0,
        lab: 0,
        libdem: 0,
        con: 0,
        ukip: 0
    }

    for (var q = 0; q < resultKey.length; q++) {
        var question = resultKey[q];
        var questionEl = document.querySelector('.atom-quiz__question:nth-child('+(q+1)+')');
        for (var a = 0; a < question.length; a++) {
            var answer = resultKey[q][a];
            var answerEl = questionEl.querySelector('.atom-quiz__answer:nth-child('+(a+1)+')');
            var inputEl = answerEl.querySelector('input:checked');
            if (inputEl) {
                for (var p = 0; p < answer.length; p++) {
                    var party = resultKey[q][a][p];
                    points[party] = points[party]+1;
                }
            }
        }
    }

    var sortedParties = Object.keys(points).sort(function(a, b) {
        return points[b] - points[a]
    });

    var totalPoints = 0;
    Object.keys(points).forEach(function(party) {
        totalPoints = totalPoints + points[party];
    });

    if (totalPoints > 9) {
        var result = sortedParties[0];

        var buckets = {
            con: {
                party: 'Conservative',
                description: 'You want a strong and stable country, a sensible and orderly Brexit, and a degree of vagueness when it comes to costed pledges'
            }, lab: {
                party: 'Labour',
                description: 'Renationalisation, heavy investment in the NHS and education, plus a “soft” Brexit: Corbyn’s Labour might be the best to suit your needs'
            }, libdem: {
                party: 'Liberal Democrat',
                description: 'Are you a Remain voter who believes in balancing the books, investing in the green economy, and raising tax to fund the NHS? The Lib Dems would like to hear from you'
            }, ukip: {
                party: 'Ukip',
                description: 'Brexit very much means Brexit; you are excited to take advantage of the economic opportunities that will come once Britain has left the EU'
            }, green: {
                party: 'Green',
                description: 'A four day week, a universal income, and massive investment in the green economy and public services: you and the Green party are a match made in heaven'
            }
        };

        var resultText = buckets[result];

        var resultElement = document.createElement('div');
        resultElement.classList.add('result-wrapper');
        resultElement.classList.add(result);
        resultElement.innerHTML = "<div class='heading'>You got " +resultText.party+ "</div><div class='desc'><p>"+resultText.description+"</p></div>";

        var quizAtom = document.querySelector('.element-atom');
        quizAtom.appendChild(resultElement);

    }

}


function updateSubmitButton() {
    var resultKey = ([
        [['con'], ['green'], ['lab'], ['ukip']],
        [['con'], ['ukip'], ['libdem'], ['green']],
        [['green'], ['lab'], ['ukip'], ['con'], ['libdem']],
        [['libdem'], ['con'], ['ukip'], ['lab'], ['green']],
        [['green'], ['con'], ['green'], ['ukip']],
        [['green'], ['libdem'], ['con'], ['ukip'], ['lab']],
        [['ukip'], ['con'], ['lab'], ['green'], ['libdem']],
        [['lab green'], ['con'], ['ukip'], ['libdem']],
        [['libdem'], ['lab'], ['con'], ['green'], ['ukip']],
        [['ukip'], ['con'], ['libdem'], ['green']],
        [['con'], ['lab'], ['green'], ['libdem']],
        [['ukip'], ['lab'], ['green'], ['con'], ['libdem']]
    ]);

    var points = {
        green: 0,
        lab: 0,
        libdem: 0,
        con: 0,
        ukip: 0
    }

    for (var q = 0; q < resultKey.length; q++) {
        var question = resultKey[q];
        var questionEl = document.querySelector('.atom-quiz__question:nth-child('+(q+1)+')');
        for (var a = 0; a < question.length; a++) {
            var answer = resultKey[q][a];
            var answerEl = questionEl.querySelector('.atom-quiz__answer:nth-child('+(a+1)+')');
            var inputEl = answerEl.querySelector('input:checked');
            if (inputEl) {
                for (var p = 0; p < answer.length; p++) {
                    var party = resultKey[q][a][p];
                    points[party] = points[party]+1;
                }
            }
        }
    }

    var totalPoints = 0;
    Object.keys(points).forEach(function(party) {
        console.log(party)
        console.log(points[party])
        totalPoints = totalPoints + points[party];
    });
    console.log(totalPoints);

    if (totalPoints > 9) {
        submitButton.classList.add('active');
    }

}
