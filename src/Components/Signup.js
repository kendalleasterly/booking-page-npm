import {useRef} from "react"
import {Form, Button, Card} from "react-bootstrap"
import {useAuth } from "../Contexts/AuthContext"

function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()


    function handleSubmit(e) {
        e.preventDefault()
        
        signup(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2>Sign Up</h2>

                        <Form>

                            <Form.Group id = "email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type = "email" ref = {emailRef} required/>
                            </Form.Group>

                            <Form.Group id = "password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type = "password" ref = {passwordRef} required/>
                            </Form.Group>

                            <Form.Group id = "password-confirm">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type = "password-confirm" ref = {passwordConfirmRef} required/>
                            </Form.Group>

                            <Button type = "submit">Sign Up</Button>

                        </Form>

                </Card.Body>
            </Card>

        </div>
    )
}

export default Signup