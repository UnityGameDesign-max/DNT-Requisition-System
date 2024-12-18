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

- I have users already in the db json server I added users already to bypass the process of signing up a new user and giving the user roles. I thought this will be easy to test and use the application right away. The authorization of users happens because of role since I am using a JSON server that act as a Backend Service.

- I have four distinct roles available within the application:
  #### 1. Employee
  #### 2. Finance Manager
  #### 3. HR 
  #### 4. Admin (Line Manager or Final Approver)

- Initially, I was uncertain about the distinction between the Line Manager and the Approver, particularly regarding who holds the final authority to approve requisitions. To clarify this hierarchy, I designated the roles as Finance Manager, Human Resources, and Admin (Final Approver).

- Understanding the organizational hierarchy and the specific responsibilities of each role was challenging. Consequently, I established the aforementioned roles to ensure clarity in the approval process.

- In the database JSON server, I have configured five users. Authentication is handled via email only, as I am utilizing a mocked backend service. The following email addresses can be used to sign in, corresponding to specific users and their roles:

    - **employee@ndt.com (role: employee)**
    - **hr@ndt.com (role: Human Resources)**
    - **finance@ndt.com (role: Finance Manager)**
    - **admin@ndt.com (role: Admin or Final Approver)**
- Please use the appropriate email address to sign in according to your assigned role.


- Redux State Management: I use Redux for managing the global application state and handling asynchronous API interactions. To persist state and prevent losing it upon refreshing the page or application, I leverage localStorage alongside Redux. While I considered using Redux Persist, a dependency mismatch caused it to malfunction, leading me to opt for localStorage instead. In real-world scenarios, localStorage is typically used to store tokens after user authentication.


The approval and rejection process for requisitions is structured as follows:

- **Approval Process**:
    - The Admin holds the ultimate authority to approve requisitions, serving as the final approver.
    - Additionally, multiple users are permitted to approve a requisition during its review cycle.

- **Rejection Process**:
    - Only a single individual is authorized to reject a requisition.
    - Once a requisition is rejected, it becomes immutable; no further approvals can be granted, nor can its status be altered.

- **Post-Approval Modifications**:
    - After a requisition has been approved, the approver retains the capability to approve again. The approver can only change the status to reject
