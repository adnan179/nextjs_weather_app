import React from 'react'
import spin from '../public/loader.gif';
import Image from 'next/image';
import defaultimg from '../public/default.jpg';
const Spinner = () => {
  return (
    <>
      <Image src={spin} alt='loading....'
      className='flex relative w-[200px] m-auto z-[100]  pt-[200px]'
      />
      {/* overlay */}
      <div className="absolute left-0 right-0 top-0 bottom-0 bg-black/40 z-[2]" />
      {/* Background img */}
      <Image src={defaultimg} layout="fill" className=" object-cover z-[1]"/>
      
    </>
  )
}

export default Spinner;
