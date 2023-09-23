function updateClock() {
  var now = new Date();
  var dayName = now.getDay(),
    mo = now.getMonth(),
    dnum = now.getDate(),
    yr = now.getFullYear(),
    h = now.getHours(),
    m = now.getMinutes(),
    s = now.getSeconds(),
    pe = "AM";

  if (h == 0) {
    h = 12;
  } else {
    h = h - 12;
    pe = "PM";
  }
  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  }
  var months = ["January,", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weeks = ["Sunday,", "Monday,", "Tuesday,", "Wednesday,", "Thursday,", "Friday,", "Saturday,"];
  var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
  var values = [weeks[dayName], months[mo], dnum.pad(2), yr, h.pad(2), m.pad(2), s.pad(2), pe];

  for (let index = 0; index < ids.length; index++) {
    document.getElementById(ids[index]).firstChild.nodeValue = values[index];

  }

}

function initClock() {
  updateClock();
  window.setInterval("updateClock()", 1);
}


// set our variables
var time, alarm, currentH, currentM,
  activeAlarm = false,
  sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");


// loop alarm
sound.loop = true;

// define a function to display the current time
function displayTime() {
  var now = new Date();
  time = now.toLocaleTimeString();
  clock.textContent = time;
  // time = "1:00:00 AM";
  // watch for alarm
  if (time === alarm) {
    sound.play();

    // show snooze button
    snooze.className = "";
  }
  setTimeout(displayTime, 1000);
}
displayTime();

function addMinSecVals(id) {
  var select = id;
  var min = 59;

  for (i = 0; i <= min; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i < 10 ? "0" + i : i);
  }
}
function addHours(id) {
  var select = id;
  var hour = 12;

  for (i = 1; i <= hour; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
  }
}
addMinSecVals(minutes);
addMinSecVals(seconds);
addHours(hours);

// set and clear alarm
startstop.onclick = function () {
  // set the alarm
  if (activeAlarm === false) {
    hours.disabled = true;
    minutes.disabled = true;
    seconds.disabled = true;
    ampm.disabled = true;

    alarm = hours.value + ":" + minutes.value + ":" + seconds.value + " " + ampm.value;
    this.textContent = "Clear Alarm";
    activeAlarm = true;
  } else {
    // clear the alarm
    hours.disabled = false;
    minutes.disabled = false;
    seconds.disabled = false;
    ampm.disabled = false;

    sound.pause();
    alarm = "00:00:00 AM";
    this.textContent = "Set Alarm";

    // hide snooze button
    snooze.className = "hide";
    activeAlarm = false;
  }
};

// snooze for 5 minutes
snooze.onclick = function () {
  if (activeAlarm === true) {
    // grab the current hour and minute
    currentH = time.substr(0, time.length - 9);
    currentM = time.substr(currentH.length + 1, time.length - 8);

    if (currentM >= "55") {
      minutes.value = "00";
      hours.value = parseInt(currentH) + 1;
    } else {
      if (parseInt(currentM) + 5 <= 9) {
        minutes.value = "0" + parseInt(currentM + 5);
      } else {
        minutes.value = parseInt(currentM) + 5;
      }
    }

    // hide snooze button
    snooze.className = "hide";

    // now reset alarm
    startstop.click();
    startstop.click();
  } else {
    return false;
  }
};