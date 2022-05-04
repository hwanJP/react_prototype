/*eslint-disable*/
import React, {useState, useEffect, useMemo} from 'react';
import {useTable, useSortBy, useRowSelect} from 'react-table';
//import Plot from 'react-plotly.js';
import Plotly from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);
import './css/react_default.css';
import './css/all.min.css';
import './css/AdminLTE.min.css';
//import './css/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate])
  
      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      )
    }
  )

function Plota(props){
    let [options, setOptions] = useState([]);
    let [selectX1, setSelectX1] = useState('');
    let [selectX2, setSelectX2] = useState('');
    let [selectX3, setSelectX3] = useState('');
    let [selectY, setSelectY] = useState('');
    let [x1Array, setX1Array] = useState([]);
    let [x2Array, setX2Array] = useState([]);
    let [x3Array, setX3Array] = useState([]);
    let [yArray, setYArray] = useState([]);
    let [subData, setSubData] = useState([]);
    
    useEffect(() => {
        makeOption();
        makeSubData();
    }, [props.mainColumns, props.selIndex]);

    const onChangeOptionX=(e)=>{
        setSelectX1(e.target.value);
    }
    const onChangeOptionY=(e)=>{
        setSelectY(e.target.value);
    }

    const makeOption=()=>{
        
        if(props.mainColumns.length > 0){
            let temp = Object.values(props.mainColumns[0]);
            if(temp[0]!='칼럼 선택'){
                let option = props.mainColumns;
                let defaultOption = {
                    Header: '칼럼 선택',
                    accessor: ''
                }
                option.unshift(defaultOption);
                setOptions(option);
            }
        }
    }

    const makePlot=()=>{
        let x = [];
        let y = [];
        for (const value of Object.values(props.mainData)){
            for (const [key2, value2] of Object.entries(value)){
                if(key2===selectX1){
                    x.push(value2);
                }else if(key2===selectY){
                    y.push(value2);
                }
            }
        }
        
        setX1Array(x);
        setYArray(y);
    }

    const makeSubData = ()=> {
        let data = [];
        for (const [key, value] of Object.entries(props.mainData)){
            for(let i = 0;i<props.selIndex.length;i++){
                if(key==props.selIndex[i]){
                    data.push(props.mainData[key]);
                }
            }
        }
        setSubData(data);
        console.log("seldata", data);
    }

    return(
        <div >
            <div className="text-center" style={{position:'absolute', left:'50%', transform:'translate(-50%, -50%)'}}> 
                <label style={{float:'left'}}> Y (종속 변수): </label>
                <select id = "column_sel2" onChange={onChangeOptionY} style={{float:'left'}}>
                    {options.length===0 ? <option value="">칼럼 선택</option> : 
                    options.map((option, index) =>{
                        return <option key={index} value={option.accessor}>{option.Header}</option>
                    })}
                    
                </select>
                
            </div>
            <br></br>
            <div stlye = {{display:'flex', flexDirection:'column'}}>
                <div id="select_andplot1" style={{border:'1px solid silver', width: '33.3%', float:'left'}}>

                    <div id="select_boxes" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div className="text-center" >
                            <label style={{float:'left'}}> X (독립 변수1): </label>
                            <select id = "column_sel1" onChange={onChangeOptionX} style={{float:'left'}}>
                                {options.length===0 ? <option value="">칼럼 선택</option> :
                                options.map((option, index) =>{
                                    return <option key={index} value={option.accessor}>{option.Header}</option>
                                })}
                                
                            </select>
                        </div>
                        <p></p>
                        
                    </div>

                    <div className="text-center" id= "plot_btn">
                        <input className='show_plot' type='button' onClick={makePlot} value='Scatter Plot'></input>
                    </div>
                    <div className="text-center" id= "myPlot1" >
                    <Plot
                        data={[
                            {
                                x: x1Array,
                                y: yArray,
                                selectedpoints : props.selIndex,
                                type: 'scatter',
                                mode: 'markers',
                                marker: {color: 'red'},
                                selected: {
                                    marker: {
                                    color: '#ff0000',
                                    opacity: 0.8
                                    }
                                },
                                unselected: {
                                    marker: {
                                        color: '#0000ff',
                                        opacity: 0.5
                                    }
                                }
                            }
                        ]}
                        layout={{width: 600, height: 400, xaxis: {title: "x"},
                            yaxis: {title: "y"}, title: 'Scatter Plot'}}
                        onSelected={(ev) =>{
                            let indx = [];
                            ev.points.forEach( function(pt){
                                indx.push(pt.pointNumber);
                            });
                            props.setSelIndex(indx);
                        }}
                    />
                    </div>
                </div>
            <div id="select_andplot2" style={{border:'1px solid silver', width: '33.3%', float:'left'}}>
                <Plotb mainData={props.mainData} options={options} 
                selectX2={selectX2} setSelectX2={setSelectX2}
                x2Array={x2Array} setX2Array={setX2Array} 
                yArray={yArray} setYArray={setYArray}
                selectY={selectY} selIndex={props.selIndex} setSelIndex={props.setSelIndex}></Plotb>
            </div>
            <div id="select_andplot3" style={{border:'1px solid silver', width: '33.3%', float:'left'}}>
                <Plotc mainData={props.mainData} options={options} 
                selectX3={selectX3} setSelectX3={setSelectX3}
                x3Array={x3Array} setX3Array={setX3Array} 
                yArray={yArray} setYArray={setYArray}
                selectY={selectY} selIndex={props.selIndex} setSelIndex={props.setSelIndex}></Plotc>
            </div>
            </div>
            <SubTable subColumns={props.mainColumns} mainData={props.mainData}
            setMainData={props.setMainData} subData={subData} setSubData={setSubData}
            selIndex={props.selIndex} setSelIndex={props.setSelIndex}
            x1Array={x1Array} x2Array={x2Array} x3Array={x3Array}
            setX1Array={setX1Array} setX2Array={setX2Array} setX3Array={setX3Array}
            yArray={yArray} setYArray={setYArray}></SubTable>
        </div>
    );
}

