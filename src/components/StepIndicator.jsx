const STEPS = [
  { id: 0, label: 'Personal',  icon: '👤' },
  { id: 1, label: 'Summary',   icon: '✍️' },
  { id: 2, label: 'Education', icon: '🎓' },
  { id: 3, label: 'Experience',icon: '💼' },
  { id: 4, label: 'Skills',    icon: '⚡' },
  { id: 5, label: 'Preview',   icon: '📄' },
];

export default function StepIndicator({ current }) {
  return (
    <nav className="step-indicator" aria-label="Form steps">
      {STEPS.map((step, i) => (
        <div key={step.id} className="step-item">
          <div className="step-dot-col">
            <div
              className={`step-dot ${i < current ? 'done' : i === current ? 'active' : 'pending'}`}
              aria-current={i === current ? 'step' : undefined}
            >
              {i < current ? '✓' : step.icon}
            </div>
            <span className={`step-label${i === current ? ' active-label' : ''}`}>
              {step.label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className="step-line-wrapper">
              <div className={`step-line${i < current ? ' done' : ''}`} />
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
