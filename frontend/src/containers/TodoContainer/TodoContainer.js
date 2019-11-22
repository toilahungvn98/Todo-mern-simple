
import Todo from '../../components/Todos/Todo';
import { getTodo ,deleteTodo, editTodo} from '../../actions/todoActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    todo : state.todo.todos,
    isLoading : state.todo.isLoading
});

const mapDispatchToProps = {
    getTodo,
    deleteTodo,
    editTodo
}

const TodoContainer = connect(mapStateToProps,mapDispatchToProps)(Todo);

export default TodoContainer;
