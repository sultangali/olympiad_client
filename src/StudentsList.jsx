import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Navbar, Nav } from 'react-bootstrap'
import axios from 'axios';

const StudentList = () => {

    const [students, setStudents] = useState([]);

    const cities = [
        { name: "Астана" },
        { name: "Алматы" },
        { name: "Тараз" },
        { name: "Шымкент" },
        { name: "Кокшетау" },
        { name: "Семей" },
        { name: "Кызылорда" },
        { name: "Актау" },
        { name: "Костанай" },
        { name: "Атырау" },
        { name: "Аркалык" },
        { name: "Павлодар" }
    ];

    const universities = {
        "Астана": ["Астана халықаралық университеті", "Л.Н. Гумилев атындағы Еуразия ұлттық университеті"],
        "Алматы": ["Қазақ ұлттық қыздар педагогикалық университеті", "Сулейман Демирель университеті"],
        "Тараз": ["М.Х. Дулати атындағы Тараз өңірлік уиверситеті"],
        "Шымкент": ["Өзбекәлі Жәнібеков атындағы Оңтүстік Қазақстан педагогикалық университеті"],
        "Кокшетау": ["Ш.Уалиханов атындағы Көкшетау университеті"],
        "Семей": ["Семей қаласының Шәкәрім атындағы университеті"],
        "Кызылорда": ["Қорқыт aта атындағы Қызылорда университеті"],
        "Актау": ["Ш.Есенов атындағы Каспий технологиялар және инжинеринг университеті"],
        "Костанай": ["Ахмет Байтұрсынұлы атындағы Қостанай өңірлік университеті"],
        "Атырау": ["Х.Досмұхамедов атындағы Атырау университеті"],
        "Аркалык": ["Ы. Алтынсарин атындағы Арқалық педагогикалық институты"],
        "Павлодар": ["Әлкей Марғұлан атындағы Павлодар педагогикалық университеті"]
    }

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [changeStudent, setChangeStudent] = useState(0);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedUniversity('');
    };

    const handleUniversityChange = (event) => {
        setSelectedUniversity(event.target.value);
    };

    const handleStudentChange = () => {
        setChangeStudent(1);
    };

    useEffect(() => {
        fetchStudents();
    }, [])

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://34.88.94.240/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error('Ошибка при получении списка студентов 123', error);
        }
    }

    const markAsPresent = async (id) => {
        try {
            await axios.put(`http://34.88.94.240/api/students/${id}`, { present: true });
            await fetchStudents();
            alert('Қатысуыңыз расталды');
            window.location.reload()
        } catch (error) {
            alert('Ошибка при отметке присутствия');
        }
    };

    useEffect(() => {
        if (selectedUniversity) {
            setFilteredStudents(students.filter(student => student.university === selectedUniversity));
        }
    }, [selectedUniversity, students]);

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        console.log('Выбранный студент:', student);
    };

    return (
        <div>
            <Navbar fixed='top'  className="justify-content-center" >
            <Nav  className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">
                        <img src="/file.jpeg" width={'140px'} height={'140px'} alt="" />
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            </Navbar>
            
            <Container>
                <Row style={{ height: '100vh' }} className='text-center d-flex row align-items-center justify-content-center'>
                    {
                        students ? <Col lg="6" md="6">
                        <h2 style={{color: '#214e96', margin: '22px auto'}} >Олимпиада 25-26.2024. Бөкетов университеті</h2>
                        <hr />
                        <h4 style={{margin: '22px'}}>Студенттердің қатысуын тіркеу</h4>
                        <Form>
                            <Form.Select size="lg" style={{padding: '24px auto'}} value={selectedCity} onChange={handleCityChange} aria-label="Default select example">
                                <option value="">Қаланы таңдаңыз</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city.name}>{city.name}</option>
                                ))}
                            </Form.Select>
                            <br />
                            <Form.Select size="lg" value={selectedUniversity} onChange={handleUniversityChange} disabled={!selectedCity} aria-label="Default select example">
                                <option value="">Университетті таңдаңыз</option>
                                {selectedCity && universities[selectedCity].map((uni, index) => (
                                    <option key={index} value={uni}>{uni}</option>
                                ))}
                            </Form.Select>
                            <br />
                            <Form.Select size="lg" disabled={!selectedUniversity} onChange={handleStudentChange} aria-label="Default select example">
                                <option value="">Студентті таңдаңыз</option>
                                {filteredStudents.map((student, index) => (
                                    <option key={student._id} value={student._id} onClick={() => handleSelectStudent(student)}>{student.fullname}</option>
                                ))}
                            </Form.Select>
                        </Form>
                        <Row>
                            <Col lg="6" md="6" xs="12">
                                <Button
                                    size="lg"
                                    variant='primary'
                                    disabled={changeStudent !== 1 || selectedStudent?.present === true}
                                    style={{ marginTop: '24px', border: '1px solid #365C9B', backgroundColor: '#365C9B' }}
                                    className='w-100'
                                    type='submit'
                                    onClick={() => { markAsPresent(selectedStudent?._id) }}>{selectedStudent?.present === true ? "Қатысуыңыз расталды" : "Қатысуыңызды растау"}</Button>
                            </Col>
                            <Col lg="6" md="6" xs="12" >
                                <a size="lg" 
                                    variant='info' 
                                    type='button' 
                                    style={{ marginTop: '24px', paddingTop: '8px', paddingBottom: '8px', fontSize: '20px' }} 
                                    className='btn btn-info w-100' href='/detail'>Тексеру (Декан үшін)</a>
                            </Col>
                            {changeStudent === 1 ?
                                <Col lg="12" md="12" xs="12" >
                                    <Button size="lg" variant='success' style={{ marginTop: '24px' }} type='link' href='https://chat.whatsapp.com/JaNafVVjCwr2lPW5Iq99ex' className='w-100'>Топқа қосылу үшін сілтемеге өтіңіз &nbsp;<svg xmlns="http://www.w3.org/2000/svg" width={'20px'} color='white' fill='white' viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" /></svg></Button>
                                </Col> : ''
                            }

                            <Col lg="12" md="12" xs="12" >
                                <Button size="lg" variant='light' style={{ marginTop: '24px', border: '1px solid #365C9B', backgroundColor: 'white', color: '#365C9B' }} type='link' href='/program.pdf' target="_blank" rel="noopener noreferrer" className='w-100'>Өту мерзімі және бағдарлама &nbsp; <svg width={'20px'} fill='#365C9B' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" /></svg></Button>
                            </Col>
                        </Row>
                    </Col> :
                    'asd'
                    }
                    
                </Row>
            </Container>
        </div>
    );
};

export default StudentList;
