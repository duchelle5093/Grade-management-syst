import React from 'react';
import {
    Card,
    Row,
    Col,
    Statistic,
    Typography,
    List,
    Avatar,
    Tag,
    Empty
} from 'antd';
import {
    BookOutlined,
    TeamOutlined,
    ClockCircleOutlined,
    TrophyOutlined,
    CheckCircleOutlined
} from '@ant-design/icons';
import { useAppSelector } from '../../store';
import { useTeacherLevels, useRecentGrades, useStudentsByLevel, useRecentActivity } from '../../hooks';
import { useEffect, useMemo } from 'react';
import { useAppDispatch } from '../../store';
import { fetchTeacherGrades } from '../grades/actions';
import { fetchTeacherStudents } from '../user/actions';
import { fetchAssignedSubjects } from '../subjects/actions';

const { Title, Text } = Typography;

export const TeacherOverview = () => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.user);
    const { 
        allTeacherLevels,
        licenceLevelsCount,
        masterLevelsCount,
        totalLevelsCount
    } = useTeacherLevels();
    

    const recentGrades = useRecentGrades();
    const studentsByLevel = useStudentsByLevel();

    const recentActivity = useRecentActivity();
    
    const { claims } = useAppSelector(state => state.grades);
    const pendingClaims = useMemo(() => {
        return claims?.filter(claim => claim.status === 'PENDING') || [];
    }, [claims]);
    

    useEffect(() => {
        dispatch(fetchTeacherGrades());
        dispatch(fetchTeacherStudents());
        dispatch(fetchAssignedSubjects());
    }, [dispatch]);

    return (
        <div className="w-full h-full bg-gray-50 p-6">
            <div style={{ marginBottom: '24px' }}>
                <Title level={2} style={{ margin: 0, color: '#262626' }}>
                    Tableau de bord Enseignant
                </Title>
                <Text type="secondary">
                    Bienvenue {profile?.firstName} {profile?.lastName}
                </Text>
            </div>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Niveaux enseignés"
                            value={totalLevelsCount}
                            prefix={<BookOutlined style={{ color: '#6EADFF' }} />}
                            valueStyle={{ color: '#6EADFF', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Niveaux Licence"
                            value={licenceLevelsCount}
                            prefix={<TeamOutlined style={{ color: '#36CFC9' }} />}
                            valueStyle={{ color: '#36CFC9', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Niveaux Master"
                            value={masterLevelsCount}
                            prefix={<TrophyOutlined style={{ color: '#B37FEB' }} />}
                            valueStyle={{ color: '#B37FEB', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                        <Statistic
                            title="Revendications en attente"
                            value={pendingClaims.length}
                            prefix={<ClockCircleOutlined style={{ color: pendingClaims.length > 0 ? '#ff4d4f' : '#52c41a' }} />}
                            valueStyle={{ color: pendingClaims.length > 0 ? '#ff4d4f' : '#52c41a', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} lg={12}>
                    <Card 
                        title="Étudiants par niveau" 
                        style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        headStyle={{ borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}
                    >
                        {studentsByLevel.levels.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={studentsByLevel.levels}
                                renderItem={(item) => (
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={
                                                <Avatar 
                                                    style={{ 
                                                        backgroundColor: item.level.startsWith('LEVEL1') || item.level.startsWith('LEVEL2') || item.level.startsWith('LEVEL3') ? '#6EADFF' : '#B37FEB'
                                                    }}
                                                >
                                                    {item.count}
                                                </Avatar>
                                            }
                                            title={<Text strong>{item.level.replace('LEVEL1', 'Licence 1').replace('LEVEL2', 'Licence 2').replace('LEVEL3', 'Licence 3').replace('LEVEL4', 'Master 1').replace('LEVEL5', 'Master 2')}</Text>}
                                            description={
                                                <Tag color={['LEVEL1', 'LEVEL2', 'LEVEL3'].includes(item.level) ? 'blue' : 'purple'}>
                                                    {item.percentage}% du total
                                                </Tag>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <Empty 
                                description="Aucun étudiant"
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        )}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card 
                        title="Activité récente" 
                        style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
                        headStyle={{ borderBottom: '1px solid #f0f0f0', fontWeight: 'bold' }}
                    >
                        <List
                            itemLayout="horizontal"
                            dataSource={recentActivity || []}
                            renderItem={(item) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar 
                                                style={{ 
                                                    backgroundColor: 
                                                        item.type === 'grade' ? '#36CFC9' :
                                                        item.type === 'claim' ? '#ff4d4f' : '#B37FEB'
                                                }}
                                            >
                                                {item.avatar}
                                            </Avatar>
                                        }
                                        title={<Text strong>{item.name}</Text>}
                                        description={
                                            <div>
                                                <Text type="secondary">{item.action}</Text>
                                                <br />
                                                <Text type="secondary" style={{ fontSize: '12px' }}>
                                                    <ClockCircleOutlined /> Il y a {item.time}
                                                </Text>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>

            {totalLevelsCount === 0 && (
                <Row style={{ marginTop: '24px' }}>
                    <Col span={24}>
                        <Card style={{ borderRadius: '12px', border: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                            <Empty 
                                description={
                                    <div>
                                        <Text type="secondary">Aucun niveau d'enseignement assigné</Text>
                                        <br />
                                        <Text type="secondary">Contactez l'administrateur pour obtenir vos assignations</Text>
                                    </div>
                                }
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    );
};