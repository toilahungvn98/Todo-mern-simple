import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import {FaHome} from 'react-icons/fa';

import { connect } from 'react-redux';

import Logout from '../../../containers/Logout/Logout';

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 3rem;
    background-color: ${ ({theme}) => theme.colors.primary2 };
`;

const UL = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;

`;

const LI = styled.li`
    &:not(:last-child) {
        margin: 0 2rem 0 0;
    }
    & > * {
        text-decoration: none;
        color : ${ ({theme}) => theme.colors.black }
    }
`;
const MyLink = styled(NavLink)`
    color : ${ ({theme}) => theme.colors.black };
    &:visited {
        color : ${ ({theme}) => theme.colors.black };
    }
    &:active {
        color : ${ ({theme}) => theme.colors.primary };
    }
    font-weight: 600;
    
    &.active {
        color : ${ ({theme, ishome}) => {
            if (ishome) {
                return theme.colors.black
            } else {
                return theme.colors.primary
            }
        }}; 
        
    }
    
    
`;

const IconHome = styled(FaHome)`
    font-size: 2rem;
    margin: 0;
`;

const Navbar = ({isAuthenticated}) => {
    return (
        <div>
            <NavWrapper>
                <div>
                    <MyLink exact to="/" ishome="true"><IconHome/></MyLink>
                </div>
                <UL>
                { isAuthenticated ? <Logout /> : (
                        <>
                        <LI>
                        <MyLink activeClassName="active" to="/register">Register</MyLink>
                        </LI>
                        <LI>
                        <MyLink activeClassName="active" to="/login">Login</MyLink>
                        </LI>   
                        </>
                    )
                }
                </UL>    
            </NavWrapper>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Navbar);
