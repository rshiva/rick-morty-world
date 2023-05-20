
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" flex flex-col items-center m-16">
      <h1 className="text-4xl  bg-gray-300 "> Loading ...</h1>
      <div className="lg:grid lg:grid-cols-4 lg:gap-10 p-5 xs:flex xs:flex-col" >
        {[...Array(10)].map((_, step) => (
        <div className="flex flex-col  items-center bg-gray-300 w-48 h-48 rounded-full " key={step} ></div>
        ))}
      </div>
    </div>
  );
}