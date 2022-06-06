import React, { useEffect, useState } from "react";
import scholarshipService from "../services/scholarshipService";
import { toast } from "react-toastify";
import Button from "./../util/Button";

function StudentList() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await scholarshipService.getStudents();
            if (response.data.statusCode === 200) {
                const data = response.data.data;
                setData(data.students);
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await scholarshipService.deleteStudent(id);
            if (response.status === 200) {
                toast.success("Deleted");
                fetchStudents();
            }
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                toast.error(ex.response.data.message);
            }
        }
    };

    return (
        <div>
            <table style={{ textAlign: "center", verticalAlign: "middle" }} className="table">
                {/* heading of the table */}
                <thead>
                    {/* rows of the table */}
                    <tr>
                        {/* each heading */}
                        <th scope="col">#</th>
                        <th scope="col">Student's Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {/* body of the table */}
                <tbody>
                    {data &&
                        data.map((item, index) => (
                            <>
                                <tr key={index}>
                                    <td>{index + 1}</td>

                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td
                                        style={{
                                            display: "flex",

                                            justifyContent: "center"
                                        }}
                                    >
                                        <Button onClick={() => handleDelete(item._id)} color="danger" title="Delete" />
                                    </td>
                                </tr>
                            </>
                        ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentList;
