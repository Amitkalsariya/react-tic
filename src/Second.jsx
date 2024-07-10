import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const Second = () => {
    const [data,setData]=useState([])
    const token="b1720612077938fgm547026002wr"
    useEffect(()=>{
        an()
    },[])
     function an()
     {
        axios.get("https://service.apikeeda.com/api/v1/hospital",{
            headers:{
                "x-apikeeda-key": token
              }
        })
        .then((res)=>{
            console.log(res.data.data);
            setData(res.data.data)

        })
        .catch((er)=>{
            console.log(er);
        })
     }
     const handleSubmit=(values)=>{
        axios.post("https://service.apikeeda.com/api/v1/hospital",values,{
            headers:{
                "x-apikeeda-key": token
              }
        })
        .then((res)=>{
            console.log(res);
           an();
        })
        .catch((er)=>{
            console.log(er);
        
        })
     }
  return (
    <div>
            <Formik
            enableReinitialize
            initialValues={
                {
                    patientName:'',
                    doctor:'',
                    diseaseType:'',
                    description:'',
                    medicineName:'',
                    wardType:''
                }
            }
            onSubmit={handleSubmit}
            >
                <Form>
                    pesantName<Field type="text" name="patientName"></Field><br /><br />
                    doctor<Field type="text" name="doctor"></Field><br /><br />
                    diseaseType<Field type="text" name="diseaseType"></Field><br /><br />
                    description<Field type="text" name="description"></Field><br /><br />
                    medicineName<Field type="text" name="medicineName"></Field><br /><br />
                    wardType<Field type="text" name="wardType"></Field>
                    <button type='Submit'>Submit</button>
                </Form>
            </Formik>
        <table border={1}>
            <tr>
                <th>Pesant Name</th>
                <th>Doctor</th>
                <th>Disease Type</th>
                <th>Description</th>                
                <th>Medicine Name</th>                
                <th>Ward Type</th>                
            </tr>
            {
                data.map((a,n)=>(
                    <tr>
                        <td>{a._id}</td>
                        <td>{a.patientName}</td>
                        <td>{a.doctor}</td>
                        <td>{a.diseaseType}</td>
                        <td>{a.description}</td>
                        <td>{a.medicineName}</td>
                        <td>{a.wardType}</td>
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default Second
