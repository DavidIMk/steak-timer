# 🥩 Steak Timer App

A fun and interactive **React + TypeScript** single-page application that helps you time your steak cooking perfectly! This project is built with **Vite** for fast development and uses **Tailwind CSS** for styling. It also comes with testing support using **Vitest** and **React Testing Library**.

## ✨ Features

- **User-Friendly Timer:**  
  Input your desired steak cut, doneness level, and thickness (in cm) to automatically calculate the ideal cooking time.

- **Dynamic Steak Visualization:**  
  A gradient square visualizes the steak's doneness transition from red/pink (raw) to brown (cooked) from the top and bottom.

- **Interactive Controls:**  
  - **Start Timer:** Begin the cooking countdown.
  - **Pause/Resume:** Pause or resume the timer.
  - **Stop:** Cancel the timer and reset inputs.
  - The app automatically displays prompts to "Flip Your Steak Now" at the halfway mark, and shows a finished message when done.

- **Responsive Design:**  
  Optimized for mobile with vertically aligned dropdowns.

- **Strong Type Safety:**  
  Uses TypeScript with custom enums for `Doneness` and `Cut`.

- **Testing:**  
  Comprehensive tests written with Vitest and React Testing Library ensure the app behaves as expected.

## 🛠️ Tech Stack

- **Frontend Framework:** [React](https://reactjs.org/)  
- **Language:** [TypeScript](https://www.typescriptlang.org/)  
- **Build Tool:** [Vite](https://vitejs.dev/)  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- **Animation:** [Framer Motion](https://www.framer.com/motion/)  
- **Testing:** [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [Jest DOM](https://github.com/testing-library/jest-dom)

## 🚀 Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/steak-timer-app.git
cd steak-timer-app
```

### 2️. Install Dependencies
```sh
npm install
```

### 3. Run the Project
```sh
npm run dev
```

### 4. Running Tests
```sh
npm run test
```

## 🎨 How It Works

### User Inputs:
- **Cut:** Choose between Ribeye, Sirloin, or Tenderloin.
- **Thickness:** Select from 1 to 5 cm (automatically converted to inches for calculations).
- **Doneness:** Select from rare, medium rare, medium, medium well, or well done.

### Timer Calculation:
- Cooking times are determined based on the chosen cut, doneness, and thickness.
- The app uses these parameters to compute a total time and starts a countdown.

### Visual Feedback:
- A rotating clock needle (animated with Framer Motion) shows the timer progress.
- A dynamic gradient square visualizes the steak's cooking state, gradually shifting from red/pink (raw) to brown (cooked) from the top and bottom.
- At halfway, a "Flip Your Steak Now" message appears, and a finished message is shown when the timer ends.

### Controls:
- During the timer, the dropdowns are disabled.
- Users can pause, resume, or stop the timer.

## 🔖 Screeenshots
![Steak Timer](https://github.com/davidimk/steak-timer/blob/main/src/assets/screenshot.png?raw=true)

## 🌟 Contributing
Feel free to fork this repo and submit pull requests!
