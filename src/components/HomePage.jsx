import React, { Component } from 'react';
import { authService } from '../services/auth.service';
import {history} from "../helpers/history";

export class HomePage extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          currentUser: null,
        };
      }

      componentDidMount() {
        authService.currentUser.subscribe((x) => {
          this.setState({
            currentUser: x,
          });
        });
      }

      logout() {
        authService.logout();
        history.push("/login");
      }

    render() {
        return (
            <div className="centeredDiv">
                
               <p className="homePageText">HOME PAGE</p>
               <br/>
               {this.state.currentUser && (
        <a onClick={this.logout} className="link">
          Logout
        </a>
      )}
            </div>
        )
    }
}

export default HomePage
