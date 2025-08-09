const stopId = [];
const stopName = [];
const stopLat = [];
const stopLon = [];
const dayTrips = [];
const allTrips = [];
const depTimes = [];
const headsigns = [];

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
          data = data.substr(data.indexOf(";") + 2);
          data = data.substr(0, data.indexOf("]"));
          depTimes.push(data.split(", "));
          data = data.substr(data.indexOf(";") + 2);
          data = data.substr(0, data.indexOf("]"));
          headsigns.push(data.split(", "));
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
      document.getElementById("24trips").innerHTML += (depTimes[i].length);

      var dayFreqTrips = 0;

      for (let j = 0; j < depTimes[i].length; j++)
      {
        //if (j == (depTimes[i].length - 1))
        //{
          document.getElementById("deptimes").innerHTML += (depTimes[i][j] + ": " + headsigns[i][j] + "<br>");
        /*}
        else
        {
          document.getElementById("deptimes").innerHTML += (depTimes[i][j] + ", ");
        }*/

        if (parseInt(depTimes[i][j].substr(0, 2)) >= 6 && parseInt(depTimes[i][j].substr(0, 2)) < 20)
        {
          dayFreqTrips += 1;
        }
      }

      var dayFreq = Math.round(((14 / dayFreqTrips) * 60) * 100) / 100;
      document.getElementById("daytime").innerHTML += (dayFreq + " minutes");
    }
  }
}