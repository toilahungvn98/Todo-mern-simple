import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import history from '../../utils/history';
import styled from 'styled-components';

const LoginWrapper = styled.div`
    width: 50rem;
    background: ${ ({theme}) => theme.colors.primary2 };
    margin: 0 auto;
    margin-top: 10rem;
    padding: 2rem 5rem;
`;

const H3 = styled.h3`
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 1rem;
`;

const Field = styled.div`
    margin-bottom: 3rem;
    position: relative;
`;

const Input = styled.input`
    width: 100%; 
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    border: none;
    transition: all 0.3s ease;
    &:focus {
        box-shadow: 0px 9px 13px -4px rgba(0,0,0,0.5);
    }

`;

const Label = styled.label`
    font-size: 1.2rem;
`;

const Submit = styled.button`
    background: ${ ({theme}) => theme.colors.primary };
    font-size: 1.5rem;
    /* font-weight: 600; */
    border: none;
    padding: .5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background: ${ ({theme}) => theme.colors.black };
        color: #fff;
        box-shadow: 0px 9px 13px -4px rgba(0,0,0,0.5);
    }
`;

const Msg  = styled.span`
    color: ${ ({theme}) => theme.colors.errorRed };
    font-size: 1.3rem;
    position: absolute;
    left: 0;
    top: 100%;
`;

const Msg2 = styled.span`
    color: ${ ({theme}) => theme.colors.errorRed };
    font-size: 1.5rem;
`;

const MLink = styled(Link)`
    text-decoration: none;
`;

const Register = ({registerUser ,getError, isAuthenticated}) => {

    const initState = {
        name : '',
        email : '',
        password : '',
        password2 : ''
    }
    const [form,setForm] = useState(initState);

    
    const handleChange = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

            const newUser = {
                name : form.name,
                email : form.email,
                password : form.password,
                password2 : form.password2
            };
            registerUser(newUser);
            setForm({
                ...form,
                [e.target.name] : ''
            });
    
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/dashboard');
        }
    },[isAuthenticated]);



    return (
        <LoginWrapper>
            <H3>Register</H3>
            { getError !== null ?  <Msg2>{getError.msg.msg}</Msg2> : ''}
            <form noValidate onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" name="name" value={form.name} onChange={handleChange}  />
                    { getError !== null ?  <Msg>{getError.msg.name}</Msg> : ''}
                </Field>
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" value={form.email} onChange={handleChange} />
                    { getError !== null ?  <Msg>{getError.msg.email}</Msg> : ''}
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password"  value={form.password} onChange={handleChange} />
                    { getError !== null ?  <Msg>{getError.msg.password}</Msg> : ''}
                </Field>
                <Field>
                    <Label htmlFor="password2">Confirm Password</Label>
                    <Input id="password2" type="password" name="password2" value={form.password2} onChange={handleChange} />
                    { getError !== null ?  <Msg>{getError.msg.password2}</Msg> : ''}
                </Field>
                <Field>
                    <Submit>Sign Up</Submit> 
                </Field>
                <p>Do you already have an account? <MLink to="/login">Sign In</MLink></p>
            </form>
        </LoginWrapper>
    );

}

const mapStateToProps = state => ({
    isAuthenticated  : state.auth.isAuthenticated,
    getError : state.errors
});


const mapDispatchToProps  = { registerUser };



export default connect( mapStateToProps, mapDispatchToProps )(Register);
