# Social Network Backend (GraphQL)

A robust social networking backend built with GraphQL, Express.js, Node.js, and MongoDB. This backend provides essential features for social networking applications including user authentication, post management, friend connections, and more.

## 🚀 Features

- **User Management**

  - User registration and authentication with JWT
  - Profile management (update name, bio, avatar)
  - User details retrieval
  - Secure password handling

- **Post System**

  - Create, read, update, and delete posts
  - View user-specific posts
  - Post content management
  - Post status tracking (active/inactive)

- **Social Features**

  - Follow/Unfollow functionality
  - Follow statistics (followers/following counts)
  - User relationship management
  - User feed generation

- **Engagement Features**
  - Like/Unlike posts
  - Comment system (create, read, update, delete)
  - Post engagement tracking
- **Feed Management**
  - Personalized user feed
  - Pagination support
  - Post sorting and filtering
  - Real-time feed updates
- **Notification System**
  - Real-time notifications using GraphQL Subscriptions
  - Notifications for new followers/unfollows
  - Notifications for post likes/unlikes
  - Notifications for new comments
  - Console-based notification tracking (local setup only)

## 🌐 Access Options

### 1. Local Setup

If you want to run the project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Abhishek-Gupta-1/assignment-4-product-highway
cd assignment-4-product-highway
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create and configure `.env` file (see Environment Variables section below)

4. Start the server:

```bash
npm run dev
# or
yarn dev
```

The local server will be available at:

- Main endpoint: `http://localhost:3000`
- GraphQL Playground: `http://localhost:3000/graphql`

### 2. Deployed Version

If you want to use the deployed version, you can directly access:

```
https://abhishek-assignment.vercel.app/graphql
```

To test the deployed API, you can use this curl command (Note: To test on Postman copy this curl command and paste in Postman):

```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://abhishek-assignment.vercel.app/graphql' \
  --data '{"query":"query { __typename }"}'
```

## 🧪 Testing API Endpoints

### Authentication

Most of the API Query Endpoints authenticated requests require the Authorization header with a JWT token( Note: You have to paste this token in header with Authorization as key and token as value):

```
Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### User Management

#### Register User

```graphql
mutation Register($name: String!, $username: String!, $password: String!) {
  register(name: $name, username: $username, password: $password) {
    token
    message
    user {
      id
      name
      username
    }
  }
}

# Variables
{
  "name": "John Doe",
  "username": "johndoe654",
  "password": "password123"
}
```

#### Login User

```graphql
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      id
      name
      username
      bio
      avatar
      createdAt
      updatedAt
    }
  }
}

# Variables
{
  "username": "johndoe6",
  "password": "password123"
}
```

### Notification System

The notification system is implemented using GraphQL Subscriptions (PubSub) and currently only shows output in terminal in local development environment. It automatically triggers notifications for the following events:

The notification system automatically triggers when:

- A user follows/unfollows another user
- A user likes/unlikes a post
- A user comments on a post

To see notifications in action (Local Setup):

1. Start the server in development mode
2. Monitor the console output for notification logs(on terminal)
3. Perform actions like following a user, liking a post, or commenting
4. Check the console for messages like:

   ```
   [NotificationService] Creating notification: {
   type: 'LIKE',
   userId: new ObjectId('6735e30208d41f350d27c705'),
   message: 'Rohan like your post',
   relatedId: '67392fbff1e733a0d7cc5c0d'
   }
   [NotificationService] Notification created: {
   type: 'LIKE',
   message: 'Rohan like your post',
   userId: new ObjectId('6735e30208d41f350d27c705'),
   isRead: false,
   relatedId: new ObjectId('67392fbff1e733a0d7cc5c0d'),
   _id: new ObjectId('6739fec648d4d788920e1608'),
   createdAt: 2024-11-17T14:33:42.053Z,
   updatedAt: 2024-11-17T14:33:42.053Z,
   __v: 0
   }
   [NotificationService] Publishing to channel: NOTIFICATION_ADDED.6735e30208d41f350d27c705
   [NotificationService] Published successfully

   ```

Note: The notification system is currently configured for local development and console output only. To implement real-time notifications in a production environment, we'll need to:

- Set up a WebSocket connection in your frontend
- Subscribe to the notification channel for the logged-in user
- Handle and display notifications in your UI

#### Update User Profile

```graphql
mutation UpdateUser($name: String, $bio: String, $avatar: String) {
  updateUser(name: $name, bio: $bio, avatar: $avatar) {
    success
    user {
      id
      name
      username
      bio
      avatar
      createdAt
      updatedAt
    }
    message
    error
  }
}

# Variables
{
  "name": "John Updated",
  "bio": "Updated bio information",
  "avatar": "https://example.com/new-avatar.png"
}
```

#### Get User Details

```graphql
query GetUser($username: String!) {
  Getuser(username: $username) {
    user {
      id
      name
      username
      bio
      avatar
    }
    message
  }
}

# Variables
{
  "username": "johndoe6"
}
```

### Posts

#### Get User Posts

```graphql
query UserPosts($userId: ID!) {
  userPosts(userId: $userId) {
    success
    data {
      posts {
        postId
        content
        userId
        user {
          id
          name
          username
          bio
          avatar
        }
        likes {
          id
          name
          username
        }
        createdAt
        updatedAt
        isActive
      }
      count
    }
    message
    error
  }
}

