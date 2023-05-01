let map;
let marker;

let center = {lat: -6.577989, lng: -38.597960 }; 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: map,
      position: center,
      draggable: true
  }); 

  map.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      map.setCenter(marker.position);
  });if(document.getElementById('form')){
    map = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 14,
    });
  
    marker = new google.maps.Marker({
        map: map,
        position: center,
        draggable: true
    }); 
  
    map.addListener("click", (evt) => {
      addMarker(evt);
    });

  } if(document.getElementById('exibir')){
    listar(google.maps)
  }
}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}

async function salvar(){

    const obj = {
        nome: document.getElementById('nome').value,
        local: document.getElementById('local').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };
    await fetch("http://localhost:8080/eventos",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Salvo com sucesso')})
    .catch(error => alert('Falha ao salvar!'));    

}
async function listar(maps){

    fetch('http://localhost:8080/encontrarEvento')
    .then((response) => response.json()).then((dados) => {
    const marcar = dados;
    const ul = document.getElementById('exibir')
    let infoWindow = new maps.InfoWindow();
    marcar.forEach(marcar => {
      const li = document.createElement('li');
      const h3 = document.createElement('h3');
      const p = document.createElement('p');
      ul.appendChild(li);
      li.appendChild(h3);
      li.appendChild(p);
      h3.textContent=marcar.nome;
      p.textContent=marcar.local;
      const latLng = new maps.LatLng(
        marcar.geometria.coordinates[1],
        marcar.geometria.coordinates[0]
      );
  
      let marker = new maps.Marker({
        position: latLng,
        map: map,
      });
  
      marker.addListener('click', () => {
        infoWindow.close();
        infoWindow.setContent(marcar.nome);
        infoWindow.open(marker.getMap(), marker);
      });
  
      map.addListener('click', () => {
        infoWindow.close();
      });
    });
    })}
    window.initMap = initMap;