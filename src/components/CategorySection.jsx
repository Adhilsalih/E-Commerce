// import React from 'react'
// import Fashion from '../assets/Images/fashion.jpg'
// import Electronics from '../assets/Images/electronics.jpg'
// import Sports from '../assets/Images/sports.jpg'

// const categories=[
//     {
//         title:"Fashion",
//         imageUrl:Fashion,
//     },
//        {
//         title:"Electronics",
//         imageUrl:Electronics,
//     },
//        {
//         title:"Sports",
//         imageUrl:Sports,
//     },
// ]


// const CategorySection = () => {
//   return (
//     <div className='container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 '>
//         {categories.map((category,index)=>(
//             <div key={index} className='relative h-64 transform transition-transform duration-300 hover:scale-105 cursor-pointer'>
//                 <img src={category.imageUrl} alt="" className='w-full h-full object-cover rounded-lg shadow-md' />
//                 {/* <div className='absolute top-20 left-12'>
//                     <p className='text-xl font-bold text-white'>{category.title}</p>

//                 </div> */}
// <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
//   <p className="text-xl font-bold text-white bg-red-600 shadow-md text-center px-6 py-3 rounded">
//     {category.title}
//   </p>
// </div>

//             </div>
//         ))}
//     </div>
//   )
// }

// export default CategorySection

import React from 'react'
import Fashion from '../assets/Images/fashion.jpg'
import Electronics from '../assets/Images/electronics.jpg'
import Sports from '../assets/Images/sports.jpg'

const categories = [
  {
    title: "Fashion",
    imageUrl: Fashion,
  },
  {
    title: "Electronics",
    imageUrl: Electronics,
  },
  {
    title: "Sports",
    imageUrl: Sports,
  },
]

const CategorySection = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
      {categories.map((category, index) => (
        <div
          key={index}
          className="relative h-64 rounded-xl overflow-hidden cursor-pointer shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img
            src={category.imageUrl}
            alt={category.title}
            className="w-full h-full object-cover"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

          {/* Centered title with gradient bg */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 shadow-lg">
            <p className="text-white text-xl font-bold drop-shadow-md text-center">
              {category.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategorySection
