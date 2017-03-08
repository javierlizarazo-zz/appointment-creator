'use strict';

var currentDate = new Date(),
    curentHour = currentDate.getHours(),
    curentMinutes = currentDate.getMinutes();

// Time Picker
var timePicker = document.getElementById('time-picker');

function initTime(val, quarters, selectedIndex) {
  var end_time = 23,
      time = '00:00',
      type = ' AM',
      minutes,
      setTime,
      newVal;
  for(var x = val; x <= end_time; x++){

    if(x == 12) {
      type = ' PM';
    }

    if(x > 12) {
      newVal = x % 12;
      type = ' PM';
    } else {
      newVal = x;
    }

    if(quarters > 45) {
      quarters = 0;
      newVal = x + 1;
    }

    // add +15
    for(var q = quarters; q <= 45; q += 15) {
      minutes = q == 0 ? q + '0' : q;

      setTime = newVal + ':' + minutes + type;

      timePicker.options[timePicker.options.length] = new Option(setTime, setTime);

      if(q == 45){
        quarters = 0;
      }
    }
  }
  timePicker.selectedIndex = selectedIndex;
}

initTime(0, 0, 48);

// Action buttons
var showDate = document.getElementById('date'),
    showTime = document.getElementById('time'),
    createdMessage = document.getElementsByClassName('created-message')[0],
    errorMessage = document.getElementsByClassName('error')[0];

function saveData(){
  var dateInput = document.getElementById('date-input').value,
      timeInput = document.getElementById('time-picker').value;


  if(dateInput == ''){
    errorMessage.style.display = 'block';
  } else {
    showDate.innerHTML = dateInput;
    showTime.innerHTML = timeInput;
    errorMessage.style.display = 'none';
    createdMessage.style.display = 'block';
  }
}

function cancelData(){
  showDate.innerHTML = '';
  showTime.innerHTML = '';
  createdMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  timePicker.selectedIndex = 48;
  document.getElementById('any').checked = true;
  filters();
  timePicker.options.length = 0;
  initTime(0, 0, 48);
}

function filters(){
  var form = document.getElementById('filters'),
      selected = form.elements['filter'].value;

  createdMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  timePicker.options.length = 0;
  initTime(0, 0, 48);

  if(selected == 'weekdays') {
    flatpickr('.date-picker', {
        disable: [
            function (date) {
                return date.getDay() === 0 || date.getDay() === 6; // disable weekends
            }
        ],
        wrap: true,
    	  clickOpens: false,
        dateFormat: 'd/m/Y',
        minDate: currentDate,
        disableMobile: true,
        static: true,
        onChange: function(selectedDates, dateStr, instance) {
          changeDate(dateStr);
        }
    });
  } else if(selected == 'weekends') {
    flatpickr('.date-picker', {
        disable: [
            function (date) {
                return date.getDay() >= 1 && date.getDay() <= 5; // disable weekdays
            }
        ],
        wrap: true,
    	  clickOpens: false,
        dateFormat: 'd/m/Y',
        minDate: currentDate,
        disableMobile: true,
        static: true,
        onChange: function(selectedDates, dateStr, instance) {
          changeDate(dateStr);
        }
    });
  } else {
    flatpickr('.date-picker', {
        wrap: true,
        clickOpens: false,
        dateFormat: 'd/m/Y',
        minDate: currentDate,
        disableMobile: true,
        static: true,
        onChange: function(selectedDates, dateStr, instance) {
          changeDate(dateStr);
        }
    });
  }
}

// Date Picker
flatpickr('.date-picker', {
    wrap: true,
	  clickOpens: false,
    dateFormat: 'd/m/Y',
    minDate: currentDate,
    disableMobile: true,
    static: true,
    onChange: function(selectedDates, dateStr, instance) {
      changeDate(dateStr);
    }
});

function changeDate(dateStr) {
  var curentDay = currentDate.getDate(),
      curentMonth = currentDate.getMonth()+1,
      curentYear = currentDate.getFullYear();

  createdMessage.style.display = 'none';
  errorMessage.style.display = 'none';

  if(curentDay < 10) {
      curentDay='0'+curentDay;
  }

  if(curentMonth < 10) {
      curentMonth='0'+curentMonth;
  }

  var today = curentDay + '/' + curentMonth + '/' + curentYear;

  timePicker.options.length = 0;

  if(dateStr == today) {
    var roundMinutes = Math.ceil(curentMinutes / 15) * 15;
    initTime(curentHour, roundMinutes, 0);
  } else {
    initTime(0, 0, 48);
  }
}
