import React from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import {useContext} from 'react'


const MoreInfo = () => {
  const {id}=useParams();
  const data=useContext(AppContext);
  const country:any = data.find((country:any) => country.name === id);

  return (
    <>
      <div>
        <div>
          ImgBox
        </div>
      <div>
       <div>
        <h1>{country.name}</h1>
        <p>Population:{country.population}</p>
        <p>Region:{country.region}</p>
        <p>Sub Region</p>
        <p>Capital:{country.capital}</p>
       </div>
       <div>
        <p>Top level Domain</p>
        <p>EURO</p>
        <p>Languages</p>
       </div>
       </div> 
      </div>
    </>
  )
}

export default MoreInfo