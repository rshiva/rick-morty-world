'use client';

import { useEffect, useReducer, useState } from 'react';
import Card from './components/Card';

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


function reducer(state, action) {
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
        data: {}
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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="text-center space-y-10">
          <h1 className="text-2xl font-light">Search Rick Morty Characters</h1>
            <div className=''>
              
              <form onSubmit={handleSearch}>
              <div className='flex flex-col space-y-4 items-start'>
                <label htmlFor="search">Enter a Character Name:</label>
                <input type="text" id="search" required onChange={(e) => setQuery(e.target.value)} placeholder='Rick Sanchez' className='w-full h-1/2 shadow-sm border border-slate-300 text-sm p-2 rounded-md'/>
              </div>
              <div className='items-center mt-4'>
                <button type="submit" className='bg-yellow-200 shadow-lg rounded-lg p-2 hover:bg-yellow-500'>Search</button>
              </div>
              </form>
            </div>
            {state.loading ? (
              <></>
              ): state.data.name ? (
                <Card result={state.data}/> 

              ) : (
                <h1>Character Not found</h1>
              )
            }
                  
            </div>
        </div>
    </main>
  )
}


// 