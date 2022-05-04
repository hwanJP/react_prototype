/*eslint-disable*/
import React, {useState, useEffect} from 'react';
import {Middle} from './Middle'
import {Plota} from './Plota'
import './css/react_default.css';
import './css/all.min.css';
import './css/AdminLTE.min.css';
//import './css/common.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "react-bootstrap";
import { Link } from 'react-router-dom';

// Componant List
// Top       :  상단 chk, selection box 영역
// ModalComp :  
// ModalProc :
// ModalProp :
// Function List
// changeHandler : compModal 등등 display true 값 설정 함수


function Top() {
    const config = {
        headers: {
            'Accept' : 'application/json'
        }
    }

    let [db_data, setDb_data] = useState([])
    const [checkedInputs, setCheckedInputs] = useState([]);
    let [compModal, setCompModal] = useState(false);
    let [procModal, setProcModal] = useState(false);
    let [propModal, setPropModal] = useState(false);

    let [mainColumns, setMainColumns]= useState([]);
    let [mainData, setMainData] = useState([]);
    let [selIndex, setSelIndex] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:8080", config)
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error("Network response was not ok");
        })
        .then(data => {
            setDb_data(data);
            console.log(data);
        })
        .catch(err => console.log(err));
    },[]);

    const changeHandler = (checked, id) =>{
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
            if(id =='AreaA1'){
                setCompModal(!compModal)
            }else if(id =='AreaB1'){
                setProcModal(!compModal)
            }else if(id =='AreaD1'){
                setPropModal(!compModal)
            }
        }else{
            setCheckedInputs(checkedInputs.filter((el) => el !==id));
        }
    };


    let [compCheckedList, setCompCheckedList] = useState('');
    let [procCheckedList, setProcCheckedList] = useState('');
    let [propCheckedList, setPropCheckedList] = useState('');

                                //JSON.stringify
    return (
        <div>
            <h5>항목 모달창</h5>
            <div className="invoice-info">
                <div className="col-sm-3 invoice-col border-bottom-silver border-right-silver">
                    <i className="fa fa-cubes"></i> <b>담지조건 선택</b><br></br>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="form-group">
                                <div className="checkbox">
                                    <input type="checkbox" name="Area[]" id="AreaA1" value="A1" className="active-checkbox" 
                                    onChange={(e)=>{
                                        changeHandler(e.currentTarget.checked, "AreaA1")
                                    }}
                                    checked={checkedInputs.includes("AreaA1") ? true : false}
                                    />
                                         
                                    <label className="text-blue">담지조건 &nbsp; </label>
                                </div>
                            </div>		    		    
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    <small className="text-normal">
                                        <a href="" data-toggle="popover" title="담지조건 선택" data-content="">
                                            <i className="fa fa-info-circle"></i>
                                        </a> 선택 담지조건
                                    </small>
                                </label>
                            <select name="optionsA[]" id="optionsA" multiple="" className="form-control" size = '5' style={ {height : '100px'} }>
                                {db_data.comp && db_data.comp.map((a, index)=>{
                                    return a.display_default == '1' ?  
                                    <option key={index}>{a.Level0_Name}</option> : null
                                    
                                })}
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-3 invoice-col border-bottom-silver border-right-silver">
                    <i className="fa fa-bar-chart"></i> <b> 중합정보선택</b><br></br>
                    <div className="row">
                        <div className="col-sm-6">
                        <div className="form-group">
                            <div className="checkbox">
                                <input type="checkbox" name="Area[]" id="AreaB1" value="B1" className="active-checkbox" 
                                onChange={(e)=>{
                                    changeHandler(e.currentTarget.checked, "AreaB1")
                                }}
                                checked={checkedInputs.includes("AreaB1") ? true : false}
                                />
                                <label className="text-blue">중합정보 &nbsp; </label>
                            </div>
                            </div>		    
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label>
                                    <small className="text-normal"><a href="" data-toggle="popover" title="중합정보선택" data-content=""><i className="fa fa-info-circle">
                                        </i></a> 선택 중합정보
                                    </small>
                                </label>
                                <select name="optionsB[]" id="optionsB" multiple="" className="form-control" size = '5' style={ {height : '100px'} }>
                                    {db_data.proc && db_data.proc.map((a, index)=>{
                                        return a.display_default == '1' ?  
                                        <option key={index}>{a.Level0_Name}</option> : null
                                        
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-sm-3 invoice-col border-bottom-silver">
                    <i className="fa fa-area-chart"></i> <b>1차물성선택</b><br></br>
                    <div className="row">
                        <div className="col-sm-6">
                        <div className="form-group">
                            <div className="checkbox">
                                <input type="checkbox" name="Area[]" id="AreaD1" value="D1" className="active-checkbox" 
                                onChange={(e)=>{
                                    changeHandler(e.currentTarget.checked, "AreaD1")
                                }}
                                checked={checkedInputs.includes("AreaD1") ? true : false}
                                />
                                <label className="text-blue"> 1차물성 &nbsp; </label>
                            </div>
                            </div>		    		    
                        </div>
                        <div className="col-sm-6">
                            <div className="form-group">
                            <label><small className="text-normal"><a href="" data-toggle="popover" title="1차물성선택" data-content=""><i className="fa fa-info-circle"></i></a> 선택 1차물성</small></label>
                            <select name="optionsD[]" id="optionsD" multiple="" className="form-control" size = '5' style={ {height : '100px'} }>
                                {db_data.prop && db_data.prop.map((a, index)=>{
                                    return a.display_default == '1' ?  
                                    <option key={index}>{a.Level0_Name}</option> : null
                                        
                                })}
                            </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <form action="" method="POST">
            {
                compModal ===true ?
                <ModalComp db_data={db_data} modalClose={setCompModal} checkedList={setCompCheckedList}></ModalComp> :null
            }
            {
                procModal ===true ?
                <ModalProc db_data={db_data} modalClose={setProcModal}></ModalProc> :null
            }
            {
                propModal ===true ?
                <ModalProp db_data={db_data} modalClose={setPropModal}></ModalProp> :null
            }
            </form>

            <Middle db_data={db_data} mainColumns={mainColumns} setMainColumns={setMainColumns} 
            mainData={mainData} setMainData={setMainData} selIndex={selIndex} setSelIndex={setSelIndex}></Middle>
            <Plota mainColumns={mainColumns} setMainColumns={setMainColumns} 
            mainData={mainData} setMainData={setMainData}
            selIndex={selIndex} setSelIndex={setSelIndex}></Plota>            
        </div>
    );
}

function ModalComp(props){

    return (
        
        <div className="comp_modal">
            <div className="comp_modal_body">
                <table className="table_rowspan" id="comp_table">
                    <thead>
                    <tr>
                        <th>구분명</th>
                        <th>그룹명</th>
                        <th>항목명</th>
                        <th>선택</th>
                        <th>단위</th>
                        <th>Full-Name</th>
                        <th>등록인</th>
                        <th>등록일</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.db_data.comp && props.db_data.comp.map((a, index)=>{
                            a.display_default == '1' ? checked[index] = "checked" : checked[index] = ""
                            //console.log(a.Level0_Name,checked[index]);
                            return(
                                <tr key={a.comp_no}>  
                                    <td>{a.Level2_Name}</td>
                                    <td>{a.Level1_Name}</td>
                                    <td>{a.Level0_Name}</td>
                                    <td><input type='checkbox' className='comp_chk' name='comp_chk_name' 
                                    value={a.comp_no} defaultChecked = {checked[index]}/></td>
                                    <td>{a.unit}</td>
                                    <td>{a.fullname}</td>
                                    <td>{a.person_create}</td>
                                    <td>{a.date_create}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{display:'flex'}}>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '5px', float:'left'}}>
                        <button type="button" className="all_check_comp">전체선택</button>
                    </div>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '10px', float:'left'}}>
                        <button type="button" className="check_out_comp">전체해제</button>
                    </div>
                    <div className="pull-right text-center" style={{width: '60%', paddinGright: '5px', float:'right'}}>
                        <button type="button" onClick={()=>{props.modalClose(false)}} id="hide_comp">선택하기</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
function ModalProc(props){
    let checked = []

    return (
        <div className="proc_modal">
            <div className="proc_modal_body">
                <table className="table_rowspan" id ="proc_table">
                    <thead>
                    <tr>
                        <th>구분명</th>
                        <th>그룹명</th>
                        <th>항목명</th>
                        <th>선택</th>
                        <th>단위</th>
                        <th>Full-Name</th>
                        <th>등록인</th>
                        <th>등록일</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.db_data.proc && props.db_data.proc.map((a, index)=>{
                            a.display_default == '1' ? checked[index] = "checked" : checked[index] = ""
                            return(
                                <tr key={a.proc_no}>  
                                    <td>{a.Level2_Name}</td>
                                    <td>{a.Level1_Name}</td>
                                    <td>{a.Level0_Name}</td>
                                    <td><input type='checkbox' className='proc_chk' name='proc_chk_name' 
                                    value={a.proc_no} defaultChecked = {checked[index]}/></td>
                                    <td>{a.unit}</td>
                                    <td>{a.fullname}</td>
                                    <td>{a.person_create}</td>
                                    <td>{a.date_create}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{display:'flex'}}>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '5px', float:'left'}}>
                        <button type="button" className="all_check_proc pull-left">전체선택</button>
                    </div>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '10px', float:'left'}}>
                        <button type="button" className="check_out_proc pull-left">전체해제</button>
                    </div>
                    <div className="pull-right text-center" style={{width: '60%', paddinGright: '5px', float:'right'}}>
                        <button type="button" onClick={()=>{props.modalClose(false)}} id="hide_proc">선택하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
function ModalProp(props){
    let checked = []

    return (
        <div className="prop_modal">
            <div className="prop_modal_body">
                <table className="table_rowspan" id ="prop_table">
                    <thead>
                    <tr>
                        <th>구분명</th>
                        <th>그룹명</th>
                        <th>항목명</th>
                        <th>선택</th>
                        <th>단위</th>
                        <th>Full-Name</th>
                        <th>등록인</th>
                        <th>등록일</th>
                    </tr>
                    </thead>
                    <tbody>
                        {props.db_data.prop && props.db_data.prop.map((a, index)=>{
                            a.display_default == '1' ? checked[index] = "checked" : checked[index] = ""
                            return(
                                <tr key={a.prop_no}>  
                                    <td>{a.Level2_Name}</td>
                                    <td>{a.Level1_Name}</td>
                                    <td>{a.Level0_Name}</td>
                                    <td><input type='checkbox' className='prop_chk' name='prop_chk_name' 
                                    value={a.prop_no} defaultChecked = {checked[index]}/></td>
                                    <td>{a.unit}</td>
                                    <td>{a.fullname}</td>
                                    <td>{a.person_create}</td>
                                    <td>{a.date_create}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div style={{display:'flex'}}>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '5px', float:'left'}}>
                        <button type="button" className="all_check_prop">전체선택</button>
                    </div>
                    <div className="pull-left text-center" style={{width: '20%', paddinGright: '10px', float:'left'}}>
                        <button type="button" className="check_out_prop">전체해제</button>
                    </div>
                    <div className="pull-right text-center" style={{width: '60%', paddinGright: '5px', float:'right'}}>
                        <button type="button" onClick={()=>{props.modalClose(false)}} id="hide_prop">선택하기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Top;