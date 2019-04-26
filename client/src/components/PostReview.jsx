import React from 'react';

class PostReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render() {
    return (
    <div className='adduser-container'>  
      <div className="post-container">
        <div className="addRating"><span className='ratingText'>Add your rating</span></div>
        <div className="rating">
          <div className="profile box"><i className="far fa-user fa-5x"></i></div>
          <div className="ratingReview">
            <div className="add-wrapper">
              <button className="interested box" value="-">- Not interested</button>
            </div>
            <div className="add-wrapper">
              <button className="wantToSee box" value="+">+ Want to See</button>
            </div>
              <div className="starsRating box">
                <span className="fa fa-star" data-rating="1"></span>
                <span className="fa fa-star" data-rating="2"></span>
                <span className="fa fa-star" data-rating="3"></span>
                <span className="fa fa-star" data-rating="4"></span>
                <span className="fa fa-star" data-rating="5"></span>
                <input type="hidden" name="whatever" className="rating-value" value="3"></input>
              </div>
            <div className="review-wrapper">
              <textarea className="addReview box" value={this.state.value} onChange={this.handleChange}>Add a Review</textarea>
              <div className="rating-submit">
                <button className='post btn'>Post</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )

  }
}

export default PostReview;