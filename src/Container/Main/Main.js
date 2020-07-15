import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from "../../Store/Action/userActions";
import './Mian.css'
import {NavLink} from "react-router-dom";

class Main extends Component {

    componentDidMount(){
        this.props.fetchUsers();
    };

    render() {
        return (
            <div className="MainContainer">
                     <table>
                         <thead>
                    {this.props.users && Object.keys(this.props.users).map(info => (
                        <tr key={info}>
                            <td className="name">
                                <NavLink to={`/info/${info}`}>{this.props.users[info].login}</NavLink>
                            </td>
                            <td className="date">
                               <NavLink to={`/info/${info}`}> Month: {this.props.users[info].month + ' Day: ' + this.props.users[info].day + ' Hours: ' + this.props.users[info].hours + ':' + this.props.users[info].minutes}</NavLink>
                            </td>
                        </tr>
                    ))}
                         </thead>
                    </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
   fetchUsers: () => dispatch(fetchUsers()),
});


export default connect(mapStateToProps,mapDispatchToProps)(Main);