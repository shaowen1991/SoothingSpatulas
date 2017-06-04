# MOMENTO

The project description

## Team

- Chris Keating
- Jack Ren
- Michael Sermersheim
- Nick Anderson

## Roadmap

View the project roadmap [here](LINK_TO_DOC)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

# Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Installing Docker](#installing-docker)

## Usage

> Some usage instructions

## Requirements

- Node 6.9.x
- Redis 3.2.x
- Postgresql 9.6.x
- etc

## Development

### Installing Dependencies

```
brew install yarn
```

Yarn is a replacement for npm. It's faster and *guarantees* consistency -- as you deploy your code in various environments, you won't run the risk of slight variations in what gets installed.


### Installing Docker

Install Docker Community Edition for your operating system. Follow instructions to install and start the Docker Community Edition. After downloading the SoothingSpatulas repository, open a terminal in the root directory of SoothingSpatulas. To get Docker Containers running, you'll want to do the commands in the order below.

To build the container: `yarn docker-build`

To create the container: `yarn docker-up`

To create the datbase tables: `yarn docker-migrate`

To seed the database tables: `yarn docker-seed`

To remove the container: 'yarn docker-down'



