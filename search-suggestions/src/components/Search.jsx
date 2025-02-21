import React from 'react'

const Search = ({value, onFocus, onBlur, onChange, ref}) => {
  return (
    <input type="search" className='search' value={value} onFocus={onFocus} onBlur={onBlur} placeholder="eg. Masala Dosa" onChange={onChange} ref={ref} />
  )
}

export default Search
