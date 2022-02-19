import React from "react";

export default function Footer({metadata, changePage}) {

    return (
        <>
            <div className="flex justify-between mt-5">
                <div className="italic">
                    Show from {metadata.from} to {metadata.to} on {metadata.total} lines
                </div>
                <div className="flex justify-center">
                    <nav aria-label="Page navigation example">
                        <ul className="flex list-style-none text-xl">
                            {
                                getItems(metadata, changePage).map(li => (li))
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
}


function getItems(metadata, changePage) {
    const result = [];

    result.push((
        <li key={'last-pagination-page'} className="page-item">
            <a
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === 1 ? 'text-gray-500' : 'hover:bg-gray-200 hover:text-dark'}`}
                href="#" tabIndex="-1" aria-disabled="false" onClick={(e) => {
                e.preventDefault();

                if (metadata.current_page === 1) {
                    return;
                }

                changePage(metadata.current_page - 1);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M15 19l-7-7 7-7"/>
                </svg>
            </a>
        </li>
    ));

    for (let i = metadata.current_page - 6; i < metadata.current_page - 1; i++) {
        if (i + 1 >= 1) {
            result.push((
                <li key={i + 1} className="page-item"
                    onClick={(e) => {
                        e.preventDefault();
                        changePage(i + 1);
                    }}>
                    <a
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-200 hover:text-dark focus:shadow-none"
                        href="#">
                        {i + 1}
                    </a>
                </li>
            ));
        }

    }

    result.push((
        <li key={'current-page'} className="page-item bg-ovh rounded-full">
            <a
                className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none"
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                }}>
                {metadata.current_page}
            </a>
        </li>
    ));

    for (let i = metadata.current_page; i < metadata.current_page + 5; i++) {
        if (i + 1 <= metadata.last_page) {
            result.push((
                <li key={i + 1} className="page-item"
                    onClick={(e) => {
                        e.preventDefault();
                        changePage(i + 1);
                    }}>
                    <a
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-200 hover:text-dark focus:shadow-none"
                        href="#">
                        {i + 1}
                    </a>
                </li>
            ));
        }
    }

    result.push((
        <li key={'next-pagination-page'} className="page-item">
            <a
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === metadata.last_page ? 'text-gray-500' : 'hover:bg-gray-200 hover:text-dark'}`}
                href="#" tabIndex="-1" aria-disabled="false"
                onClick={(e) => {
                    e.preventDefault();

                    if (metadata.current_page === metadata.last_page) {
                        return;
                    }

                    changePage(metadata.current_page + 1);
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                </svg>
            </a>
        </li>
    ));

    return result;
}
