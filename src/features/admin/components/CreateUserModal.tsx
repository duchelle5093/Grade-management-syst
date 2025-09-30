import React, { useState, useEffect } from 'react';
import { 
    Modal, 
    Form, 
    Input, 
    Select, 
    Steps,
    Button, 
    Typography,
    Card,
    Row,
    Col,
    Avatar,
    Divider,
    Tag
} from 'antd';
import { 
    UserOutlined, 
    MailOutlined, 
    IdcardOutlined,
    BookOutlined,
    KeyOutlined
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../store';
import { createUser, updateUser, fetchAllDepartments } from '../actions';
import { Role, AcademicLevel, ColorTheme } from '../../../api/enums';

import { useNotification } from '../../../contexts';

const { Title, Text } = Typography;
const { Step } = Steps;

interface CreateUserModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    editingUser?: any;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
    visible,
    onCancel,
    onSuccess,
    editingUser
}) => {
    const dispatch = useAppDispatch();
    const { loading, departments = [] } = useAppSelector(state => state.admin);
    const { notify } = useNotification();
    
    const [form] = Form.useForm();
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState<Role>(
        (typeof editingUser?.role === 'object' ? editingUser?.appRole : editingUser?.role) || Role.STUDENT
    );
    const [formData, setFormData] = useState<any>({});
    
    // Charger les départements
    useEffect(() => {
        if (visible) {
            dispatch(fetchAllDepartments());
        }
    }, [visible, dispatch]);

    // Pré-remplir le formulaire en mode édition
    useEffect(() => {
        if (editingUser && visible) {
            setCurrentStep(1); 
            
            setTimeout(() => {
                const formData = {
                    firstName: editingUser.firstName || '',
                    lastName: editingUser.lastName || '',
                    username: editingUser.username || '',
                    email: editingUser.email || '',
                    password: editingUser.password || '',
                    // Champs spécifiques aux étudiants
                    matricule: editingUser.matricule || editingUser.username || '',
                    level: editingUser.level || '',
                    speciality: editingUser.speciality || (editingUser.subjects && editingUser.subjects[0] ? editingUser.subjects[0].departmentName : ''),
                    cycle: editingUser.cycle || (editingUser.level && (editingUser.level.includes('LEVEL1') || editingUser.level.includes('LEVEL2') || editingUser.level.includes('LEVEL3')) ? 'BACHELOR' : 'MASTER'),
                    // Champs spécifiques aux enseignants
                    levels: editingUser.levels || (editingUser.subjects ? editingUser.subjects.map(s => s.level).filter((v, i, a) => a.indexOf(v) === i) : []),
                    department: editingUser.department || (editingUser.subjects && editingUser.subjects[0] ? editingUser.subjects[0].departmentName : ''),
                    phone: editingUser.phone || '',
                };
                form.setFieldsValue(formData);
                setFormData(formData);
            }, 100);
        } else if (!editingUser && visible) {
            form.resetFields();
            setSelectedRole(Role.STUDENT);
            setCurrentStep(0);
            setFormData({});
        }
    }, [editingUser, visible, form]);

    const handleNext = () => {
        form.validateFields().then((values) => {
            setFormData(prev => ({ ...prev, ...values }));
            setCurrentStep(currentStep + 1);
        });
    };

    const handlePrev = () => {
        const currentValues = form.getFieldsValue();
        setFormData(prev => ({ ...prev, ...currentValues }));
        setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async () => {
        try {
            await form.validateFields();
            
            const allFormValues = form.getFieldsValue();
            
            const allData = { ...formData, ...allFormValues };
            

            
            const userData: any = {
                username: allData.username,
                email: allData.email,
                firstName: allData.firstName,
                lastName: allData.lastName,
                role: selectedRole,
                password: allData.password
            };
            

            if (selectedRole === Role.STUDENT) {
                userData.levelId = allData.levelId || 1; // Convertir level en levelId
                userData.matricule = allData.matricule;
                userData.speciality = allData.speciality;
                userData.cycle = allData.cycle;
                userData.dateOfBirth = allData.dateOfBirth;
                userData.placeOfBirth = allData.placeOfBirth;
            } else if (selectedRole === Role.TEACHER) {
                userData.levelIds = allData.levelIds || []; // Convertir levels en levelIds
                userData.departmentId = allData.departmentId || 1; // Convertir department en departmentId
                userData.phone = allData.phone;
                userData.subjectIds = allData.subjectIds || [];
            }


            let result;
            if (editingUser) {
                const userId = editingUser.studentId || editingUser.id;
                const userRole = (typeof editingUser.role === 'object' ? editingUser.appRole : editingUser.role) || selectedRole;
                result = await dispatch(updateUser({ id: userId, userData, role: userRole }));
            } else {
                result = await dispatch(createUser(userData));
            }
            
            if (updateUser.fulfilled.match(result) || createUser.fulfilled.match(result)) {
                notify({
                    type: 'success',
                    message: editingUser ? 'Utilisateur modifié' : 'Utilisateur créé',
                    description: editingUser ? 'Les informations ont été mises à jour' : 'Le nouvel utilisateur a été créé'
                });
                form.resetFields();
                setCurrentStep(0);
                setSelectedRole(Role.STUDENT);
                onSuccess();
            } else {
                notify({
                    type: 'error',
                    message: editingUser ? 'Erreur de modification' : 'Erreur de création',
                    description: 'Une erreur est survenue lors de l\'opération'
                });
            }
        } catch {
            notify({
                type: 'error',
                message: editingUser ? 'Erreur de modification' : 'Erreur de création',
                description: 'Une erreur est survenue lors de l\'opération'
            });
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setCurrentStep(0);
        setSelectedRole(Role.STUDENT);
        setFormData({});
        onCancel();
    };

    const steps = [
        {
            title: 'Type d\'utilisateur',
            icon: <UserOutlined />,
        },
        {
            title: 'Informations personnelles',
            icon: <IdcardOutlined />,
        },
        {
            title: 'Informations de connexion',
            icon: <KeyOutlined />,
        },
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Title level={4}>Sélectionnez le type d'utilisateur</Title>
                        <Row gutter={16} style={{ marginTop: 24 }}>
                            <Col span={8}>
                                <Card
                                    hoverable
                                    className={selectedRole === Role.STUDENT ? 'selected-card' : ''}
                                    onClick={() => setSelectedRole(Role.STUDENT)}
                                    style={{
                                        border: selectedRole === Role.STUDENT ? `2px solid ${ColorTheme.PRIMARY}` : '1px solid #d9d9d9',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                        <Avatar size={64} style={{ backgroundColor: '#52c41a' }}>
                                            <UserOutlined style={{ fontSize: '24px' }} />
                                        </Avatar>
                                        <Title level={5} style={{ marginTop: 16 }}>Étudiant</Title>
                                        <Text type="secondary">Accès aux notes et relevés</Text>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    hoverable
                                    className={selectedRole === Role.TEACHER ? 'selected-card' : ''}
                                    onClick={() => setSelectedRole(Role.TEACHER)}
                                    style={{
                                        border: selectedRole === Role.TEACHER ? `2px solid ${ColorTheme.PRIMARY}` : '1px solid #d9d9d9',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                        <Avatar size={64} style={{ backgroundColor: '#fa8c16' }}>
                                            <BookOutlined style={{ fontSize: '24px' }} />
                                        </Avatar>
                                        <Title level={5} style={{ marginTop: 16 }}>Enseignant</Title>
                                        <Text type="secondary">Gestion des notes</Text>
                                    </div>
                                </Card>
                            </Col>
                            <Col span={8}>
                                <Card
                                    hoverable
                                    className={selectedRole === Role.ADMIN ? 'selected-card' : ''}
                                    onClick={() => setSelectedRole(Role.ADMIN)}
                                    style={{
                                        border: selectedRole === Role.ADMIN ? `2px solid ${ColorTheme.PRIMARY}` : '1px solid #d9d9d9',
                                        borderRadius: '12px'
                                    }}
                                >
                                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                        <Avatar size={64} style={{ backgroundColor: '#f5222d' }}>
                                            <UserOutlined style={{ fontSize: '24px' }} />
                                        </Avatar>
                                        <Title level={5} style={{ marginTop: 16 }}>Administrateur</Title>
                                        <Text type="secondary">Accès complet</Text>
                                    </div>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                );

            case 1:
                return (
                    <div>
                        <Title level={4} style={{ marginBottom: 24 }}>Informations personnelles</Title>
                        {editingUser && (
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ padding: '12px', backgroundColor: '#f0f2f5', borderRadius: '6px', marginBottom: 8 }}>
                                    <Text strong>Rôle : </Text>
                                    <Tag color={selectedRole === 'STUDENT' ? 'green' : selectedRole === 'TEACHER' ? 'orange' : 'red'}>
                                        {selectedRole === 'STUDENT' ? 'Étudiant' : selectedRole === 'TEACHER' ? 'Enseignant' : 'Admin'}
                                    </Tag>
                                </div>
                                {(!editingUser.firstName || !editingUser.lastName) && (
                                    <div style={{ padding: '8px', backgroundColor: '#fff7e6', border: '1px solid #ffd591', borderRadius: '6px' }}>
                                        <Text type="warning" style={{ fontSize: '12px' }}>
                                            ⚠️ Certaines informations sont manquantes. Veuillez les compléter.
                                        </Text>
                                    </div>
                                )}
                            </div>
                        )}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="firstName"
                                    label="Prénom"
                                    rules={[{ required: true, message: 'Le prénom est requis' }]}
                                >
                                    <Input 
                                        size="large" 
                                        prefix={<UserOutlined />}
                                        placeholder="Entrez le prénom"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="lastName"
                                    label="Nom"
                                    rules={[{ required: true, message: 'Le nom est requis' }]}
                                >
                                    <Input 
                                        size="large" 
                                        prefix={<UserOutlined />}
                                        placeholder="Entrez le nom"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        {selectedRole === Role.STUDENT && (
                            <Form.Item
                                name="matricule"
                                label="Matricule"
                                rules={[{ required: true, message: 'Le matricule est requis' }]}
                            >
                                <Input 
                                    size="large" 
                                    prefix={<IdcardOutlined />}
                                    placeholder="Entrez le matricule"
                                    readOnly={!!editingUser}
                                    style={{
                                        backgroundColor: editingUser ? '#f5f5f5' : 'white',
                                        cursor: editingUser ? 'not-allowed' : 'text'
                                    }}
                                />
                            </Form.Item>
                        )}

                        {selectedRole === Role.STUDENT && (
                            <>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            name="levelId"
                                            label="Niveau"
                                            rules={[{ required: true, message: 'Le niveau est requis' }]}
                                        >
                                            <Select size="large" placeholder="Sélectionnez le niveau">
                                                <Select.Option value={1}>Licence 1</Select.Option>
                                                <Select.Option value={2}>Licence 2</Select.Option>
                                                <Select.Option value={3}>Licence 3</Select.Option>
                                                <Select.Option value={4}>Master 1</Select.Option>
                                                <Select.Option value={5}>Master 2</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="speciality"
                                            label="Spécialité"
                                            rules={[{ required: true, message: 'La spécialité est requise' }]}
                                        >
                                            <Select 
                                                size="large" 
                                                placeholder="Sélectionnez une spécialité"
                                            >
                                                {departments.map(dept => (
                                                    <Select.Option key={dept.id} value={dept.name}>
                                                        {dept.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="cycle"
                                            label="Cycle"
                                            rules={[{ required: true, message: 'Le cycle est requis' }]}
                                        >
                                            <Select size="large" placeholder="Sélectionnez le cycle">
                                                <Select.Option value="BACHELOR">Licence</Select.Option>
                                                <Select.Option value="MASTER">Master</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="dateOfBirth"
                                            label="Date de naissance"
                                            rules={[{ required: true, message: 'La date de naissance est requise' }]}
                                        >
                                            <Input 
                                                size="large" 
                                                type="date"
                                                placeholder="YYYY-MM-DD"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="placeOfBirth"
                                            label="Lieu de naissance"
                                            rules={[{ required: true, message: 'Le lieu de naissance est requis' }]}
                                        >
                                            <Input 
                                                size="large" 
                                                placeholder="Entrez le lieu de naissance"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </>
                        )}

                        {selectedRole === Role.TEACHER && (
                            <>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="levelIds"
                                            label="Niveaux enseignés"
                                            rules={[{ required: true, message: 'Au moins un niveau est requis' }]}
                                        >
                                            <Select 
                                                mode="multiple"
                                                size="large" 
                                                placeholder="Sélectionnez les niveaux"
                                            >
                                                <Select.Option value={1}>Licence 1</Select.Option>
                                                <Select.Option value={2}>Licence 2</Select.Option>
                                                <Select.Option value={3}>Licence 3</Select.Option>
                                                <Select.Option value={4}>Master 1</Select.Option>
                                                <Select.Option value={5}>Master 2</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="departmentId"
                                            label="Département"
                                            rules={[{ required: true, message: 'Le département est requis' }]}
                                        >
                                            <Select 
                                                size="large" 
                                                placeholder="Sélectionnez un département"
                                            >
                                                {departments.map(dept => (
                                                    <Select.Option key={dept.id} value={dept.id}>
                                                        {dept.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="phone"
                                    label="Téléphone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'champ obigatoire',
                                        },
                                        {
                                            pattern: new RegExp(/^6[256789][0-9]{7}$/),
                                            message: 'Numero invalide',
                                        },
                                    ]}
                                >
                                    <Input 
                                        size="large"
                                        prefix={
                                            <span className="font-medium mr-2 text-xs tracking-tighter">
                                                 +237
                                            </span>
                                        }
                                        placeholder="655555555"
                                    />
                                </Form.Item>
                            </>
                        )}
                    </div>
                );

            case 2:
                return (
                    <div>
                        <Title level={4} style={{ marginBottom: 24 }}>Informations de connexion</Title>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="username"
                                    label="Nom d'utilisateur"
                                    rules={[{ required: true, message: 'Le nom d\'utilisateur est requis' }]}
                                >
                                    <Input 
                                        size="large" 
                                        prefix={<UserOutlined />}
                                        placeholder="Entrez le nom d'utilisateur"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="password"
                                    label="Mot de passe"
                                    rules={[{ required: true, message: 'Mot de passe obligatoire' }]}
                                >
                                    <Input.Password
                                        size="large"
                                        prefix={<KeyOutlined />}
                                        placeholder="Entrez le mot de passe"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[
                                        { required: true, message: 'L\'email est requis' },
                                        { type: 'email', message: 'Format d\'email invalide' }
                                    ]}
                                >
                                    <Input 
                                        size="large" 
                                        prefix={<MailOutlined />}
                                        placeholder="Entrez l'email"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <Modal
            title={editingUser ? "Modifier l'utilisateur" : "Créer un nouvel utilisateur"}
            open={visible}
            onCancel={handleCancel}
            width={800}
            footer={null}
            style={{ top: 20 }}
        >
            <Form form={form} layout="vertical">
                <Steps current={currentStep} style={{ marginBottom: 32 }}>
                    {steps.map((step, index) => (
                        <Step key={index} title={step.title} icon={step.icon} />
                    ))}
                </Steps>

                <div style={{ minHeight: '400px' }}>
                    {renderStepContent()}
                </div>

                <Divider />

                <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    {currentStep > 0 && !(editingUser && currentStep === 1) ? (
                        <Button 
                            onClick={handlePrev}
                            size="large"
                            style={{ 
                                flex: 1, 
                                borderColor: '#ff4d4f', 
                                color: '#ff4d4f',
                                backgroundColor: '#fff'
                            }}
                        >
                            Précédent
                        </Button>
                    ) : (
                        <Button 
                            onClick={handleCancel}
                            size="large"
                            style={{ 
                                flex: 1, 
                                borderColor: '#ff4d4f', 
                                color: '#ff4d4f',
                                backgroundColor: '#fff'
                            }}
                        >
                            Annuler
                        </Button>
                    )}
                    
                    {currentStep < steps.length - 1 ? (
                        <Button 
                            type="primary" 
                            onClick={handleNext}
                            size="large"
                            style={{ 
                                flex: 1,
                                backgroundColor: '#6EADFF',
                                borderColor: '#6EADFF'
                            }}
                        >
                            Suivant
                        </Button>
                    ) : (
                        <Button 
                            type="primary" 
                            onClick={handleSubmit}
                            loading={loading}
                            size="large"
                            style={{ 
                                flex: 1,
                                backgroundColor: '#6EADFF',
                                borderColor: '#6EADFF'
                            }}
                        >
                            {editingUser ? 'Modifier' : 'Créer'}
                        </Button>
                    )}
                </div>
            </Form>

            <style>{`
                .selected-card {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(110, 173, 255, 0.15);
                }
            `}</style>
        </Modal>
    );
};