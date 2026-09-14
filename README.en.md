# 👗 FITLOOP - Frontend

<p align="right">
  <a href="./README.md">한국어</a> | <strong>English</strong>
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/b6bb06a6-a87c-4507-8a58-7600ed47b422" alt="FITLOOP Logo">
</p>

**FITLOOP** is a fashion marketplace where users can buy and sell clothing.
Users can trade clothing in the marketplace, share their styles through lookbooks, and take part in challenges to enjoy contemporary fashion culture.

---
<br>

## 🛠️ Project Overview

- **Project Name**: FITLOOP
- **Purpose**: To provide a fashion community platform where users can buy and sell fashion items and share their styles through lookbooks and challenges.

<br>

### ✨ Key Features

- **🛒 Marketplace**: Users can list and sell fashion items directly.
- **📸 Lookbook**: Users can share their styles by uploading photos.
- **🎥 Challenges**: Users can participate in tag- and video-based fashion challenges.
- **⭐ Favorites (Bookmarks)**: Users can save products and lookbooks for easy access later.
- **🔍 Filtering**: Users can search by style, brand, price range, and other criteria.

---
<br>

## 💻 Development Environment

<table>
  <thead>
    <tr>
      <th>Category</th>
      <th>Library</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2"><strong>Framework</strong></td>
      <td>Next.js (v15.1.4)</td>
      <td>A React framework for server-side and client-side rendering</td>
    </tr>
    <tr>
      <td>React (v19.0.0)</td>
      <td>A declarative UI library</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>UI</strong></td>
      <td>Tailwind CSS</td>
      <td>A utility-first CSS framework</td>
    </tr>
    <tr>
      <td>Ant Design (v5.22.7)</td>
      <td>A high-quality UI component library</td>
    </tr>
    <tr>
      <td>@ant-design/icons (v5.5.2)</td>
      <td>The official Ant Design icon package</td>
    </tr>
    <tr>
      <td><strong>Data Management</strong></td>
      <td>@tanstack/react-query (v5.66.0)</td>
      <td>A library for server state and asynchronous data management</td>
    </tr>
    <tr>
      <td rowspan="3"><strong>Other</strong></td>
      <td>Axios (v1.7.9)</td>
      <td>An HTTP client</td>
    </tr>
    <tr>
      <td>Lottie-react (v2.4.0)</td>
      <td>A library for rendering animations</td>
    </tr>
    <tr>
      <td>react-cookie (v7.2.2)</td>
      <td>Cookie-based login state management</td>
    </tr>
  </tbody>
</table>

---

<br>

## 🚀 Design Principles

FITLOOP is designed with both **user experience** and **security and reliability** in mind.

### 🔐 Authentication and Authorization

- **JWT-based authentication**
  - Access and refresh tokens are issued at login and stored in the request header and an HttpOnly cookie, respectively.
  - Refresh tokens are stored in the database and validated to provide an additional layer of security.
  - JWT validity and permissions are checked on every request to block unauthorized access in advance.

- **Role-based access control**
  - Available API endpoints are clearly separated according to user roles such as `MEMBER` and `ADMIN`.
  - Login responses include the user's role and personal-information completion status to support access control in the frontend.

- **Secure logout**
  - On logout, the refresh token is immediately removed from the database and the cookie is expired.

### 🚨 Error Handling

- **Custom error codes**
  - Error types are clearly defined and returned in a consistent JSON format, making frontend error handling easier.

### 🧩 Middleware Design

Protected pages are secured using Next.js `middleware`.

- **JWT-based authentication**
  - Tokens are read from cookies on each request.
  - Users without a token who attempt to access a protected route are redirected to the **login page (`/login`)**.

- **Common request flow**
  - Public routes pass through unchanged.
  - Protected routes are controlled based on the presence of a token.

- **Error-handling direction**
  - Exceptional cases such as expired, stolen, or missing tokens are handled with user experience in mind.
  - Refresh-token handling or automatic logout will be added in the future.

---

## Code Conventions

### ✅ ESLint Configuration (Flat Config)

```js
rules: {
  indent: ["error", 2],                      // Use two spaces for indentation
  semi: ["error", "always"],                // Require semicolons
  camelcase: ["error", { properties: "always" }], // Use camelCase
  "no-var": "error",                        // Disallow var
  "prefer-arrow-callback": "error",         // Prefer arrow functions
  "prefer-template": "error",               // Prefer template literals
  "space-infix-ops": "error"                // Require spaces around operators
}
```

<br>
<br>
<br>

## 🗓️ FITLOOP Development History

This project follows Scrum, an agile methodology. Features were developed in short cycles, with continuous discussion and feedback used to improve the product incrementally.

