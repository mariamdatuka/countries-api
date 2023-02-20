import React, {useState,useEffect}from 'react'
import styled from 'styled-components'
import search from '../../assets/search.svg'
import axios from 'axios';
import ReactPaginate from 'react-paginate';

interface Country {
  name: string;
  capital: string;
  population: number;
  region:string;
  flag:string; 
};

const Search = () => {
const [country,setCountry]=useState<string>('')
const [data,setData]=useState<any>();
const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
const [currentPage, setCurrentPage] = useState<number>(0);
const itemsPerPage=8;

//get all countries when component mounts
useEffect(()=>{
   const getAllCountries=async()=>{
    try{
    const {data}=await axios.get('https://restcountries.com/v2/all');
      setData(data);
    } catch (error){
        console.log(error);
    }
   }
   getAllCountries();
},[])

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

  return (
    <>
    <Wrapper>
       <Input value={country}
              onChange={handleSearch}
              type='text' 
              placeholder='Search for a country…'/>
       <Select>
          <option value="option1">Option 1</option>
       </Select>
    </Wrapper>
    {filteredCountries.length>0?(
        <div>
          {filteredCountries.map((country,index) => (
            <InfoBox key={index}>
              <img src={country.flag} alt='flag'/>
                   <h1>{country.name}</h1>
                   <p>{country.population}</p>
                   <p>{country.region}</p>
                   <p>{country.capital}</p>
            </InfoBox>
          ))}
        </div>
      ) : (
        <GridContainer>
        {itemsToShow?.map((item:any,index:number)=>(
                <InfoBox key={index}>
                   <img src={item.flag} alt='flag'/>
                   <h1>{item.name}</h1>
                   <p>{item.population}</p>
                   <p>{item.region}</p>
                   <p>{item.capital}</p>
                </InfoBox>
        ))}
        </GridContainer>  
      )} 
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

export const GridContainer=styled.div`
  display:grid;
  grid-template-columns:1fr 1fr 1fr 1fr;
  padding:0 70px;
  gap:10px;
`
export const InfoBox=styled.div`
  width:270px;
  height:340px;

  & img{
    width:270px;
    height:160px;
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