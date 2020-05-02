import React,{useEffect,useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda'
import useCriptoMoneda from '../hooks/useCriptomoneda'
import Axios from 'axios'
import Error from './Error'

const Boton=styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFF;
    transition:background-color .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer
    }
`;

const Formulario = ({guardarCriptoMoneda,guardarMoneda}) => {
    //state del form
    const[listacripto,guardarCriptoMonedas]=useState([]);
    const[error,guardarError]=useState(false);


    const MONEDAS=[
        {codigo:'ARS',nombre:'Peso Argentino'},
        {codigo:'USD',nombre:'Dolar de Estados Unidos'},
        {codigo:'EUR',nombre:'Euro'},
        {codigo:'GBP',nombre:'Libra Esterlina'},
        {codigo:'MXN',nombre:'Peso Mexicano'},
        {codigo:'COD',nombre:'Peso colombiano'}
    ]

    //use moneda
    const[moneda,SelectMonedas]=useMoneda('Elige tu moneda','',MONEDAS);
    //utlizico usecripto
    const[criptomoneda,SelectCripto]=useCriptoMoneda('Elige tu CriptoMoneda','',listacripto);

    //ejecutar consulta a la api:
    useEffect(()=>{
        const consultarAPI= async ()=>{

            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado=await Axios.get(url);
            
            guardarCriptoMonedas(resultado.data.Data);
        }
        consultarAPI()
    }, [])

    //submit
    const cotizarMoneda=e=>{
        e.preventDefault();

        //valido
        if(moneda.trim()===''||criptomoneda.trim()===''){
            guardarError(true);
            return;
        }
        //pasar los datos al componente principal:
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptoMoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error?<Error mensaje="Todos los campos son obligatorios"/>:null}
            <SelectMonedas/>
            
            <SelectCripto/>
            <Boton
            type="submit"
            value="Calcular"
            />
        </form>
     );
}
 
export default Formulario;