# CV Builder

A multi-step CV (Curriculum Vitae) builder web application built with React 19 and Vite 7. Users fill in their details across a 6-step wizard form, see a live preview of their CV, and can export or print the final result. All data is automatically saved to the browser's localStorage.

## Description

This application provides an intuitive step-by-step interface for creating professional CVs. Each step focuses on a specific section of the CV, with form validation, input sanitization, and auto-save functionality. The app features a dark glassmorphism theme with purple/cyan/pink accents and adapts to mobile screens.

### The 6-Step Wizard

| Step | Component | Description |
|------|-----------|-------------|
| 1 | **PersonalInfo** | Full name, email, phone, location, website, LinkedIn profile |
| 2 | **Summary** | Professional summary / objective text |
| 3 | **Education** | Multiple entries with school, degree, field of study, start/end dates |
| 4 | **Experience** | Multiple entries with company, position, responsibilities, start/end dates |
| 5 | **Skills** | Skill names with proficiency level selector |
| 6 | **CVPreview** | Live rendered CV preview with print/export options |

### Key Features

- **6-Step Wizard**: Navigate forward/backward through each section. A StepIndicator shows current progress.
- **Form Validation**: Email format, phone format, URL format, and required field validation with inline error messages.
- **Input Sanitization**: All text inputs are sanitized with DOMPurify to prevent XSS attacks.
- **Auto-Save to localStorage**: Every form step automatically persists its data. Refreshing the page preserves all progress.
- **Photo Upload**: Upload a profile photo (max 2MB, preview displayed). Stored as a Base64 data URL.
- **Import / Export CV Data**: Download your CV data as a JSON file, or upload a previously exported JSON file to restore your data.
- **Print / PDF**: Use the browser's native Print (Ctrl+P / Cmd+P) to generate a PDF. A dedicated print stylesheet (`print.css`) ensures clean output.
- **Toast Notifications**: Non-intrusive success, error, and info toasts provide feedback on all user actions.
- **Dark Theme**: Glassmorphism UI design with a cohesive dark color palette (purple, cyan, pink accents).
- **Fully Responsive**: Adapts to desktop, tablet, and mobile screen sizes.
- **Start Over**: Reset the wizard to step 1 at any time.

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI library with hooks-based state management |
| **Vite 7** | Build tool & dev server with fast HMR |
| **SWC** | Fast refresh via `@vitejs/plugin-react-swc` |
| **DOMPurify** | XSS sanitization for all user text input |
| **CSS3** | All styling with custom properties, flexbox, grid, and animations |
| **localStorage** | Client-side persistence via custom `useLocalStorage` hook |

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
├── main.jsx                 # React entry point (renders App)
├── App.jsx                  # Root component: wizard logic, state, navigation
├── App.css                  # Wizard layout & navigation styles
├── components/
│   ├── Header.jsx           # App header with title and Import button
│   ├── StepIndicator.jsx    # Visual step progress dots (0-5)
│   ├── PersonalInfo.jsx     # Step 1: personal details form
│   ├── Summary.jsx          # Step 2: professional summary textarea
│   ├── Education.jsx        # Step 3: education entries (add/remove)
│   ├── Experience.jsx       # Step 4: work experience entries (add/remove)
│   ├── Skills.jsx           # Step 5: skill name + proficiency dropdown
│   ├── PhotoUpload.jsx      # Profile photo upload with preview
│   ├── CVPreview.jsx        # Step 6: live CV preview + export/print buttons
│   └── Toast.jsx            # Toast notification provider component
├── hooks/
│   └── useLocalStorage.js   # Custom hook: read/write to localStorage with JSON serialization
├── utils/
│   ├── sanitize.js          # Sanitization (DOMPurify) & validation helpers
│   └── toast.js             # Imperative toast notification API
└── styles/
    ├── global.css           # CSS reset, custom properties (colors, glassmorphism), base styles
    ├── Header.css           # Header layout and branding styles
    ├── Section.css          # Section cards, form inputs, buttons, entry cards
    ├── CVPreview.css        # CV preview document styles (mirrors a print layout)
    ├── Toast.css            # Toast notification positioning and animations
    └── print.css            # Print-specific overrides for PDF/paper output
```

## How It Works

### State Management

All application state is managed via the custom `useLocalStorage` hook, which wraps React's `useState` and persists values to `localStorage` under the `cvapp-` prefix. This means:

- Data survives page refreshes and browser restarts.
- No backend or server is required.
- The current wizard step is also persisted, so users resume exactly where they left off.

### Sanitization & Security

Every text input passes through the `sanitize` utility before being stored. This uses **DOMPurify** to strip any potentially malicious HTML/JavaScript, protecting against XSS attacks when rendering user input in the CV preview.

### Export / Import

- **Export**: Serializes all CV data (personal, summary, education, experience, skills, photo) into a JSON file and triggers a browser download.
- **Import**: Reads a previously exported JSON file and restores all sections. The wizard resets to step 1 after import.

### Print / PDF

The CV preview page includes a "Print" button that triggers `window.print()`. The `print.css` stylesheet hides navigation elements, adjusts layout, and optimizes the output for A4-sized paper or PDF.

## localStorage Keys

All data is stored in the browser's localStorage with the prefix `cvapp-`:

| Key | Type | Description |
|---|---|---|
| `cvapp-step` | number | Current wizard step (0–5) |
| `cvapp-personal` | object | `{ name, email, phone, location, website, linkedin }` |
| `cvapp-summary` | string | Professional summary text |
| `cvapp-education` | array | `[{ school, degree, field, startDate, endDate }]` |
| `cvapp-experience` | array | `[{ company, position, responsibilities, startDate, endDate }]` |
| `cvapp-skills` | array | `[{ name, level }]` where `level` is 1-5 |
| `cvapp-photo` | string\|null | Base64 data URL of profile photo |

## License

MIT
