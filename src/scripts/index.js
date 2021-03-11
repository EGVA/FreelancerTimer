import { getActiveWindow } from './WindowHandler.js'

var activeWindow = { app: "", title: "" }

var firstLoop = true
var clockState = "STOPPED" // STOPPED PAUSED RUNNING 

var totalElapsedTime = { hours: 0, minutes: 0, seconds: 0 }

const playButton = document.querySelector("#clock-button-play");
const stopButton = document.querySelector("#clock-button-stop");
const clockDisplay = document.querySelector("#clock-display");

playButton.addEventListener('click', () => { playButtonHandler() })
stopButton.addEventListener('click', () => { StopButtonHandler() })

setInterval(() => { clockLoop() }, 1000);

function clockLoop() {
    if (firstLoop) {
        checkWindowLoop()
    }
    firstLoop = false

    switch (clockState) {
        case "STOPPED":
            break
        case "PAUSED":
            break
        case "RUNNING":
            addToAClockVariable(totalElapsedTime)
            clockDisplay.innerHTML = clockTextFormatter(totalElapsedTime)
            break
    }
}

// Check which window is open
function checkWindowLoop() {
    activeWindow = getActiveWindow(false)
    setTimeout(() => {
        checkWindowLoop()
    }, 1000);
}

function addToAClockVariable(clock) {
    if (clock.seconds == 59) {
        clock.seconds = 0
        if (clock.minutes == 59) {
            clock.minutes = 0
            clock.hours++
        } else
            clock.minutes++
    } else
        clock.seconds++
}

function clockTextFormatter(clock) {
    let hoursText = clock.hours <= 9 ? "0" + clock.hours.toString() : clock.hours.toString()
    let minuteText = clock.minutes <= 9 ? "0" + clock.minutes.toString() : clock.minutes.toString()
    let secondsText = clock.seconds <= 9 ? "0" + clock.seconds.toString() : clock.seconds.toString()

    return hoursText + ":" + minuteText + ":" + secondsText
}

function playButtonHandler() {
    switch (clockState) {
        case "RUNNING":
            clockState = "PAUSED"
            playButton.innerHTML = `<i class="fas fa-play"></i>`
            clockDisplay.className = `paused`
            break;
        case "PAUSED":
            clockState = "RUNNING"
            clockDisplay.className = `running`
            playButton.innerHTML = `<i class="fas fa-pause"></i>`
            break;
        case "STOPPED":
            clockState = "RUNNING"
            clockDisplay.className = `running`
            playButton.innerHTML = `<i class="fas fa-pause"></i>`
            break;
    }
}

function StopButtonHandler(){
    clockState = "PAUSED"
    var c = confirm("Tem certeza que deseja resetar TODOS valores?" )
    if(c == true){
        totalElapsedTime = {hours: 0, minutes: 0, seconds: 0}
        playButton.innerHTML = `<i class="fas fa-play"></i>`
        clockDisplay.innerHTML = clockTextFormatter(totalElapsedTime)

        clockState = "STOPPED"
    }
    else{
        clockState = "RUNNING"
        return
    }
}