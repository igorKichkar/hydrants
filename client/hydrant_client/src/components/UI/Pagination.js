import {useState} from "react";

const Pagination = ({paginationPage, changePage, pages}) => {
    let list_pages = []
    for (let i = 0; i < pages; i++) {
        if (i < paginationPage + 5 && i < pages) {
            list_pages.push(i)
            if (paginationPage > i && i + 5 < pages) {
                list_pages.shift()
            }
        }
    }

    function previousPage() {
        if (paginationPage > 0) {
            changePage(paginationPage - 1)
        }
    }

    function nextPage() {
        if (paginationPage < pages - 1) {
            changePage(paginationPage + 1)
        }
    }

    return <nav aria-label="Page navigation example">
        <ul className="pagination">
            <li className="page-item"><a onClick={() => previousPage()}
                                         className={(paginationPage === 0) ? 'page-link btn disabled' : 'page-link'}
                                         href="#">Предыдущая</a></li>
            {list_pages.map(page =>
                <li key={page} className="page-item">
                    <a onClick={() => changePage(page)} className="page-link" href="#"
                       style={paginationPage === page ? {fontWeight: "bold"} : {}}>{page + 1}</a>
                </li>
            )}
            {(pages > 5 && paginationPage + 5 < pages) && <>
                <li className="page-item"> . . .</li>
                <li className="page-item"><a onClick={() => changePage(pages - 1)}
                                             className={'page-link'}
                                             href="#">{pages}</a></li>
            </>}


            <li className="page-item"><a onClick={() => nextPage()}
                                         className={(paginationPage === pages - 1) ? 'page-link btn disabled' : 'page-link'}
                                         href="#">Следующая</a></li>
        </ul>
    </nav>

};

export default Pagination;

