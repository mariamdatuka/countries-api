import React, {useState,useEffect}from 'react'
import styled from 'styled-components'
import search from '../../assets/search.svg'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { Data } from '../../Types';
import Theme from '../Theme/Theme';

const Search = () => {
const [country,setCountry]=useState<string>('')
const [filteredCountries, setFilteredCountries] = useState<Data[]>([]);
const [currentPage, setCurrentPage] = useState<number>(0);
const [region, setRegion] = useState<string>('');
const [filteredRegion, setFilteredRegions] = useState<Data[]>([]);
const itemsPerPage=8;

const {data, lightTheme,toggleTheme} = useContext(AppContext);


const handleSearch = (event:any) => {
  const term = event.target.value;
  setCountry(term);
  // Filter the list of all countries based on the search term
  const filtered = data?.filter((country:any) =>
    country.name.toLowerCase().includes(term.toLowerCase())
  );
  setFilteredCountries(filtered);
};

// Reset the filtered countries when the search term is empty
useEffect(() => {
  if (country === '') {
    setFilteredCountries([]);
  }
}, [country, data]);

const itemsToShow = data?.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);

const handlePageChange = ({selected}:any) => {
  setCurrentPage(selected);
};

const chooseRegion=(e:any)=>{
  const getRegion=(e.target.value);
  setRegion(getRegion);
}

useEffect(()=>{
  if(region!==''){
     const filter= data.filter((country:any) =>
      country.region.toLowerCase().includes(region.toLowerCase())
    );
    setFilteredRegions(filter);
  }else{
    setFilteredRegions([]);
  }
}, [region])

const navigate=useNavigate();
const navigatePage=(id:string)=>{
  navigate(`/country/${id}`)
}
  
  return (
    <>
     <Theme/>
      <Wrapper>
       <Input value={country}
              lightTheme={lightTheme}
              onChange={handleSearch}
              type='text' 
              placeholder='Search for a country???'/>
       <Select onChange={chooseRegion} value={region} lightTheme={lightTheme}>
          <option value=''>Filter by Region</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="oceania">Oceania</option>
       </Select>
    </Wrapper>
    {filteredCountries.length>0?(
        <div>
          {filteredCountries.map((country,index) => (
            <InfoBox lightTheme={lightTheme} key={index} onClick={()=>navigatePage(country.name)}>
            <ImgBox>
              <img src={country.flag} alt='flag'/>
            </ImgBox>
            <Info> 
               <h1>{country.name}</h1>
               <p><span>Population:</span>{country.population}</p>
               <p><span>Region:</span>{country.region}</p>
               <p><span>Capital:</span>{country.capital}</p>
            </Info>  
          </InfoBox>
          ))}
        </div>
      ): filteredRegion.length>0?(
          <GridContainer>
            {filteredRegion.map((itm,index)=>(
            <InfoBox lightTheme={lightTheme} key={index} onClick={()=>navigatePage(itm.name)}>
            <ImgBox>
              <img src={itm.flag} alt='flag'/>
            </ImgBox>
            <Info> 
               <h1>{itm.name}</h1>
               <p><span>Population:</span>{itm.population}</p>
               <p><span>Region:</span>{itm.region}</p>
               <p><span>Capital:</span>{itm.capital}</p>
            </Info>  
          </InfoBox>
            ))}
          </GridContainer>
        ):(
          <GridContainer>
          {itemsToShow?.map((item:any,index:number)=>(
                  <InfoBox lightTheme={lightTheme} key={index} onClick={()=>navigatePage(item.name)}>
                    <ImgBox>
                      <img src={item.flag} alt='flag'/>
                    </ImgBox>
                    <Info> 
                       <h1>{item.name}</h1>
                       <p><span>Population:</span>{item.population}</p>
                       <p><span>Region:</span>{item.region}</p>
                       <p><span>Capital:</span>{item.capital}</p>
                    </Info>  
                  </InfoBox> 
          ))}
          </GridContainer> 
        )
       } 
       {!(filteredRegion.length>0) &&
      <PaginateContainer lightTheme={lightTheme}>
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          pageCount={Math.ceil(data?.length / itemsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          activeClassName={'active'}
          />
       </PaginateContainer>
      }
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

interface Theme{
  theme:string;
}
const Input =styled.input<{lightTheme:boolean}>`
    width:480px;
    height:60px;
    border-radius:6px;
    padding-left:40px;
    background-image:url(${search});
    background-repeat:no-repeat;
    background-position:bottom 20px left 10px;
    border:none;
    background-color:${props=>(props.lightTheme?'#fff':'#2B3844')};
    transition: background-color 0.5s ease-in-out;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  
    @media screen and (max-width:420px) {
      width:330px;
   }
`
const Select=styled.select<{lightTheme:boolean}>`
  width:200px;
  height:60px;
  border-radius:6px;
  cursor: pointer;
  border:none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color:${props=>(props.lightTheme?'#fff':'#2B3844')};
  transition: all 0.3s ease-in-out;
  color:${props=>(props.lightTheme?'#232323':'#809396')};

  @media screen and (max-width:420px) {
  align-self:flex-start;
}
`
export const GridContainer=styled.div`
  display:grid;
  place-items:center;
  grid-template-columns:1fr 1fr 1fr 1fr;
  padding:0 70px;
  column-gap:10px;
  row-gap:50px;

  @media screen and (max-width:420px){
    grid-template-columns:1fr;
    padding:0 50px;
  }
`
export const InfoBox=styled.div<{lightTheme:boolean}>`
  width:270px;
  height:340px;
  border-radius:15px;
  background-color:${props=>(props.lightTheme?'#fff':'#2B3844')};
  transition: all 0.3s ease-in-out;

  &:hover{
    transform: scale(1.05);
  }
`
const ImgBox=styled.div`
  width:270px;
  height:160px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img{
    width:270px;
    height:160px;
  }
`
const Info=styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  padding:20px;

  & h1{
    font-size:24px;
  }
  & p span{
    font-weight:bold;
  }
`

const PaginateContainer = styled.div<{lightTheme:boolean}>`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom:20px;

  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 0 5px;

      a {
        padding: 10px 10px;
        border: 1px solid #ccc;
        text-decoration: none;
        color:${props=>(props.lightTheme?'#2B3844':'#fff')};
        transition: all 0.3s ease-in-out;
        cursor:pointer;
        font-size:12px;
        font-weight:bold;
      }
    }
  }
`;