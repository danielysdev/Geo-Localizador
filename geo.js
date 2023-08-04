// output message

const ip = document.getElementById ('ip');
const locationIP = document.getElementById ('location');
const timezone = document.getElementById ('timezone');
const isp = document.getElementById ('isp');


//input mssage

const inputIP = document.getElementById ('inputIP');
const btnIP = document.getElementById ('btnIP');


const searchIP = (event) => {
    const geoApi = async(url) => {
        const dataGeo = await fetch (url);
        const resultData = await dataGeo.json();
        return resultData;
    }
    
    //para agregar el valor del imput se agrega el ${inputIp.value},se quito el calor que tenia el link de la pag web que era 8.8.8.8 y cambia la comilla por la que parece el acento invertido
    https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_9jNbggiMVS8t2uUdShPbMNgRWarMb&ipAddress=8.8.8.8

    geoApi(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_9jNbggiMVS8t2uUdShPbMNgRWarMb&ipAddress=${inputIP.value}`)
    .then((res) => {
        //con esto creo los valores sean dinamicos
        ip.innerText = res.ip;
        locationIP.innerText = res.location.city;
        timezone.innerText = res.location.timezone;
        isp.innerText = res.isp;
        
        const container= L.DomUtil.get('map');
        if (container != null) {
            container._leaflet_id = null;
        }
    
    
        let map = L.map('map').setView([res.location.lat, res.location.lng], 13);
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);


        L.marker([res.location.lat, res.location.lng], {
            icon: L.icon({
              iconUrl: './img/icon-location.svg',
              iconSize: [46, 56],
              iconAnchor: [12, 12],
              popupAnchor: [0, 0]
            })
          }).addTo(map);


        /*
        L.marker([res.location.lat, res.location.lng]).addTo(map)
        */
    })
    
    
    
    
    
    .catch((err) => console.log(err));
    
}



btnIP.addEventListener ('click', searchIP);