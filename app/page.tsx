'use client';

import { useEffect, useState } from 'react';
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
let fetchTimeout: NodeJS.Timeout;

export default function Home() {

  const [query, setQuery] = useState("");
  const [result, setResult] = useState<Character | undefined>()

  async function handleChange(e:  React.FormEvent ){
    e.preventDefault();
    setResult(undefined);
    clearTimeout(fetchTimeout);

    setQuery(e.target.value)
    fetchTimeout = setTimeout(() => {
      setResult(undefined);
      console.log("before request query", query)
      fetch(`https://rickandmortyapi.com/api/character?name=${query}`,{ cache: 'no-store' })
        .then((response) => response.json())
        .then((data) => {
        const firstCharacter = data.results[0];
        const { name, status, species, origin, location, image, episode } = firstCharacter;
        console.log("response character",firstCharacter)

        const response_data: Character = {
          name,
          status,
          species,
          origin: origin.name,
          location: location.name,
          image,
          episodes: episode
        };
        setResult(response_data)
        console.log("after request query", query)
        })
      .catch((error) => {
        console.log(error);
      });
    }, 1000);

  }

  async function handleSearch(e: React.FormEvent){
    e.preventDefault();
    console.log("query",query)
    const response = await fetch(`api/character?name=${query}`, {method: "GET",  cache: 'no-store' })
    const response_object = await response.json()
    if(response.ok){
      setResult(response_object.character_data)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="text-center space-y-10">
          <h1 className="text-lg">Search Rick Morty Characters</h1>
            <div className=''>
              
              <form onSubmit={handleSearch} className='flex flex-col border space-y-4 items-start'>
              <label htmlFor="search">Enter a Character Name:</label>
              <input type="text" id="search" required onChange={(e) => setQuery(e.target.value)} placeholder='Rick Sanchez' className='w-1/2'/>
              <button type="submit" className='bg-yellow-200 shadow-lg rounded-lg p-2 hover:bg-yellow-500'>Search</button>
              </form>
            </div>
                  {result && <Card result={result}/> }
            </div>
        </div>
    </main>
  )
}


// 