import React from 'react'

const SearchInpMain = () => {
    return (
        <div className="admin_header_search admin_container">
            <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.0605 15.4395L14.2528 11.6318C15.0395 10.446 15.5 9.02625 15.5 7.5C15.5 3.3645 12.1355 0 8 0C3.8645 0 0.5 3.3645 0.5 7.5C0.5 11.6355 3.8645 15 8 15C9.52625 15 10.946 14.5395 12.1318 13.7528L15.9395 17.5605C16.5245 18.1462 17.4755 18.1462 18.0605 17.5605C18.6462 16.9748 18.6462 16.0252 18.0605 15.4395ZM2.75 7.5C2.75 4.605 5.105 2.25 8 2.25C10.895 2.25 13.25 4.605 13.25 7.5C13.25 10.395 10.895 12.75 8 12.75C5.105 12.75 2.75 10.395 2.75 7.5Z" fill="#9F9FA0" />
            </svg>
            <input placeholder='Axtar...' type="search" />
        </div>
    )
}

export default SearchInpMain