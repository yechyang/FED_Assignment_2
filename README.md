# FED_Assignment_2

## By:
### Koh Ye Chyang (S10262604)
### Louis Loo Xi Yu (S10257445)

Website Theme = Clothing E-Commerce

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

## CREDITS
### Media 
- Images Created by Freepik
- Icons Created by Flaticon
- Videos Created by Pexels
- Images From Uniqlo Singapore (Product Images)
- Games design from CodeNepal
- Lottie from Lottiefiles

### Acknowledgements
- I received inspiration from Uniqlo Singapore and Iora Singapore
- I received game inspiration for CodeNepal

Minigames Inspired by: https://www.crazygames.com/t/mini

Hang Game Reference: https://www.codingnepalweb.com/build-hangman-game-html-javascript/

Memory Game Reference: https://www.youtube.com/watch?v=M0egyNvsN-Y

Snake Game Inspired by: https://www.codingnepalweb.com/create-snake-game-htm-css-javascript/

### Lottie animation
- https://lottiefiles.com/animations/material-wave-loading-yt2uoeE83o

### Videos References
- https://www.pexels.com/video/a-man-wearing-a-shirt-while-posing-9558220/
- https://www.pexels.com/video/a-woman-wearing-plain-shirt-6787106/
- https://www.pexels.com/video/animation-of-money-5849609/

### Images References
- https://www.freepik.com/free-photo/short-haired-woman-sunglasses-posing-yellow-doors-curly-woman-undershirt-with-jacket-looks-away-yellow-doors_13320396.htm#query=clothing&position=5&from_view=search&track=sph&uuid=30f46136-781a-4175-98f5-8dca6c50a1f9

- https://www.freepik.com/free-photo/two-young-beautiful-blond-smiling-hipster-girls-trendy-summer-white-t-shirt-clothes-positive-models-having-fun-sunglasses_6629548.htm#query=clothing&position=17&from_view=search&track=sph&uuid=30f46136-781a-4175-98f5-8dca6c50a1f9

- https://www.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_27828399.htm#query=shirts&position=2&from_view=search&track=sph&uuid=ade202ec-fbc7-4a34-b557-3643744f2feb

- https://www.freepik.com/free-photo/front-view-playful-little-girl-wearing-seasonal-clothes_5855422.htm#query=girl%20sweater&position=34&from_view=search&track=ais&uuid=b2fab915-58da-4ef7-aaa9-c72036b8a2a2

- https://www.freepik.com/free-photo/senior-man-wearing-black-sweater-close-up_15476570.htm#query=long%20sleeve&position=18&from_view=search&track=ais&uuid=87797f50-587b-4197-8f51-15959e0c760f

- https://www.flaticon.com/free-icon/tshirt_863684?term=clothing&page=1&position=1&origin=search&related_id=863684

- https://www.freepik.com/free-photo/black-white-minimal-portrait_19918869.htm#query=men%20model&position=5&from_view=search&track=ais&uuid=176b3fb1-ee31-4e56-b1fb-29314ed13263\

- https://www.uniqlo.com/us/en/products/E463666-000/00?colorDisplayCode=59&sizeDisplayCode=004

- https://www.uniqlo.com/sg/en/products/E455536-000?colorCode=COL01&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E462586-000?colorCode=COL07&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E456630-000?colorCode=COL06&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E463733-000?colorCode=COL38&sizeCode=SMA005

- https://www.uniqlo.com/sg/en/products/E450189-000?colorCode=COL09&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E463614-000?colorCode=COL65&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E456790-000?colorCode=COL66&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E463613-000?colorCode=COL00&sizeCode=SMA003

- https://www.freepik.com/free-photo/pisces-portrait-beautiful-woman_22632999.htm#query=female%20model%20dark%20background&position=3&from_view=search&track=ais&uuid=1e349802-5a48-4596-b87c-ce57a29425a7

- https://www.uniqlo.com/sg/en/products/E456773-000?colorCode=COL13&sizeCode=SMA003

- https://www.freepik.com/free-photo/grayscale-shot-male-walking-along-pedestrian-zone-near-building_7920988.htm#page=5&query=clothing%20background%20dark&position=30&from_view=search&track=ais&uuid=e3dd1aae-a79e-4f84-a472-4cff09f4c1dc

- https://www.flaticon.com/free-icon/delivery_709790

- https://www.flaticon.com/free-icon/quality-control_3270331

