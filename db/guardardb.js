const fs = require('fs');

const extencion ='./db/historial.json'
const guardarEnDb = async( lugar )=>{
    if( !lugar.includes(lugar)){
        fs.writeFileSync(extencion, JSON.stringify(lugar));
    }
}
 const leerDb = ( )=>{
     
    if( !fs.existsSync(extencion)){
        return null ;
    }
    const info = fs.readFileSync(extencion, {encoding: 'utf-8'});
    const data = JSON.parse( info);
    return data;
 } 

module.exports= {
    guardarEnDb,
    leerDb
}