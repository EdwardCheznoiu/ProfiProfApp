import HeaderCarousel from "../../components/big/HeaderCarousel";
import React, { Component } from 'react';
import SearchViewTeacher from "../../components/big/SearchViewTeacher";
import CardDeck from "../../components/big/CardDeck";

export class Home extends Component
{
    render()
    {
        return (
            <>
                <HeaderCarousel />

                <div className="alert alert-light" role="alert">
                    ProfiPorfUCV este o platforma unde un student care are o anumite problema de rezolvat (proiect, tema, etc.) poate cauta un profesor pe baza crieterilor de care au nevoie.
                </div>

                <h1 className="text-center">Cauta profesorul de care ai nevoie</h1>
                <SearchViewTeacher />
            </>

        );
    }
}