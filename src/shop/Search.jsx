import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link

const Search = ({ products, GridList }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filter products based on search term
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='widget widget-search'>
            <form className='search-wrapper mb-3' onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder='Search..'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type='submit'>
                    <i className='icofont-search-2'></i>
                </button>
            </form>

            {/* Optional: Display filtered products */}
            <div>
                {searchTerm &&
                    filteredProducts.map((product) => (
                        <Link key={product.id} to={`/shop/${product.id}`}>
                            <div className='d-flex gap-3 p-2'>
                                <div>
                                    <div className='pro-thumb h-25'>
                                        <img
                                            src={product.img}
                                            alt=""
                                            width={70}
                                            className='flex-grow-0 flex-shrink-0'
                                        />
                                    </div>
                                </div>
                                <div className='product-content'>
                                    <p>
                                        <Link to={`/shop/${product.id}`}>{product.name}</Link>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default Search;
