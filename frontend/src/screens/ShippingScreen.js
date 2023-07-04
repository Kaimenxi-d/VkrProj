import React, {useEffect, useState} from 'react'
import { Form, Button} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress?.address || '')
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, postalCode, }))
        navigate('/payment')
        
    }
  return (

        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Доставка</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Адресс доставки (Город, улица, номер дома/квартиры)</Form.Label>
                    <Form.Control
                        required
                        className='rounded'
                        type='text'
                        placeholder='Введите адресс'
                        value={address ? address : ''}
                        onChange={(e) => setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='Почтовый индекс'>
                    <Form.Label>Почтовый индекс</Form.Label>
                    <Form.Control
                        required
                        className='rounded'
                        type='text'
                        placeholder='Введите почтовый индекс'
                        value={postalCode ? postalCode : ''}
                        onChange={(e) => setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button className='my-3 rounded' type='submit' variant='primary'>
                    Продолжить
                </Button>
            </Form>
        </FormContainer>
  )
}

export default ShippingScreen