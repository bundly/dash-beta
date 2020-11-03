export const summaryQuery = `
query summaryQuery($from: DateTime!, $username: [String!], $limit: Int!) {
  viewer {
    organization(login: "MLH-Fellowship") {
      team(slug: "mlh-fellows-summer-2020") {
        childTeams(userLogins: $username, first: 5) {
          nodes {
            discussions(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
              nodes {
                title
                createdAt
                url
                comments(first: 15) {
                  nodes {
                    author {
                      login
                    }
                    body
                  }
                }
              }
            }
            name
            slug
            discussionsUrl
          }
        }
      }
    }
    issueComments(last: $limit) {
      nodes {
        updatedAt
      }
    }
    contributionsCollection(from: $from) {
      commitContributionsByRepository(maxRepositories: $limit) {
        resourcePath
        repository {
          nameWithOwner
          url
        }
        contributions(orderBy: {field: OCCURRED_AT, direction: ASC}) {
          totalCount
        }
      }
      issueContributions(last: $limit) {
        nodes {
          issue {
            title
            number
            url
          }
        }
        totalCount
      }
      pullRequestContributions(last: $limit) {
        nodes {
          pullRequest {
            state
            title
            url
            number
          }
        }
        totalCount
      }
      pullRequestReviewContributions(last: $limit) {
        nodes {
          pullRequest {
            number
            url
            title
          }
        }
        totalCount
      }
      startedAt
      totalCommitContributions
      totalIssueContributions
      totalPullRequestContributions
      totalPullRequestReviewContributions
    }
  }
}`;

export const starGazersQuery = `
query starGazersQuery($name: String!, $owner: String!, $limit: Int!) {
  repository(name: $name, owner: $owner) {
    stargazers(first: $limit) {
      totalCount
      edges {
        node {
          avatarUrl
          login
        }
      }
    }
  }
}`;

export const forksQuery = `
query forksQuery($name: String!, $owner: String!, $limit: Int!) {
  repository(name: $name, owner: $owner) {
    forks(last: $limit) {
      totalCount
      edges {
        node {
          name
          owner {
            avatarUrl
            login
          }
        }
      }
    }
  }
}`;

export const nestedFollowersQuery = `
query nestedFollowersQuery($owner: String!, $limit1: Int!, $limit2: Int!) {
  user(login: $owner) {
    followers(last: $limit1) {
      nodes {
        login
        avatarUrl
        followers(last: $limit2) {
          nodes {
            login
            avatarUrl
          }
        }
      }
    }
  }
}`;

export const topRepositoryQuery = `
query topRepositoryQuery {
  viewer {
    topRepositories(orderBy: {field: STARGAZERS, direction: DESC}, first: 1) {
      nodes {
        name
        owner {
          login
        }
        stargazers {
          totalCount
        }
      }
    }
  }
}`;
