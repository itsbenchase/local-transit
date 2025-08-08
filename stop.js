function funct()
{
  const parsedUrl = new URL(document.URL);
  console.log(parsedUrl);

  const paramName = 'stop';
  const result = parsedUrl.searchParams.get(paramName);

  const testAgencyUrl = ("https://localtransit.app/wrta.txt"); // provide file location
    fetch(testAgencyUrl)
      .then(r => r.text())
      .then((text) => {
        const agencyUrlFile = text.split("\n");
        agencyUrlFile.pop();

        const stopId = [];
        const stopName = [];
        const stopLat = [];
        const stopLon = [];
        const dayTrips = [];
        const allTrips = [];

        for (let i = 0; i < agencyUrlFile.length; i++)
        {
          var data = agencyUrlFile[i];
          data = data.substr(data.indexOf(";") + 1);
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

        for (let i = 0; i < stopId.length; i++)
        {
          if (stopId[i] == result)
          {
            document.getElementById("stop").innerHTML += (stopName[i] + " (" + stopId[i] + ")");
            document.getElementById("name").innerHTML += (stopName[i]);
            document.getElementById("location").innerHTML += (stopLat[i] + ", " + stopLon[i]);
            var dayFreq = (14 / dayTrips[i]) * 60;
            document.getElementById("daytime").innerHTML += (dayFreq);
            document.getElementById("24trips").innerHTML += (allTrips[i]);
          }
        }
      })
}