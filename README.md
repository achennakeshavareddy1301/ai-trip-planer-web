# AiGo – AI Trip Planner

AiGo is an AI-powered travel planner that generates personalized itineraries based on your preferences, budget, and group size. Built with React, Vite, Firebase, and Google APIs, AiGo helps you discover destinations, plan daily activities, and manage your trips with ease.

## Features

- 🌍 **AI-generated itineraries:** Get custom daily plans, activities, and dining recommendations.
- 🏨 **Accommodation & practical info:** Find places to stay and useful travel tips.
- 🗺️ **Interactive trip view:** Explore your trip details in a beautiful, responsive UI.
- 🔒 **Google authentication:** Secure sign-in to save and manage your trips.
- 💾 **Firebase integration:** All trips are stored securely in Firestore.
- 🎨 **Modern UI:** Built with Tailwind CSS and shadcn/ui components.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm
![Screenshot_24-6-2025_174858_localhost](https://github.com/user-attachments/assets/3a78fd73-5d5c-4db2-81dc-c8ec7c9b42b9)
![Screenshot 2025-06-24 175037](https://github.com/user-attachments/assets/80395a69-46eb-4a1c-8427-6ac51b7f0e3b)
![at-trip](https://github.com/user-attachments/assets/72e1c20c-c64c-4071-9687-12f41c5d4f6b)

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/ai-trip.git
   cd ai-trip
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env` file in the root of the project and add your Firebase and Google API credentials:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GOOGLE_API_KEY=your_google_api_key
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
   Open your browser and go to `http://localhost:5173` to see AiGo in action.

## Contributing

We welcome contributions to AiGo! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes and commit them
4. Push your branch and create a pull request

Please ensure your code follows the existing style and includes appropriate tests.


## License

AiGo is open-source software licensed under the [MIT License](LICENSE).
