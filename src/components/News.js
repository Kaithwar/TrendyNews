import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    // console.log("Hello I am a constructor from news Component");
    this.state = {
      articles: [],
      loading:false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - TrendyNews `;
  }

  async updateNews(){
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f18e52c354124274931a3f8d9a533b5b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
  }

  async componentDidMount(){
    this.updateNews()
  }

  handlePrevClick = async () =>{
    // console.log("Previous")
    this.setState({page: this.state.page - 1})
    this.updateNews()
  }

  handleNextClick = async () =>{
    // console.log("Next")
    this.setState({page: this.state.page + 1})
    this.updateNews()
  }

  render() {
    return (
        <div className='container my-3'>
            <h1 className='text-center' style={{margin: '32px 0'}}>TrendyNews - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
            {this.state.loading && <Spinner/>}
            <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url} >
                      <NewsItem title={element.title} description={element.description?element.description.slice(0,85):""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt}/>  
                    </div>           
            })}
            </div>
            <div className="container d-flex justify-content-between my-4">
              <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
            </div>
        </div>
    ) 
  }
}

export default News