function SubTable(props){
    let columns = props.subColumns;
    let data = props.subData;

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        selectedFlatRows,
        state: { selectedRowIds },
        } = useTable({
            columns,
            data,
        },
        useSortBy,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
              // Let's make a column for selection
              {
                id: 'selection',
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                  <div>
                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                  </div>
                ),
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ row }) => (
                  <div>
                    <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                  </div>
                ),
              },
              ...columns,
            ])
          }
        );

    const delMaindata=()=>{
        let data = props.mainData;
        let data2 = [];
        for(let i=0;i<props.selIndex.length;i++){
            delete data[props.selIndex[i]];
        }
        
        console.log(data);
        for(let i=0;i<data.length;i++){
            if(data[i]){
                //console.log(Object.values(data[i]));
                data2.push(data[i]);
            }
        }
        props.setMainData(data2);
        delPlotPoint();
        delSelData();
    }

    const delPlotPoint=()=>{
        let x1 = props.x1Array;
        let x2 = props.x2Array;
        let x3 = props.x3Array;
        let y = props.yArray;

        let x1s = [];
        let x2s = [];
        let x3s = [];
        let ys = [];

        for(let i=0;i<props.selIndex.length;i++){
            delete x1[props.selIndex[i]];
            delete x2[props.selIndex[i]];
            delete x3[props.selIndex[i]];
            delete y[props.selIndex[i]];
        }

        for(let i=0;i<x1.length;i++){
            if(x1[i]){
                x1s.push(x1[i]);
                x2s.push(x2[i]);
                x3s.push(x3[i]);
                ys.push(y[i]);
            }
        }
        props.setX1Array(x1s);
        props.setX2Array(x2s);
        props.setX3Array(x3s);
        props.setYArray(ys);
    }
    
    const delSelData=()=>{
        let data = props.subData;
        let index = [];

        let data2 = [];

        for(let i=0;i<props.selIndex.length;i++){
            delete data[props.selIndex[i]];
        }

        for(let i=0;i<data.length;i++){
            if(data[i]){
                data2.push(data[i]);
            }
        }

        props.setSubData(data2);
        props.setSelIndex(index);
    }

    const delUnchk=()=>{
        let data = [];
        let index = [];
        for (const key of Object.keys(props.subData)){
            for(const key2 of Object.keys(selectedRowIds)){
                if(key==key2){
                    data.push(props.subData[key]);
                }
            }
        }
        for(const key of Object.keys(selectedRowIds)){
            index.push(props.selIndex[key]);
        }
        props.setSubData(data);
        props.setSelIndex(index);
    }

    return(
        <div id="select_grid" style={{display:'flex', flexDirection:'column', width:'100%', padding: '20px'}}>
            <div >
                <div id = "delArea" style={{width:'50%', maxWidth:'100px',float:'left'}}>
                    <input className='del_data' type='button' onClick={delMaindata}value='Delete Data'></input>
                </div>
                <div id = "delRow" style={{width:'50%', maxWidth:'180px', float:'left'}}>
                    <input className='del_row' type='button' onClick={delUnchk} value='Delete Unchecked Row'></input>
                </div>
                <div id = "count_delData" style={{width:'50%',maxWidth:'160px', float:'left'}}>
                </div>
            </div>
            
            <div className= "table_wrapper" id ="selectTable" >

                <table className="display table_colspan" id="selTable" style={{float:'left'}}
                {...getTableProps()}>
                <thead id="selThead">
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
                      
                    <tbody id="selTbody" {...getTableBodyProps()}>
                        {rows.map((row, i) => {
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
            
        </div>
    );
}

function Plotb(props){

    const onChangeOptionX=(e)=>{
        props.setSelectX2(e.target.value);
    }

    const makePlot=()=>{
        let x = [];
        let y = [];
        for (const value of Object.values(props.mainData)){
            for (const [key2, value2] of Object.entries(value)){
                if(key2===props.selectX2){
                    x.push(value2);
                }else if(key2===props.selectY){
                    y.push(value2);
                }
            }
        }
        props.setX2Array(x);
        props.setYArray(y);
    }

    return(
        <div>
            <div id="select_boxes2" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <div className="text-center" >
                    <label style={{float:'left'}}> X (독립 변수2): </label>
                    <select id = "column_sel3" onChange={onChangeOptionX} style={{float:'left'}}>
                        {props.options.length===0 ? <option value="">칼럼 선택</option> :
                        props.options.map((option, index) =>{
                            return <option key={index} value={option.accessor}>{option.Header}</option>
                        })}
                        
                    </select>
                </div>
                <p></p>
                
            </div>

            <div className="text-center" id= "plot_btn2">
                <input className='show_plot' type='button' onClick={makePlot} value='Scatter Plot'></input>
            </div>
            <div className="text-center" id= "myPlot2" >
            <Plot
                data={[
                    {
                        x: props.x2Array,
                        y: props.yArray,
                        selectedpoints : props.selIndex,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: 'red'},
                        selected: {
                            marker: {
                            color: '#ff0000',
                            opacity: 0.8
                            }
                        },
                        unselected: {
                            marker: {
                                color: '#0000ff',
                                opacity: 0.5
                            }
                        }
                    }
                ]}
                layout={{width: 600, height: 400, xaxis: {title: "x2"},
                    yaxis: {title: "y"}, title: 'Scatter Plot'}}
                onSelected={(ev) =>{
                    let indx = [];
                    ev.points.forEach( function(pt){
                        indx.push(pt.pointNumber);
                    });
                    props.setSelIndex(indx);
                }}
            />
            </div>
        </div>
    );
}

function Plotc(props){
    const onChangeOptionX=(e)=>{
        props.setSelectX3(e.target.value);
    }

    const makePlot=()=>{
        let x = [];
        let y = [];
        for (const value of Object.values(props.mainData)){
            for (const [key2, value2] of Object.entries(value)){
                if(key2===props.selectX3){
                    x.push(value2);
                }else if(key2===props.selectY){
                    y.push(value2);
                }
            }
        }
        props.setX3Array(x);
        props.setYArray(y);
    }

    return(
        <div>
            <div id="select_boxes3" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <div className="text-center" >
                    <label style={{float:'left'}}> X (독립 변수3): </label>
                    <select id = "column_sel4" onChange={onChangeOptionX} style={{float:'left'}}>
                        {props.options.length===0 ? <option value="">칼럼 선택</option> :
                        props.options.map((option, index) =>{
                            return <option key={index} value={option.accessor}>{option.Header}</option>
                        })}
                        
                    </select>
                </div>
                <p></p>
                
            </div>

            <div className="text-center" id= "plot_btn3">
                <input className='show_plot' type='button' onClick={makePlot} value='Scatter Plot'></input>
            </div>
            <div className="text-center" id= "myPlot3" >
            <Plot
                data={[
                    {
                        x: props.x3Array,
                        y: props.yArray,
                        selectedpoints : props.selIndex,
                        type: 'scatter',
                        mode: 'markers',
                        marker: {color: 'red'},
                        selected: {
                            marker: {
                            color: '#ff0000',
                            opacity: 0.8
                            }
                        },
                        unselected: {
                            marker: {
                                color: '#0000ff',
                                opacity: 0.5
                            }
                        }
                    }
                ]}
                layout={{width: 600, height: 400, xaxis: {title: "x3"},
                    yaxis: {title: "y"}, title: 'Scatter Plot'}}
                onSelected={(ev) =>{
                    let indx = [];
                    ev.points.forEach( function(pt){
                        indx.push(pt.pointNumber);
                    });
                    props.setSelIndex(indx);
                    
                }}
            />
            </div>
        </div>
    );

}

export {Plota};
