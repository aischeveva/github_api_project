import React from 'react'
import Plot from 'react-plotly.js'
import Repo from './Repo'

const Company = ({ company }) => {
    const style = {
        border: 'solid',
        padding: 25,
        margin: 20
    }

    let labels = []
    let values = []
    if(company.languages !== undefined){
        Object.entries(company.languages).forEach(([key, value]) => {
            labels = labels.concat(key)
            values = values.concat(value)
        })
    }

    return (
        <div style={ style } className={ company.login }>
            <h2>{ company.name }</h2>
            <p style={ { fontStyle: "italic" } }>{ company.description }</p>
            <p>GitHub account created on { new Date(company.created).toLocaleString('fi-FI', { year: 'numeric', month: 'numeric', day: 'numeric' }) }</p>
            <p>Number of repositories: { company.repoNumber } </p>
            <p>Last updated on { new Date(company.lastUpdate).toLocaleString('fi-FI') } </p>
            { company.repos !== undefined && <Repo repos={company.repos} /> }
            { company.languages !== undefined && 
                <Plot data={[
                    {
                        values: values.slice(0, 10),
                        labels: labels.slice(0, 10),
                        type: 'pie'
                    }
                ]} layout={ {width: 320, height: 320, title: 'Top 10 Languages used'} } />
            }
        </div>
    )
}

export default Company