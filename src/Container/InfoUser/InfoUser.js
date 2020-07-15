import React, {Component} from 'react';
import {fetchUserInfo,changeUser,deleteUser} from "../../Store/Action/userActions";
import {connect} from 'react-redux';
import './InfoUser.css'
import Modal from '../../Component/UI/Modal/Modal';
import InputMask from 'react-input-mask';
import {toast,ToastContainer} from "react-toastify";

class InfoUser extends Component {

    state = {
        modal: false,
        modal2: false,
        checkLogin: '',
        checkPass:'',
        editLogin:'',
        editNumber:'',
        editAvatar:'',
        editPassword:'',
    };

    inputValHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };

    componentDidMount() {
        this.props.fetchUserInfo(this.props.match.params.id);
    }

    closeModal = () => {
      this.setState({modal: false});
    };

    showModal2 = () => {
        this.setState({modal2: true});
    };

    closeModal2 = () => {
        this.setState({modal2: false});
    };

    checkHandler = () => {
      if(this.state.checkLogin !== this.props.users.login){
          toast.error('Неправильно ввели логин!');
      }
      else if(this.state.checkPass !== this.props.users.password){
          toast.error('Неправильно ввели пароль!');
      }else{
          this.setState({modal2: false});
          this.setState({modal: true});
      }
    };

    deleteHandler = () => {
        this.props.deleteUser(this.props.match.params.id);
        this.props.history.push('/')
    };

    changeUser = () => {
        const user = {
            login: this.state.editLogin === '' ? this.props.users.login : this.state.editLogin,
            number: this.state.editNumber === '' ? this.props.users.number : this.state.editNumber,
            avatar: this.state.editAvatar === '' ? this.props.users.avatar : this.state.editAvatar,
            password: this.state.editPassword === '' ? this.props.users.password : this.state.editPassword,
            month: this.props.users.month,
            day: this.props.users.day,
            hours: this.props.users.hours,
            minutes: this.props.users.minutes,
            born: this.props.users.born,
        };
        this.props.changeUser(this.props.match.params.id,user);
        this.setState({modal:false});
    };

    render() {
        return (
            <div className="InfoContainer">
                <ToastContainer/>
                <Modal show={this.state.modal2} close={this.closeModal2}>
                    <div className="in-2">
                        <p>Login:</p>
                    <input type="text" name="checkLogin" onChange={this.inputValHandler}/>
                    </div>
                    <div className="in-2">
                        <p>Password</p>
                    <input type="password" name="checkPass" onChange={this.inputValHandler}/>
                    </div>
                    <button onClick={this.checkHandler}>check</button>
                </Modal>
                <Modal show={this.state.modal} close={this.closeModal}>
                    <div className="in-2">
                        <p>Login</p>
                        <input type="text" name="editLogin" placeholder={this.props.users.login} onChange={this.inputValHandler}/>
                    </div>
                    <div className="in-2">
                        <p>Password</p>
                        <input type="text" name="editPassword" placeholder={this.props.users.password} onChange={this.inputValHandler}/>
                    </div>
                    <div className="in-2">
                        <p>Number</p>
                        <InputMask mask="+(999)-999-99-99-99" name="editNumber" placeholder={this.props.users.number} onChange={this.inputValHandler}/>
                    </div>
                    <div className="in-2">
                        <p>Avatar</p>
                        <input type="text" name="editAvatar" placeholder={this.props.users.avatar} onChange={this.inputValHandler}/>
                    </div>
                    <div className="avatar1">
                        {this.state.editAvatar === '' ? (
                            <img src={this.props.users.avatar} alt=""/>
                        ):(
                            <img src={this.state.editAvatar} alt=""/>
                        )}
                    </div>
                    <button onClick={this.changeUser}>edit</button>
                </Modal>
                <div className="allInfo">
                    <div className="avatar">
                        {this.props.users.avatar === '' ? (
                            <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/dS9ff5TYSlA/s228-p/photo.jpg" alt=""/>
                        ):(
                            <img src={this.props.users.avatar} alt=""/>
                        )}
                    </div>
                    <div className="title">
                        <p>Name: {this.props.users.login}</p>
                        <p>Number: {this.props.users.number}</p>
                        <p>Was Born: {this.props.users.born}</p>
                        <p>Register: {'Month: ' + this.props.users.month + ' Day: ' + this.props.users.day + ' Hours: ' + this.props.users.hours + ':' + this.props.users.minutes}</p>
                        <div className="bt">
                            <button className="delete" onClick={this.deleteHandler}>delete</button>
                            <button className="edit" onClick={this.showModal2}>edit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
   users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: (id) => dispatch(fetchUserInfo(id)),
    changeUser: (id,user) => dispatch(changeUser(id,user)),
    deleteUser: (id) => dispatch(deleteUser(id)),
});

export default connect(mapStateToProps,mapDispatchToProps)(InfoUser);