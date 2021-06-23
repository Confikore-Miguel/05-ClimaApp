const axios = require('axios').default;
require('colors')

class Busquedas{


    historial = []

    constructor(){
        // TTdoo: leer db si existe 

    }
    get paramsMapBox (){
        return {
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    async ciudad ( lugar = '' ){
        try {
            // peticion http
            const intance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params:this.paramsMapBox
            })

            const respuesta = await intance.get();
            return respuesta.data.features.map( datos  =>({
                id: datos.id,
                nombre: datos.place_name,
                lng: datos.center[0],
                lat: datos.center[1]
            }));
        } catch (error) {
            return []; 
        }

    }
    async clima ( lat , lon){
        try {
            // 
            const intance = axios.create({
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params:{
                    'lat': lat ,
                    'lon': lon,
                    'appid':process.env.OPENWEATHER_KEY,
                    'units':'metric',
                    'lang':'es' 
                }
            })
            const respuesta = await intance.get();
            const cielo= respuesta.data.weather;
            const estadoClima = cielo[0].description;
            const {temp , temp_max ,temp_min } =respuesta.data.main;

            return {
                temperatura:temp,
                maximo:temp_max,
                minimo:temp_min,
                estado:`${estadoClima}`.green,
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial ( lugar = ''){
        // prevenir duplicados
        if( this.historial.includes( lugar)){
            return null;
        }
        this.historial = this.historial.splice(0,5);
        this.historial.unshift( lugar );
    }


}

module.exports= Busquedas;