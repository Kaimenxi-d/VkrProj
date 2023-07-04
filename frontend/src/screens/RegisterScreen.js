import React, {useEffect, useState} from 'react'
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const redirect = location.search ? location.search.split("=")[1] : "/login"

    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    useEffect(() =>{
        if(userInfo){
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Пароли не совпадают')
        }else{
            dispatch(register(name, email, password))
        }
        
    }

  return (
    <FormContainer>
        <h1>Вход в учетную запись</h1>
        {message && <Message variant='danger'>{error}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Имя</Form.Label>
                <Form.Control
                    required
                    className='rounded'
                    type='name'
                    placeholder='Введите ваше имя'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>Почта</Form.Label>
                <Form.Control
                    required
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
                    required
                    className='rounded'
                    type='password'
                    placeholder='Введите пароль'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='passwordConfirm'>
                <Form.Label>Потвердите пароль</Form.Label>
                <Form.Control
                    required
                    className='rounded'
                    type='password'
                    placeholder='Потвердите пароль'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                >
                    
                </Form.Control>
            </Form.Group>
            <Button className='my-3 rounded' type='submit' variant='primary'>Зарегистрироваться</Button>
        </Form>
        <Row>
            <Col>
                Вы уже смешарик? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Войти</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen