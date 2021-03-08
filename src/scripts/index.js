import { getActiveWindow } from './WindowHandler.js'

var activeWindow = { app: "", title: "" }
var firstLoop = true

setInterval(()=>{clockLoop()}, 1000);


function clockLoop(){
    if(firstLoop){
        checkWindow()
    }
        firstLoop = false
}

function checkWindow(){
    activeWindow = getActiveWindow(false)
    setTimeout(() => {
        checkWindow()
    }, 1000);
}