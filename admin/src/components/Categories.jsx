import React from 'react'

export default function Categories({categories}) {
  return (
    <div className='flex flex-wrap items-center gap-2'>
        <h1 className='font-bold'>Categories - </h1>
        {!!categories.length && categories.map((category,i) => (
            <span key={i} className='bg-orange-600 text-white px-1 py-1 rounded-full text-sm'>{category}</span>
        ))}
    </div>
  )
}
