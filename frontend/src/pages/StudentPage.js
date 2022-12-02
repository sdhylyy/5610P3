import React, { useState, useEffect, useRef } from "react";
import UseCheckMsg from "../hooks/UseCheckMsg";
import { useNavigate } from "react-router-dom";
import "./StudentPage.css";
import Clock from "../components/Clock";
import Pagination from "../components/Pagination";

function StudentPage() {

    const deployURL = "http://localhost:3000/";
    // const deployURL="https://intense-lowlands-69751.herokuapp.com/";

    const logoutURL = deployURL + 'api/logout';
    const initCourseListURL = deployURL + 'api/getCourseList';
    const addCourseURL = deployURL + 'api/addCourse';
    const loadDataURL= deployURL + 'api/getByName';

    const [tableData, setTableData] = useState([]);
    const [rowsPerPage,setRowsPerPage]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalNumber,setTotalNumber]=useState(0);
    const initPagitionFunc=useRef(null);
    const table=useRef(null);

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        fetch(logoutURL).then(
            (res) => {
                if (res.ok) {
                    navigate("/?msg=logout succeed");
                }
            }
        )

    }

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

    const loadData=()=>{
        fetch(loadDataURL).then(
            (res) => {
                if (res.redirected) {
                    window.location.href = res.url;
                } else {
                    return res.json()
                }
            }
        ).then(
            (data)=>{
                console.log(data);
                setTableData(()=>data);
                setTotalNumber(data.length);
            }
        ).catch((error)=>{
            console.error(error);
        })
    }



    useEffect(() => {
        initCourseList();
        loadData();
    }, []);

    useEffect(()=>{
        // console.log(table.current);
        // console.log(table.current.hasChildNodes());
        table.current.innerHTML="";
        console.log("df:"+rowsPerPage);

        let start=rowsPerPage*(currentPage-1);
        for(let i=start;i<start+rowsPerPage;i++){
            if(i>=tableData.length){
                break;
            }
            const row = table.current.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
          
            cell1.innerHTML = i+1;
            cell2.innerHTML = tableData[i].name;
            cell3.innerHTML = tableData[i].course;
          
            if(tableData[i].grades){
                cell4.innerHTML = tableData[i].grades;
            }

        }

    },[tableData,rowsPerPage,currentPage])


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
                    } else {
                        return response.json()
                    }
                }
            ).then((data) => {
                if (data.message) {
                    alert(data.message);
                } else {
                    alert("add course succeed!");
                }
            }
            ).catch((error) => {
                console.error(error);
            })
        }
    };

    const onPageChange=(currPage)=>{
        setCurrentPage(currPage);
        return;
    }
    const onRowPerPageChange=(rowPerPage)=>{
        console.log("rowPerPage:"+rowPerPage);
        setRowsPerPage(rowPerPage);
    }



    return (
        <>
            <div className="aot-head">
                <a className="logout" id="LogoutAction" onClick={handleLogout} href="/">
                    Logout
                </a>
                <Clock></Clock>
            </div>
            <h1 className="centering">
                <span id="h1-symbol">❙&nbsp;</span>Student Page
            </h1>
            <form
                id="registerCourse-form"
                className="form-inline aot-form"
                action="/"
                method="post"
                onSubmit={handleAddCourse}
            >
                <div className="form-group">
                    <label htmlFor="courseList" className="text-info">
                        Add Course:
                    </label>
                    <select className="form-select" name="courseList" id="courseList">
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="submit"
                        className="btn btn-info btn-md aot-button"
                        defaultValue="submit"
                    />
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
            <Pagination totalNumber={totalNumber} pageChange={onPageChange} rowPerPageChange={onRowPerPageChange} callbackRef={initPagitionFunc}/>
        </>
    );
}

StudentPage.propTypes = {};

export default StudentPage;