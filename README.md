# Outline the Instagram Clone Site (PhotoPop)

This is the outline for our website that is an Instagram clone called PhotoPop, using Node, Express and PostgreSQL, that has the ability to store and retrieve pictures posts from a postgres database. This site will have a main page that allows users to show their pictures to their friends on the site and allow their friends to comment on the pictures or like the picture.

## Goals

* Allow users to Create an account
* Allow users to post pictures.
* Able to see all images posted.
* Allow an account user to edit or delete their own picture
* Allow the user and others to comment on the picture but only others can like your picture.
* A user cant edit or delete others pictures
* Ability to comment on others post but not more than 150 characters

* A post should have the following information:
  * Username of the user that posted
  * a section to comment and like picture

* Provide a way for a user to search for specific users profile using their username

## Data Models

### `Photo`

| Column   | Type                 |
|----------|----------------------|
|`id`      | SERIAL (PRIMARY KEY) |
|`photo`| VARCHAR (NOT NULL)   |

#### `Photo Database Relationships`
This User database has a 1 to many relationship


### `Comments`

| Column   | Type                 |
|----------|----------------------|
|`id`      | SERIAL (PRIMARY KEY) |
|`Comments`| VARCHAR (NOT NULL)   |

#### `Comments Database Relationships`
This comments database has a 1 to many relationship


### `Like`

| Column   | Type                 |
|----------|----------------------|
|`id`      | SERIAL (PRIMARY KEY) |
|`value`| BOOLEAN (true/false)   |

#### `like Database Relationships`
This like database has a 1 to many relationship



## Routes

### GET `/index`

no arguments

* The main page that list all of the pictures posted.
* All comments on the picture can be seen here
* It'll have a search bar at the top for searching through the post to find a specific user


### POST `/profile`

| Argument     | Description                                                                     |
|--------------|---------------------------------------------------------------------------------|
| `id`         | Primary key for the user, if one exists.  |
| `picture`       | add a picture. |

* Displays the page the user gets to post a picture update it or delete it.
* Upon submitting, POSTs to `/index` with data from the form


### POST `/signup`

| Argument     | Description                                                                     |
|--------------|---------------------------------------------------------------------------------|
| `id`         | Primary key for the user, if one exists.  |
| `username`       | Name to assign to the user. |
| `firstname`      | The first name of the user |
|`lastname`      | The last name of the user |
| `password`      | User unique password. |
| `email`      | The email address of the user. |

```json
{
  "id": 1,
  "username": "Big-Don",
  "fristname": "Donald",
  "lastname": "Tofuah",
	"email": "dtofuah@yahoo.com",
	"password": "123",
}
```

* Endpoint for for a user to sign up for the site

### POST `/signin`

| Argument     | Description                                                                     |
|--------------|---------------------------------------------------------------------------------|
| `id`         | Primary key for the user, if one exists.  |
| `username`       | Name to assign to the user. |
| `password`      | User unique password|



## Inspiration

I'm using the following apps for design / functionality inspiration:

* [Instagram](https://instagram.com/?hl=en) - Exactly what I want to build. Site is a clone of this website

## Github and Heroku links

* [Heroku](https://dashboard.heroku.com/apps/photo-pop-pro)
