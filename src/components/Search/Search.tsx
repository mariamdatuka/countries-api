import React from 'react'
import styled from 'styled-components'
import search from '../../assets/search.svg'

const Search = () => {

  return (
    <>
    <Wrapper>
       <Input type='search' placeholder='Search for a country…'/>
       <Select>
          <option value="option1">Option 1</option>
       </Select>
    </Wrapper>
    </>
  )
}

export default Search

const Wrapper=styled.div`
  padding:50px 70px;
  display:flex;
  align-items:center;
  justify-content:space-between;

@media screen and (max-width:420px) {
  flex-direction:column;
  gap:10px;
  padding: 20px 40px;
}
`
const Input =styled.input`
    width:480px;
    height:60px;
    border-radius:6px;
    padding-left:40px;
    background-image:url(${search});
    background-repeat:no-repeat;
    background-position:bottom 20px left 10px;
    border:none;
    background-color:#ffffff;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

    @media screen and (max-width:420px) {
      width:330px;
   }
`
const Select=styled.select`
  width:200px;
  height:60px;
  border-radius:6px;
  cursor: pointer;
  border:none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);

  @media screen and (max-width:420px) {
  align-self:flex-start;
}
`

