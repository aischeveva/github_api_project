import React from 'react'

const Repo = ({ repos }) => {
    return (
        <div>
            <h4>Average repo has</h4>
            <p>{ repos.watchers } watchers</p>
            <p>{ repos.stars } stars </p>
            <p>{ repos.forks } forks </p>
            <p>{ repos.open_issues_count } open issues</p>
        </div>
    )
}

export default Repo