


const log = document.getElementById('log');

let isTracking = false;
let trackingIntervalId;
let currentData;

onmessage = function(e) {k = () => {
  startTrack();
}
  
/*  downloadBtn.style.display = 'inline-block';

  if (isTracking) {
    stopTrack();
  } else {
    startTrack();
  }
}*/
                        }
downloadBtn.onclick = () => {
  download('tuttifrutti.json', JSON.stringify(currentData));
}

function stopTrack() {
  isTracking = false;
  window.clearInterval(trackingIntervalId)
}

function startTrack() {
  var interval = document.getElementById('interval').value * 1000;
  //  const interval = document.getElementById('interval').getAttribute('value');
  if (interval > 0) {
    currentData = [];
    trackingIntervalId = window.setInterval(() => {
      collectEntry();
      log.innerText = currentData.slice(-10).map(JSON.stringify).reverse().join(',\n');
    }, interval);
  }
  isTracking = true;
}

function collectEntry() {
  navigator.geolocation.getCurrentPosition(position => {
    currentData.push(toObj(position.coords.latitude + " - " + position.coords.longitude + " - " + Date(position.coords.timestamp).toString()))
  });
  return;
}


function toObj(obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  const tmp = (obj instanceof Array) ? [] : {};
  for (const key in obj) {
    tmp[key] = toObj(obj[key]);
  }
  return tmp;
}

function download(filename, stringData) {
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(stringData));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

