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
    geoApi(`https://geo.ipify.org/api/v2/country,city?apiKey=at_7YNnrt5gTvVQniS4ncpyp4h3tO9zb&ipAddress=${inputIP.value}`)
    .then((res) => {
        //con esto creo los valores sean dinamicos
        ip.innerText = res.ip;
        locationIP.innerText = res.location.city;
        timezone.innerText = res.location.timezone;
        isp.innerText = res.isp;
    
    
    
        let map = L.map('map').setView([res.location.lat, res.location.lng], 13);
    
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    })
    
    
    
    
    
    .catch((err) => console.log(err));
    
}



btnIP.addEventListener ('click', searchIP);