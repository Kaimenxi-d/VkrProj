import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'

function PlaceOrderScreen({  }) {

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, error, success } = orderCreate || {}

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 1000 ? 0 : 300).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice)).toFixed(2)


    if (!cart.paymentMethod) {
        navigate('/payment')
    }

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success, order, navigate, dispatch])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Доставка</h2>

                            <p>
                                <strong>Адресс доставки: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Способ оплаты</h2>
                            <p>
                                <strong>Метод: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Товары на заказ</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>
                                Ваша корзина пуста
                            </Message> : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>

                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} X ₽{item.price} = ₽{(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Итог</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Товары:</Col>
                                    <Col>₽{cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Стоимость доставки:</Col>
                                    <Col>₽{cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Итого:</Col>
                                    <Col>₽{cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block my3 rounded'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Оформить заказ
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen