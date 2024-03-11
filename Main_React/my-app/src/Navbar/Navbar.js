import {Component} from "react";
import {MenuData} from "./MenuData";
import "./NavbarStyles.css";
import { Link } from 'react-router-dom';


class Navbar extends Component {
    state = {clicked: false};
    handleClick =()=> this.setState({clicked: !this.state.clicked})

    render() {
        return (
            <nav className="NavbarItems">
                <img className="Logo" src="/Images/FullLogoBright.png"></img>
                <div className= "menuIcones" onClick={this.handleClick}>
                    <i className= {this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        )
                    })}

                    <li>
                        {this.props.isLoggedIn ? (
                            <button onClick={this.props.handleLogout} className="navLogIn">Sign Out</button>
                        ) : (
                            <Link to="/login" className="navLogIn">Log In</Link>
                        )}
                    </li>

                </ul>

            </nav>
        )
    }
}

export default Navbar;