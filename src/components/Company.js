import React from 'react'
import { Doughnut } from 'react-chartjs-2'
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

    const data = {
        labels: labels.slice(0, 10),
        datasets: [
            {
                data: values.slice(0, 10),
                backgroundColor: [
                    'rgba(53, 80, 112, 1)',
                    'rgba(109, 89, 122, 1)',
                    'rgba(181, 101, 118, 1)',
                    'rgba(229, 107, 111, 1)',
                    'rgba(234, 172, 139, 1)',
                    'rgba(183, 192, 238, 1)',
                    'rgba(203, 243, 210, 1)',
                    'rgba(255, 230, 232, 1)',
                    'rgba(172, 216, 170, 1)',
                    'rgba(159, 194, 204, 1)',
                ],
                borderColor: [
                    'rgba(53, 80, 112, 1)',
                    'rgba(109, 89, 122, 1)',
                    'rgba(181, 101, 118, 1)',
                    'rgba(229, 107, 111, 1)',
                    'rgba(234, 172, 139, 1)',
                    'rgba(183, 192, 238, 1)',
                    'rgba(203, 243, 210, 1)',
                    'rgba(255, 230, 232, 1)',
                    'rgba(172, 216, 170, 1)',
                    'rgba(159, 194, 204, 1)',
                  ],
                  borderWidth: 0.1,
            }
        ]
    }

    return (
        <div style={ style } className={ company.login }>
            <h2>{ company.name }</h2>
            <p style={ { fontStyle: 'italic' } }>{ company.description }</p>
            <p>GitHub account created on { new Date(company.created).toLocaleString('fi-FI', { year: 'numeric', month: 'numeric', day: 'numeric' }) }</p>
            <p>Number of repositories: { company.repoNumber } </p>
            <p>Last updated on { new Date(company.lastUpdate).toLocaleString('fi-FI') } </p>
            { company.repos !== undefined && <Repo repos={company.repos} /> }
            { company.languages !== undefined && 
                <Doughnut data={data} />
            }
        </div>
    )
}

export default Company