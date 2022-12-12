import React, { useState, useEffect, useRef } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";
import "./StudentPage.css";
import Clock from "../components/Clock";
import Pagination from "../components/Pagination";
import Checkin from '../images/checkin.png';
import View from '../images/view.png';
import { createRoot } from "react-dom/client";
import { Modal } from 'bootstrap'

function StudentPage() {

    const logoutURL = '/api/logout';
    const initCourseListURL = '/api/getCourseList';
    const addCourseURL = '/api/addCourse';
    const loadDataURL = '/api/getByName';
    const checkInURL = '/api/checkin';
    const loadCheckInDataURL = '/api/getCheckInByName';

    const [tableData, setTableData] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalNumber, setTotalNumber] = useState(0);
    const [modalTableData, setModalTableData] = useState([]);
    const [modalRowsPerPage, setModalRowsPerPage] = useState(0);
    const [modalCurrentPage, setModalCurrentPage] = useState(1);
    const [modalTotalNumber, setModalTotalNumber] = useState(0);
    const table = useRef(null);
    const modalTable = useRef(null);

    const navigate = useNavigate();

    //log out
    const handleLogout = (e) => {
        fetch(logoutURL).then(
            (res) => {
                if (res.ok) {
                    navigate("/?msg=logout succeed");
                }
            }
        )
        e.preventDefault();
    }

    //init course select list
    const initCourseList = () => {
        fetch(initCourseListURL).then(
            (response) => {
                return response.json()
            }
        ).then((data) => {
            let select = document.getElementById("courseList");
            let size = select.options.length;
            for (let i = 0; i < size; i++) {
                select.remove(0);
            }
            for (let i = 0; i < data.length; i++) {
                var option = document.createElement("option");
                option.text = data[i];
                option.value = data[i];
                select.add(option);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    UseCheckMsg();

    //load data into table
    const loadData = () => {
        fetch(loadDataURL).then(
            (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else if (!res.ok) {
                    throw new Error();
                } else {
                    return res.json()
                }
            }
        ).then(
            (data) => {
                // console.log(data);
                setTableData(() => data);
                setTotalNumber(data.length);
            }
        ).catch((error) => {
            console.error(error);
        })
    }



    useEffect(() => {
        initCourseList();
        loadData();
    }, []);

    useEffect(() => {
        // console.log(table.current);
        // console.log(table.current.hasChildNodes());
        table.current.innerHTML = "";
        // console.log("df:"+rowsPerPage);

        let start = rowsPerPage * (currentPage - 1);
        for (let i = start; i < start + rowsPerPage; i++) {
            if (i >= tableData.length) {
                break;
            }
            const row = table.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = tableData[i].name;
            cell3.innerHTML = tableData[i].course;

            if (tableData[i].grades) {
                cell4.innerHTML = tableData[i].grades;
            }
            let obj = {
                "course": tableData[i].course,
                "name": tableData[i].name
            };
            const root = createRoot(cell5);
            root.render(
                <>
                    <img src={Checkin} alt="check in" title="check in" className="operation-icon" onClick={() => checkinfunc(obj)} 
                    tabindex="0" onKeyDown={(e)=>{if(e.key === "Enter")return checkinfunc(obj)}}/>
                    <img src={View} alt="view check in records" title="view check in records"
                        className="operation-icon" onClick={() => showCheckIn(obj)} 
                        tabindex="0" onKeyDown={(e)=>{if(e.key === "Enter")return showCheckIn(obj)}}/>
                </>
            )

        }

    }, [tableData, rowsPerPage, currentPage])


    //add course
    const handleAddCourse = (e) => {
        e.preventDefault();
        let course = document.getElementById("courseList").value;
        if (!course || course == "") {
            alert("please select course");
        } else {
            fetch(addCourseURL, {
                method: 'POST',
                body: JSON.stringify({ "course": course }),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(
                (response) => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else if (!response.ok) {
                        throw new Error();
                    } else {
                        return response.json()
                    }
                }
            ).then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("add course succeed!");
                    loadData();
                }
            }
            ).catch((error) => {
                console.error(error);
            })
        }
    };

    const onPageChange = (currPage) => {
        setCurrentPage(currPage);
        return;
    }
    const onRowPerPageChange = (rowPerPage) => {
        // console.log("rowPerPage:"+rowPerPage);
        setRowsPerPage(rowPerPage);
    }

    //student check in
    const checkinfunc = (obj) => {
        obj.date = new Date().toDateString();
        fetch(checkInURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json()
                }
            }
        ).then((data) => {
            console.log(data);
            if (data.message) {
                alert(data.message);
            } else {
                alert("check in succeed!");
            }
        }
        ).catch((error) => {
            console.error(error);
        })
    }
    //show check in records
    const showCheckIn = (obj) => {
        let checkInModal = new Modal(document.getElementById('checkInModal'));
        checkInModal.show();
        loadModalData(obj);
    }

    //load check in data
    const loadModalData = (obj) => {
        fetch(loadCheckInDataURL, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (response) => {
                if (response.redirected) {
                    window.location.href = response.url;
                } else if (!response.ok) {
                    throw new Error();
                } else {
                    return response.json()
                }
            }
        ).then((data) => {
            console.log(data);
            setModalTableData(() => data);
            setModalTotalNumber(data.length);
        }
        ).catch((error) => {
            console.error(error);
        })
    }

    const onModalPageChange = (curr) => {
        setModalCurrentPage(curr);
        return;
    }

    const onModalRowPerPageChange = (curr) => {
        setModalRowsPerPage(curr);
    }

    useEffect(() => {
        modalTable.current.innerHTML = "";

        let start = modalRowsPerPage * (modalCurrentPage - 1);
        for (let i = start; i < start + modalRowsPerPage; i++) {
            if (i >= modalTableData.length) {
                break;
            }
            const row = modalTable.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1)
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = modalTableData[i].name;
            cell3.innerHTML = modalTableData[i].course;
            cell4.innerHTML = modalTableData[i].date;
        }

    }, [modalTableData, modalRowsPerPage, modalCurrentPage])

    return (
        <>
            <nav aria-label="log out">
                <div className="aot-head">
                    <a className="logout" id="LogoutAction" onClick={handleLogout} href="/">
                        Logout
                    </a>
                    <Clock></Clock>
                </div>
            </nav>
            <header>
                <h1 className="centering">
                    <span id="h1-symbol">❙&nbsp;</span>Student Page
                </h1>
            </header>
            <main>
                <form
                    id="registerCourse-form"
                    className="form-inline aot-form"
                    action="/"
                    method="post"
                    onSubmit={handleAddCourse}
                >
                    <div className="form-group">
                        <label htmlFor="courseList" className="aoe-text">
                            Add Course:
                        </label>
                        <select className="form-select" name="courseList" id="courseList">
                        </select>
                    </div>
                    <div className="form-group">
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary aoe-btn-submit">Submit</button>
                        </div>
                    </div>
                </form>
                <table className="table aot-table table-striped" id="gradesTable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">name</th>
                            <th scope="col">course</th>
                            <th scope="col">grade</th>
                            <th scope="col">operation</th>
                        </tr>
                    </thead>
                    <tbody ref={table}></tbody>
                </table>
                <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="studentMain" />
                <div className="modal fade" id="checkInModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog aot-modal">
                        <div className="modal-dialog modal-dialog-scrollable aot-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Check in records</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <table className="table aot-table table-striped" id="modalTable">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">name</th>
                                                <th scope="col">course</th>
                                                <th scope="col">date</th>
                                            </tr>
                                        </thead>
                                        <tbody ref={modalTable}></tbody>
                                    </table>
                                </div>
                                <Pagination totalNumber={modalTotalNumber} pageChange={onModalPageChange} rowPerPageChange={onModalRowPerPageChange} id="studentModule" />
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>

    );
}

StudentPage.propTypes = {};

export default StudentPage;