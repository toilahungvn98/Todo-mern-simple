import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import history from '../../utils/history';

import styled from 'styled-components';

const RegisterWrapper = styled.div`
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

const Login = ({loginUser,getError,isAuthenticated}) => {

    const initState = {

        email : '',
        password : '',

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

            const userInfo = {
                email : form.email,
                password : form.password,           
            };
            loginUser(userInfo);
            setForm({
                ...form,
                [e.target.name] : ''
            });
    
    }

    useEffect(() => {
        if (isAuthenticated === true ) {
            history.push('/dashboard');
        }
    },[isAuthenticated]);

    return (
        <RegisterWrapper>
            <H3>Login</H3>
            { getError !== null ?  <Msg2 error="true">{getError.msg.msg}</Msg2> : ''}
            <form noValidate onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" value={form.email} onChange={handleChange} />
                    { getError !== null ?  <Msg  error="true">{getError.msg.email}</Msg> : ''}
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" name="password"  value={form.password} onChange={handleChange} />
                    { getError !== null ?  <Msg  error="true">{getError.msg.password}</Msg> : ''}
                </Field>
                <Field>
                    <Submit>Sign In</Submit>
                </Field>
                <p>Do not have an account? <MLink to="/register">Sign Up</MLink></p>
            </form>
        </RegisterWrapper>
    );

}


const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    getError : state.errors
});

const mapDispatchToProps = {
    loginUser
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
