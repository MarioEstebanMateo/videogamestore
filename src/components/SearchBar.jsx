import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (search.trim()) {
      onSearch(search)
      setSearch('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search game..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  )
}

export default SearchBar
