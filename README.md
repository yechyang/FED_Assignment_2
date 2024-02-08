# FED_Assignment_2

## By:
### Koh Ye Chyang (S10262604)
### Louis Loo Xi Yu (S10257445)

## I used Iphone X for the responsiveness

## LYC Clothing Overview

LYC Clothing is more than just a store for apparel. The customer will receive their product and a point system with each purchase made. Customers can Interact with LYC Clothing through the point system. Customers can use the point system to receive discounts and even play games to accrue more points. This gamification feature makes shopping more than just a transaction by engaging customers making it an exciting activity for customer to look forward to.

LYC Clothing also enhances online shopping for its customers by utilizing innovative, user-friendly eCommerce technology. Including features like chatbots, APIs, lottie animation, filtering, easy navigation, and ease of information to improve user experience for customers on the website.

## Design Process

This website caters to online shopping customer who enjoy interactive and engaging online experiences. It acknowledges that traditional clothing websites with static product displays with little to no user interaction will not be able to capture customers' interest. LYC Clothing strives to offer a seamless shopping process by integrating gamification features, enhancing enjoyment and interaction for users.

### Pre-planning
When we are just starting off, we first utilise Adobe XD in order to create our wireframes over several discussions. By making our ideas come to life as we were designing each page. This helps us to solidify our layout of each page and the general direction that we are going to proceed in. Through the pre planning and designing of our wireframes, we created the basic framework in order for us to move on and it has proven to greatly assist us when we were coding out our pages as we would already have a clear idea of what those pages would look like.

### Target Audience
- Fashion enthusiast
- Convenience shopper
- Student
- Interested in the brand's story and ethos

### User Stories
1. As a Fashion Enthusiast - I want to browse a wide variety of clothing options, so that I can find the latest trends and styles that suit my taste.

2. As a Student - I want to be able to have fun and engaging activities while shopping for clothing, it will help me unwind from academic stress

3. As a Student - I want to be able to filter clothing items by the price range so that I can find and purchase items within my budget while still getting the clothing I desire.

4. As a Parent - I want to be able to shop for the desired items they want while also earning additional points for my next purchases.

5. As a Environment Enthusiast - I want to be able to know the store values and missions towards environmental friendly.

### Intent and Purpose
- Showcase the clothing store's products and collections
- Provide visually appealing displays of clothing items
- Offer customers a seamless online shopping experience with easy navigation and checkout
- Providing exceptional service for users

The website is catered for user who want to purchase Clothing and learn more about our Clothing 

## Catering to User Needs
### Value for users
#### visually appealing background
- Users benefit from an aesthetically pleasing visual experience, enhancing their overall enjoyment of the website.
#### User-friendly interface
- Ensuring a user-friendly interface enables easy navigation and browsing through the clothing store's collections.
#### Easy navigation for the different pages
- Quick access to different clothing categories (e.g., tops, bottoms, accessories) facilitates a seamless shopping experience. 
- Filter to further deduce the clothing.
#### LYC Clothing Values and Promises 
- Quality Craftmanship
- Customer-Centric Service
- Affordable Luxury
#### Vouchers and Points for users**
- Customers benefit from earning points from the final purchase, can be used to redeem vouchers for next purchase
#### Contact details, location and operating hours
- Clear presentation of contact details, location, and operating hours adds convenience for users seeking to connect with or visit the store.

## Functions and Feature
### Existing Features
### Home/Index Page
- Lottie Loading screen for page
- Navigation bar for mobility around pages
- Buttons that lead users to other pages
- Slider for sustainability effort and improvement
- Includes promotion of products to attract potential customers
- Lastly a Call-to-Action to sign up by tempting them with points and prizes.

### Men & Women Page
- Neatly seperate into categories for easier browsing
- Scrollable best sellers
- Video to attract customers

### About Page
- Features the store history and how it came to be
- Displaying LYC Clothing promises 
- Images to portray LYC Clothing
- Slider to show LYC Clothing core values

### Contact Page
- "POST" Feedback from database (RestDB) and lottie animation once submitted
- Google Map Implementation
- Necessary office information

### Game Page
- Displaying the various games available 
- Chatbot for accessibility
- "GET" customer point information and displaying it

### Sign-in/Login Page
- "GET" Account from database
- Chatbot for accessibility
- Brings user to the register page and allows them to sign up by clicking on Create Account

### Register Page
- "POST" API Account infromation and store it in our database after user has entered the relevant 
questions and clicked on the Register button

### Men & Women Product Page
- "GET" API Product from database and display them
- Product filter using dropdown and "GET"
- Price range filter using draggable bar and "GET"
- Search filter using search box and "GET"
- Add to Cart Function and SessionStorage Cart Items

### Payment Page
- "POST" API sending Cart Items to database
- Shipping address and payment Form
- Using "GET" API to display the cart Item that are posted to database
- Point redemption
- Total Price display and "PUT" into useraccount totalprice
- Earning points for every dollar spent using of "PUT" API to update the point in database

### All the games
- Using "PUT" to udpate the points in the database for the games
#### HangMan
- Provide users with an interactive and entertaining experience centered around guessing words, encouraging active participation and offering points that can be redeemed for discounts.

#### Memory Game
- Provides users with an engaging and stimulating experience focused on testing and improving their memory skills through flipping of cards. Upon completion, users can earn points redeemable for discounts.

#### Minigames 
- Provide users with brief, enjoyable, and often challenging experiences that are designed to entertain and engage. It is not only brief but it is also easy to understand. Furthermore providing a enjoyable experience for users to explore various games while earning points in the process.

#### Snake Game
- Provides users with an engaging and addictive experience centered around controlling a growing snake as it navigates through a game board. The difficulty of the game will gradually increase as the snake grows, letting user be more competitive as they strive for high score. Users will earn varying amounts of points based on their scores, which can be redeemed for discounts.

## Features Left to implement
- Voucher redemption
- Referral code

## Technologies Used
- [JQuery](https://jquery.com/)
- [RestDB](https://restdb.io/)
- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Javascript](https://developer.mozilla.org/en-US/docs/Web/javascript)
- [LottieFiles](https://lottiefiles.com/)
- [BootStrap](https://getbootstrap.com/)
- [GitHub](https://github.com/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Adobe XD](https://helpx.adobe.com/xd/get-started.html)

## Testing
1. Add to cart:
- Need to be logged in to add to cart

2. Register, contact, payment form:
- Empty input will have error message about required fields
- Invalid email address will have error message
- Submit forms with all inputs will have success messages
- Checked that the data shows up in our relevant database

3. Games:
- Need to be logged in to add to cart.

4. Media Query:
- It works on IPhone X 

5. Tested each link in the navigation bar including the profile and cart icon. Worked successfully in bringing us to all of the respective pages.

6. Tested the lottie animation initially by embedding tons of videos from youtube to increase loading time in order 
to view whether the animation was playing and looping properly while the pages were loading

## Conclusion 



## CREDITS
### Media 
- Images Created by Freepik
- Icons Created by Flaticon
- Videos Created by Pexels
- Images From Uniqlo Singapore (Product Images)
- Games design from CodeNepal

### Acknowledgements
- I received inspiration from Uniqlo Singapore and Iora Singapore
- I received game inspiration for CodeNepal

Minigames Inspired by: https://www.crazygames.com/t/mini

Hang Game Reference: https://www.codingnepalweb.com/build-hangman-game-html-javascript/

Memory Game Reference: https://www.youtube.com/watch?v=M0egyNvsN-Y

Snake Game Inspired by: https://www.codingnepalweb.com/create-snake-game-htm-css-javascript/

