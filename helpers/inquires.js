const inquirer = require('inquirer');
require('colors');
 

const preguntas=[
    {
        type:'list',
        name:'opcion',
        message:'¿Qué desea hacer?',
        choices:[
            {
                value: 1,
                name:"1".green+'. Buscar ciudad'
            },
            {
                value: 2,
                name:"2".green+'. Historial'
            },
            {
                value: 0,
                name:"0".green+'. Salir'
            }
        ]
    }
];


const inquirerMenu = async() =>{

    console.clear();
    console.log('========================='.green);
    console.log('  Seleciones una opción'.green);
    console.log('=========================\n'.green);
    
    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;

}
const pausa = async() =>{
    
    const question = [
        {
            value: 'input',
            name:'Enter',
            message:`Presione ${'ENTER'.green} para continuar.\n ` 
        }
    ]
    console.log('\n');
    await inquirer.prompt(question);

}

const leerInput = async(message)=>{
    const question =[
        {
            type:'input',
            name:'desc',
            message,
            validate(value){
                if ( value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc
}

const listaCiudades = async( lugares =[] ) => {

    const choices = lugares.map( (lugar,i) =>{

        const idx= `${i+1}`.green;
        return {
            value: lugar.id,
            name: `${idx}. ${lugar.nombre}`
        }
    })
    choices.unshift({
        value:'0',
        name:'0'.green+'. Cancelar'
    })
    const pregunta =[{
        type:'list',
        name: 'id',
        message: 'Seleccione',
        choices
    }]

    const { id } = await inquirer.prompt(pregunta);

    return id ;

}

const confirmar = async( message ) =>{
    const pregunta = [
        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    const { ok  } = await inquirer.prompt(pregunta);

    return ok ;

}

const mostrarCheckList = async( ciudades=[] ) => {

    const choices = ciudades.map( (ciudad,i) =>{

        const idx= `${i+1}`.green;
        return {
            value: ciudad.id,
            name: `${idx}. ${ciudad.nombre}`
        }
    })
    const pregunta =[{
        type:'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }]

    const { ids } = await inquirer.prompt(pregunta);

    return ids ;

}

module.exports={
    inquirerMenu,
    pausa,
    leerInput,
    listaCiudades,
    confirmar,
    mostrarCheckList
}