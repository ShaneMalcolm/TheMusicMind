# Music Enthusiasts Blogging Platform with Integrated Content Moderation

This project is a **Music Enthusiasts Blogging Platform** that incorporates **Machine Learning-Based Content Moderation** to detect hate speech and offensive language in user comments. The platform allows users to share their musical experiences, comment on posts, and interact with other music lovers.

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Model Details](#model-details)

## Project Overview

This platform was built to provide music enthusiasts with a space to share posts and engage with others in the community. A major component of this project is the content moderation system that flags inappropriate comments using a Logistic Regression model for sentiment analysis. Administrators can review flagged comments and take appropriate action.

## Features

- **User Registration & Authentication**: Users can register, log in, and manage their profiles.
- **Post Creation and Management**: Users can create, edit, and delete posts.
- **Commenting System**: Users can comment on posts, with threading support.
- **Machine Learning-Based Content Moderation**: Offensive and harmful comments are automatically flagged for admin review.
- **Admin Moderation Dashboard**: Admins can view and moderate flagged comments.
- **User Interaction**: Like posts, follow other users, and engage with the music community.

## Technologies Used

- **Frontend**: React, Redux
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Machine Learning**: Python (Logistic Regression with Scikit-learn)
- **Other**: Flask (for the ML API), CORS, JWT for authentication

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Python (for running the sentiment analysis model)
- Virtual environment for Python (e.g., `venv` or `virtualenv`)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ShaneMalcolm/TheMusicMind.git
    ```

2. Install server dependencies:
    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:
    ```bash
    cd ../client
    npm install
    ```

4. Set up the Python virtual environment and install dependencies:
    ```bash
    cd ../flask_api
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    ```

### Running the Application

1. Start the backend server:
    ```bash
    cd ../server
    npm start
    ```

2. Start the frontend client:
    ```bash
    cd ../client
    npm start
    ```

3. Start the Flask API for content moderation:
    ```bash
    cd ../flask_api
    flask run
    ```

4. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## Usage

1. Sign up or log in to your account.
2. Create a post about your favorite musical events or thoughts.
3. Engage with the community by commenting on posts.
4. Flagged comments are displayed on the admin dashboard for moderation.

## Model Details

The sentiment analysis model uses **Logistic Regression** to classify user comments as either positive or negative based on predefined criteria. It was trained using a dataset with labeled offensive and non-offensive content. The system employs **TF-IDF vectorization** to process text data and make predictions.
