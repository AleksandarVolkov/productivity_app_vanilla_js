let nav = 0;
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const calendar = document.getElementById('calendar');
const weekdays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];

function load(){
    console.log('------------------------------------')
    const dt = new Date();
    monthIncrement = new Date();
    monthIncrement.setDate(15);
    monthIncrement.setMonth(new Date().getMonth() + nav);
    const day = dt.getDate();
    const month = monthIncrement.getMonth();
    const year = monthIncrement.getFullYear();


    const dateee = monthIncrement.getDate();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us',{
        weekday: 'long',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);
    
    document.getElementById('monthDisplay').innerText = `${monthIncrement.toLocaleDateString('en-us', {month: 'long'})} ${year}`;

    calendar.innerHTML = '';
    console.log('NAV EQUALS TO:', nav);
    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('div');
        daySquare.classList.add('day');

        if(i > paddingDays){
            daySquare.innerText = i - paddingDays;

            daySquare.addEventListener('click', () => console.log('click'));
        } else {
            daySquare.classList.add('padding');
        }
        calendar.appendChild(daySquare);

    }
    if(nav < 0){
        document.getElementById('nextToCurrentMonth').parentElement.classList.remove('hidden');
        document.getElementById('nextToCurrentMonth').parentElement.classList.remove('from-left-trans');
    }else if(nav > 0){
        document.getElementById('previousToCurrentMonth').parentElement.classList.remove('hidden');
        document.getElementById('previousToCurrentMonth').parentElement.classList.remove('from-right-trans');
    }else{
        document.getElementById('nextToCurrentMonth').parentElement.classList.add('hidden');
        document.getElementById('previousToCurrentMonth').parentElement.classList.add('hidden');
        document.getElementById('previousToCurrentMonth').parentElement.classList.add('from-right-trans');
        document.getElementById('nextToCurrentMonth').parentElement.classList.add('from-left-trans');
    }
}

function initButtons() {
    document.getElementById('nextButton').addEventListener('click', () => {
        nav++;
        load();
    });
    document.getElementById('previousButton').addEventListener('click', () => {
        nav--;
        load();
    });
    document.getElementById('previousToCurrentMonth').addEventListener('click', () => {
        nav = 0;
        load();
    });
    document.getElementById('nextToCurrentMonth').addEventListener('click', () => {
        nav = 0;
        load();
    });
}

initButtons();
load();
