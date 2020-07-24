import React, {useState} from 'react';
import './App.css';

// Imports for the other components.
import MovieView from './components/MovieView/MovieView';

// Imports for Material UI.
import TextField from '@material-ui/core/TextField';

interface MovieState {
  posterURL: string,
  title: string,
  year: string,
  plot: string,
  runtime: string,
  director: string,
  imdbRating: string
}

interface OtherState {
  exists: Boolean,
  error: Boolean
}

function App() {
  // Configuring the state of the main component.
  const [movie, setMovie] = useState<MovieState>();
  const [otherState, setOtherState] = useState<OtherState>({exists: false, error: false})

  return (
    <div className="App">
      {/* Using Material UI to create the textfield for entering the movie ID.*/}
      <TextField
        id="outlined"
        style={{ width: "auto", marginLeft: 15, marginTop: 20, marginBottom: 20, marginRight: 15}}
        label="IMDb ID" 
        variant="outlined" 
        size="small" 
        helperText="For testing purposes, feel free to use 'tt2293640' as the ID. Press the 'Enter' key after your input." 
        InputLabelProps={{
            shrink: true,
        }}
        onKeyDown={
          function(event) {
            if (event.keyCode === 13) {
              const target = event.target as HTMLTextAreaElement;
              fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${target.value}&plot=full`)
              .then(response => response.json())
              .then(response => {
                if (response["Error"]) {
                  alert("Error! Make sure the imDb ID was entered correctly. If error persists, contact the developer ):")
                } else {
                  setMovie({
                    posterURL: response["Poster"],
                    title:  response["Title"],
                    year:  response["Year"],
                    runtime:  response["Runtime"],
                    director:  response["Director"],
                    plot:  response["Plot"],
                    imdbRating:  response["imdbRating"]
                  })
                  setOtherState({
                    exists: true,
                    error: false
                  })
                }
              })
              .catch(() => alert("There was an error regarding the API being used. ):"));
            }
          }
        }
      />

      {/* A custom functional component showing all the details about the movie.*/}
      {otherState["exists"]
      ? <MovieView 
        posterURL={movie?.posterURL!}
        title={movie?.title!}
        year={movie?.year!}
        runtime={movie?.runtime!}
        director={movie?.director!}
        plot={movie?.plot!}
        imdbRating={movie?.imdbRating!}
        />
      : null}
    </div>
  );
}

export default App;