import React, { useEffect } from 'react';
import { 
    Modal, 
    Form, 
    Input, 
    Select, 
    InputNumber,
    Switch,
    Row,
    Col,
    Button,
    Alert
} from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store';
import { createSubject, updateSubject } from '../subjects-actions';
import { AcademicLevel } from '../../../api/enums';
import { useNotification } from '../../../contexts';
import { SubjectResDto } from '../../../api/reponse-dto/subjects.res.dto';

const { Option } = Select;
const { TextArea } = Input;

interface SubjectModalProps {
    visible: boolean;
    onCancel: () => void;
    onSuccess: () => void;
    editingSubject?: SubjectResDto | null;
}

export const SubjectModal: React.FC<SubjectModalProps> = ({
    visible,
    onCancel,
    onSuccess,
    editingSubject
}) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.admin);
    const { departments = [], teachers = [] } = useAppSelector(state => state.admin || {});
    const { allSubjects = [] } = useAppSelector(state => state.subjects || {});
    const { notify } = useNotification();
    
    const [form] = Form.useForm();

    useEffect(() => {
        if (editingSubject && visible) {
            form.setFieldsValue({
                name: editingSubject.name,
                code: editingSubject.code,
                description: editingSubject.description,
                credits: editingSubject.credits,
                level: editingSubject.level,
                cycle: editingSubject.cycle,
                departmentName: editingSubject.departmentName,
                teacherId: editingSubject.teacherId,
                semesterId: editingSubject.semesterId,
                active: editingSubject.active
            });
        } else if (!editingSubject && visible) {
            form.resetFields();
        }
    }, [editingSubject, visible, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            const selectedDept = departments.find(d => d.name === values.departmentName);
            if (!selectedDept) {
                throw new Error('Département non trouvé');
            }

            const subjectData = {
                name: values.name,
                code: values.code.toUpperCase(),
                description: values.description,
                credits: values.credits,
                level: values.level,
                cycle: values.cycle,
                departmentId: selectedDept.id,
                teacherId: values.teacherId,
                semesterId: values.semesterId || 1,
                active: values.active ?? true
            };

            const subjectExists = allSubjects.some(subject =>
                subject.name.toLowerCase() === values.name.toLowerCase() &&
                subject.level === values.level &&
                subject.departmentName === values.departmentName &&
                subject.id !== editingSubject?.id
            );
            
            if (subjectExists) {
                throw new Error(`Une matière "${values.name}" existe déjà au niveau ${values.level} dans le département ${values.departmentName}`);
            }
            
            // Information si aucun enseignant disponible
            if (selectedDepartment && selectedLevel) {
                const availableTeachers = getCompatibleTeachers(selectedDepartment, selectedLevel);
                
                if (availableTeachers.length === 0 && !values.teacherId) {
                    notify({
                        type: 'info',
                        message: 'Information',
                        description: 'Cette matière sera créée sans enseignant assigné car aucun enseignant n\'est disponible pour ce niveau'
                    });
                }
            }

            if (values.teacherId) {
                const teacherAlreadyAssigned = allSubjects.some(subject =>
                    subject.teacherId === values.teacherId &&
                    subject.level === values.level &&
                    subject.id !== editingSubject?.id
                );
                
                if (teacherAlreadyAssigned) {
                    const teacher = teachers.find(t => t.id === values.teacherId);
                    throw new Error(`${teacher?.firstName} ${teacher?.lastName} a déjà une matière assignée au niveau ${values.level}`);
                }
            }

            let result;
            if (editingSubject) {
                result = await dispatch(updateSubject({ 
                    id: editingSubject.id, 
                    subjectData 
                }));
            } else {
                result = await dispatch(createSubject(subjectData));
            }

            if (updateSubject.fulfilled.match(result) || createSubject.fulfilled.match(result)) {
                notify({
                    type: 'success',
                    message: editingSubject ? 'Matière modifiée' : 'Matière créée',
                    description: editingSubject ? 'Les informations ont été mises à jour' : 'La nouvelle matière a été créée'
                });
                form.resetFields();
                onSuccess();
            }
        } catch (error) {
            console.log(error)
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onCancel();
    };

    const getCompatibleTeachers = (departmentName: string, level: string) => {
        if (!departmentName) return teachers;
        
        return teachers.filter(teacher => {
            if (!teacher.subjects || teacher.subjects.length === 0) return false;
            const teacherDepartment = teacher.subjects[0].departmentName;
            if (teacherDepartment !== departmentName) return false;
            
            // Contrainte: 1 enseignant pour 1 matière par niveau
            const hasSubjectAtLevel = allSubjects.some(subject => 
                subject.teacherId === teacher.id && 
                subject.level === level &&
                subject.id !== editingSubject?.id // Exclure matière en cours d'édition
            );
            
            return !hasSubjectAtLevel;
        });
    };

    const selectedDepartment = Form.useWatch('departmentName', form);
    const selectedLevel = Form.useWatch('level', form);
    
    const availableTeachers = selectedDepartment && selectedLevel
        ? getCompatibleTeachers(selectedDepartment, selectedLevel) 
        : [];
    const noTeachersAvailable = selectedDepartment && selectedLevel && availableTeachers.length === 0;

    return (
        <Modal
            title={editingSubject ? "Modifier la matière" : "Créer une nouvelle matière"}
            open={visible}
            onCancel={handleCancel}
            onOk={handleSubmit}
            confirmLoading={loading}
            width={800}
            okText={editingSubject ? 'Modifier' : 'Créer'}
            cancelText="Annuler"
            okButtonProps={{
                style: { 
                    width: '45%', 
                    backgroundColor: '#52c41a', 
                    borderColor: '#52c41a',
                    fontWeight: 'bold'
                }
            }}
            cancelButtonProps={{
                style: { 
                    width: '45%', 
                    backgroundColor: '#ff4d4f', 
                    borderColor: '#ff4d4f',
                    color: 'white',
                    fontWeight: 'bold'
                }
            }}
            footer={[
                <div key="footer" style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    <Button 
                        key="cancel" 
                        onClick={handleCancel}
                        style={{ 
                            flex: 1, 
                            borderColor: '#ff4d4f', 
                            color: '#ff4d4f',
                            backgroundColor: '#fff'
                        }}
                    >
                        Annuler
                    </Button>
                    <Button 
                        key="confirm" 
                        type="primary" 
                        onClick={handleSubmit}
                        loading={loading}
                        disabled={noTeachersAvailable}
                        style={{ 
                            flex: 1, 
                            backgroundColor: noTeachersAvailable ? '#d9d9d9' : '#6EADFF', 
                            borderColor: noTeachersAvailable ? '#d9d9d9' : '#6EADFF' 
                        }}
                    >
                        {editingSubject ? 'Modifier' : 'Créer'}
                    </Button>
                </div>
            ]}
        >
            <Form form={form} layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Nom de la matière"
                            rules={[
                                { required: true, message: 'Le nom est requis' },
                                { 
                                    min: 2, 
                                    max: 100, 
                                    message: 'Le nom doit contenir entre 2 et 100 caractères' 
                                }
                            ]}
                        >
                            <Input size="large" placeholder="Ex: Programmation Web" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="code"
                            label="Code"
                            rules={[
                                { required: true, message: 'Le code est requis' },
                                { 
                                    min: 3, 
                                    max: 20, 
                                    message: 'Le code doit contenir entre 3 et 20 caractères' 
                                },

                                {
                                    validator: async (_, value) => {
                                        if (!value) return;
                                        const existingSubject = allSubjects.find(s => 
                                            s.code.toLowerCase() === value.toLowerCase() && 
                                            (!editingSubject || s.id !== editingSubject.id)
                                        );
                                        if (existingSubject) {
                                            throw new Error('Ce code existe déjà');
                                        }
                                    }
                                }
                            ]}
                        >
                            <Input 
                                size="large" 
                                placeholder="Ex: PROG101" 
                                style={{ textTransform: 'uppercase' }}
                                onInput={(e) => {
                                    const target = e.target as HTMLInputElement;
                                    target.value = target.value.toUpperCase();
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[
                        { 
                            max: 500, 
                            message: 'La description ne peut pas dépasser 500 caractères' 
                        }
                    ]}
                >
                    <TextArea 
                        rows={3} 
                        placeholder="Description de la matière..."
                        showCount
                        maxLength={500}
                    />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="credits"
                            label="Crédits"
                            rules={[{ required: true, message: 'Les crédits sont requis' }]}
                        >
                            <InputNumber 
                                size="large" 
                                min={1} 
                                max={10} 
                                style={{ width: '100%' }}
                                placeholder="3"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="level"
                            label="Niveau"
                            rules={[{ required: true, message: 'Le niveau est requis' }]}
                        >
                            <Select size="large" placeholder="Sélectionnez le niveau">
                                <Option value={AcademicLevel.LEVEL1}>Licence 1</Option>
                                <Option value={AcademicLevel.LEVEL2}>Licence 2</Option>
                                <Option value={AcademicLevel.LEVEL3}>Licence 3</Option>
                                <Option value={AcademicLevel.LEVEL4}>Master 1</Option>
                                <Option value={AcademicLevel.LEVEL5}>Master 2</Option>
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
                                <Option value="BACHELOR">Licence</Option>
                                <Option value="MASTER">Master</Option>
                                <Option value="PHD">Doctorat</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="departmentName"
                            label="Département"
                            rules={[{ required: true, message: 'Le département est requis' }]}
                        >
                            <Select size="large" placeholder="Sélectionnez le département">
                                {departments.map(dept => (
                                    <Option key={dept.id} value={dept.name}>
                                        {dept.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="teacherId"
                            label="Enseignant"
                        >
                            <Select 
                                size="large" 
                                placeholder={
                                    noTeachersAvailable
                                        ? "Aucun enseignant disponible pour ce niveau"
                                        : "Assigner un enseignant"
                                }
                                allowClear
                                disabled={!selectedDepartment}
                                notFoundContent={
                                    selectedDepartment && selectedLevel
                                        ? "Aucun enseignant disponible pour ce niveau"
                                        : "Sélectionnez d'abord un département et un niveau"
                                }
                            >
                                {availableTeachers.map(teacher => (
                                    <Option key={teacher.id} value={teacher.id}>
                                        {teacher.firstName} {teacher.lastName}
                                    </Option>
                                ))}
                            </Select>
                            {noTeachersAvailable && (
                                <Alert
                                    message="Aucun enseignant disponible"
                                    description={`Tous les enseignants du département ${selectedDepartment} ont déjà une matière assignée au niveau ${selectedLevel}`}
                                    type="warning"
                                    showIcon
                                    style={{ marginTop: 8 }}
                                />
                            )}
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="semesterId"
                            label="Semestre"
                            rules={[{ required: true, message: 'Le semestre est requis' }]}
                            initialValue={1}
                        >
                            <Select size="large" placeholder="Sélectionnez le semestre">
                                <Option value={1}>Semestre 1</Option>
                                <Option value={2}>Semestre 2</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="active"
                            label="Statut"
                            valuePropName="checked"
                            initialValue={true}
                        >
                            <Switch
                                checkedChildren="Actif"
                                unCheckedChildren="Inactif"
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};