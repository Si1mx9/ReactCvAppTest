# CV Builder

A multi-step CV (Curriculum Vitae) builder web application built with React. Users fill in their details across 6 steps, see a live preview, and can export or print the result.

## Features

- **6-Step Wizard**: Personal Info → Summary → Education → Work Experience → Skills → Preview
- **Form Validation**: Email, phone, URL, and required field validation
- **Input Sanitization**: XSS protection via DOMPurify
- **Auto-Save**: All data persists to localStorage automatically
- **Photo Upload**: Profile photo with preview (max 2MB)
- **Export / Import**: Download CV data as JSON, or upload a previously exported file
- **Print / PDF**: Browser-native print with a dedicated print stylesheet
- **Toast Notifications**: Success/error/info feedback on actions
- **Dark Theme**: Glassmorphism UI with purple/cyan/pink accents
- **Responsive**: Adapts to mobile screens

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 7 | Build tool & dev server |
| SWC | Fast refresh via `@vitejs/plugin-react-swc` |
| DOMPurify | XSS sanitization |
| CSS3 | All styling (custom properties, flexbox, grid, animations) |
| localStorage | Client-side persistence |

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on all source files |

## Project Structure

```
src/
├── main.jsx                 # React entry point
├── App.jsx                  # Root component (wizard logic + state)
├── App.css                  # Wizard layout & navigation styles
├── components/
│   ├── Header.jsx           # App header with Import button
│   ├── StepIndicator.jsx    # Visual step progress dots
│   ├── PersonalInfo.jsx     # Step 0: personal details form
│   ├── Summary.jsx          # Step 1: professional summary
│   ├── Education.jsx        # Step 2: education entries
│   ├── Experience.jsx       # Step 3: work experience entries
│   ├── Skills.jsx           # Step 4: skills with proficiency
│   ├── PhotoUpload.jsx      # Profile photo upload
│   ├── CVPreview.jsx        # Step 5: live CV preview + export/print
│   └── Toast.jsx            # Toast notification provider
├── hooks/
│   └── useLocalStorage.js   # localStorage read/write hook
├── utils/
│   ├── sanitize.js          # Sanitization & validation helpers
│   └── toast.js             # Imperative toast API
└── styles/
    ├── global.css           # Reset, custom properties, base styles
    ├── Header.css           # Header styles
    ├── Section.css          # Section cards, forms, buttons
    ├── CVPreview.css        # Preview & CV document styles
    ├── Toast.css            # Toast notification styles
    └── print.css            # Print-specific overrides
```

## localStorage Keys

All data is stored in the browser's localStorage with the prefix `cvapp-`:

| Key | Type | Description |
|---|---|---|
| `cvapp-step` | number | Current wizard step (0–5) |
| `cvapp-personal` | object | Name, email, phone, location, website, LinkedIn |
| `cvapp-summary` | string | Professional summary |
| `cvapp-education` | array | Education entries |
| `cvapp-experience` | array | Work experience entries |
| `cvapp-skills` | array | Skill name + proficiency pairs |
| `cvapp-photo` | string\|null | Base64 data URL of profile photo |

## License

MIT
