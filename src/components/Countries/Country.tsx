import React from 'react'
import styled from 'styled-components'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';

const Country = () => {
    const [data, setData] = useState<any>();
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage=30;
  
    const handlePageChange = ({selected}:any) => {
      setCurrentPage(selected);
    };

useEffect(()=>{
   const getAllCountries=async()=>{
    try{
    const {data}=await axios.get('https://restcountries.com/v2/all');
      setData(data);
      console.log(data);
    } catch (error){
        console.log(error);
    }
   }
   getAllCountries();
},[])

const itemsToShow = data?.slice(
  currentPage * itemsPerPage,
  currentPage * itemsPerPage + itemsPerPage
);
  return (
    <>
  {itemsToShow?.map((item:any,index:number)=>(
          <div key={index}>
             <h1>{item.name}</h1>
          </div>
  ))}
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

export default Country

const PaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

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