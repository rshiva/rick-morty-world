import Link from "next/link";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" flex flex-col items-center m-16">
      <h1 className="text-4xl "> </h1>
      <Link href="/" className="bg-yellow-200 border border-gray-500 p-2  rounded-md">Home</Link>
      <div className="grid grid-cols-4 gap-10 p-5" >
        {[...Array(10)].map((_, step) => (
        <div className="flex flex-col  items-center bg-gray-300 " key={step} ></div>
        ))}
      </div>
    </div>
  );
}