# Variables
{
  "userId": "6735e30208d41f350d27c705"
}
```

#### Create Post

```graphql
mutation CreatePost($content: String!) {
  createPost(content: $content) {
    success
    data {
      post {
        postId
        content
        userId
        createdAt
        updatedAt
        isActive
      }
    }
    message
    error
  }
}

# Variables
{
  "content": "This is a new post!"
}
```

#### Update Post

```graphql
mutation UpdatePost($postId: ID!, $content: String!) {
  updatePost(postId: $postId, content: $content) {
    success
    data {
      post {
        postId
        content
        updatedAt
      }
    }
    message
    error
  }
}

# Variables
{
  "postId": "67392fbff1e733a0d7cc5c0d",
  "content": "This is updated content!"
}
```

#### Delete Post

```graphql
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    success
    data {
      post {
        postId
        isActive
      }
    }
    message
    error
  }
}

# Variables
{
  "postId": "67392fbff1e733a0d7cc5c0d"
}
```

### Follow System

#### Get Follow Stats

```graphql
query FollowStats($userId: ID!) {
  followStats(userId: $userId) {
    success
    message
    error
    findUser {
      followers {
        id
        username
        email
      }
      following {
        id
        username
        email
      }
    }
  }
}

# Variables
{
  "userId": "6735e30208d41f350d27c705"
}
```

#### Toggle Follow

```graphql
mutation ToggleFollow($followingId: ID!) {
  toggleFollow(followingId: $followingId) {
    success
    message
    error
    findUser {
      followers {
        id
        username
        email
      }
      following {
        id
        username
        email
      }
    }
  }
}

# Variables
{
  "followingId": "6737b297fa3631063014647c"
}
```

### Feed

#### Get User Feed

```graphql
query Feed($options: FeedOptions) {
  feed(options: $options) {
    success
    message
    error
    data {
      posts {
        postId
        content
        author {
          userId
          name
          username
          profilePic
        }
        likes
        createdAt
        updatedAt
      }
      pagination {
        currentPage
        totalPages
        totalPosts
        hasMore
      }
    }
  }
}

# Variables
{
  "options": {
    "page": 1,
    "limit": 10
  }
}
```

### Likes

#### Toggle Post Like

```graphql
mutation TogglePostLike($postId: ID!) {
  togglePostLike(postId: $postId) {
    success
    message
    error
    data {
      post {
        postId
        content
        userId
        likes {
          id
          name
          username
          avatar
        }
        createdAt
        updatedAt
        isActive
      }
    }
  }
}

# Variables
{
  "postId": "67392fbff1e733a0d7cc5c0d"
}
```

### Comments

#### Create Comment

```graphql
mutation CreateComment($postId: ID!, $content: String!) {
  createComment(postId: $postId, content: $content) {
    success
    message
    error
    data {
      comment {
        commentId
        content
        postId
        userId
        createdAt
        updatedAt
        isActive
      }
    }
  }
}

# Variables
{
  "postId": "67392fbff1e733a0d7cc5c0d",
  "content": "This is my first comment on this post!"
}
```

#### Get Post Comments

```graphql
query GetPostComments($postId: ID!) {
  getPostComments(postId: $postId) {
    success
    message
    error
    data {
      comments {
        commentId
        content
        postId
        userId
        createdAt
        updatedAt
        isActive
      }
      count
    }
  }
}

# Variables
{
  "postId": "67392fbff1e733a0d7cc5c0d"
}
```

#### Update Comment

```graphql
mutation UpdateComment($commentId: ID!, $content: String!) {
  updateComment(commentId: $commentId, content: $content) {
    success
    message
    error
    data {
      comment {
        commentId
        content
        postId
        userId
        createdAt
        updatedAt
        isActive
      }
    }
  }
}

# Variables
{
  "commentId": "67393ea9c8cd0847318865b8",
  "content": "This is my updated comment!"
}
```

#### Delete Comment

```graphql
mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    success
    message
    error
  }
}

# Variables
{
  "commentId": "67393ea9c8cd0847318865b8"
}
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env

# MongoDB Configuration

MONGODB_URL=YOUR-MONGODB-URL

# JWT Configuration
JWT_SECRET=your_jwt_secret_key


```

## 📂 Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── models/         # MongoDB models
│   ├── resolvers/      # GraphQL resolvers
│   ├── schema/         # GraphQL schema definitions
│   ├── middleware/     # Custom middleware
│   ├── utils/          # Utility functions
│   └── index.js        # Entry point
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 👥 Contact

Name - [Abhishek Gupta](https://www.linkedin.com/in/abhishek-gupta-7851ba245/)

Contact - [abhisheknew2023@gmail.com](mailto:abhisheknew2023@gmail.com)

Project Link: [https://github.com/Abhishek-Gupta-1/assignment-4-product-highway](https://github.com/Abhishek-Gupta-1/assignment-4-product-highway)

Project Deployed Link(Vercel): [https://abhishek-assignment.vercel.app/](https://abhishek-assignment.vercel.app/)
