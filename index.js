require('dotenv').config()
require('colors')

const { guardarEnDb, leerDb } = require('./db/guardardb');
const { inquirerMenu, pausa, leerInput, listaCiudades } = require('./helpers/inquires');
const Busquedas = require('./models/busquedas');


const main = async() => {

    const busquedas = new Busquedas();
    let opt;    
    const  historial= leerDb();
    if ( historial ){
         busquedas.historial = historial; 
    }
    do {

        opt = await inquirerMenu();
         switch (opt) {
             case 1:
                // Mostrar mesajes 
                const termino = await leerInput('Ciudad: ');
                // Buscar lugares
                const lugares = await busquedas.ciudad(termino);
                // Seleccionar lugar
                const id =  await listaCiudades(lugares);
                if ( id === '0') continue;
                const {nombre, lat , lng } = lugarSel = lugares.find( l => l.id ===id);
                // Guardar DB
                busquedas.agregarHistorial( nombre );
                // Clima
                const clima = await busquedas.clima(lat , lng);
                const { temperatura,maximo,minimo,estado } = clima; 
                // Mostrar resultodos 
                 console.clear();
                 console.log('\nInformacion de la ciudad\n'.green,);
                 console.log('Ciudad: ',`${nombre}`.green);
                 console.log('Lat:',lat);
                 console.log('Lng:',lng);
                 console.log('Estado del clima: ',estado);
                 console.log('Temperatura: ',temperatura);
                 console.log('Minima: ',minimo);
                 console.log('Maxima: ',maximo);

                 break;
             case 2:
                 busquedas.historial.forEach(( lugar, i) =>{
                     const inx= `${ i + 1 }`.green;
                     console.log(`${inx}. ${ lugar}`);
                 })
                 break;
             default:
                 break;
         }

        guardarEnDb(busquedas.historial);
        await pausa();
    } while (opt !== 0);
}

main();