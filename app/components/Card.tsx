import { Character } from "../page";
import Image from 'next/image'

interface CardProps {
  result: Character;
}

export default function Card({result}: CardProps) {
  return(
    <div className='flex flex-col item-center bg-white rounder-lag shadow border border-gray-800'>
      <Image
        src={result!.image}
        width={500}
        height={500}
        alt="Picture of the author"
        className='object-cover w-full rounded-t-lg h-96'
      />
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{result!.name}</h5>
        <div className='flex justify-center'>
          <span className="text-gray-700 mr-2">Status: </span>
          <h5 className="font-bold">
            {result!.status}
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
        <div className='flex justify-center'>
        </div>

      </div>
    </div>
  )
}