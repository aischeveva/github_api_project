import { Octokit } from '@octokit/core'
import { TOKEN } from '../utils/config';


const octokit = new Octokit();

const requestWithAuth = octokit.request.defaults({
    headers: {
      authorization: `token ${TOKEN}`,
    },
});

const getGeneralInfo = async (name) => {
    const response = await requestWithAuth('GET /orgs/{org}', {
        org: name
      })
    
    const data = response.data
    const languages = await getLanguages(name)
    const repos = await getRepoInfo(name)

    const company = { 
        login: data.login,
        name: data.name,
        repoNumber: data.public_repos, 
        lastUpdate: data.updated_at, 
        created: data.created_at, 
        description: data.description,
        languages: languages,
        repos: repos
    }

    return company
}

const getLanguages = async (name) => {
    const repositories = await requestWithAuth('GET /orgs/{org}/repos', {
        org: name
    })

    const repoNames = repositories.data.map(repo => repo.name)

    const languages = await Promise.all(repoNames.map(async (repo) => {
            const lang = await requestWithAuth('GET /repos/{org}/{repo}/languages', {
                    org: name,
                    repo: repo
                })
            return lang.data
        })
    )

    const sum = {}
    languages.forEach(lang => {
        Object.entries(lang).forEach(
            ([key, value]) => {
                (key in sum) ? sum[key] += value : sum[key] = value
            }
        );
    })

    return sum
}

const getRepoInfo = async (name) => {
    const response = await requestWithAuth('GET /orgs/{org}/repos', {
        org: name
    })

    const data = response.data

    const watchers = data.map(repo => repo.watchers_count).reduce((e1, e2) => e1 + e2)
    const stars = data.map(repo => repo.stargazers_count).reduce((e1, e2) => e1 + e2)
    const forks = data.map(repo => repo.forks_count).reduce((e1, e2) => e1 + e2)
    const open_issues_count = data.map(repo => repo.open_issues_count).reduce((e1, e2) => e1 + e2)

    return {
        watchers: Math.round(watchers/data.length),
        stars: Math.round(stars/data.length),
        forks: Math.round(forks/data.length),
        open_issues_count: Math.round(open_issues_count/data.length)
    }
}

export { getGeneralInfo }