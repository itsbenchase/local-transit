const tripId = [];
const tripRoute = [];
const tripHeadsign = [];
const tripStart = [];
const tripStopIds = [];
const tripStopTimes = [];

var result = "no data";

function funct()
{
  const parsedUrl = new URL(document.URL);
  console.log(parsedUrl);

  const paramName = 'trip';
  result = parsedUrl.searchParams.get(paramName);

  var fips = result.substr(0, 5);
  result = result.substr(5);
  console.log(result);

  const testAgencyUrl = ("https://www.localtransit.app/" + fips + "_trips.txt"); // provide file location
    fetch(testAgencyUrl)
      .then(r => r.text())
      .then((text) => {
        const agencyUrlFile = text.split("\n");
        agencyUrlFile.pop();

        for (let i = 0; i < agencyUrlFile.length; i++)
        {
          var data = agencyUrlFile[i];
          tripId.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          tripRoute.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          tripHeadsign.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          tripStart.push(data.substring(0, data.indexOf(";")));
          data = data.substr(data.indexOf(";") + 1);
          var dataIds = data.substr(1, data.indexOf("]") - 1);
          tripStopIds.push(dataIds.split(", "));
          data = data.substr(data.indexOf(";") + 2);
          data = data.substr(0, data.length - 1);
          tripStopTimes.push(data.split(", "));
        }

        findTrip(result)
      })
}

function findTrip(result)
{
  for (let i = 0; i < tripId.length; i++)
  {
    if (tripId[i] == result)
    {
      document.getElementById("route").innerHTML += (tripRoute[i]);
      document.getElementById("start").innerHTML += (tripStopTimes[i][0]);

      for (let j = 0; j < tripStopTimes[i].length; j++)
      {
        document.getElementById("stops").innerHTML += ("<br>" + tripStopTimes[i][j] + ": " + tripStopIds[i][j]);
      }
    }
  }
}