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
  // assetLayerGroup = new L.LayerGroup();
  // e = document.getElementById("ken");
  // f = document.getElementById("bousai");
}

// function onButtonClick() {
//   assetLayerGroup.clearLayers();
//   for (i = 0; i < 16; i++) {
//     if (document.chbox.elements[i].checked) {
//       setMapCash('hinanzyo', document.chbox.elements[i].value);
//
//     }
//   }
//   console.log(assetLayerGroup)
//   assetLayerGroup.addTo(map)
// }

// function getFukuiBound() {
//   let corner1 = L.latLng(35.33977, 135.31036);
//   let corner2 = L.latLng(36.35606, 136.72073);
//   return L.latLngBounds(corner1, corner2);
// }
//
// function setMapCash(mapnm, layernm) {
//   layer = L.tileLayer.wms('http://172.16.1.204:20080/mapcache/', {
//     //crs:L.CRS.EPSG3857,//that's what I would like to
//     layers: layernm,
//     tileSize: 512,
//     format: 'image/png',
//     // attribution: '',
//     // maxZoom: 18
//     //pane:"bousaiPane",
//     transparent: true,
//     version: '1.3.0',
//     bounds: getFukuiBound()
//   });
//   assetLayerGroup.addLayer(layer);
// }

// function zenkenHyozi() {
//   if (document.cbox.elements[0].checked) {
//     for (i = 0; i < 16; i++) {
//       document.chbox.elements[i].checked = true;
//     }
//   } else {
//     for (i = 0; i < 16; i++) {
//       document.chbox.elements[i].checked = false;
//     }
//   }
// }
//
// function syoryaku() {
//   if (e.style.display == "none") {
//     e.style.display = "block";
//     document.getElementById("plus").innerHTML = "－";
//   } else {
//     e.style.display = "none";
//     document.getElementById("plus").innerHTML = "＋";
//   }
// }
//
// function syoryakubtn() {
//   if (f.style.display == "none") {
//     f.style.display = "block";
//   } else {
//     f.style.display = "none";
//   }
// }
//
// function clearLayer() {
//   for (i = 0; i < 16; i++) {
//     document.chbox.elements[i].checked = false;
//   }
// }

var option = {
  "enableHighAccuracy": true,
  "timeout": 10000,
  "maximumAge": 0,
};

//ユーザーの現在の位置情報を取得
navigator.geolocation.watchPosition(successCallback, errorCallback, option);


/***** ユーザーの現在の位置情報を取得 *****/
//positionオブジェクトのcoords属性から緯度・経度・高度などの値を取得
function successCallback(position) {
  var setLatitude = position.coords.latitude; //緯度
  var setDegrees = position.coords.longitude; //経度

  var mpoint = [setLatitude, setDegrees];
  // alert(mpoint);
  //IEだと, 36.8736,137.4532
  //あるサイトでは、36.111155 , 136.274739
  //google,chromeだと36.1111552,136.2747392 丸岡に飛びますよ
  //本当は..36.040599,136.228725
  L.marker(mpoint, {
    title: "現在位置"
  }).addTo(map);

  //緯度経度を表示
  var location = "<li>" + "緯度：" + position.coords.latitude + "</li>";
  location += "<li>" + "経度：" + position.coords.longitude + "</li>";
  document.getElementById("location").innerHTML = location;

console.log(mpoint);

}

/***** 位置情報が取得できない場合 *****/
// 位置情報の取得時のエラーコードを、code属性で取得
function errorCallback(error) {
  var err_msg = "";
  switch (error.code) {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
}
