import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./Pagination.css";

function Pagination(props) {

    const defaultRowPerPage = 5;
    const [currPage, setCurrPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowPerPage);
    const [totalPages,setTotalPages]=useState(parseInt((props.totalNumber - 1) / defaultRowPerPage + 1));

    useEffect(
        ()=>{
            props.pageChange(currPage);
            props.rowPerPageChange(rowsPerPage);
        },[]
    )
    useEffect(()=>{
        setCurrPage(1);
        setTotalPages(parseInt((props.totalNumber - 1) / rowsPerPage + 1));
    },[props.totalNumber,setTotalPages]

    )
    useEffect(
        ()=>{
            props.pageChange(currPage);
        },[currPage]
    )

    useEffect(
        ()=>{
            setCurrPage(1);
            setTotalPages(parseInt((props.totalNumber - 1) / rowsPerPage + 1));
            props.rowPerPageChange(rowsPerPage);
        },[rowsPerPage]
    )

    const toFirstPage = (e) => {
        if (currPage != 1) {
            setCurrPage(1);
        }
    }

    const toLastPage = (e) => {
        if (currPage != totalPages) {
            setCurrPage(totalPages);
        }
    }

    const toNextPage = (e) => {
        if (currPage != totalPages) {
            setCurrPage(currPage + 1);
        }
    }

    const toPrePage = (e) => {
        if (currPage != 1) {
            setCurrPage(currPage - 1);
        }
    }
    const handleRowsPerPage=(e)=>{
        setRowsPerPage(e.target.value);
    }
    return (
        <div className="aot-pagination">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous" onClick={toFirstPage}>
                            <span aria-hidden="true">«</span>
                        </a>
                    </li>
                    <li className="page-item" >
                        <a className="page-link" href="#" onClick={toPrePage}>
                            Previous
                        </a>
                    </li>
                    <li className="page-number">
                        {currPage}/{totalPages} <span>{props.totalNumber} items</span>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={toNextPage}>
                            Next
                        </a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next" onClick={toLastPage}>
                            <span aria-hidden="true">»</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="rows-per-page">
                <span>
                    <label htmlFor="rowsPerPage" className="text-info">
                        Rows per Page:
                    </label>
                </span>
                <span>
                    <select value={rowsPerPage} onChange={handleRowsPerPage} 
                    className="form-select" name="rowsPerPage" id="rowsPerPageList">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </span>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    totalNumber: PropTypes.number.isRequired,
    pageChange: PropTypes.func.isRequired,
    rowPerPageChange: PropTypes.func.isRequired,
};
export default Pagination;