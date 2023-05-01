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
