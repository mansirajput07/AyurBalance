# AyurBalance - Ayurvedic Wellness & Balance Platform

AyurBalance is an intelligent Ayurvedic wellness web application that helps users understand their body constitution (Prakriti) and achieve holistic well-being by combining ancient Ayurvedic wisdom with modern digital technology.

The application enables users to:

- Discover their Prakriti type (Vata, Pitta, Kapha)
- Receive personalized diet and lifestyle recommendations
- Track daily wellness habits and routines
- Maintain consistency through reminders and follow-ups
- Monitor progress with detailed analytics

**"AyurBalance"** embodies the essence of achieving equilibrium in body, mind, and spirit through Ayurvedic principles.

---

## 🎯 Objective

To create a comprehensive digital platform that helps users:
- Understand their unique mind-body constitution
- Manage lifestyle patterns according to Ayurvedic principles
- Maintain optimal balance and wellness
- Track and improve their health journey

---

## ✨ Core Features

### 1. **User Profile Management**
- Collects comprehensive personal and health information (age, gender, body type, dietary habits, sleep patterns)
- Allows real-time profile updates
- Secure data storage and management

### 2. **Prakriti Analysis**
- Interactive questionnaire based on Ayurvedic parameters
- Determines dominant Dosha (Vata / Pitta / Kapha)
- Generates detailed Prakriti Report with:
  - Personality insights
  - Health tendencies
  - Balancing recommendations

### 3. **Personalized Diet Chart**
- Dosha-specific food recommendations
- Meal suggestions for different times of the day
- Clear guidance on foods to favor and avoid
- Seasonal dietary adjustments

### 4. **Daily Routine Scheduler**
- Ayurvedic lifestyle routines (Dinacharya) integration
- Customizable wellness tasks:
  - Sleep management
  - Hydration tracking
  - Meditation reminders
  - Exercise scheduling
- Smart notification system

### 5. **Progress Tracking & Follow-up**
- Monitors key wellness indicators (mood, sleep quality, stress levels)
- Weekly reflection prompts
- Visual progress charts
- Personalized improvement suggestions

### 6. **Admin Dashboard**
- Secure administrative access
- User data management
- Analytics and trend analysis
- System health monitoring

---

## 🏗️ System Architecture
<p align="center">
  <img src="https://github.com/mansirajput07/AyurBalance/blob/main/assets/SystemArchitecture.png.png" alt="System Architecture" width="700">
</p>




### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React.js, JavaScript, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite3 |
| **State Management** | React Hooks |
| **Styling** | Tailwind CSS, Custom CSS |
| **Development Tools** | Nodemon, Create React App |

### System Modules

| Module | Description |
|--------|-------------|
| **User Management** | Registration, authentication, and profile management |
| **Assessment Engine** | Interactive Prakriti analysis questionnaire |
| **Recommendation System** | Personalized diet and lifestyle guidance |
| **Tracking System** | Progress monitoring and analytics |
| **Notification Service** | Reminders and wellness alerts |
| **Admin Panel** | Administrative controls and analytics |

---

## 📱 Key Application Screens

1. **Landing Page** - Introduction to AyurBalance and Ayurveda
2. **User Registration / Login** - Secure authentication
3. **Profile Setup** - Comprehensive health information form
4. **Prakriti Assessment** - Interactive questionnaire
5. **Results Dashboard** - Dosha analysis and personalized insights
6. **Diet Recommendations** - Customized meal plans
7. **Daily Routine Planner** - Lifestyle scheduling
8. **Progress Tracker** - Wellness analytics and charts
9. **Admin Dashboard** - System management interface

---

## 🧘 Ayurvedic & Wellness Integration

### Key Principles Incorporated

| Aspect | Implementation |
|--------|---------------|
| **Self-Assessment** | Promotes introspection through guided questionnaires |
| **Behavioral Awareness** | Tracks habits and encourages conscious living |
| **Dosha Balance** | Provides constitution-specific recommendations |
| **Circadian Wellness** | Aligns routines with natural body rhythms |
| **Holistic Health** | Integrates physical, mental, and emotional well-being |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Installation Steps

```bash
# Clone the repository
git clone https://github.com/mansirajput07/AyurBalance.git

# Navigate to project directory
cd AyurBalance

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### Running the Application

#### Development Mode

**Backend Server:**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Frontend Application:**
```bash
cd client
npm start
# Application opens at http://localhost:3000
```

#### Production Build

```bash
# Build frontend for production
cd client
npm run build

# The build folder contains optimized production files
```

---

## 📊 Database Schema

### Users Table
- User ID (Primary Key)
- Name, Email, Password
- Age, Gender, Location
- Profile Details

### Prakriti Assessment Table
- Assessment ID
- User ID (Foreign Key)
- Question Responses
- Calculated Dosha Scores
- Timestamp

### Recommendations Table
- Recommendation ID
- User ID (Foreign Key)
- Diet Plans
- Lifestyle Routines
- Last Updated

---

## 🔮 Future Enhancements

- **AI Chatbot Integration** - Intelligent health query responses
- **Voice Features** - Guided meditation and breathing exercises
- **Wearable Integration** - Sync with Apple Health / Google Fit
- **ML-Powered Analysis** - Advanced Dosha prediction algorithms
- **Community Platform** - User forums and wellness discussions
- **Multilingual Support** - Regional language options
- **Mobile Applications** - iOS and Android native apps
- **Telemedicine Integration** - Connect with Ayurvedic practitioners

---

## 🤝 Contributing

We welcome contributions to AyurBalance! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📞 Contact & Support

For inquiries, bug reports, or contributions:

- **GitHub Issues**: [Report Issues](https://github.com/mansirajput07/AyurBalance/issues)
- **Email**: support@ayurbalance.com
- **Documentation**: [Wiki](https://github.com/mansirajput07/AyurBalance/wiki)

---

## 🙏 Acknowledgments

- Ancient Ayurvedic texts and principles
- Open-source community

---

**AyurBalance** - Empowering wellness through the timeless wisdom of Ayurveda. 🌿

*Because balance is not something you find, it's something you create.*
