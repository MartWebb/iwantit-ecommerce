import React, { useState } from 'react';

function SearchBar({ history }) {
    const [name, setName] = useState('');

    const submitHandler = (event) => {
        event.preventDefault();
        history.push(`/search/name/${name}`);
    };

    return (
        <form className="search" onSubmit={submitHandler}>
            <div className="row">
                <input 
                    id="query" 
                    type='text' 
                    name='query'
                    onChange={(event) => setName(event.target.value)}
                >
                </input>
                <button className="primary" type="submit">
                    <i className="fa fa-search"></i>
                </button> 
            </div>
        </form>
    )
}

export default SearchBar;
