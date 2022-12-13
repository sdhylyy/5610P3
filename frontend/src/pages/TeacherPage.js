import React, { useState, useEffect, useRef } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";
import "./TeacherPage.css";
import Clock from "../components/Clock";
import View from '../images/view.png';
import Grading from '../images/edit.png';
import Pagination from '../components/Pagination';
import { createRoot } from "react-dom/client";
import { Modal } from 'bootstrap'

function TeacherPage() {

    const logoutURL = '/api/logout';
    const loadDataURL = '/api/allGrades';
    const searchURL = '/api/search';
    const loadCheckInDataURL = '/api/getCheckInByName';
    const gradingURL = '/api/giveGrades';


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
    const gradingTable = useRef(null);

    const navigate = useNavigate();

    //logout
    const handleLogout = (e) => {
        console.log("fdf");
        fetch(logoutURL).then(
            (res) => {
                if (res.ok) {
                    navigate("/");
                }
            }
        )
        e.preventDefault()
    }

    UseCheckMsg();

    //load data int to table
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
        loadData();
    }, []);

    useEffect(() => {
        // console.log(table.current);
        // console.log(table.current.hasChildNodes());
        table.current.innerHTML = "";
        // console.log("df:" + rowsPerPage);

        let start = rowsPerPage * (currentPage - 1);

        for (let i = start; i < start + rowsPerPage; i++) {
            if (i >= tableData.length) {
                break;
            }
            const row = table.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.innerHTML = i + 1;
            cell2.innerHTML = tableData[i].name;
            cell3.innerHTML = tableData[i].course;

            if (tableData[i].grades) {
                cell4.innerHTML = tableData[i].grades;
            }

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
                    <img src={View} tabindex="0" alt="view check in records" title="view check in records"
                        className="operation-icon" onClick={() => showCheckIn(obj)} onKeyDown={(e)=>{if(e.key === "Enter")return showCheckIn(obj)}}/>
                    <img src={Grading} tabindex="0" alt="Grading" title="Grading" className="operation-icon"
                        onClick={() => showGrading(obj)} onKeyDown={(e)=>{if(e.key === "Enter")return showGrading(obj)}}/>
                </>
            )

        }

    }, [tableData, rowsPerPage, currentPage])

    const onPageChange = (currPage) => {
        setCurrentPage(currPage);
        return;
    }
    const onRowPerPageChange = (rowPerPage) => {
        // console.log("rowPerPage:" + rowPerPage);
        setRowsPerPage(rowPerPage);
    }

    //searce courses
    const handleSearchCourse = (e) => {
        if (e) {
            e.preventDefault();
        }
        let obj = {};
        let course = document.getElementById("course").value;
        let name = document.getElementById("name").value;
        if (course && course != "") {
            obj.course = course;
        }
        if (name && name != "") {
            obj.name = name;
        }
        fetch(searchURL, {
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
            setTableData(() => data);
            setTotalNumber(data.length);
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


    //show grading table
    const showGrading = (obj) => {
        gradingTable.current = new Modal(document.getElementById('gradingModal'));
        gradingTable.current.show();
        document.getElementById('gradingCourse').innerHTML = "Course: " + obj.course;
        document.getElementById('gradingName').innerHTML = "Name: " + obj.name;
    }

    //submit grading
    const submitGrading = () => {
        let obj = {
            "name": document.getElementById('gradingName').innerHTML.split(" ")[1],
            "course": document.getElementById('gradingCourse').innerHTML.split(" ")[1],
            "grades": document.getElementById('score').value
        }
        console.log(obj);
        if (!obj.name || obj.name === "") {
            alert("Name mustn't be empty");
            return;
        }
        if (!obj.course || obj.course === "") {
            alert("Course mustn't be empty");
            return;
        }
        if (!obj.grades || obj.grades === "") {
            alert("Score mustn't be empty");
            return;
        }
        if (isNaN(obj.grades) || isNaN(parseFloat(obj.grades))) {
            alert("invalid input");
            return;
        }
        if(parseFloat(obj.grades)<0||parseFloat(obj.grades)>100){
            alert("grades must within 0 to 100");
            return;
        }
        fetch(gradingURL, {
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
                    gradingTable.current.hide();
                    handleSearchCourse();
                }
            }
        ).catch((error) => {
            console.error(error);
        })
    }

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
                    <span id="h1-symbol">❙&nbsp;</span>Teacher Page
                </h1>
            </header>
            <main>
                <form
                    id="Search-form"
                    className="form-inline aot-form"
                    action="/"
                    method="post"
                    onSubmit={handleSearchCourse}
                >
                    <div className="form-group">
                        <label htmlFor="name" className="aoe-text">
                            Name:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="course" className="aoe-text">
                            Course:
                        </label>
                        <br />
                        <input
                            type="text"
                            name="course"
                            id="course"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary aoe-btn-submit">Search</button>
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
                <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} id="teacherMain"/>
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
                                <Pagination totalNumber={modalTotalNumber} pageChange={onModalPageChange} rowPerPageChange={onModalRowPerPageChange} id="teacherModule"/>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="gradingModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel2" aria-hidden="true">
                    <div className="modal-dialog aot-modal">
                        <div className="modal-dialog modal-dialog-scrollable aot-modal">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel2">Grading</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body">
                                    <div className="grading-label">
                                        <label className="aoe-text" id="gradingCourse">
                                            course:
                                        </label>
                                        <label className="aoe-text" id="gradingName">
                                            name:
                                        </label>
                                    </div>
                                    <div className="form-group grading-inputgroup">
                                        <label htmlFor="score" className="aoe-text grading-input-label">
                                            Score:
                                        </label>
                                        <input
                                            type="text"
                                            name="score"
                                            id="score"
                                            className="form-control"
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary aoe-btn-submit" onClick={submitGrading}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}

TeacherPage.propTypes = {};

export default TeacherPage;