- https://www.flaticon.com/free-icon/credit-card_590501

- https://www.freepik.com/free-photo/confident-business-people-standing-together_13462588.htm#query=about%20us&position=16&from_view=search&track=ais&uuid=c0a6b0e3-42d7-4a9e-8597-1ab215eff7ca

- https://www.freepik.com/free-photo/businessmen-businesswomen-meeting-brainstorming-ideas_15113199.htm#page=2&query=about%20us&position=15&from_view=search&track=ais&uuid=c0a6b0e3-42d7-4a9e-8597-1ab215eff7ca

- https://www.freepik.com/free-photo/top-view-cloths-made-with-different-natural-pigments-with-copy-space_10875893.htm#page=7&query=clothing%20background&position=2&from_view=search&track=ais&uuid=e38e3ac5-82a3-4c1d-a677-aa0da7b84b9b

- https://www.freepik.com/free-photo/modern-office-space-with-desktops-with-modern-computers-created-with-generative-ai-technology_40871274.htm#query=office&position=0&from_view=search&track=sph&uuid=e9715307-f177-4518-ac51-59a7c1d42191

- https://www.flaticon.com/free-icon/close_2997911?term=x&page=1&position=14&origin=search&related_id=2997911

- https://www.freepik.com/free-photo/abstract-smooth-brown-wall-background-layout-designstudioroomweb-templatebusiness-report-with-smooth_18344647.htm#query=plain%20background&position=40&from_view=search&track=ais&uuid=e1365255-c0a7-4950-9adf-7b35b4986f64

- https://www.freepik.com/free-photo/nighttime-nature-landscape-galaxy-mountain-water-star-beauty-generative-ai_40968460.htm#query=game%20wallpaper&position=4&from_view=search&track=ais&uuid=5323e999-f6b1-48a8-b09b-f7c316954b91

- https://www.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_10054859.htm#page=2&query=online%20shop%20front%20dark&position=4&from_view=search&track=ais&uuid=8412d402-eb6a-46d1-bf93-0b618453abac

- https://www.freepik.com/free-photo/closeup-gray-sofa-with-basket-folded-clothes-small-table-near-it_14807157.htm#page=3&query=clothing&position=14&from_view=search&track=sph&uuid=075ccc52-9d78-4602-92b2-042645edac9a

- https://www.uniqlo.com/sg/en/products/E465759-000?colorCode=COL54&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E465755-000?colorCode=COL10&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E466337-000?colorCode=COL52&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E464800-000?colorCode=COL01&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E464722-000?colorCode=COL01&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E464890-000?colorCode=COL56&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E468597-000?colorCode=COL31&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E465474-000?colorCode=COL56&sizeCode=SMA002

- https://www.uniqlo.com/sg/en/products/E464842-000?colorCode=COL05&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E461643-000?colorCode=COL08&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E469312-000?colorCode=COL56&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E466384-000?colorCode=COL10&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E465919-001?colorCode=COL63&sizeCode=CMD058

- https://www.uniqlo.com/sg/en/products/E466466-000?colorCode=COL21&sizeCode=SMA002

- https://www.freepik.com/free-photo/woman-with-flying-hair_6642099.htm#query=clothing%20model%20dark%20background&position=0&from_view=search&track=ais&uuid=21cbd0e7-8eb1-471e-bc8a-1f64df6a45c5

- https://www.freepik.com/free-photo/handbag-near-sunglasses-with-wear-plant-twigs_4321368.htm#query=clothing%20background&position=1&from_view=search&track=ais&uuid=677b331d-5a65-4576-b229-8e656473df7a

- https://www.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_27828362.htm#query=clothing%20background&position=29&from_view=search&track=ais&uuid=677b331d-5a65-4576-b229-8e656473df7a

- https://www.uniqlo.com/sg/en/products/E442223-000?colorCode=COL09&sizeCode=SMA005

- https://www.uniqlo.com/sg/en/products/E463882-000?colorCode=COL32&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E468775-000?colorCode=COL05&sizeCode=CMD070&pldCode=CML076

- https://www.uniqlo.com/sg/en/products/E462318-000?colorCode=COL57&sizeCode=SMA003

- https://www.uniqlo.com/sg/en/products/E470033-000?colorCode=COL69&sizeCode=SMA002

## Github Pages
https://yechyang.github.io/FED_Assignment_2/ 