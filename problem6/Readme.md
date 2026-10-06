# Live Scoreboard Service Module Specification

# Overview

This module maintains user's scores.
User can do an action, completing this action will increase the user’s score.
Upon completion the action will dispatch an API call to the application server to update the score.
Updating the score required users to be authenticated first.

# Database

- UserScore
  - userId: number - PRIMARY KEY
  - userName: string // For quickly selection instead of joining tables
  - score: number
  - created_at: timestamp
  - updated_at: timestamp

- UserActionLog
  - id: number - PRIMARY_KEY
  - userId: number
  - userName: string
  - created_at: timestamp

# API

- GET:/api/v1/scores/top

Description: Get the first 10 top score users. This API query directly from cache instead of database

Response Model:

> [
>
> > {
> > userId: number,
> > score: number,
> > rank: number
> > }
> > ]

- POST:/api/v1/scores/increment

Description: Increase a user's score by 1. This API will write first to cache, then patch data gradually into database

Header:

- Authentication

  > Bearer [JWT]

- Payload:
  > {
  > userId: number,
  > timestamp: number
  > }

# Architecture

- Stack
  - Cached memory - Redis
  - Socket

Redis to avoid database overloaded.

Socket to send real time data to browsers.

# Workflow

```mermaid
graph LR
Client[Client] -- Login --> Auth[Authentication/Authorization]
Auth --> Action[Action]
Action --> Server[Server]
Server --> Cache[Cache]
Client --> Web[Web]
Socket --> Web
Cache --> Socket[Socket]
Cache --> Database[Database]
Database --> Cache
```
