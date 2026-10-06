# Intructions

- npm run start

I have set up a database on Supabase. So you just need to plug and run.

- Create a resource.
  curl --location 'http://localhost:3000/movies' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Star Wars: Attack of the Clones",
  "description": "Star Wars: Episode II – Attack of the Clones is a 2002 American epic space opera film directed by George Lucas from a screenplay he co-wrote with Jonathan Hales",
  "year": "2002",
  "rating": 9.3
  }'

- List resources with basic filters.
  curl --location 'http://localhost:3000/movies?year=2001&rating=9&name=Lord' \
  --header 'Content-Type: application/json'

- Get details of a resource.
  curl --location 'http://localhost:3000/movies/1' \
  --header 'Content-Type: application/json'

- Update resource details.
  curl --location --request PUT 'http://localhost:3000/movies/6' \
  --header 'Content-Type: application/json' \
  --data '{
  "name": "Star Wars: Attack of the Clones",
  "description": "Star Wars: Episode II – Attack of the Clones is a 2002 American epic space opera film directed by George Lucas from a screenplay he co-wrote with Jonathan Hales",
  "year": "2002",
  "rating": 9.5
  }'

- Delete a resource.
  curl --location --request DELETE 'http://localhost:3000/movies/1' \
  --header 'Content-Type: application/json'
