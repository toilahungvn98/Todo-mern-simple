import React ,{ useState} from 'react';
import styled from 'styled-components';
import { MdAddAlert } from 'react-icons/md';

import { connect } from 'react-redux';
import { addTodo ,editTodo} from '../../actions/todoActions';

const Wrapper =  styled.div`

    width: 50rem;
    margin: 0 auto;
    background-color : ${({theme}) => theme.colors.primary2};
    margin-bottom: 5rem;
    padding: 2rem 1rem;
`;
const FormWrapper =  styled.form`
    display: flex;
    ${'' /* width: 50rem;
    margin: 0 auto; */}
    ${'' /* background-color : ${({theme}) => theme.colors.primary2}; */}
    ${'' /* margin-bottom: 5rem;
    padding: 2rem 1rem; */}
`;

const Input = styled.input`
    width: 80%;
    border : 1px solid ${({theme}) => theme.colors.primary};
    height: 3rem;
    line-height: 3rem;
    padding: 0 1rem;
    &:focus {
        background-color: ${({theme}) => theme.colors.primary2};
    }
`;
const Button = styled.button`
    width: 20%;
    background-color : ${({theme}) => theme.colors.primary};
    border : 1px solid ${({theme}) => theme.colors.primary};
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    &:hover {
        background-color : ${({theme}) => theme.colors.black};
        color : ${({theme}) => theme.colors.white};
        border: 1px solid transparent;
    }
`;


const IconAdd = styled(MdAddAlert)`
    margin-right: 3px;
`;

const MessageErr = styled.p`
    color : ${ ({ theme }) =>  theme.colors.errorRed };
    display: ${ ({ err}) => err ? 'block' : 'none'};
`;



const CreateTodo = ({addTodo ,error,todo}) => {

    const [title, setTitle] = useState('');


    const handleChange = e => {
        setTitle(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTitle = {
            title : title
        };
        addTodo(newTitle);
        setTitle('');
    }
    

    let msg;
    if (error.title) {
        msg = (<MessageErr  err={true}>{ error.title}  </MessageErr> )
    }
    return (
        <Wrapper>
        <FormWrapper noValidate onSubmit={handleSubmit}>
                <Input 
                    type="text"
                    name="title" 
                    value={title}
                    onChange={handleChange}
                    placeholder="Add a todo ..." />     
                <Button><IconAdd/><span>Add</span></Button>
        </FormWrapper>
        {msg}
        </Wrapper>
    )
}

const mapStateToProps = state => ({
    error : state.errors.msg,
    todo : state.todo.msg
})

export default connect(mapStateToProps, { addTodo, editTodo })(CreateTodo);
