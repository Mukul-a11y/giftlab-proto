# GiftLabs E-Commerce Prototype

This is a prototype e-commerce platform for gift products with an admin panel using Next.js and Tailwind CSS.

## Features

- **User-Facing Features**
  - Product browsing and display
  - Shopping cart functionality (add, remove, update quantities)
  - Checkout process (simulated)
  
- **Admin Panel Features**
  - Product management (view, add, edit, delete)
  - Protected admin routes

## Technology Stack

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Fake login (localStorage-based for prototype)
- **Product Data**: Static JSON file

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/giftlabs.git
   cd giftlabs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Credentials

- **Admin User**: username: `admin` / password: `admin123`
- **Regular User**: Any username/password combination will work

## Project Structure

```
/giftlabs
 ├── src/
 │   ├── app/                    # App router pages
 │   │   ├── admin/              # Admin panel routes
 │   │   │   ├── add/            # Add product page
 │   │   │   ├── edit/[id]/      # Edit product page
 │   │   ├── auth/
 │   │   │   ├── login/          # Login page
 │   │   ├── cart/               # Shopping cart page
 │   ├── components/             # Reusable UI components
 │   ├── context/                # React Context for global state
 │   │   ├── AuthContext.tsx     # Authentication state
 │   │   ├── CartContext.tsx     # Shopping cart state
 │   ├── data/                   # Static data
 │   │   ├── products.json       # Product data
 ├── public/                     # Static assets
 │   ├── images/                 # Product and site images
```

## Deployment to Vercel

This project is optimized for deployment on Vercel. To deploy:

1. Push your code to a GitHub repository
2. Import the project into Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Follow the setup instructions (the default settings work well)
   - Deploy

## Limitations (Since this is a prototype)

- No real backend or database (uses static JSON and localStorage)
- Changes to products are not persisted between sessions
- No real payment processing
- Images are placeholders (would need to be replaced with actual product images)
- No user registration (just a fake login system)

## Next Steps for a Production Version

- Implement a proper backend with database
- Add user authentication and registration
- Add payment processing
- Add image upload functionality for product management
- Implement proper error handling and form validation
- Add responsiveness improvements for different screen sizes
- Add comprehensive testing
#   g i f t l a b - p r o t o  
 