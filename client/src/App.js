import React, { useState, useEffect } from 'react';
import { User, CheckCircle, Brain, Heart, Zap, Leaf, ArrowRight, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, AlertCircle, Calendar, TrendingUp, BookOpen, Home, Apple, Activity, Bell, LogOut, Menu, X, ChevronRight, Clock, Utensils, Droplet, Moon, Sun } from 'lucide-react';
const AyurBalance = () => {
  const [view, setView] = useState('landing');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState(null);
  const [user, setUser] = useState({ name: '', age: '', gender: '', email: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [progressData, setProgressData] = useState([
    { week: 'Week 1', energy: 60, sleep: 55, stress: 65 },
    { week: 'Week 2', energy: 65, sleep: 60, stress: 60 },
    { week: 'Week 3', energy: 70, sleep: 68, stress: 55 },
    { week: 'Week 4', energy: 75, sleep: 75, stress: 50 }
  ]);
  const questions = [
    { id: 'build', q: 'Your body build?', opts: { vata: 'Thin, light', pitta: 'Medium, muscular', kapha: 'Heavy, broad' }},
    { id: 'skin', q: 'Your skin type?', opts: { vata: 'Dry, rough', pitta: 'Soft, warm', kapha: 'Thick, oily' }},
    { id: 'appetite', q: 'Your appetite?', opts: { vata: 'Variable', pitta: 'Strong, regular', kapha: 'Steady' }},
    { id: 'energy', q: 'Energy levels?', opts: { vata: 'Bursts then tired', pitta: 'Steady, moderate', kapha: 'Low morning' }},
    { id: 'mood', q: 'Under stress?', opts: { vata: 'Anxious, worried', pitta: 'Angry, impatient', kapha: 'Withdraw, sluggish' }}
  ];
  const doshaInfo = {
    vata: { 
      name: 'Vata (Air)', 
      desc: 'Creative, energetic. Needs routine, warmth.', 
      color: '#a855f7',
      characteristics: ['Creative and imaginative', 'Quick thinking', 'Energetic in bursts', 'Tendency to worry'],
      recommendations: {
        lifestyle: [
          'Maintain regular daily routines',
          'Get 7-8 hours of quality sleep',
          'Practice stress-reducing activities like meditation',
          'Stay warm and avoid cold, windy weather',
          'Create a calm, organized environment'
        ],
        diet: [
          'Eat warm, cooked foods',
          'Include healthy fats like ghee and oils',
          'Favor sweet, sour, and salty tastes',
          'Avoid raw, cold, and dry foods',
          'Eat regular meals at consistent times'
        ],
        exercise: [
          'Gentle, grounding exercises like yoga',
          'Walking in nature',
          'Swimming in warm water',
          'Avoid excessive or overly intense workouts',
          'Focus on flexibility and balance'
        ],
        herbs: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi']
      }
    },
    pitta: { 
      name: 'Pitta (Fire)', 
      desc: 'Focused, intelligent. Needs cooling, moderation.', 
      color: '#ef4444',
      characteristics: ['Strong leadership qualities', 'Sharp intellect', 'Good digestion', 'Can be impatient or irritable'],
      recommendations: {
        lifestyle: [
          'Avoid excessive heat and sun exposure',
          'Practice cooling activities like moonlight walks',
          'Maintain work-life balance',
          'Avoid skipping meals',
          'Practice patience and tolerance'
        ],
        diet: [
          'Eat cooling foods like cucumbers, melons',
          'Favor sweet, bitter, and astringent tastes',
          'Avoid spicy, oily, and fried foods',
          'Drink plenty of cool (not ice-cold) water',
          'Include fresh fruits and vegetables'
        ],
        exercise: [
          'Swimming and water sports',
          'Early morning or evening workouts',
          'Moderate intensity activities',
          'Avoid exercising in hot weather',
          'Team sports for social connection'
        ],
        herbs: ['Aloe Vera', 'Coriander', 'Fennel', 'Rose petals']
      }
    },
    kapha: { 
      name: 'Kapha (Earth)', 
      desc: 'Calm, stable. Needs activity, lightness.', 
      color: '#10b981',
      characteristics: ['Naturally calm and stable', 'Strong immunity', 'Loyal and compassionate', 'Tendency toward sluggishness'],
      recommendations: {
        lifestyle: [
          'Wake up early (before 6 AM)',
          'Stay active throughout the day',
          'Avoid daytime napping',
          'Seek variety and new experiences',
          'Maintain social connections'
        ],
        diet: [
          'Eat light, warm, and spiced foods',
          'Favor pungent, bitter, and astringent tastes',
          'Avoid heavy, oily, and cold foods',
          'Eat your largest meal at lunch',
          'Include plenty of vegetables and legumes'
        ],
        exercise: [
          'Vigorous cardio exercises',
          'Running, cycling, or dancing',
          'Hot yoga or intense workouts',
          'Vary your exercise routine',
          'Exercise in the morning'
        ],
        herbs: ['Ginger', 'Black pepper', 'Turmeric', 'Trikatu']
      }
    }
  };
  const mealPlans = {
    vata: {
      breakfast: [
        { name: 'Warm Oatmeal with Ghee', desc: 'Cooked oats with cinnamon, dates, and ghee', time: '7:00-8:00 AM' },
        { name: 'Spiced Quinoa Porridge', desc: 'Quinoa with warm milk, cardamom, and nuts', time: '7:00-8:00 AM' }
      ],
      lunch: [
        { name: 'Kitchari Bowl', desc: 'Rice and lentils with vegetables and spices', time: '12:00-1:00 PM' },
        { name: 'Vegetable Soup', desc: 'Root vegetables in warm broth with herbs', time: '12:00-1:00 PM' }
      ],
      dinner: [
        { name: 'Steamed Vegetables with Rice', desc: 'Seasonal vegetables with basmati rice', time: '6:00-7:00 PM' },
        { name: 'Warm Lentil Stew', desc: 'Mung dal with warming spices', time: '6:00-7:00 PM' }
      ]
    },
    pitta: {
      breakfast: [
        { name: 'Cooling Smoothie Bowl', desc: 'Coconut, berries, and cooling herbs', time: '7:00-8:00 AM' },
        { name: 'Fresh Fruit Salad', desc: 'Sweet fruits with mint and lime', time: '7:00-8:00 AM' }
      ],
      lunch: [
        { name: 'Cucumber Rice Bowl', desc: 'Basmati rice with cucumber raita', time: '12:00-1:00 PM' },
        { name: 'Green Salad', desc: 'Mixed greens with cooling dressing', time: '12:00-1:00 PM' }
      ],
      dinner: [
        { name: 'Coconut Curry', desc: 'Mild vegetables in coconut sauce', time: '6:00-7:00 PM' },
        { name: 'Barley Soup', desc: 'Cooling barley with vegetables', time: '6:00-7:00 PM' }
      ]
    },
    kapha: {
      breakfast: [
        { name: 'Spiced Apple Compote', desc: 'Warm apples with ginger and cinnamon', time: '7:00-8:00 AM' },
        { name: 'Light Buckwheat Porridge', desc: 'Buckwheat with warming spices', time: '7:00-8:00 AM' }
      ],
      lunch: [
        { name: 'Spicy Vegetable Stir-fry', desc: 'Mixed vegetables with ginger and pepper', time: '12:00-1:00 PM' },
        { name: 'Lentil and Vegetable Soup', desc: 'Light soup with warming spices', time: '12:00-1:00 PM' }
      ],
      dinner: [
        { name: 'Steamed Greens', desc: 'Light greens with lemon and spices', time: '6:00-7:00 PM' },
        { name: 'Vegetable Broth', desc: 'Clear broth with vegetables', time: '6:00-7:00 PM' }
      ]
    }
  };
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #374151 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    card: {
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
      padding: '32px',
      border: '1px solid #374151'
    },
    button: {
      padding: '12px 24px',
      borderRadius: '25px',
      border: 'none',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      color: 'white',
      fontSize: '16px'
    },
    sidebar: {
      width: '260px',
      backgroundColor: '#1e293b',
      borderRight: '1px solid #374151',
      padding: '20px',
      position: 'fixed',
      height: '100vh',
      overflowY: 'auto'
    },
    mainContent: {
      marginLeft: '260px',
      padding: '32px',
      minHeight: '100vh'
    }
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const validateName = (name) => {
    return name.trim().length >= 2;
  };
  const validateAge = (age) => {
    const numAge = parseInt(age);
    return numAge >= 1 && numAge <= 120;
  };
  const validateForm = (type) => {
    const newErrors = {};
    if (type === 'register') {
      if (!validateName(user.name)) {
        newErrors.name = 'Name must be at least 2 characters long';
      }
    }
    if (!validateEmail(user.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePassword(user.password)) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };
  const validateProfile = () => {
    const newErrors = {};
    if (!validateAge(user.age)) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    if (!user.gender) {
      newErrors.gender = 'Please select your gender';
    }
    return newErrors;
  };
  const handleAuth = async (type) => {
    setIsSubmitting(true);
    const validationErrors = validateForm(type);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    // Simulate API call
    try {
      const res = await fetch(http://localhost:5000/api/auth/, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Auth failed');
      setUser(prev => ({ ...prev, id: data.id }));
      setErrors({});
      setView('profile');
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleProfileSubmit = async () => {
    const validationErrors = validateProfile();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          age: user.age,
          gender: user.gender
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error('Failed to save profile');
      setErrors({});
      setView('analysis');
    } catch (err) {
      setErrors({ general: err.message });
    }
  };
  const handleNext = async () => {
    if (!responses[questions[currentQ].id]) {
      setErrors({ question: 'Please select an answer before continuing' });
      return;
    }
    setErrors({});
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      try {
        await fetch('http://localhost:5000/api/analysis/responses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, responses })
        });
        const res = await fetch (http://localhost:5000/api/analysis/results/);
        const resultData = await res.json();
        if (!res.ok) throw new Error('Failed to get results');
        setResults(resultData);
        setView('app');
        setCurrentPage('dashboard');
      } catch (err) {
        setErrors({ general: 'Analysis failed. Please try again.' });
      }
    }
  };
  const handleInputChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  const logout = () => {
    setView('landing');
    setCurrentPage('dashboard');
    setCurrentQ(0);
    setResponses({});
    setResults(null);
    setUser({ name: '', age: '', gender: '', email: '', password: '' });
    setErrors({});
    setWaterIntake(0);
  };
  const ErrorMessage = ({ message }) => (
    <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
      <AlertCircle size={14} />
      <span>{message}</span>
    </div>
  );
  const Sidebar = () => {
    const menuItems = [
      { id: 'dashboard', icon: Home, label: 'Dashboard' },
      { id: 'diet', icon: Apple, label: 'Diet Plan' },
      { id: 'progress', icon: TrendingUp, label: 'Progress' },
      { id: 'recommendations', icon: BookOpen, label: 'Recommendations' },
      { id: 'activity', icon: Activity, label: 'Activity Log' }
    ];
    return (
      <div style={styles.sidebar}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid #374151' }}>
          <Leaf size={32} color="#a855f7" />
          <div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e5e7eb' }}>AyurBalance</div>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>{user.name}</div>
          </div>
        </div>
        <nav>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setMobileMenuOpen(false);
              }}
              style={{
                width: '100%',
                padding: '12px 16px',
                marginBottom: '8px',
                border: 'none',
                borderRadius: '8px',
                backgroundColor: currentPage === item.id ? '#7c3aed' : 'transparent',
                color: currentPage === item.id ? 'white' : '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <button
          onClick={logout}
          style={{
            width: '100%',
            padding: '12px 16px',
            marginTop: '32px',
            border: '1px solid #374151',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#ef4444',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    );
  };
  const DashboardPage = () => {
    const info = doshaInfo[results.dominant];
    const dailyGoals = [
      { label: 'Water Intake', current: waterIntake, goal: 8, unit: 'glasses', icon: Droplet },
      { label: 'Sleep', current: 7, goal: 8, unit: 'hours', icon: Moon },
      { label: 'Exercise', current: 30, goal: 45, unit: 'mins', icon: Activity }
    ];
    return (
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
          Welcome back, {user.name}!
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
          Your wellness journey with {info.name}
        </p>
        <div style={{ ...styles.card, marginBottom: '24px', background: linear-gradient(135deg, 20 0%, #1e293b 100%) }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
                Your Dosha: {info.name}
              </h2>
              <p style={{ color: '#9ca3af' }}>{info.desc}</p>
            </div>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: info.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Leaf size={40} color="white" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {Object.entries(results.pcts).map(([dosha, pct]) => (
              <div key={dosha} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: doshaInfo[dosha].color }}>{pct}%</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'capitalize' }}>{dosha}</div>
              </div>
            ))}
          </div>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px' }}>
          Today's Goals
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {dailyGoals.map((goal, index) => {
            const percentage = Math.min((goal.current / goal.goal) * 100, 100);
            return (
              <div key={index} style={styles.card}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <goal.icon size={24} color="#a855f7" />
                    <span style={{ fontSize: '16px', fontWeight: '600', color: '#e5e7eb' }}>{goal.label}</span>
                  </div>
                  <span style={{ fontSize: '14px', color: '#9ca3af' }}>
                    {goal.current}/{goal.goal} {goal.unit}
                  </span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: ${percentage}%, height: '100%', backgroundColor: '#a855f7', transition: 'width 0.3s ease' }} />
                </div>
                {goal.label === 'Water Intake' && (
                  <button
                    onClick={() => setWaterIntake(prev => Math.min(prev + 1, goal.goal))}
                    style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      border: 'none',
                      borderRadius: '6px',
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}
                  >
                    + Add Glass
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px' }}>
          Quick Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { label: 'View Diet Plan', icon: Apple, page: 'diet' },
            { label: 'Track Progress', icon: TrendingUp, page: 'progress' },
            { label: 'Read Tips', icon: BookOpen, page: 'recommendations' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(action.page)}
              style={{
                ...styles.card,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px',
                transition: 'transform 0.2s ease'
              }}
            >
              <action.icon size={24} color="#a855f7" />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>{action.label}</span>
              <ChevronRight size={20} color="#9ca3af" style={{ marginLeft: 'auto' }} />
            </button>
          ))}
        </div>
      </div>
    );
  };
  const DietPage = () => {
    const info = doshaInfo[results.dominant];
    const meals = mealPlans[results.dominant];
    return (
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
          Your Personalized Diet Plan
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
          Tailored for {info.name} constitution
        </p>
        {['breakfast', 'lunch', 'dinner'].map((mealType) => (
          <div key={mealType} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px', textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '12px' }}>
              {mealType === 'breakfast' && <Sun size={24} color="#f59e0b" />}
              {mealType === 'lunch' && <Utensils size={24} color="#10b981" />}
              {mealType === 'dinner' && <Moon size={24} color="#a855f7" />}
              {mealType}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {meals[mealType].map((meal, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.card,
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                    border: selectedMeal === ${mealType}- ? 2px solid  : '1px solid #374151'
                  }}
                  onClick={() => setSelectedMeal(${mealType}-)}
                >
                  <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#e5e7eb' }}>{meal.name}</h3>
                    {selectedMeal === ${mealType}- && <CheckCircle size={24} color={info.color} />}
                  </div>
                  <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '12px' }}>{meal.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9ca3af', fontSize: '12px' }}>
                    <Clock size={16} />
                    <span>{meal.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ ...styles.card, marginTop: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px' }}>
            Dietary Guidelines for {info.name}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#10b981', marginBottom: '12px' }}>✓ Recommended</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d5db' }}>
                {info.recommendations.diet.slice(0, 3).map((tip, index) => (
                  <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#ef4444', marginBottom: '12px' }}>✗ Avoid</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#d1d5db' }}>
                {info.recommendations.diet.slice(3).map((tip, index) => (
                  <li key={index} style={{ marginBottom: '8px', fontSize: '14px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const ProgressPage = () => {
    return (
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
          Your Progress
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
          Track your wellness journey over time
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Energy Level', value: '75%', change: '+15%', color: '#10b981' },
            { label: 'Sleep Quality', value: '80%', change: '+20%', color: '#3b82f6' },
            { label: 'Stress Level', value: '50%', change: '-15%', color: '#a855f7' },
            { label: 'Overall Balance', value: '85%', change: '+25%', color: '#f59e0b' }
          ].map((metric, index) => (
            <div key={index} style={styles.card}>
              <div style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>{metric.label}</div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '4px' }}>{metric.value}</div>
              <div style={{ fontSize: '12px', color: metric.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                {metric.change} from last month
              </div>
            </div>
          ))}
        </div>
        <div style={styles.card}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '24px' }}>
            Weekly Progress Overview
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ minWidth: '600px' }}>
              {progressData.map((week, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb', marginBottom: '12px' }}>
                    {week.week}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {[
                      { label: 'Energy', value: week.energy, color: '#10b981' },
                      { label: 'Sleep', value: week.sleep, color: '#3b82f6' },
                      { label: 'Stress', value: week.stress, color: '#a855f7' }
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '12px', color: '#9ca3af' }}>{metric.label}</span>
                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#e5e7eb' }}>{metric.value}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#374151', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: ${metric.value}%, height: '100%', backgroundColor: metric.color, transition: 'width 0.5s ease' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: '32px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px' }}>
            Recent Achievements
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {[
              { title: '7-Day Streak', desc: 'Logged meals for 7 days', icon: '🔥' },
              { title: 'Water Goal', desc: 'Met water intake goal 5 times', icon: '💧' },
              { title: 'Early Riser', desc: 'Woke up before 6 AM for 3 days', icon: '🌅' },
              { title: 'Balanced Diet', desc: 'Followed diet plan perfectly', icon: '🥗' }
            ].map((achievement, index) => (
              <div key={index} style={{ ...styles.card, display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ fontSize: '32px' }}>{achievement.icon}</div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#e5e7eb', marginBottom: '4px' }}>
                    {achievement.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{achievement.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  const RecommendationsPage = () => {
    const info = doshaInfo[results.dominant];
    return (
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
          Personalized Recommendations
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
          Holistic wellness tips for {info.name}
        </p>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User size={24} color="#3b82f6" />
            Lifestyle
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {info.recommendations.lifestyle.map((tip, index) => (
              <div key={index} style={styles.card}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3b82f6', marginTop: '8px', flexShrink: 0 }} />
                  <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0 }}>{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Zap size={24} color="#f59e0b" />
            Exercise & Activity
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {info.recommendations.exercise.map((tip, index) => (
              <div key={index} style={styles.card}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', marginTop: '8px', flexShrink: 0 }} />
                  <p style={{ color: '#d1d5db', fontSize: '14px', margin: 0 }}>{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={styles.card}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Leaf size={24} color="#10b981" />
            Beneficial Herbs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
            {info.recommendations.herbs.map((herb, index) => (
              <div
                key={index}
                style={{
                  padding: '16px',
                  backgroundColor: '#374151',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: '1px solid #4b5563'
                }}
              >
                <Leaf size={32} color="#10b981" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#e5e7eb' }}>{herb}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>
            *Consult with an Ayurvedic practitioner before using herbs
          </p>
        </div>
        <div style={{ ...styles.card, marginTop: '32px', background: linear-gradient(135deg, 20 0%, #1e293b 100%) }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#e5e7eb', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={24} color={info.color} />
            Suggested Daily Routine
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            {results.dominant === 'vata' && (
              <>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Wake up, warm water with ginger</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:30 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Gentle yoga or meditation</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>8:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Warm, nourishing breakfast</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>12:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Largest meal of the day</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Light, warm dinner</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>10:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Wind down, prepare for sleep</div>
                </div>
              </>
            )}
            {results.dominant === 'pitta' && (
              <>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Wake up, cool water</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:30 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Moderate exercise (avoid heat)</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>8:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Cooling breakfast</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>12:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Substantial lunch</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>7:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Light, cooling dinner</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>10:30 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Relaxation and sleep</div>
                </div>
              </>
            )}
            {results.dominant === 'kapha' && (
              <>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>5:30 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Early wake up, warm water with honey</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Vigorous exercise</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>8:00 AM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Light breakfast</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>12:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Main meal of the day</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>6:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Very light dinner</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#374151', borderRadius: '8px' }}>
                  <div style={{ fontWeight: '600', color: info.color, marginBottom: '4px' }}>10:00 PM</div>
                  <div style={{ color: '#d1d5db', fontSize: '14px' }}>Early bedtime</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };
  const ActivityPage = () => {
    const activities = [
      { type: 'meal', time: '8:00 AM', desc: 'Breakfast - Warm Oatmeal', icon: Utensils, color: '#10b981' },
      { type: 'water', time: '9:30 AM', desc: 'Logged 2 glasses of water', icon: Droplet, color: '#3b82f6' },
      { type: 'exercise', time: '6:30 AM', desc: 'Morning Yoga - 30 mins', icon: Activity, color: '#f59e0b' },
      { type: 'meal', time: '1:00 PM', desc: 'Lunch - Kitchari Bowl', icon: Utensils, color: '#10b981' },
      { type: 'water', time: '3:00 PM', desc: 'Logged 3 glasses of water', icon: Droplet, color: '#3b82f6' },
      { type: 'meal', time: '7:00 PM', desc: 'Dinner - Steamed Vegetables', icon: Utensils, color: '#10b981' }
    ];
    return (
      <div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '8px' }}>
          Activity Log
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: '32px' }}>
          Track your daily wellness activities
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Log Meal', icon: Utensils, color: '#10b981' },
            { label: 'Add Water', icon: Droplet, color: '#3b82f6' },
            { label: 'Log Exercise', icon: Activity, color: '#f59e0b' },
            { label: 'Add Note', icon: BookOpen, color: '#a855f7' }
          ].map((action, index) => (
            <button
              key={index}
              style={{
                ...styles.card,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '20px',
                transition: 'transform 0.2s ease'
              }}
            >
              <action.icon size={24} color={action.color} />
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>{action.label}</span>
            </button>
          ))}
        </div>
        <div style={styles.card}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#e5e7eb', marginBottom: '24px' }}>
            Today's Activity
          </h3>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', backgroundColor: '#374151' }} />
            {activities.map((activity, index) => (
              <div key={index} style={{ display: 'flex', gap: '20px', marginBottom: '24px', position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
                  <activity.icon size={20} color="white" />
                </div>
                <div style={{ flex: 1, paddingTop: '4px' }}>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>{activity.time}</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#e5e7eb' }}>{activity.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  if (view === 'landing') {
    return (
      <div style={styles.container}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', backgroundColor: 'rgba(30, 41, 59, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #374151' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '24px', fontWeight: 'bold', color: '#e5e7eb' }}>
            <Leaf size={32} color="#a855f7" />
            <span>AyurBalance</span>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => setView('login')}
              style={{ ...styles.button, backgroundColor: '#374151', color: '#e5e7eb', border: '1px solid #4b5563' }}
            >
              Login
            </button>
            <button
              onClick={() => setView('register')}
              style={{ ...styles.button, ...styles.primaryButton }}
            >
              Sign Up
            </button>
          </div>
        </nav>
        <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px', color: '#e5e7eb' }}>
            Discover Your <span style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ayurvedic Type</span>
          </h1>
          <p style={{ fontSize: '20px', color: '#9ca3af', marginBottom: '40px', lineHeight: '1.6' }}>
            Complete wellness platform with personalized diet plans, progress tracking, and holistic recommendations
          </p>
          <button
            onClick={() => setView('register')}
            style={{ ...styles.button, ...styles.primaryButton, fontSize: '18px', padding: '16px 32px' }}
          >
            <span>Get Started</span>
            <ArrowRight size={20} />
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '60px' }}>
            {Object.entries(doshaInfo).map(([key, info], index) => (
              <div key={key} style={{ backgroundColor: 'rgba(30, 41, 59, 0.8)', padding: '32px', borderRadius: '16px', textAlign: 'center', backdropFilter: 'blur(10px)', border: '1px solid rgba(75, 85, 99, 0.3)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'white', backgroundColor: info.color }}>
                  {index === 0 && <Brain size={28} />}
                  {index === 1 && <Heart size={28} />}
                  {index === 2 && <Zap size={28} />}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: '#e5e7eb' }}>
                  {info.name}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '14px' }}>{info.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (view === 'login' || view === 'register') {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ ...styles.card, maxWidth: '500px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Leaf size={48} color="#a855f7" style={{ margin: '0 auto 16px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#e5e7eb' }}>
              {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ color: '#9ca3af' }}>
              {view === 'login' ? 'Sign in to continue' : 'Start your wellness journey'}
            </p>
          </div>
          <div>
            {view === 'register' && (
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <User style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    paddingLeft: '44px',
                    border: 2px solid ,
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    backgroundColor: '#374151',
                    color: '#e5e7eb'
                  }}
                  placeholder="Full name"
                />
                {errors.name && <ErrorMessage message={errors.name} />}
              </div>
            )}
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
              <input
                type="email"
                value={user.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingLeft: '44px',
                  border: 2px solid ,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#374151',
                  color: '#e5e7eb'
                }}
                placeholder="Email address"
              />
              {errors.email && <ErrorMessage message={errors.email} />}
            </div>
            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
              <input
                type={showPwd ? "text" : "password"}
                value={user.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  paddingLeft: '44px',
                  border: 2px solid ,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#374151',
                  color: '#e5e7eb'
                }}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8'
                }}
              >
                {showPwd ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <ErrorMessage message={errors.password} />}
            </div>
            {errors.general && <ErrorMessage message={errors.general} />}
            <button
              onClick={() => handleAuth(view)}
              disabled={isSubmitting}
              style={{
                ...styles.button,
                ...styles.primaryButton,
                width: '100%',
                marginBottom: '16px',
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {view === 'login' ? <LogIn size={20} /> : <UserPlus size={20} />}
              <span>{isSubmitting ? 'Please wait...' : (view === 'login' ? 'Sign In' : 'Create Account')}</span>
            </button>
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <button
                onClick={() => setView(view === 'login' ? 'register' : 'login')}
                disabled={isSubmitting}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isSubmitting ? '#94a3b8' : '#a855f7',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                {view === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setView('landing')}
                disabled={isSubmitting}
                style={{
                  background: 'none',
                  border: 'none',
                  color: isSubmitting ? '#94a3b8' : '#9ca3af',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (view === 'profile') {
    return (
      <div style={{ ...styles.container, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ ...styles.card, maxWidth: '400px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <User size={48} color="#a855f7" style={{ margin: '0 auto 16px' }} />
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', color: '#e5e7eb' }}>Complete Profile</h1>
            <p style={{ color: '#9ca3af' }}>Hi {user.name}! Just a few more details</p>
          </div>
          <div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#e5e7eb' }}>Age</label>
              <input
                type="number"
                value={user.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid' ,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#374151',
                  color: '#e5e7eb'
                }}
                min="1"
                max="120"
              />
              {errors.age && <ErrorMessage message={errors.age} />}
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#e5e7eb' }}>Gender</label>
              <select
                value={user.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid' ,
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s ease',
                  backgroundColor: '#374151',
                  color: '#e5e7eb'
                }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <ErrorMessage message={errors.gender} />}
            </div>
            {errors.general && <ErrorMessage message={errors.general} />}
            <button
              onClick={handleProfileSubmit}
              style={{ ...styles.button, ...styles.primaryButton, width: '100%' }}
            >
              Start Analysis
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (view === 'analysis') {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    return (
      <div style={{ ...styles.container, padding: '40px 20px' }}>
        <div style={{ ...styles.card, maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#e5e7eb' }}>Analysis</h1>
              <span style={{ fontSize: '14px', color: '#9ca3af' }}>{currentQ + 1} of {questions.length}</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#4b5563', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a855f7)', borderRadius: '4px', transition: 'width 0.5s ease', width: ${progress}% }} />
            </div>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '24px', color: '#e5e7eb' }}>{q.q}</h2>
            <div>
              {Object.entries(q.opts).map(([dosha, opt]) => (
                <label
                  key={dosha}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: '16px',
                    border: 2px solid ,
                    borderRadius: '8px',
                    marginBottom: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    backgroundColor: responses[q.id] === dosha ? '#581c87' : '#374151'
                  }}
                >
                  <input
                    type="radio"
                    name={q.id}
                    checked={responses[q.id] === dosha}
                    onChange={() => {
                      setResponses(prev => ({ ...prev, [q.id]: dosha }));
                      if (errors.question) {
                        setErrors(prev => {
                          const newErrors = { ...prev };
                          delete newErrors.question;
                          return newErrors;
                        });
                      }
                    }}
                    style={{ marginRight: '12px', marginTop: '2px' }}
                  />
                  <div>
                    <div style={{ fontWeight: '500', textTransform: 'capitalize', marginBottom: '4px', color: '#e5e7eb' }}>{dosha}</div>
                    <div style={{ fontSize: '14px', color: '#9ca3af' }}>{opt}</div>
                  </div>
                </label>
              ))}
            </div>
            {errors.question && <ErrorMessage message={errors.question} />}
            {errors.general && <ErrorMessage message={errors.general} />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={() => {
                setCurrentQ(Math.max(0, currentQ - 1));
                setErrors({});
              }}
              disabled={currentQ === 0}
              style={{
                ...styles.button,
                backgroundColor: '#374151',
                color: '#e5e7eb',
                border: '1px solid #4b5563',
                opacity: currentQ === 0 ? 0.5 : 1,
                cursor: currentQ === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              style={{ ...styles.button, ...styles.primaryButton }}
            >
              {currentQ === questions.length - 1 ? 'Get Results' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (view === 'app') {
    return (
      <div style={styles.container}>
        <div style={{ 
          ...styles.sidebar,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 100,
          display: { xs: 'none', sm: 'block' }
        }}>
          <Sidebar />
        </div>
        <div style={{ ...styles.mainContent, marginLeft: '260px' }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'diet' && <DietPage />}
          {currentPage === 'progress' && <ProgressPage />}
          {currentPage === 'recommendations' && <RecommendationsPage />}
          {currentPage === 'activity' && <ActivityPage />}
        </div>
      </div>
    );
  }
  return null;
};
export default AyurBalance;
