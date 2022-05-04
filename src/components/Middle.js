/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useTable, useSortBy, usePagination} from 'react-table';
import {useAsync} from 'react-async';
import './css/react_default.css';
import './css/all.min.css';
import './css/AdminLTE.min.css';
//import './css/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

// Componant  List 
// 1. Middle    :  메인 테이블 만들기 전에 axios 사용
// 2. Table     :  메인 테이블 useTable 을 통해 구현
// Function   List
//  1-1. fetchData : axios 통신 함수 (await 로 data set 해야함)
//  1-2. queryPython : API에 전달할 comp prop prop no 값 생성 함수
//  1-3. getColumns  : useTable Header 생성 함수 (기존 res json 값은 사용 못함)
//  1-4. getData     : useTable accessor 생성 함수
//

function Middle(props) {

    let py_data = [];
    let [dataCount, setDataCount] = useState(props.mainData.length);
    
    let result_comp;
    let result_proc;
    let result_prop;
    
    //console.log(props.db_data);

    useEffect(() =>{
        setDataCount(props.mainData.length);
    }, [props.mainData]);

    const fetchData = async () => {
        
        queryPython();
        
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
        try {
            let res = await axios.post('http://localhost:8080/ajax_react',
                {
                    comp :result_comp,
                    proc :result_proc,
                    prop :result_prop
                }
                ,config)
            py_data = await res.data;
            props.setMainColumns(getColumns(py_data));
            props.setMainData(getData(py_data));
        }
        catch(error){
            console.log(error);
        }

    };
    
    const queryPython = () =>{
        const comp = 'comp:'; 
        const proc = 'proc:';
        const prop = 'prop:';
        let add_comp = '';
        let add_proc = '';
        let add_prop = '';
        let i = 0;
    
        props.db_data.comp && props.db_data.comp.map((a)=>{
            if(a.display_default=='1'){
                if(i == 0){
                    add_comp = comp + a.comp_no;
                    i = i+1;
                }else{
                    add_comp = add_comp + ',' + a.comp_no;
                }
            }
        })
        i = 0;
        props.db_data.proc && props.db_data.proc.map((a)=>{
            if(a.display_default=='1'){
                if(i == 0){
                    add_proc = proc + a.proc_no;
                    i = i+1;
                }else{
                    add_proc = add_proc + ',' + a.proc_no;
                }    
            }
        })
        i = 0;
        props.db_data.prop && props.db_data.prop.map((a)=>{
            if(a.display_default=='1'){
                if(
                    i == 0){
                    add_prop = prop + a.prop_no;
                    i = i+1;
                }else{
                    add_prop = add_prop + ',' + a.prop_no;
                }
            }
        })
        
        result_comp = add_comp;
        result_proc = add_proc;
        result_prop = add_prop;
        
    }

    const getColumns= (py_data) =>{
        let headKey = Object.keys(py_data);
        return Object.keys(py_data[headKey[0]]).map((key, index) => {
            let parts = key.split('_');
            return {
                Header: parts[2],
                accessor: 'column' + index
            };
        });
    }

    const getData= (py_data) =>{
        let index = 0;
        let dataArray = [];
        for (const [key, value] of Object.entries(py_data)){
            let dataObject = {};
            index = 0;
            for (const [key2, value2] of Object.entries(value)){
                
                dataObject['column' + index] = value2;
                
                index = index + 1;
            }
            dataArray.push(dataObject);
        }
        return dataArray;
    }
    
    return (
        <div>
            <div className="text-center" style={{width: '100%', paddingRight: '5px'}}>
                <button type="submit" onClick={fetchData}
                    id="show">조회하기</button>
            </div>
            <h5>실험데이터 조회</h5>
            <label>데이터개수 : {dataCount}</label>
            <Table mainColumns={props.mainColumns} mainData={props.mainData}></Table>
        </div>
    );
}

function Table(props) {

    let columns = props.mainColumns;
    let data = props.mainData;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
        } = useTable({
            columns,
            data,
            initialState: { pageIndex: 2 },
        },
        useSortBy,
        usePagination
        );

    return(
        <div >
            <div className= "table_wrapper" id="table_wrapper1">
            <table className="display table_colspan" {...getTableProps()} >
                <thead id="dataThead">
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted
                                ? column.isSortedDesc
                                    ? ' 🔽'
                                    : ' 🔼'
                                : ''}
                            </span>
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody id="dataTbody" {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            </tr>
                        );
                        })}
                </tbody>
            </table>
            </div>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
                </button>{' '}
                <span>
                Page{' '}
                <strong>
                    {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
                </span>
                <span>
                | Go to page:{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}
                <select
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </div>
            <p></p>
        </div>
    );
}
export {Middle};