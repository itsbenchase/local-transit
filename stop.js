const stopId = [];
const stopName = [];
const stopLat = [];
const stopLon = [];
const dayTrips = [];
const allTrips = [];

var result = "nah";

function funct()
{
  const parsedUrl = new URL(document.URL);
  console.log(parsedUrl);

  const paramName = 'stop';
  result = parsedUrl.searchParams.get(paramName);

  console.log(result);

  const testAgencyUrl = ("https://www.localtransit.app/wrta.txt"); // provide file location
    fetch(testAgencyUrl)
      .then(r => r.text())
      .then((text) => {
        const agencyUrlFile = text.split("\n");
        agencyUrlFile.pop();

        for (let i = 0; i < agencyUrlFile.length; i++)
        {
          var data = agencyUrlFile[i];
          stopId.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          stopName.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          stopLat.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          stopLon.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          dayTrips.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          allTrips.push(data);
        }

        findStop(result)
      })
}

function findStop(result)
{
  for (let i = 0; i < stopId.length; i++)
  {
    if (stopId[i] == result)
    {
      document.getElementById("name").innerHTML += (stopName[i]);
      document.getElementById("location").innerHTML += (stopLat[i] + ", " + stopLon[i]);
      var dayFreq = Math.round(((14 / dayTrips[i]) * 60) * 100) / 100;
      document.getElementById("daytime").innerHTML += (dayFreq + " minutes");
      document.getElementById("24trips").innerHTML += (allTrips[i]);
    }
  }
}