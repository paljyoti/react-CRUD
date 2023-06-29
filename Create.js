import React, { useState } from 'react'
import "./Create.css";


export default function Create() {

const [inputs,setInputs]=useState(
   {
   name:"",
   email:"",
   }
);
const [tableData,setTableData]=useState([]);
const [editClick,setEditClick]=useState( false);
const [editIndex,setEditIndex]=useState("");
const handleChange=(e)=>{
   setInputs({
      ...inputs,
      [e.target.name]:e.target.value,
   });
};

const handleSubmit=(e)=>{
e.preventDefault();
// console.log('inputs',inputs);
if(editClick){
   const tempTableData = tableData;
Object.assign(tempTableData[editIndex],inputs)
 setTableData([...tempTableData,inputs])
 setEditClick(true);
 setInputs({
   name:"",
   email:"",
});
}
else{
        setTableData( [...tableData,inputs]);
         setInputs({
           name:"",
           email:"",
   });
}
}; 

const handleDelete=(index)=>{
   const filterData=tableData.filter((item,i)=> i !==index);
   setTableData(filterData);
   // console.log(filterData);

}
const handleEdit=(index)=>{
   const tempData=tableData[index];  
   // const findData= tableData.find((item,i)=> i ===index);


setInputs( {  name:tempData.name, email:tempData.email } );
setEditClick(true);
setEditIndex(index);
console.log(tempData);

// console.log('tableData',tableData);

}
  return (
    <div className="container">
        <h1 className="text-center">Crud app </h1>
      <div  className="box">
         <form onSubmit={handleSubmit} >
           <div className="flex flex-col">
             <label>Name</label>
              <input  name='name' value={inputs.name} onChange={handleChange} /> 
            </div> <br />
           <div className="flex flex-col">
             < label>Email</label>
              <input  name='email' value={inputs.email} onChange={handleChange}  /> 
            </div> 
             <button  type='submit' className="btn">{editClick ? "update" : "Add"}</button>
         </form> 
      </div>  
      <div>
         <table className="tbl">
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
               </tr>
            </thead>
            <tbody>
               {
                  tableData.map((item,i)=>(
                   <tr>
                     <td>{item.name}</td>
                     <td>{item.email}</td>
                     <td>
                        <button onClick={()=>handleEdit(i)} >Edit</button>
                        <button onClick={()=>handleDelete(i)}>Delete</button>
                     </td>
                   </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
    </div>
  )
}

