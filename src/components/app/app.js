import React, { Component } from 'react'
import Header from '../header'

import './app.css'
import ErrorIndicator from "../error-indicator";
import { PersonDetails, PersonList, PlanetList, StarshipList } from "../sw-components";
import ErrorBoundary from "../error-boundary";

import { SwapiServiceProvider } from '../swapi-service-context';

import SwapiService from "../../services/swapi-service";
import StarshipDetails from "../sw-components/starship-details";
import Row from "../row";
import PlanetDetails from "../planet-details";
import RandomPlanet from "../random-planet";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
        hasError: false,
        swapiService: new SwapiService()
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ hasError: true })
    }


    onPersonSelected = (id) => {
        console.log("Selected person ID:", id);
        this.setState({ selectedPerson: id });
    };


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService} >
                    <div className="stardb-app">

                        <Header />
                        <RandomPlanet />
                        <Row left={<PersonList />} right={<PersonDetails itemId={3} />} />
                        <Row left={<StarshipList />} right={<StarshipDetails itemId={5} />} />
                        <Row left={<PlanetList />} right={<PlanetDetails itemId={8} />} />

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        )
    }
}   