const stopId = [];
const stopName = [];
const depTimes = [];
const headsigns = [];
const stopTrips = [];
const stopRoutes = [];

var result = "no data";

function funct()
{
  const parsedUrl = new URL(document.URL);
  console.log(parsedUrl);

  const paramName = 'stop';
  result = parsedUrl.searchParams.get(paramName);

  fips = result.substr(0, 5);
  result = result.substr(5);
  console.log(result);

  const testAgencyUrl = ("https://www.localtransit.app/" + fips + "_stops.txt"); // provide file location
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
          var dataTimes = data.substr(1, data.indexOf("]") - 1);
          depTimes.push(dataTimes.split(", "));
          data = data.substr(data.indexOf(";") + 1);
          var dataHead = data.substr(1, data.indexOf("]") - 1);
          headsigns.push(dataHead.split(", "));
          data = data.substr(data.indexOf(";") + 1);
          var dataTrips = data.substr(1, data.indexOf("]") - 1);
          stopTrips.push(dataTrips.split(", "));
          data = data.substr(data.indexOf(";") + 2);
          data = data.substr(0, data.length - 1);
          stopRoutes.push(data.split(", "));
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
      document.getElementById("24trips").innerHTML += (depTimes[i].length);

      var dayFreqTrips = 0;

      console.log(depTimes[i].length + ", " + headsigns[i].length + ", " + stopTrips[i].length + ", " + stopRoutes[i].length);

      for (let j = 0; j < depTimes[i].length; j++)
      {
        document.getElementById("deptimes").innerHTML += ("<br><a href=trip.html?trip=" + fips + stopTrips[i][j] + ">" + depTimes[i][j] + ": " + stopRoutes[i][j] + " - " + headsigns[i][j] + "</a>");

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