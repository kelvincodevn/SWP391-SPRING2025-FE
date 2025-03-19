import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getPsychologistClients } from '../../services/api.psychologist';

function PsychologistClients() {
    const [clients, setClients] = useState([]);
    const psychologistId = localStorage.getItem('psychologistId');

    useEffect(() => {
        const fetchClients = async () => {
            const data = await getPsychologistClients(psychologistId);
            setClients(data);
        };
        fetchClients();
    }, [psychologistId]);

    const columns = [
        {
            title: "Client ID",
            dataIndex: "userID",
            key: "userID",
        },
        {
            title: "Fullname",
            dataIndex: "fullName",
            key: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "roleEnum",
            key: "roleEnum",
        },
    ];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-8">Manage Clients</h1>
            <Table dataSource={clients} columns={columns} />
        </div>
    );
}

export default PsychologistClients;