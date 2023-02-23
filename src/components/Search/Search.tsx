import React, {useState,useEffect}from 'react'
import styled from 'styled-components'
import search from '../../assets/search.svg'
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';


interface Country {
  name: string;
  capital: string;
  population: number;
  region:string;
  flag:string; 
};

const Search = () => {
const [country,setCountry]=useState<string>('')
const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
const [currentPage, setCurrentPage] = useState<number>(0);
const [region, setRegion] = useState<string>('');
const [filteredRegion, setFilteredRegions] = useState<Country[]>([]);
const itemsPerPage=8;

const data = useContext(AppContext);

const handleSearch = (event:any) => {
  const term = event.target.value;
  setCountry(term);
  // Filter the list of all countries based on the search term
  const filtered = data.filter((country:any) =>
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
    <Wrapper>
       <Input value={country}
              onChange={handleSearch}
              type='text' 
              placeholder='Search for a country…'/>
       <Select onChange={chooseRegion} value={region}>
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
            <InfoBox key={index} onClick={()=>navigatePage(country.name)}>
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
            <InfoBox key={index} onClick={()=>navigatePage(itm.name)}>
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
                  <InfoBox key={index} onClick={()=>navigatePage(item.name)}>
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
      <PaginateContainer>
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
export const GridContainer=styled.div`
  display:grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  padding:0 70px;
  column-gap:10px;
  row-gap:50px;
`
export const InfoBox=styled.div`
  width:270px;
  height:340px;
  background-color:#fff;
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

const PaginateContainer = styled.div`
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
        color: #333;
        cursor:pointer;
        font-size:12px;
        font-weight:bold;

        &.active {
          background-color: #4caf50 !important;
          color: white;
        }
      }
    }
  }
`;