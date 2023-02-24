import React from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import {useContext} from 'react'



const MoreInfo = () => {
  const {id}=useParams();
  const {data}=useContext(AppContext);
  const country= data.find((country) => country.name === id);

  return (
    <>
    {country && 
      <Wrapper>
        <ImgBox>
          <img src={country.flag} alt='flag'/>
        </ImgBox>
      <InfoBox>
       <MainInfo>
           <h1>{country.name}</h1>
           <p>Population:{country.population}</p>
           <p>Region:{country.region}</p>
           <p>Sub Region:{country.subregion}</p>
           <p>Capital:{country.capital}</p>
       </MainInfo>
       <div>
          <div style={{display:'flex', gap:'10px'}}>Top level Domain:
            {
              country?.topLevelDomain?.map((item,index)=>(
                <p key={index}>{item}</p>
              ))
            } 
          </div>
          <div style={{display:'flex', gap:'10px'}}>Currencies:
            {
              country?.currencies?.map((item,index)=>(
                 <p key={index}>{item.name}</p>
              ))
            }
          </div>
          <div style={{display:'flex', gap:'10px'}}>Languages:
         {
          country?.languages?.map((item,index)=>(
               <p key={index}>{item.name}</p>
          ))
         } 
         </div>
       </div>
       </InfoBox> 
       <div style={{display:'flex', gap:'10px'}}>Border Countries:
          {
            country?.borders?.map((item,index)=>(
               <p key={index}>{item}</p>
            ))
          }
        </div> 
      </Wrapper> 
      }
    </>
  )
}

export default MoreInfo

const Wrapper=styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
`
const ImgBox=styled.div`
  width:500px;
 & img {
  width:100%;
 }
`
const InfoBox=styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  gap:50px;
`
const MainInfo=styled.div`
  
`

