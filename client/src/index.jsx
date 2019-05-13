import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.search = this.search.bind(this);
    this.getTopRepos = this.getTopRepos.bind(this);
  }

  search (term) {
    $.ajax({
    type: "POST",
    url: '/repos',
    data: JSON.stringify({'username': term}),
    success: this.getTopRepos,
    contentType: 'application/json'
  })
}

componentDidMount () {
  this.getTopRepos();
}

getTopRepos () {
  $.ajax({
    type: "GET",
    url: '/repos',
    success: (data) => {
      this.setState({
        repos: data
      })
    },
  })
}

  

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));