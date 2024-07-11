import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState, useSyncExternalStore } from 'react'

const Third = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState(null)
    const [ami, setAmi] = useState(
        {
            name: '',
            amount: '',
            discription: '',
            type: '',
            id: ''
        }
    )
    const token = "b1720697034172ioe166738574yi"
    useEffect(() => {
        rick()
    }, [])
    function rick() {
        axios.get("https://service.apikeeda.com/api/v1/insurance", {
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
    const handleSubmit = (values,{resetForm}) => {
        if (id !== null) {
            axios.patch("https://service.apikeeda.com/api/v1/insurance/" + id, values, {
                headers: {
                    "x-apikeeda-key": token
                }
            })
            .then((res) => {
                console.log(res.data.data);
                rick()
                setId(null)

            })
            .catch((er) => {
                console.log(er);
            })
        }
        else{

            axios.post("https://service.apikeeda.com/api/v1/insurance", values, {
                headers: {
                    "x-apikeeda-key": token
                }
            })
                .then((res) => {
                    console.log(res.data.data);
                    rick()
                    resetForm()
    
                })
                .catch((er) => {
                    console.log(er);
                })
        }
        setAmi({
            name: '',
            amount: '',
            discription: '',
            type: '',
            id: ''
        })
    }
    const deleteData = (id) => {
        axios.delete("https://service.apikeeda.com/api/v1/insurance/" + id, {
            headers: {
                "x-apikeeda-key": token
            }
        })
            .then((res) => {
                console.log(res.data.data);
                rick()

            })
            .catch((er) => {
                console.log(er);

            })
    }
    const updateData = (n, id) => {
        setAmi({
            name: n.name,
            amount: n.amount,
            discription: n.discription,
            type: n.type,
            id: n.id
        })
        setId(id)
    }
    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={ami}
                onSubmit={handleSubmit}

            >
                <Form>
                    name<Field type="text" name="name"></Field><br /><br />
                    amount<Field type="text" name="amount"></Field><br /><br />
                    discription<Field type="text" name="discription"></Field><br /><br />
                    type<Field type="text" name="type"></Field><br /><br />
                    id<Field type="text" name="id"></Field><br /><br />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
            <table border={1}>
                <th>ID</th>
                <th>Name</th>
                <th>Amount</th>
                <th>Discription</th>
                <th>Type</th>
                <th>Id</th>
                <th>Delete</th>
                <th>Update</th>
                {
                    data.map((n, a) => (
                        <tr>
                            <td>{n._id}</td>
                            <td>{n.name}</td>
                            <td>{n.amount}</td>
                            <td>{n.discription}</td>
                            <td>{n.type}</td>
                            <td>{n.id}</td>
                            <td><button onClick={() => deleteData(n._id)}>Delete</button></td>
                            <td><button onClick={() => updateData(n, n._id)}>Update</button></td>
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}

export default Third
