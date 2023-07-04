import React, {useEffect, useState} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

function LoginScreen({ }) {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    const redirect = location.search ? location.search.split("=")[1] : "/login"

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

  return (
    <FormContainer>
        <h1>Вход в учетную запись</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Почта</Form.Label>
                <Form.Control
                    className='rounded'
                    type='email'
                    placeholder='Введите почту'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='password'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                    className='rounded'
                    type='password'
                    placeholder='Введите пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Button className='my-3 rounded' type='submit' variant='primary'>Войти</Button>
        </Form>
        <Row>
            <Col>
                Нет учетной записи? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Зарегистрироваться</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen