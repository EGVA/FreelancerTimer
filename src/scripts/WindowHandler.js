const monitor = require('active-window');

async function getActiveWindow(log) {
    await monitor.getActiveWindow((window) => {
        try {
            if(log){
            console.log("App: " + window.app);
            console.log("Title: " + window.title);}
            return {app: window.app, title: window.title}
        } catch (err) {
            if(log){console.log(err);}
            return {app: null, title: null}
        }
    }, -1)    
}

export {getActiveWindow}