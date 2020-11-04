import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: null,
      people: [],
      planets: [],
      films: [],
      charactersOfTheFilm: {}
    }

    for (let i = 0; i < 6; i++) {
      this.state.charactersOfTheFilm[i] = [];
      console.log(this.state.charactersOfTheFilm[i])
    }
  }

  componentDidMount() {
    // fetch is the javascript function for fetching data from API
    // we store the response in oure constant

    // 1. then() is a higher order function that as a parameter takes a function that returns a response from API in this case

    // 2. then() is a higher order function that as a parameter takes a function that return a data, from the function above, that means that data = response.json();

    // if any of the steps after fetch fails, it will return catch and thath handles error for us so the whole application does not fail

    // fetch('https://swapi.dev/api/films/1')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //    this.setState({ film: data }, () => console.log(this.state.film));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // this.handleFetch();
    this.handleFetchAllTheMovies();

  }

  handleFetch = async () => {
    const response = await fetch('https://swapi.dev/api/films/1/');
    const data = await response.json();
    this.setState({ film: data },
      () => this.state.film.characters.map(character => (
        this.handleFetchCharacterOfTheFilm(character)
      )));
  }

  handleFetchAllTheMovies = async () => {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();
    console.log(data);

    this.setState({ films: data.results }, () => this.state.films.map((film, index) => (
      film.characters.map((character) => (
        this.handleFetchCharacterOfTheFilm(character, index)
      ))
    )));
  }

  // creating a new function to fetch data based on the url parameter that we pass to function, it is a async function, so we can await for promises to resolve
  handleFetchCharacterOfTheFilm = async (url, index) => {
    const response = await fetch(url);
    const data = await response.json();
    // we fill the state of charactersOfTheFilm with newly fetched data, using the spread operator we add each character to the array
    this.setState({
      charactersOfTheFilm: {
        ...this.state.charactersOfTheFilm,
        [index]: [...this.state.charactersOfTheFilm[index], data]
      }
    });
    console.log(this.state.charactersOfTheFilm);
  }

  render() {
    return (
      <div>
        <h1>SWAPI exercise</h1>
        {/* {this.state.film && this.state.film.title} */}
        {/* {console.log(this.state.film)} */}

      </div>
    )
  }
}

export default App;