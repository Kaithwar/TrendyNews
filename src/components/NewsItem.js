import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageurl, newsurl, author, date} = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img src={!imageurl?"https://akm-img-a-in.tosshub.com/indiatoday/images/story/202208/BeFunky-collage__67_-647x363.jpeg?Gh112XdwizYs3PM48MawjaNzIDXPvbA1": imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer"  href={newsurl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem