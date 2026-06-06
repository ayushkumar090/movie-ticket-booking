# Movie Ticket Booking System - Frontend

A modern, interactive movie ticket booking system built with vanilla HTML5, CSS3, and JavaScript. Perfect for learning web development and ready for Apache Tomcat deployment.

## 🎬 Features

- **Interactive Home Page** - Featured movies and carousel slider
- **Movies Listing** - Filter by genre, language, rating, and search
- **Seat Selection** - Interactive seat map with real-time pricing
- **Shopping Cart** - Manage bookings and calculate totals
- **User Profile** - View booking history and account settings
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Modern UI** - Smooth animations, modals, and notifications
- **Data Persistence** - LocalStorage for booking management
- **No Dependencies** - Pure HTML, CSS, and JavaScript

## 📁 Folder Structure

```
movie-ticket-booking/
├── index.html                 # Home page
├── movies.html               # Movies listing page
├── booking.html              # Movie details & seat selection
├── cart.html                 # Shopping cart page
├── profile.html              # User profile page
├── css/
│   ├── styles.css           # Main stylesheet
│   ├── responsive.css       # Media queries
│   └── animations.css       # Animations & transitions
├── js/
│   ├── app.js               # Main application logic
│   ├── movies.js            # Movie listing features
│   ├── booking.js           # Booking & seat selection
│   ├── cart.js              # Cart management
│   ├── user.js              # User profile features
│   ├── utils.js             # Utility functions
│   └── storage.js           # LocalStorage management
├── data/
│   └── movies-data.json     # Sample movie data
├── images/
│   ├── logo.svg             # Logo
│   ├── movies/              # Movie posters
│   └── icons/               # UI icons
└── README.md
```

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ayushkumar090/movie-ticket-booking.git
   cd movie-ticket-booking
   ```

2. **Open in Browser**
   - Simply open `index.html` in your web browser
   - No build process or dependencies needed

3. **Deploy on Apache Tomcat**
   - Copy all files to `$CATALINA_HOME/webapps/movie-ticket-booking/`
   - Access via `http://localhost:8080/movie-ticket-booking/`

## 📱 Pages

### Home Page (index.html)
- Navigation bar with logo and user profile
- Hero section with featured movies
- Movie carousel with auto-scroll
- Search functionality
- Footer with links

### Movies Page (movies.html)
- Grid layout of movie cards
- Filter by genre, language, rating
- Real-time search
- Movie details preview
- Book now button

### Booking Page (booking.html)
- Movie details and information
- Theater and show time selection
- Interactive seat map
  - Available seats (green)
  - Selected seats (blue)
  - Booked seats (gray)
  - Seat types: Regular, Premium, VIP
- Real-time price calculation
- Add to cart button

### Cart Page (cart.html)
- View all selected bookings
- Edit or remove items
- Price breakdown with taxes
- Proceed to checkout
- Continue shopping option

### Profile Page (profile.html)
- User information
- Booking history
- Cancel bookings
- Download tickets
- Account settings

## 🎨 Design Features

- **Color Scheme** - Modern dark theme with vibrant accents
- **Typography** - Clean, readable fonts
- **Animations** - Smooth transitions and hover effects
- **Icons** - SVG icons throughout
- **Responsive** - Mobile-first design approach

## 💾 Data Management

- **LocalStorage** - Bookings and user data stored locally
- **JSON Data** - Movie information in structured format
- **Session Management** - User authentication simulation

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Grid, Flexbox, Custom Properties, Animations
- **Vanilla JavaScript** - ES6+, async/await
- **LocalStorage API** - Data persistence
- **SVG** - Scalable graphics

## 📖 How to Customize

1. **Add/Edit Movies** - Update `data/movies-data.json`
2. **Change Colors** - Modify CSS variables in `css/styles.css`
3. **Add Theaters** - Update theater data in `js/booking.js`
4. **Modify Seat Layout** - Edit seat configuration in `js/booking.js`

## 🔧 Configuration

All configuration is done through JavaScript files:
- **Movie data** - `data/movies-data.json`
- **Theater data** - `js/booking.js` (theaters object)
- **Seat pricing** - `js/booking.js` (seatPrices object)
- **Theme colors** - `css/styles.css` (CSS variables)

## 📝 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🚢 Deployment

### Apache Tomcat
1. Create WAR structure (optional)
2. Copy files to webapps folder
3. Access via http://localhost:8080/movie-ticket-booking/

### Other Servers
- Works on any static file server
- No server-side code required

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created for web development learning and portfolio purposes.

---

**Happy Coding! 🎬🎟️**
