'use client';

import { useEffect, useReducer, useState } from 'react';
import Card from './components/Card';
import { RoughNotation } from "react-rough-notation";
import localFont from 'next/font/local';

const myFont = localFont({
  src: '../public/get_schwifty.ttf',
  display: 'swap',
});

export interface Character{
  name: string;
  status: string;
  species: string;
  origin: string;
  location: string;
  image: string;
  episodes: Array<string>;
}

interface State {
  loading: boolean;
  error: string;
  data: Character;
}

const initialState: State = {
  loading: true,
  error: '',
  data: {
    name: '',
    status: '',
    species: '',
    origin: '',
    location: '',
    image: '',
    episodes: []
  },
};

type Action = 
| { type: 'FETCH_SUCCESS', payload: Character }
| { type: 'FETCH_ERROR', error: "Character Not found" };


function reducer(state: State, action: Action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return{
        loading: false,
        error: '',
        data: action.payload
      }
    case 'FETCH_ERROR':
      return{
        loading: false,
        error: action.error || "Not found",
        data: initialState.data
      }
    default:
      return state;
  }
}

export default function Home() {

  const [query, setQuery] = useState("");

  const[state, dispatch] = useReducer(reducer, initialState)

  async function handleSearch(e: React.FormEvent){
    e.preventDefault();
    const response = await fetch(`api/character?name=${query}`, {method: "GET",  cache: 'no-store' })
    const response_object = await response.json()
    if(response.ok){
      // setResult(response_object.character_data)
      dispatch({type: 'FETCH_SUCCESS', payload: response_object.character_data})
    }else{
      dispatch({type: 'FETCH_ERROR', error: "Character Not found"})
    }
  }

  return (
    <>
      <h1 className="text-xl font-light mb-10"><span className='text-[#01adc5]'>
      <RoughNotation type="highlight" show={true} color="#fff176" className={`px-2  text-4xl ${myFont.className}`}>
      Rick & Morty
      </RoughNotation>
      </span> 
      Characters</h1>
        <form onSubmit={handleSearch} className='pl-5 flex flex-col lg:items-center w-[50%] xs:w-full xs:items-center'>
          <div className='lg:flex lg:flex-col space-y-4 lg:items-center w-[75%]'>
            <label htmlFor="search">Enter a Character Name:</label>
            <input type="text" id="search" required onChange={(e) => setQuery(e.target.value)} placeholder='Rick Sanchez' className='lg:w-[50%] h-1/2 shadow-sm border border-slate-300 text-sm p-2 rounded-md xs:w-[75%]'/>
          </div>
          <div className='flex justify-center w-1/2 m-10' >
            <button type="submit" className='bg-[#01adc5] shadow-lg rounded-lg p-2 hover:bg-[#fff176]'>Search</button>
          </div>
        </form>

        <div className='w-[55%] xs:w-[65%] md:w-[55%] lg:w-[55%]'>
          {state.loading ? (
            <></>
            ): state.data.name ? (
              <Card result={state.data}/> 

            ) : (
              <h1>Character Not found</h1>
            )
          }
        </div>
        
    </>
  )
}

// 