<details>
  <summary>📅 View the December 2024 development history</summary>

| Date | Work completed |
|------|----------------|
| Dec 20 | Started designing the project structure and planning features |
| Dec 21 | Planned project features |
| Dec 23 | Created detailed feature plans |
| Dec 24 | Finalized the FitLoop name and discussed conventions |
| Dec 26 | Started ERD discussions |
| Dec 27 | Created the logo and discussed table structures |
| Dec 28 | Discussed image policies, subscription services, and enums |
| Dec 29 | Reviewed the need for status history tables |
| Dec 30 | Implemented the ERD and relationships and added an address table |
| Dec 31 | Discussed subscription-based services |

</details>

<details>
  <summary>📅 View the January 2024 development history</summary>

| Date | Work completed |
|------|----------------|
| Jan 2 | Established the development schedule and reviewed JWT, SSR, and middleware |
| Jan 3 | Configured Gradle and designed error handling |
| Jan 4 | Finalized the logo and GitHub labels |
| Jan 5 | Created issue and PR templates and studied AWS and Kubernetes |
| Jan 6 | Studied Ant Design and drafted the Figma design |
| Jan 7 | Organized authentication, authorization, and HttpOnly cookie handling |
| Jan 8 | Compared JWT and SSR/CSR concepts |
| Jan 9 | Addressed ESLint issues and discussed image optimization |
| Jan 10 | Discussed refresh-token structure and deletion handling |
| Jan 11 | Built the JWT login flow, established a token storage strategy, and discussed caching with Redis |
| Jan 12 | Discussed member status fields and `@Transactional` handling |
| Jan 13 | Compared integrated and separated tables and chose a separated design |
| Jan 14 | Started implementing JWT-based functionality |
| Jan 15 | Adopted Axios and selected a JSON transfer format |
| Jan 16 | Planned API specifications and button UI |
| Jan 17 | Developed the account information page |
| Jan 19 | Documented system features |
| Jan 20 | Added common error codes and global exception handling |
| Jan 21 | Organized custom exception classes |
| Jan 22 | Discussed Spring Security filter configuration |
| Jan 23 | Reviewed CORS settings and token logic |
| Jan 24 | Started developing refresh-token logic |
| Jan 25 | Built frontend state management and progress UI |
| Jan 26 | Added signup validation |
| Jan 27 | Improved custom error response handling |

</details>

<details>
  <summary>📅 View the February 2024 development history</summary>

| Date | Work completed |
|------|----------------|
| Feb 14 | Designed enum and Boolean fields and improved birthday validation |
| Feb 21 | Designed personal-information routing after login |
| Feb 23 | Discussed solutions for Spring Security filter `permitAll` issues |
| Feb 24 | Designed the My Page area and developed a logout filter |
| Feb 25 | Completed the logout filter and built the My Page UI |
| Feb 26 | Planned the product domain and assigned product registration and listing pages |
| Feb 28 | Built a shared color system and designed advertisement image integration |

</details>

<details>
  <summary>📅 View the March 2024 development history</summary>

| Date | Work completed |
|------|----------------|
| Mar 3 | Improved Tailwind styles and scrollbars |
| Mar 4 | Built the category UI and navigation logic and worked on AWS integration |
| Mar 8 | Discussed category selection UI for product registration |
| Mar 11 | Resolved a `UserDetails` ID issue and improved the personal-information UI |
| Mar 12 | Designed the S3 advertisement image controller and built the My Page area |
| Mar 13 | Standardized URL names, improved signup UX, and discussed user statistics tables |
| Mar 14 | Discussed product registration URLs, added edit and delete buttons to product details, and reviewed user and product table designs |
| Mar 15 | Shared scrolling approaches and discussed category enum usage |
| Mar 18 | Defined button colors and discussed category-selection data communication |
| Mar 19 | Shared feature reviews and feedback and discussed product persistence logic |
| Mar 22 | Clarified the difference between the `images` and `imageFiles` arrays and discussed Axios instance handling and Figma integration |
| Mar 24 | Reviewed the authentication flow using the official Next.js middleware documentation and checked database normalization issues |
| Mar 25 | Fixed a `personalInfo` undefined issue and revisited JWT storage and image transfer formats (JSON vs. FormData) |
| Mar 26 | Implemented AWS S3 image upload and retrieval |
| Mar 27 | Designed a Redis-based caching architecture and assigned team responsibilities |
| Mar 28 | Added post-registration redirects, removed unnecessary `Content-Type` headers, and resolved duplicate image handling |
| Mar 29 | Compared Kafka, Redis, WebSocket, RabbitMQ, and Spring Batch architectures and discussed potential adoption |

</details>
