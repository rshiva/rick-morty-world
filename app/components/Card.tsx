import Link from "next/link";
import { Character } from "../page";
import Image from 'next/image'

interface CardProps {
  result: Character;
}

function aliveOrDead(status: string){
  if(status === "Alive"){
    return "h-3 w-3 m-1 rounded-full bg-green-500"
  }else if(status == "Dead"){
    return "h-3 w-3 m-1 rounded-full bg-red-500"
  }else{
    return "h-3 w-3 m-1 rounded-full bg-gray-500"
  }
}

export default function Card({result}: CardProps) {
  return(
    <div className='flex flex-col item-center bg-white h-1/2 rounded-lg shadow border border-gray-800'>
      <Image
        src={result!.image}
        width={500}
        height={500}
        alt="Picture of the author"
        className='object-fill w-full rounded-t-lg h-96'
      />
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result!.name}</h5>
        <div className='flex justify-center'>
          <span className="text-gray-700 mr-2">Status: </span>
          <h5 className="font-bold flex">
            <div className={aliveOrDead(result!.status)}></div>
            <div>{result!.status}</div>

          </h5>
        </div>
        <div className='flex justify-center'>
          <span className="text-gray-700 mr-2">Species: </span>
          <h5 className="font-bold">
            {result!.species}
          </h5>
        </div>
        <div className='flex justify-center'>
          <span className="text-gray-700 mr-2">Origin: </span>
          <h5 className="font-bold">{result!.origin}</h5>
        </div>
        <div className='flex justify-center'>
          <span className="text-gray-700 mr-2">Current: </span>
          <h5 className="font-bold">{result!.location}</h5>
        </div>
        <div className='flex flex-col h-1/2 items-center overflow-auto mt-4 space-y-4'>
          {/* Todo 
            1. Learn to add pagination
            2. Use this api to list episode name and number https://rickandmortyapi.com/api/episode/10,28
            3. Onclick redirect to new page which fetch all the character in that episode
          */}
          
          {/* {
          result!.episodes.map((episode,index) => (
            <div className="">
               {episode}
            </div>
          ))
          } */}
        </div>

      </div>
    </div>
  )
}