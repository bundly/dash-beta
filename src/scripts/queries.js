export const summaryQuery = `
query summaryQuery($from: DateTime!, $username: [String!]) {
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
    issueComments(last: 100) {
      nodes {
        updatedAt
      }
    }
    contributionsCollection(from: $from) {
      commitContributionsByRepository(maxRepositories: 10) {
        resourcePath
        repository {
          nameWithOwner
          url
        }
        contributions(orderBy: {field: OCCURRED_AT, direction: ASC}) {
          totalCount
        }
      }
      issueContributions(last: 100) {
        nodes {
          issue {
            title
            number
            url
          }
        }
        totalCount
      }
      pullRequestContributions(last: 100) {
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
      pullRequestReviewContributions(last: 100) {
        nodes {
          pullRequest {
            number
            url
            title
          }
        }
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
          name
        }
      }
    }
  }
}`;

export const forksQuery = `
query starGazersQuery($name: String!, $owner: String!, $limit: Int!) {
  repository(name: "jest", owner: "facebook") {
    forks(last: 100) {
      edges {
        node {
          owner {
            avatarUrl
            login
          }
        }
      }
    }
  }
}`;
