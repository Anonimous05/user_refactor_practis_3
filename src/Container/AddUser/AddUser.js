import React, {Component} from 'react';
import InputMask from 'react-input-mask';
import './Add.css'
import {sendUser} from "../../Store/Action/userActions";
import {connect} from 'react-redux';

class AddUser extends Component {

    state = {
        login: '',
        password:'',
        number:'',
        born:'',
        avatar:'',
    };

    inputValHandler = (e) => {
      this.setState({[e.target.name]: e.target.value});
    };

    addHandler = () => {
        if(this.state.login === ''||this.state.password === ''||this.state.number === ''||this.state.born === ''){
            document.getElementById('text1').style.color = 'red';
            document.getElementById('text2').style.color = 'red';
            document.getElementById('text3').style.color = 'red';
            document.getElementById('text4').style.color = 'red';
        }
        else {
            const date = new Date();
            const user = {
                login: this.state.login,
                password: this.state.password,
                number: this.state.number,
                born: this.state.born,
                avatar: this.state.avatar,
                month: date.getMonth(),
                day: date.getDate(),
                hours: date.getHours(),
                minutes: date.getMinutes(),
            };
            this.props.sendUser(user);
            this.props.history.push('/');
        }
    };

    render() {
        return (
            <div className="AddContainer">
                <div className="inputs">
                    <div className="in-1">
                    <p id="text1">Login</p>
                        <input type="login" placeholder="Login" onChange={this.inputValHandler} name="login" required/>
                    </div>
                    <div className="in-1">
                    <p id="text2">Password</p>
                    <input type="password" placeholder="password" onChange={this.inputValHandler} name="password" required/>
                    </div>
                    <div className="in-1">
                    <p id="text3">Number</p>
                        <InputMask type="text" mask="+(999)-999-99-99-99" placeholder="+(996)-000-00-00" onChange={this.inputValHandler} name="number" required/>
                    </div>
                    <div className="in-1">
                        <p id="text4">Year of born</p>
                        <InputMask mask="год- 9999 месяц - 99 день - 99" onChange={this.inputValHandler} name="born" required/>
                    </div>
                    <div className="in-1">
                        <p id="text5">Avatar</p>
                        <input type="text" onChange={this.inputValHandler} name="avatar"/>
                    </div>
                </div>
                <div className="img">
                    {this.state.avatar === '' ? (
                        <img src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/dS9ff5TYSlA/s228-p/photo.jpg" alt=""/>
                    ) : (
                        <img src={this.state.avatar} alt=""/>  
                    )}
                </div>
                <div className="btns">
                    <button onClick={this.addHandler}>Add</button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    sendUser: (user) => dispatch(sendUser(user))
});


export default connect(null,mapDispatchToProps)(AddUser);