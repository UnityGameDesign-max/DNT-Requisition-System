# React Application with Mocked API Backend

This project is a React-based application that integrates with a mocked API backend using JSON Server. Follow the steps below to set up and start the application and server.

---


## **Installation Steps**

### 1. Clone the Repository 

```bash
git clone https://github.com/UnityGameDesign-max/DNT-Requisition-System.git
cd DNT-Requisition-System
```

## **Running the Application locally**

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the React Application locally

```bash
npm run dev
```

### 3. Run the json server that acts as a Backend service

```bash
json-server --watch db/db.json --port 5000
```

## **Solution Approach and Flow**

### 1. Solution Approach
- This project was developed to simulate real-world scenarios of front-end development integrated with a backend service. The following techniques and tools were utilized:

- I have users already in the db json server I added users already to bypass the process of signing up a new user and giving the user roles. I thought this will be easy to test and use the application right away

- Redux State Management: For managing global application state and handling asynchronous API interactions. I utilise local storage with redux to persist state. This helps not losing global state when refreshing the page or application. I know I could have used redux persist but I think I had dependency mismatch which happened to not work properly so decided to use localStorage. In the real world scenerio the localStorage is used for with a token after signing in.

- Mocked API using JSON Server: Used db.json to serve and manage mock data, simulating a backend service. I only have two endpoints one it's for users and another one is for requisitions.

- Error Handling: Incorporated user-friendly error notifications for scenarios like failed API requests or invalid input.

- Reusable Components: Designed modular and reusable components for better scalability and maintainability.


### 2. Flow of the Application
- Data Fetching and Display: On application load, data is fetched from the mocked API and displayed in an interactive table or list.

- CRUD Operations: Users can perform Create, Read, Update, and Delete (CRUD) operations on the data using forms and buttons. These actions trigger API calls to the JSON Server.

- State Updates: The UI reflects real-time updates to the data, ensuring a seamless user experience.

- Routing : Integrated react-router-dom for navigation between pages or sections of the application.
