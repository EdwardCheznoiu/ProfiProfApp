
import React, { Component } from 'react';
import '../css/pages/Dashboard.css'
export class Dashboard extends Component
{

    constructor(props)
    {
        super(props);
        this.state = {
            deps: []
        };
    }

    render()
    {
        return (
            <div className="side-menu">
                <ul>
                    <li>Admini</li>
                    <li>Studenti</li>
                    <li>Profesori</li>
                </ul>

            </div>
        )
    }


}