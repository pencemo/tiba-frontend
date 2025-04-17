import React, { createContext, useContext, useState } from 'react'
const CarFilterContext = createContext()

function FilterContext({children}) {
    const [search, setSearch]=useState('')
  const [carMakes, setCarMakes]=useState([])
  const [category, setCategory]=useState([])
  const [sort, setSort]=useState('')
  const [fuleType, setFuleType]=useState('')
  const [showroom, setShowroom]=useState([])
  
  return (
    <CarFilterContext.Provider value={{sort,fuleType, setFuleType,showroom, setShowroom, setSort, search, setSearch, carMakes, setCarMakes, category, setCategory}}>
        {children}
    </CarFilterContext.Provider>
  )
}

export default FilterContext

export const useFilterContext = () => useContext(CarFilterContext)