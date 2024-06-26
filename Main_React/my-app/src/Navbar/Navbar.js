import {Component} from "react";
import {MenuData} from "./MenuData";
import "./NavbarStyles.css";
import {Link} from 'react-router-dom';


class Navbar extends Component {
    state = {clicked: false};
    handleClick = () => this.setState({clicked: !this.state.clicked})

    handlePageOpened = () => this.setState({clicked: false})

    render() {
        return (
            <nav className="NavbarItems">
                <a href={"/"}><img className="logo" src="/Images/FullLogoBright.png"></img></a>
                <div className="menuIcones" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>
                <ul className={this.state.clicked ? "navMenu active" : "navMenu"}>
                    {MenuData.map((item, index) => {
                        return (
                            <li key={index}>
                                <Link to={item.url} className={item.cName} onClick={this.handlePageOpened}>
                                    <i className={item.icon}></i>{item.title}
                                </Link>
                            </li>
                        )
                    })}

                    <li>
                        {this.props.isLoggedIn ? (
                            <Link onClick={this.props.handleLogout} className="navLogOut" to="/">Sign Out</Link>
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