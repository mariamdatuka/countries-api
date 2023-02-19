import React from 'react'
import styled from 'styled-components'

const Theme = () => {
  return (
    <>
     <Wrapper>
         <h1>Where in the World?</h1>
         <Button>
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" fill="white" stroke="#111517" stroke-width="1.25"/>
            </svg>
            Dark Mode
         </Button>
     </Wrapper>
    </>
  )
}

export default Theme

const Wrapper=styled.div`
    display:flex;
    padding: 20px 70px 20px 70px;
    align-items:center;
    justify-content:space-between;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    background-color:#ffffff;
    
    & h1 {
        font-size:24px;
        font-weight:800;
    }

    @media screen and (max-width:420px){
        padding: 35px 15px 35px 15px;
        place-items:center;
        & h1 {
            font-size:20px;
        }
    }
`
const Button=styled.button`
    display:flex;
    place-items:center;
    gap:5px;
    border:none;
    width:100px;
    background-color:#ffffff;
    cursor:pointer;

    @media screen and (max-width:420px){
        font-size:12px;
    }
`