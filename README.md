# Create An Orc project

This website provides a randomised name, stats, an description built from a prompt and a visual
picture of your character made from randomised pieces of pixel character art. This fantasy character will be an `orc` 
which will be communicated in the branding of the site.
The generation of a short description of the character will be done through prompts to OpenAI.
The randomised character will be regenerated on a page refresh. This is to quickly give a user 
seeking an idea for art or writing a compelling starting off point.

## Problem Definition
Creating a new character for a series or for a TTRPG can sometimes be a daunting process if people are
experiencing a creative block. 
This project intends to provide a compelling starting off point to encourage user ideas and creativity.
The design will focus on accessibility and speed to get creatives thinking with minimal effort, but will be
able to eventually include some more incentives for repeat users like saving and sharing their 
favourite random prompts.

## Who is it for?
This project is designed to provide a creative prompt for writers/artists/ttrpg players or anyone seeking a
prompt to form an idea for a fantasy character. In this case, characters are also referred to as Orcs in the system.

## MOSCOW analysis

### Must have
- A pixel art image of the randomised orc. This has been created through:
  - A shadow base 
  - A face with skin colour 
  - Upper torso clothes 
  - Lower torso clothes 
- These individual images are layered together on the screen and will appear in the same place on page refresh
- A randomised name which has been built out of syllables provided in a JSON file.
- A randomised description created via prompts to Open AI. The prompts should have randomised values each time it is sent
through to the AI. The AI generates the description which will be sent back and displayed.
- Randomised Stats for the character.
### Should have
- User accounts where a user can save instances of characters that they wish to keep record of. 
- Rate limiting to prevent an overload of AI requests. 
- The website should be viewable and usable on different screen sizes. 
### Could have
- Eventually expand to other kinds of fantasy characters, like elves, dwarves etc. Each new type of potential character
will need to be added as separate updates. 
- Users can share their favourite creations with other users. 
### Won't have
- A full gameified character sheet for ttrpg players as this would be too complex. 
- A massively expanded description of the orc as this is just meant to be a simple prompt to inspire user
creativity. 

## Domain Model Diagram
```mermaid
erDiagram
USERS ||--|{ ORCS : owns
USERS ||--|{ PROMPTS : creates
PROMPTS ||--|{ ORCS : creates
```

## Dictionary
- **User**: Any person accessing the website and viewing a randomised character
- **Orc**: The user generated character that are returned via the randomiser code and the AI. Initially this is just for Orcs as a race.
- **Prompt**: Randomised adjectives that will be provided in threes to the AI to generate a
character. For example an orc may be:
  - Adventurous
  - Poor
  - Good
- **Catalogue**: Syllables stored within the databases used for the purpose of orc name generation and supplementing prompts with Retrieval Augemented Generation (RAG).

---

## Entity Relationship Diagram
```mermaid
erDiagram
direction TB
USERS {
	id int PK
	user_name string
	email_address string
	user_password string
	available_tokens int
	role Role
	profile_id int
	created_at Date
	updated_at Date
	
}
PROMPTS {
 	id int PK
	content string
    	created_at Date
    	updated_at Date
}
PROMPTS_COLLECTION {
	id int PK
	prompt1 int FK
	prompt2 int FK
	prompt3 int FK
}
ORCS {
 	id int PK
	name string
    	description text
    	str int
    	dex int
    	con int
    	int int
    	wis int
    	cha int
    	prompts_collection_id int FK
	orc_images_id int FK
    	user_id int FK
    	created_at Date
}
ORC_IMAGES {
	id int PK
	head int FK
	torso int FK
	legs int FK
}
ORC_HEAD {
	id int
	url string
}
ORC_TORSO {
	id int
	url string
}
ORC_LEGS {
	id int
	url string
}
BACKGROUND_IMAGES {
 	id int PK
	image_name string
	url string
}
CATALOGUE {
    id int PK
    syllables string
    created_at Date
    updated_at Date
}
	USERS ||--|{ PROMPTS_COLLECTION : creates
	USERS ||--|{ ORCS : owns
	ORCS ||--|{ PROMPTS_COLLECTION : uses
	ORCS ||--|| CHARACTER_IMAGES : has
	ORCS ||--|| CATALOGUE : uses
	ORC_IMAGES ||--|{ CHARACTER_BODY_PART_IMAGES : uses
	ORC_BODY_PART_IMAGES }|--|{ CHARACTER_BODY_PART_IMAGE_TYPES : uses
	PROMPTS_COLLECTION ||--|{ PROMPTS : uses
	
```

# APIs


## Users


## Users GET requests

## GET /users

Description: Get all users.

Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "user_name": "testadmin",
    "email_address": "adminaccount@example.com",
  },
  {
    "id": 2,
    "user_name": "testuser",
    "email_address": "testaccount@example.com",
  }
]
```

### GET /users/{id}

Description: Get a single user by ID

Response codes:

200 OK\
404 Not Found

Response Example
```
  {
    "id": 1,
    "user_name": "testadmin",
    "email_address": "adminaccount@example.com",
}
```

### GET /users/{id}

Description: Get a single user or an array of users matching the value in the request

Request Example:
```
{
  "user_name": "test"
}
```
Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "user_name": "testadmin",
    "email_address": "adminaccount@example.com",
  },
  {
    "id": 2,
    "user_name": "testuser",
    "email_address": "testaccount@example.com",
  }
]
```
---
## Users POST requests

