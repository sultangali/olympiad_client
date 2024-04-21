import React, { useState } from 'react';
import { Container, Navbar, Row, Col} from 'react-bootstrap'

const PasswordPrompt = ({ onPasswordCorrect }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const correctPassword = '414717'

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input === correctPassword) {
            onPasswordCorrect(true);
        } else {
            setError(true);
            setInput('');
        }
    };

    return (<>
    <Navbar className='text-center' expand="lg" fixed="top" style={{ backgroundColor: '#365C9B' }}>
            <Container>
                <Navbar.Brand style={{ color: 'white' }} href="/">
                    <img src="https://up.ksu.kz/buketov/logo_buketov2.png" width={'60px'} alt="" />
                    &nbsp;
                    <span style={{
                        fontSize: '22px',
                        marginLeft: '8px',
                        fontFamily: 'revert',
                        fontWeight: '500'
                    }}>Студенттер тізімі</span>
                </Navbar.Brand>
            </Container>
        </Navbar> 
        <Container  >
                <Row style={{ height: '100vh' }} className='d-flex row align-items-center justify-content-center'>
                    <Col lg="4" md="4" sm="6" xs="12">
                        <form onSubmit={handleSubmit}>
                            <input style={{fontSize: '20px', padding: '8px', paddingLeft: '12px'}} placeholder='Құпиясөзді теріңіз' className='form-control' size={'lg'} type="password" value={input} onChange={(e) => setInput(e.target.value)} />
                            <br />
                            <button style={{fontSize: '20px', padding: '8px', border: 'none', backgroundColor: '#365C9B'}} className='btn btn-primary w-100' type="submit">Тізімге кіру</button>
                        </form>
                        {error && <><br /><p style={{color: 'red'}}>Қате тердіңіз. Қайтадан теріңіз</p></>}
                    </Col>
                </Row>
            </Container>
    </>
            

    );
};

export default PasswordPrompt;
