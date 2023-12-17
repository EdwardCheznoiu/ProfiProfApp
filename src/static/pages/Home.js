import Hero from "../../components/big/Hero";
import React, { Component } from 'react';
import SearchViewTeacher from "../../components/big/SearchViewTeacher";
import InfoBox from "../../components/big/InfoBox";

export class Home extends Component
{
    render()
    {
        return (
            <>
                <Hero />
                <InfoBox />
                <h1 className="text-center">Caută profesorul de care ai nevoie</h1>
                <SearchViewTeacher />
            </>

        );
    }
}