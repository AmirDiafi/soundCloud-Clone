import React from 'react'
import './stylesheets/Navbar.css'
import Home from './Home'
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return(
            <Router>
                <div className='navbar'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='logout'>Logout</Link></li>
                    </ul>
                </div>
                <Route exact path='/' component={Home} />
            </Router>
        )
    }
}

export default Navbar