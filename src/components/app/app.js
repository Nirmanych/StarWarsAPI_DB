import React, { Component } from 'react'
import Header from '../header'

import './app.css'
import ErrorIndicator from "../error-indicator";
import { PersonDetails, PersonList, PlanetList, StarshipList } from "../sw-components";
import ErrorBoundary from "../error-boundary";
import Row from "../row";
import PlanetDetails from "../planet-details";
import RandomPlanet from "../random-planet";

import { SwapiServiceProvider } from '../swapi-service-context';
import DummySwapiService from "../../services/dummy-swapi-service";

import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
        hasError: false
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
                <SwapiServiceProvider value={this.swapiService} >
                    <div className="stardb-app">

                        <Header />
                        <Row
                            left={<PersonList onItemSelected={this.onPersonSelected} />}
                            right={<PersonDetails itemId={this.state.selectedPerson} />}
                        />

                        <Row
                            left={<PlanetList onItemSelected={this.onPlanetSelected} />}
                            right={<PlanetDetails itemId={this.state.selectedPlanet} />}
                        />

                        <RandomPlanet />

                        <StarshipList />

                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        )
    }
}   