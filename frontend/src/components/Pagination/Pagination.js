import React from 'react';

import styled from 'styled-components';
const PageNum = styled.div`
    margin-top: 5rem;
    display: flex;
    justify-content: flex-end;

`;
const Pagination = () => {
    return (
        <PageNum>
             {'<<'} <p>1 2 3 4 5 7</p> {'>>'}
        </PageNum>
    )
}

export default Pagination;
