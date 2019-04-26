import React from 'react';
import $ from 'jquery';
import AudienceReview from './components/AudienceReview.jsx';
import {getMovieIDURL, getEnvironment} from '../../server/environment.js';
import toggle from '../dist/toggle.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      urlTitle: getMovieIDURL(),
      reviews: [],
      environment: getEnvironment(),
      title: "Guardians of the Galaxy"
    };
    this.getMovieID = this.getMovieID.bind(this);
    this.getMovieReviews = this.getMovieReviews.bind(this);
  }

  getMovieReviews() {
    $.ajax({
      url: this.state.environment.reviews + `/reviews/audience/${this.state.id}`,
      success: (data) => {
        this.setState({
          reviews: JSON.parse(data)
        });
        toggle();
      },
      error: (err) => {
        console.log("error getting movie data", err);
      },
      type: "GET"
    });
  }

  // get ID from source of truth
  getMovieID() {
    // AJAX call to get movie id/title
    $.ajax({
      url: this.state.environment.scoreboard + `/m/movieinfo/${this.state.urlTitle}`,
      // on success, set id/title
      success: (data) => {
        this.setState({
          title: data.title,
          id: data.id.toString()
        });
        this.getMovieReviews();
      },
      error: (err) => {
        console.log("error getting movie data", err);
      },
      type: "GET"
    });
  }

  componentDidMount() {
    this.getMovieReviews();
  }

  render() {
    return (
      <div>
        <AudienceReview title={this.state.title} reviews={this.state.reviews}/>
      </div>
    )
  }
}

export default App;