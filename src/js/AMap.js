//window.AMap = undefined;
export default function MapLoader(plugins) {
  return new Promise(((resolve, reject) => {
    if(window.AMap){
      resolve(window.AMap);
    }else {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://webapi.amap.com/maps?v=1.4.15&key=fe4313b69108f2f33abad875868b5546&plugin=${plugins}&callback=initAMap";
      script.onerror = reject;
      document.head.appendChild(script);
    }
    window.initAMap = () => {
      resolve(window.AMap);
    }
  }))
}
