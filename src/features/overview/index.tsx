
import React, { useEffect, useMemo } from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Typography,
    List,
    Avatar,
    Tag,
    Progress,
    Space,
    Badge
} from 'antd';
import {
    UserOutlined,
    BookOutlined,
    TeamOutlined,
    BankOutlined,
    TrophyOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    CheckCircleOutlined,
    RiseOutlined,
    FallOutlined
} from '@ant-design/icons';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title as ChartTitle,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchAllStudents, fetchAllTeachers, fetchAllDepartments } from '../admin/actions';
import { fetchAllSubjects } from '../subjects/actions';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement
);

const { Title, Text } = Typography;

export const Overview = () => {
    const dispatch = useAppDispatch();
    const { students = [], teachers = [], departments = [] } = useAppSelector(state => state.admin || {});
    const { allSubjects: subjects = [] } = useAppSelector(state => state.subjects || {});

    useEffect(() => {
        dispatch(fetchAllStudents());
        dispatch(fetchAllTeachers());
        dispatch(fetchAllDepartments());
        dispatch(fetchAllSubjects());
    }, [dispatch]);


    const stats = useMemo(() => {
        const totalStudents = students.length;
        const totalTeachers = teachers.length;
        const totalSubjects = subjects.length;
        const totalDepartments = departments.length;
        const activeStudents = students.filter(s => s.role === 'STUDENT').length;
        

        const studentsPerLevel = [
            { level: 'LEVEL1', count: students.filter(s => (s.studentLevel?.studentLevel || s.level) === 'LEVEL1').length },
            { level: 'LEVEL2', count: students.filter(s => (s.studentLevel?.studentLevel || s.level) === 'LEVEL2').length },
            { level: 'LEVEL3', count: students.filter(s => (s.studentLevel?.studentLevel || s.level) === 'LEVEL3').length },
            { level: 'LEVEL4', count: students.filter(s => (s.studentLevel?.studentLevel || s.level) === 'LEVEL4').length },
            { level: 'LEVEL5', count: students.filter(s => (s.studentLevel?.studentLevel || s.level) === 'LEVEL5').length },
            { level: 'NON_DEFINI', count: students.filter(s => !(s.studentLevel?.studentLevel || s.level)).length }
        ];


        const subjectsPerDepartment = departments.map(dept => ({
            department: dept.name,
            count: subjects.filter(s => s.departmentId === dept.id).length
        }));


        const subjectsWithoutTeacher = subjects.filter(s => !s.teacherId).length;
        

        const assignmentRate = totalSubjects > 0 ? ((totalSubjects - subjectsWithoutTeacher) / totalSubjects) * 100 : 0;

        return {
            totalStudents,
            totalTeachers,
            totalSubjects,
            totalDepartments,
            activeStudents,
            studentsPerLevel,
            subjectsPerDepartment,
            subjectsWithoutTeacher,
            assignmentRate
        };
    }, [students, teachers, subjects, departments]);


    const levelChartData = {
        labels: ['Licence 1', 'Licence 2', 'Licence 3', 'Master 1', 'Master 2', 'Non défini'],
        datasets: [{
            data: stats.studentsPerLevel.map(item => item.count),
            backgroundColor: [
                '#6EADFF',
                '#36CFC9',
                '#5CDBD3',
                '#B37FEB',
                '#FF85C0',
                '#f5222d'
            ],
            borderWidth: 0
        }]
    };

    const departmentChartData = {
        labels: stats.subjectsPerDepartment.map(item => item.department),
        datasets: [{
            label: 'Nombre de matières',
            data: stats.subjectsPerDepartment.map(item => item.count),
            backgroundColor: '#6EADFF',
            borderColor: '#6EADFF',
            borderWidth: 1,
            borderRadius: 8
        }]
    };

    const evolutionData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
        datasets: [
            {
                label: 'Étudiants',
                data: [120, 135, 142, 158, 165, stats.totalStudents],
                borderColor: '#6EADFF',
                backgroundColor: 'rgba(110, 173, 255, 0.1)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Enseignants',
                data: [15, 18, 20, 22, 24, stats.totalTeachers],
                borderColor: '#36CFC9',
                backgroundColor: 'rgba(54, 207, 201, 0.1)',
                tension: 0.4,
                fill: true
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    usePointStyle: true
                }
            }
        }
    };

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)'
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        }
    };




    return (
        <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            {}
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0, color: '#262626' }}>Dashboard Administrateur</Title>
                <Text type="secondary">Vue d'ensemble de la plateforme de gestion des notes</Text>
            </div>

            {}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Total Utilisateurs"
                            value={stats.totalStudents + stats.totalTeachers}
                            prefix={<TeamOutlined style={{ color: '#6EADFF' }} />}
                            valueStyle={{ color: '#6EADFF', fontWeight: 'bold' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <RiseOutlined style={{ color: '#52c41a' }} /> +12% ce mois
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Étudiants"
                            value={stats.totalStudents}
                            prefix={<UserOutlined style={{ color: '#36CFC9' }} />}
                            valueStyle={{ color: '#36CFC9', fontWeight: 'bold' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <RiseOutlined style={{ color: '#52c41a' }} /> +8% ce mois
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Enseignants"
                            value={stats.totalTeachers}
                            prefix={<BookOutlined style={{ color: '#B37FEB' }} />}
                            valueStyle={{ color: '#B37FEB', fontWeight: 'bold' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <RiseOutlined style={{ color: '#52c41a' }} /> +3% ce mois
                            </Text>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Matières"
                            value={stats.totalSubjects}
                            prefix={<BankOutlined style={{ color: '#FF85C0' }} />}
                            valueStyle={{ color: '#FF85C0', fontWeight: 'bold' }}
                        />
                        <div style={{ marginTop: '8px' }}>
                            <Text type="secondary" style={{ fontSize: '12px' }}>
                                <RiseOutlined style={{ color: '#52c41a' }} /> +5% ce mois
                            </Text>
                        </div>
                    </Card>
                </Col>
            </Row>

            {}
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} lg={8}>
                    <Card 
                        title="Répartition des étudiants par niveau" 
                        style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '400px' }}
                        headStyle={{ borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}
                    >
                        <div style={{ height: '300px' }}>
                            <Pie data={levelChartData} options={pieOptions} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card 
                        title="Matières par département" 
                        style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '400px' }}
                        headStyle={{ borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}
                    >
                        <div style={{ height: '300px' }}>
                            <Bar data={departmentChartData} options={chartOptions} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card 
                        title="Évolution des inscriptions" 
                        style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', height: '400px' }}
                        headStyle={{ borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}
                    >
                        <div style={{ height: '300px' }}>
                            <Line data={evolutionData} options={lineOptions} />
                        </div>
                    </Card>
                </Col>
            </Row>


        </div>
    );
};
