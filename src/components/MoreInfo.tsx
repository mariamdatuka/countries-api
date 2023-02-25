import React from 'react'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { AppContext } from '../App';
import {useContext} from 'react'
import Theme from './Theme/Theme';


const MoreInfo = () => {
  const {id}=useParams();
  const {data,lightTheme}=useContext(AppContext);
  const country= data.find((country) => country.name === id);

  return (
    <>
   <Theme/> 
    {country && 
      <Wrapper>
        <ImgBox>
          <img src={country.flag} alt='flag'/>
        </ImgBox>
     <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>  
      <InfoBox>
       <MainInfo>
           <h1>{country.name}</h1>
           <p><span>Population:</span>{country.population}</p>
           <p><span>Region:</span>{country.region}</p>
           <p><span>Subregion:</span>{country.subregion}</p>
           <p><span>Capital:</span>{country.capital}</p>
       </MainInfo>
       <Additional>
          <Extra lightTheme={lightTheme}>Top level Domain:
            {
              country?.topLevelDomain?.map((item,index)=>(
                <p key={index}>{item}</p>
              ))
            } 
          </Extra>
          <Extra lightTheme={lightTheme}>Currencies:
            {
              country?.currencies?.map((item,index)=>(
                 <p key={index}>{item.name}</p>
              ))
            }
          </Extra>
          <Extra lightTheme={lightTheme}>Languages:
         {
          country?.languages?.map((item,index)=>(
               <p key={index}>{item.name}</p>
          ))
         } 
         </Extra>
       </Additional>
       </InfoBox> 
       <Extra lightTheme={lightTheme}>Border Countries:
          {
            country?.borders?.map((item,index)=>(
               <p key={index}>{item}</p>
            ))
          }
        </Extra> 
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
  gap:50px;
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
  gap:100px;
`
const MainInfo=styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;

  & span{
    font-weight:bold;
  }
`
const Additional=styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
`
const Extra=styled.div<{lightTheme:boolean}>`
  display:flex;
  gap:10px;
  font-weight:bold;
`