### POST /users

Description: Register an account for a new user and returns a confirmation message on success.

Request Example:
```
{
  "user_name": "newUser",
  "email_address": "new_user@example.com,
  "user_password": "encryptedPassword",
}
```

Response codes:

200 OK\
201 Created\
400 Bad Request

Response Example:
```
"User successfully registered: " + {userName}
```
---
## Users PUT requests

### PUT users/{id}

Description: Update a single user account and returns a confirmation message on success.

Request Example:
```
{
  "user_name": "update_user",
}
```

Response codes:

200 OK\
201 Created\
400 Bad Request

Response example:
```
"User successfully updated: " + {userName}
```

---
## Users DELETE requests

### DELETE users/{id}

Description: Delete a single user account by id and return confirmation message on success.

Request Example:
```
{
  "id" : 1
}
```

Response codes:

204 Resource deleted successfully\
404 Not found

Response example:

```
"User successfully deleted: " + {deletedUserName}
```

---

## Orcs


## Orcs GET requests

### GET "/orcs"

Description: Get all created Orcs saved in the database.

Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "name": "testOrc1",
    "prompts_collection_id": 1,
    "orc_images_id": 1,
    "user_id": 1
  },
    {
    "id": 2,
    "name": "testOrc2",
    "prompts_collection_id": 2,
    "orc_images_id": 2,
    "user_id": 1
  },
    {
    "id": 3,
    "name": "testOrc3",
    "prompts_collection_id": 3,
    "orc_images_id": 3,
    "user_id": 2
  },
]
```

### GET "/users/{user_id}/orcs"

Description: Get all Orcs saved to a user.

Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "name": "testOrc1",
    "prompts_collection_id": 1,
    "orc_images_id": 1,
    "user_id": 1
  },
  {
    "id": 2,
    "name": "testOrc2",
    "prompts_collection_id": 2,
    "orc_images_id": 2,
    "user_id": 1
  }
]
```


### GET "/orcs/{id}"

Description: Get an Orc by the id.

Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "name": "testOrc1",
    "prompts_collection_id": 1,
    "orc_images_id": 1,
    "user_id": 1
  }
]
```

---
## Orcs POST requests

### POST /orcs

Description: Saves a new Orc for a user.

Request Example:
```
  {
    "name": "testOrc3",
    "prompts_collection_id": 3,
    "orc_images_id": 3,
    "user_id": 3
  },
```

Response codes:

200 OK\
201 Created\
400 Bad Request

Response Example:
```
{
  "id": 3,
  "name": "testOrc3",
  "prompts_collection_id": 3,
  "orc_images_id": 3,
  "user_id": 3
}
```

---

## Orcs PUT requests

Once new objects are posted into the Orcs database they shouldn't be updated or changed.

---

## Orcs DELETE requests

### DELETE /{id}

Description: Delete a saved Orc from a user collection.

Request Example:
```
{
  "id": 1,
  "name": "testOrc1",
  "prompts_collection_id": 1,
  "orc_images_id": 1,
  "user_id": 1
}
```

Response codes:

204 Resource deleted successfully\
404 Not found

---

## Prompts GET requests

## GET /prompts

Description: Get all prompts.

Response codes:

200 OK\
404 Not Found

Response Example
```
[
  {
    "id": 1,
    "content": "good"
  },
  {
    "id": 2,
    "content": "evil"
  }
]
```

## GET /prompts/{id}

Description: Get a single prompt by id.

Response codes:

200 OK\
404 Not Found

Response Example
```
  {
    "id": 3,
    "content": "neutral"
  }
```
---
## Prompts POST requests

### POST /prompts

Description: Submit a new prompt to the database.

Request Example:
```
{
  "content": "happy"
}
```

OR

```
[
  {
    "content": "sad"
  },
  {
    "content": "angry"
  }
]
```

Response codes:

200 OK\
201 Created\
400 Bad Request

---
## Prompts PUT requests

### PUT prompts/{id}

Description: Update a prompt by id.

Request Example:
```
{
  "id": 5,
  "content": "prompt_to_update"
}
```

Response codes:

200 OK\
201 Created\
400 Bad Request

```
Response Example:

{
  "id": 5",
  "content" : "prompt_to_update"
}
```

---
## Prompts DELETE requests

### DELETE prompts/{id}

Description: Delete a single prompt by id.

Request Example:
```
{
  "id": "6",
  "content" : "delete_this_prompt"
}
```

Response codes:

204 Resource deleted successfully\
404 Not found

---

## Images GET requests

## GET /images

Description: Get 3 urls to retrieve images from database.

Response codes:

200 OK\
404 Not Found

Response Example
```
{
   "images": [
        "head.png",
        "body.png",
        "legs.png"
    ]
}
```

## GET /images/bg

Description: Get all miscellaneous images for website styling.

Response codes:

200 OK\
404 Not Found

Response Example
```
{
    "images": [
        "background.png",
        "base.png",
        "border.png"
    ]
}
```
---

## Generator GET requests

## GET /gen

Description: Generate new data for an Orc with randomised values.

Response codes:

200 OK\
404 Not Found

Response Example
```
{
    "name": "Test-Orc",
    "description": "Descriptive backstory generated by AI.",
    "str": 11,
    "dex": 7,
    "con": 7,
    "int": 12,
    "wis": 20,
    "cha": 5
}
```
