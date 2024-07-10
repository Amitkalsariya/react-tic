import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'

const First = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState(null)
    const [value, setValue] = useState(
        {
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            nickName: ''
        }
    )
    const token = "f1720608706642qtf957292438ta"
    useEffect(() => {
        ak()
    }, [])
    function ak() {
        axios.get("https://service.apikeeda.com/api/v1/contact-book", {
            headers: {
                "x-apikeeda-key": token
            }
        })
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data)
            })
            .catch((er) => {
                console.log(er);
            })
    }
    const handelAdd = (values,{resetForm}) => {
        if (id !== null) {
            axios.patch(`https://service.apikeeda.com/api/v1/contact-book/${id}`, values, {
                headers: {
                    "x-apikeeda-key": token
                }
            })
                .then((res) => {
                    console.log("Success")
                    ak()
                    setId(null)
                })
                .catch((er) => {
                    console.log(er);
                })
            }
            else {
                
                axios.post("https://service.apikeeda.com/api/v1/contact-book", values, {
                    headers: {
                        "x-apikeeda-key": token
                    }
                })
                .then((res) => {
                    console.log("Success")
                    ak()
                    resetForm()
                    
                })
                .catch((er) => {
                    console.log(er);
                })
        }
        setValue({
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            nickName: ''
        })
    }
    const handleDelete = (id) => {
        axios.delete(`https://service.apikeeda.com/api/v1/contact-book/${id}`, {
            headers: {
                "x-apikeeda-key": token
            }
        })
            .then((res) => {
                console.log(res.data.data);
                ak()

            })
            .catch((er) => {
                console.log(er);
            })
    }
    const handleUpdate = (el, id) => {
        setValue({
            firstName: el.firstName,
            lastName: el.lastName,
            mobileNo: el.mobileNo,
            email: el.email,
            nickName: el.nickName
        })
        setId(id)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={value}
                onSubmit={handelAdd}
            >
                <Form>
                First Name<Field type="text" name="firstName"></Field> <br /><br />
                Last Name<Field type="text" name="lastName"></Field><br /><br />
                MO No<Field type="text" name="mobileNo"></Field><br /><br />
                Email<Field type="text" name="email"></Field><br /><br />
                Nick Name<Field type="text" name="nickName"></Field><br /><br />
                    <button type='Submit'>Submit</button>
                </Form>
            </Formik>

            <table border={1}>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>MO No </th>
                    <th>Email</th>
                    <th>Nick Name</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
                {
                    data.map((el, i) => (
                        <tr>
                            <td>{el._id}</td>
                            <td>{el.firstName}</td>
                            <td>{el.lastName}</td>
                            <td>{el.mobileNo}</td>
                            <td>{el.email}</td>
                            <td>{el.nickName}</td>
                            <td><button onClick={() => { handleDelete(el._id) }}>Delete</button></td>
                            <td><button onClick={() => { handleUpdate(el,el._id) }}>Update</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default First
