import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    
    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            navigate(`/?keyword=${keyword}`)

        } else {
            navigate(location.pathname)
        }
    }
    
    return (
        <Form onSubmit={submitHandler} className="d-flex justify-content-start">
            <Form.Control 
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className=''
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                
            >
                Найти
            </Button>
        </Form>
    )
}

export default SearchBox