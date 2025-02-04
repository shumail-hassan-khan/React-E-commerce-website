import React from 'react';

const Pagination = ({ productPerPage, totalProducts, paginate, activePage }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className='default-pagination lab-ul'>
            {
                pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={`page-item ${number === activePage ? "bg-warning" : ""}`}
                    >
                        <button
                            onClick={() => paginate(number)}
                            className='bg-transparent'
                        >
                            {number}
                        </button>
                    </li>
                ))
            }
        </ul>
    );
};

export default Pagination;
