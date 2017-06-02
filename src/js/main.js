import reqwest from 'reqwest'
import mainHTML from './text/main.html!text'
import share from './lib/share'


var shareFn = share('Interactive title', 'http://gu.com/p/URL', '#Interactive');
var el;
var data;
var comingSoonIndex = 0;

export function init(dom, context, config, mediator) {
    var context = document;
    var questions = context.querySelectorAll('.atom-quiz__question');

    var data = [
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
        var d = data[i];

        console.log('question', question);

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

    var submitButton = document.createElement('div');
    submitButton.setAttribute('id', 'submit-answers');
    submitButton.innerText = 'Submit answers';
    var quizAtom = document.querySelector('.element-atom');
    quizAtom.appendChild(submitButton);

}
