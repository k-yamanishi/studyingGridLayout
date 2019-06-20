var map = undefined;
var i = undefined;
var layer = undefined;
var assetLayerGroup = undefined;
var e = undefined;
var f = undefined;

function init() {
  //地図を表示するdiv要素のidを設定
  map = L.map('mapcontainer');
  // 地図の中心とズームレベルを指定
  map.setView([35.40, 136], 5); //.setView([緯度, 経度], ズームレベル)
  // 表示するタイルレイヤのURLとAttributionコントロールの記述を設定して、地図に追加する
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { //ModalImageLinenupからコピーした
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, '
  }).addTo(map);
  assetLayerGroup = new L.LayerGroup();
  e = document.getElementById("ken");
  f = document.getElementById("bousai");

}

function onButtonClick() {
  assetLayerGroup.clearLayers();
  for (i = 0; i < 16; i++) {
    if (document.chbox.elements[i].checked) {
      setMapCash('hinanzyo', document.chbox.elements[i].value);

    }
  }
  console.log(assetLayerGroup)
  assetLayerGroup.addTo(map)
}

function getFukuiBound() {
  let corner1 = L.latLng(35.33977, 135.31036);
  let corner2 = L.latLng(36.35606, 136.72073);
  return L.latLngBounds(corner1, corner2);
}

function setMapCash(mapnm, layernm) {
  layer = L.tileLayer.wms('http://172.16.1.204:20080/mapcache/', {
    //crs:L.CRS.EPSG3857,//that's what I would like to
    layers: layernm,
    tileSize: 512,
    format: 'image/png',
    // attribution: '',
    // maxZoom: 18
    //pane:"bousaiPane",
    transparent: true,
    version: '1.3.0',
    bounds: getFukuiBound()
  });
  assetLayerGroup.addLayer(layer);
}

function zenkenHyozi() {
  if (document.cbox.elements[0].checked) {
    for (i = 0; i < 16; i++) {
      document.chbox.elements[i].checked = true;
    }
  } else {
    for (i = 0; i < 16; i++) {
      document.chbox.elements[i].checked = false;
    }
  }
}

function syoryaku() {
  if (e.style.display == "none") {
    e.style.display = "block";
    document.getElementById("plus").innerHTML = "－";
  } else {
    e.style.display = "none";
    document.getElementById("plus").innerHTML = "＋";
  }
}

function syoryakubtn() {
  if (f.style.display == "none") {
    f.style.display = "block";
  } else {
    f.style.display = "none";
  }
}

function clearLayer() {
  for (i = 0; i < 16; i++) {
    document.chbox.elements[i].checked = false;
  }
}
