# liyelp-clone API
A side project , Liyelp for Algerian community  

#### Web : [here](https://github.com/amine-louni/dz-review-web)

### Stack 🐱‍💻:

backend

- Node / Express
- Typescript
- Postgres / TypeORM

frontend:

- React / Next
- Netlify
- Redux toolkit
- Material UI

### Data modeling:

Business:

- id (uuid use a plugin) PK
- name *
- about
- state *
- city *
- google_maps_url *
- rating_avg (auto) defulat(0)
- rating_count auto (default 0)
- claimed_by_owner boolean default false
- website
- phone *
- created_by *
- domain * enum ['restaurant']

User : 

- first_name
- last_name
- username
- dob
- profile_picture
- password_hash
- email
- email_verified_at
- id_verified_at
- phone_number
- password_changed_at
- paasword_reset_token
- paasword_reset_pin
