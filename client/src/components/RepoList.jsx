import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => {
      return  <div key={repo.id}><a href={repo.repourl}>{repo.reponame}</a></div>
    })}
  </div>
)

export default RepoList;