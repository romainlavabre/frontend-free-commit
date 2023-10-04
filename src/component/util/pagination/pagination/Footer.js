import React from "react";

export default function Footer({metadata, changePage}) {

    return (
        <>
            <div className="">
                <nav className="flex justify-end">
                    <ul className="flex list-style-none text-xl">
                        {
                            getItems(metadata, changePage).map(li => (li))
                        }
                    </ul>
                </nav>
                <div className="flex justify-end italic mt-2 mr-5">
                    De {metadata.from} à {metadata.to} sur {metadata.total} lignes
                </div>
            </div>
        </>
    );
}


function getItems(metadata, changePage) {
    const result = [];
    const MAX_PAGE_SHOW = 2;

    result.push((
        <li key={'first-pagination-page'} className="page-item">
            <a
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === 1 ? 'text-gray-500' : 'hover:bg-gray-700/80 hover:text-dark'}`}
                href="#" tabIndex="-1" aria-disabled="false" onClick={(e) => {
                e.preventDefault();

                if (metadata.current_page === 1) {
                    return;
                }

                changePage(1);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                </svg>
            </a>
        </li>
    ));

    result.push((
        <li key={'last-pagination-page'} className="page-item">
            <a
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === 1 ? 'text-gray-500' : 'hover:bg-gray-700 hover:text-dark'}`}
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

    for (let i = metadata.current_page - MAX_PAGE_SHOW; i < metadata.current_page - 1; i++) {
        if (i + 1 >= 1) {
            result.push((
                <li key={i + 1} className="page-item"
                    onClick={(e) => {
                        e.preventDefault();
                        changePage(i + 1);
                    }}>
                    <a
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-700/80 hover:text-dark focus:shadow-none"
                        href="#">
                        {i + 1}
                    </a>
                </li>
            ));
        }

    }

    result.push((
        <li key={'current-page'} className="page-item bg-gray-700 rounded-full">
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

    for (let i = metadata.current_page; i < metadata.current_page + (MAX_PAGE_SHOW - 1); i++) {
        if (i + 1 <= metadata.last_page) {
            result.push((
                <li key={i + 1} className="page-item"
                    onClick={(e) => {
                        e.preventDefault();
                        changePage(i + 1);
                    }}>
                    <a
                        className="page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full hover:bg-gray-700/80 hover:text-dark focus:shadow-none"
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
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === metadata.last_page ? 'text-gray-500' : 'hover:bg-gray-700/80 hover:text-dark'}`}
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

    result.push((
        <li key={'final-pagination-page'} className="page-item">
            <a
                className={`page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full focus:shadow-none ${metadata.current_page === metadata.last_page ? 'text-gray-500' : 'hover:bg-gray-700/80 hover:text-dark'}`}
                href="#" tabIndex="-1" aria-disabled="false" onClick={(e) => {
                e.preventDefault();
                if (metadata.current_page === metadata.last_page) {
                    return;
                }

                changePage(metadata.last_page);
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                </svg>
            </a>
        </li>
    ));

    return result;
}
