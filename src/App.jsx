
import { useState } from 'react'
import {
  LayoutDashboard, FileSearch, MessageSquare, Map,
  Settings, Bell, Search, Sparkles, ArrowUpRight,
  CheckCircle2, Clock3, Target, BriefcaseBusiness,
  Menu, X, ChevronRight, Code2, Database, Globe,
  Brain, Send, RotateCcw
} from 'lucide-react'
import './App.css'

const navigation = [
  { name: 'Overview', icon: LayoutDashboard },
  { name: 'Job Analyzer', icon: FileSearch },
  { name: 'Mock Interview', icon: MessageSquare },
  { name: 'Learning Roadmap', icon: Map },
]

const initialTasks = [
  { id: 1, title: 'Practice Python fundamentals', detail: 'Variables, loops and functions', time: '25 min', done: false },
  { id: 2, title: 'Revise OOP concepts', detail: 'Classes, inheritance and objects', time: '30 min', done: false },
  { id: 3, title: 'Understand SQL joins', detail: 'INNER, LEFT and RIGHT joins', time: '20 min', done: false },
  { id: 4, title: 'Build a React component', detail: 'Props, state and events', time: '35 min', done: false },
]

const questions = [
  {
    question: 'Can you explain the difference between a list and a tuple in Python?',
    tip: 'Mention mutability, syntax and a practical use case.',
  },
  {
    question: 'What is the purpose of a primary key in a database?',
    tip: 'Explain uniqueness and how it identifies a record.',
  },
  {
    question: 'How do HTML, CSS and JavaScript work together?',
    tip: 'Describe structure, presentation and interactivity.',
  },
]

const skills = [
  { name: 'Python', icon: Code2, level: 72 },
  { name: 'SQL & Databases', icon: Database, level: 58 },
  { name: 'Web Development', icon: Globe, level: 64 },
  { name: 'Problem Solving', icon: Brain, level: 45 },
]

function App() {
  const [page, setPage] = useState('Overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [tasks, setTasks] = useState(initialTasks)
  const [jobDescription, setJobDescription] = useState('')
  const [analysis, setAnalysis] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [interviewStarted, setInterviewStarted] = useState(false)

  const completed = tasks.filter(task => task.done).length
  const progress = Math.round((completed / tasks.length) * 100)

  function analyzeJob() {
    if (!jobDescription.trim()) {
      setAnalysis({ error: 'Paste a job description before analyzing.' })
      return
    }

    const keywords = [
      'Python', 'JavaScript', 'React', 'HTML', 'CSS', 'SQL',
      'Django', 'FastAPI', 'REST API', 'Git', 'AWS',
      'communication', 'problem solving', 'AI', 'machine learning',
    ]

    const found = keywords.filter(keyword =>
      jobDescription.toLowerCase().includes(keyword.toLowerCase())
    )

    setAnalysis({
      found,
      missing: keywords.filter(keyword => !found.includes(keyword)).slice(0, 5),
    })
  }

  function toggleTask(id) {
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  function submitAnswer() {
    if (!answer.trim()) {
      setFeedback('Write your answer first, then request feedback.')
      return
    }

    const words = answer.trim().split(/\s+/).length
    setFeedback(
      `Demo feedback: Your answer has ${words} words. ${
        words < 15
          ? 'Add more explanation and a practical example.'
          : 'Good start! Explain the concept clearly and include an example.'
      } This is basic rule-based feedback, not AI evaluation.`
    )
  }

  function nextQuestion() {
    setQuestionIndex(index => (index + 1) % questions.length)
    setAnswer('')
    setFeedback('')
  }

  function navigate(name) {
    setPage(name)
    setMenuOpen(false)
  }

  return (
    <div className="app-shell">
      {menuOpen && (
        <button className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
      )}

      <aside className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={22} /></div>
          <div>
            <div className="brand-name">PrepPilot<span> AI</span></div>
            <div className="brand-caption">YOUR CAREER COPILOT</div>
          </div>
          <button className="mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={19} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="nav-list">
          {navigation.map(item => {
            const Icon = item.icon
            return (
              <button
                key={item.name}
                className={`nav-item ${page === item.name ? 'nav-active' : ''}`}
                onClick={() => navigate(item.name)}
              >
                <Icon size={19} />
                <span>{item.name}</span>
                {item.name === 'Job Analyzer' && <span className="nav-badge">NEW</span>}
              </button>
            )
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={18} /></div>
            <strong>Your next opportunity starts here.</strong>
            <p>Small steps today. A stronger interview tomorrow.</p>
            <button onClick={() => navigate('Learning Roadmap')}>
              View my roadmap <ArrowUpRight size={15} />
            </button>
          </div>

          <button className="nav-item" onClick={() => window.alert('Settings are coming soon.')}>
            <Settings size={19} /><span>Settings</span>
          </button>

          <div className="profile">
            <div className="avatar">S</div>
            <div className="profile-info">
              <strong>My Workspace</strong>
              <span>Fresher · Job seeker</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            Workspace <ChevronRight size={15} /> <strong>{page}</strong>
          </div>

          <div className="topbar-actions">
            <div className="search-box">
              <Search size={17} />
              <input placeholder="Search your workspace..." />
            </div>
            <button className="icon-button" onClick={() => window.alert('You are all caught up!')} aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          {page === 'Overview' && (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow"><span className="status-dot" /> YOUR CAREER JOURNEY</div>
                  <h1>Good morning! <span className="wave">✦</span></h1>
                  <p className="subtitle">Build your skills. Practice with purpose. Get interview-ready.</p>
                </div>
                <button className="primary-button" onClick={() => navigate('Job Analyzer')}>
                  <Sparkles size={17} /> Analyze a job <ArrowUpRight size={16} />
                </button>
              </section>

              <section className="hero-card">
                <div className="hero-copy">
                  <span className="hero-tag"><Sparkles size={14} /> YOUR PERSONAL CAREER COPILOT</span>
                  <h2>Turn your preparation<br />into your next opportunity.</h2>
                  <p>Understand job requirements, strengthen your skills and practice answering interview questions — all in one workspace.</p>
                  <button className="hero-button" onClick={() => navigate('Mock Interview')}>
                    Start practicing <ArrowUpRight size={17} />
                  </button>
                </div>
                <div className="hero-art">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="hero-spark"><Sparkles size={42} /></div>
                  <div className="floating-card floating-top"><CheckCircle2 size={17} /><span>Skills in focus</span></div>
                  <div className="floating-card floating-bottom"><Target size={18} /><span>One step at a time</span></div>
                </div>
              </section>

              <section className="stats-grid">
                <div className="stat-card">
                  <div className="stat-top"><span>Roadmap progress</span><div className="stat-icon purple"><Map size={19} /></div></div>
                  <div className="stat-number">{progress}%</div>
                  <div className="stat-foot">Learning tasks completed</div>
                  <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>
                </div>
                <div className="stat-card">
                  <div className="stat-top"><span>Skills to explore</span><div className="stat-icon blue"><Target size={19} /></div></div>
                  <div className="stat-number">04</div>
                  <div className="stat-foot">Your current focus areas</div>
                  <div className="stat-note">Keep building consistently</div>
                </div>
                <div className="stat-card">
                  <div className="stat-top"><span>Practice questions</span><div className="stat-icon orange"><MessageSquare size={19} /></div></div>
                  <div className="stat-number">{questions.length}</div>
                  <div className="stat-foot">Available in demo interview</div>
                  <div className="stat-note">Practice at your own pace</div>
                </div>
              </section>

              <div className="content-grid">
                <section className="panel">
                  <div className="section-heading">
                    <div><h3>Today's learning plan</h3><p>Small progress adds up.</p></div>
                    <button className="text-button" onClick={() => navigate('Learning Roadmap')}>View all <ArrowUpRight size={15} /></button>
                  </div>
                  <div className="task-list">
                    {tasks.slice(0, 3).map(task => (
                      <button key={task.id} className={`task-row ${task.done ? 'task-done' : ''}`} onClick={() => toggleTask(task.id)}>
                        <span className={`task-check ${task.done ? 'checked' : ''}`}>{task.done && <CheckCircle2 size={17} />}</span>
                        <span className="task-text"><strong>{task.title}</strong><small>{task.detail}</small></span>
                        <span className="task-time"><Clock3 size={13} /> {task.time}</span>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="panel">
                  <div className="section-heading">
                    <div><h3>Skill snapshot</h3><p>Suggested areas to practice</p></div>
                    <Target size={20} className="muted-icon" />
                  </div>
                  <div className="skill-list">
                    {skills.map(skill => {
                      const Icon = skill.icon
                      return (
                        <div className="skill-row" key={skill.name}>
                          <div className="skill-label"><span className="skill-icon"><Icon size={16} /></span><strong>{skill.name}</strong><span>{skill.level}%</span></div>
                          <div className="skill-track"><span style={{ width: `${skill.level}%` }} /></div>
                        </div>
                      )
                    })}
                  </div>
                  <p className="demo-note">Illustrative demo levels — not measured assessments.</p>
                </section>
              </div>
            </>
          )}

          {page === 'Job Analyzer' && (
            <section className="feature-page">
              <div className="eyebrow"><FileSearch size={15} /> CAREER TOOLKIT</div>
              <h1>Job Description Analyzer</h1>
              <p className="subtitle">Discover technical keywords in a job description and identify what to study next.</p>
              <div className="panel analyzer-panel">
                <label htmlFor="job-description">Paste the job description</label>
                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={event => setJobDescription(event.target.value)}
                  placeholder="Paste the job requirements here... For example: Python, SQL, React, REST API, Git..."
                  rows={9}
                />
                <div className="analyzer-footer">
                  <span>{jobDescription.length} characters</span>
                  <button className="primary-button" onClick={analyzeJob}><Sparkles size={16} /> Analyze skills</button>
                </div>
              </div>

              {analysis && (
                <div className="panel results-panel">
                  {analysis.error ? <p className="error-text">{analysis.error}</p> : (
                    <>
                      <h3>Keyword analysis results</h3>
                      <p className="subtitle">These results are based on simple keyword matching.</p>
                      <h4>Keywords found ({analysis.found.length})</h4>
                      <div className="chip-list">
                        {analysis.found.length ? analysis.found.map(item => <span className="chip chip-green" key={item}>{item}</span>) : <span>No matching keywords found. Try pasting more of the job description.</span>}
                      </div>
                      <h4>Other skills to review</h4>
                      <div className="chip-list">
                        {analysis.missing.map(item => <span className="chip" key={item}>{item}</span>)}
                      </div>
                      <p className="demo-note">This prototype does not understand context or use a real AI model.</p>
                    </>
                  )}
                </div>
              )}
            </section>
          )}

          {page === 'Mock Interview' && (
            <section className="feature-page">
              <div className="eyebrow"><MessageSquare size={15} /> PRACTICE STUDIO</div>
              <h1>Mock Interview</h1>
              <p className="subtitle">Practice common entry-level technical questions at your own pace.</p>
              <div className="interview-layout">
                <div className="panel interview-panel">
                  <div className="question-counter">QUESTION {questionIndex + 1} OF {questions.length}</div>
                  <div className="question-icon"><MessageSquare size={23} /></div>
                  <h2>{questions[questionIndex].question}</h2>
                  <div className="tip-box"><Sparkles size={17} /><span><strong>Think about:</strong> {questions[questionIndex].tip}</span></div>
                  <label htmlFor="answer">Your answer</label>
                  <textarea id="answer" rows={7} value={answer} onChange={event => setAnswer(event.target.value)} placeholder="Explain your answer in your own words..." />
                  <div className="interview-actions">
                    <button className="secondary-button" onClick={() => { setAnswer(''); setFeedback('') }}><RotateCcw size={15} /> Clear</button>
                    <button className="primary-button" onClick={submitAnswer}><Send size={15} /> Get feedback</button>
                  </div>
                  {feedback && <div className="feedback-box"><strong>Practice feedback</strong><p>{feedback}</p></div>}
                  <button className="text-button next-question" onClick={nextQuestion}>Next question <ArrowUpRight size={15} /></button>
                </div>
                <div className="panel interview-side">
                  <div className="stat-icon purple"><BriefcaseBusiness size={20} /></div>
                  <h3>Practice with purpose</h3>
                  <p>Try to explain the idea clearly, then support your answer with a simple example.</p>
                  <div className="interview-tip"><CheckCircle2 size={17} /><span>Define the concept</span></div>
                  <div className="interview-tip"><CheckCircle2 size={17} /><span>Explain how it works</span></div>
                  <div className="interview-tip"><CheckCircle2 size={17} /><span>Give a real example</span></div>
                  <p className="demo-note">Feedback is rule-based demo logic, not a real AI interview evaluation.</p>
                </div>
              </div>
            </section>
          )}

          {page === 'Learning Roadmap' && (
            <section className="feature-page">
              <div className="eyebrow"><Map size={15} /> YOUR LEARNING PLAN</div>
              <h1>Learning Roadmap</h1>
              <p className="subtitle">Work through these suggested activities and track your progress.</p>
              <div className="roadmap-summary panel">
                <div><span className="muted-label">YOUR PROGRESS</span><h2>{completed} of {tasks.length} tasks complete</h2></div>
                <div className="roadmap-percent">{progress}%</div>
                <div className="roadmap-track"><span style={{ width: `${progress}%` }} /></div>
              </div>
              <div className="panel roadmap-list">
                {tasks.map((task, index) => (
                  <div className={`roadmap-task ${task.done ? 'task-done' : ''}`} key={task.id}>
                    <div className="roadmap-step">{task.done ? <CheckCircle2 size={20} /> : `0${index + 1}`}</div>
                    <div className="roadmap-task-info"><h3>{task.title}</h3><p>{task.detail}</p><span><Clock3 size={13} /> {task.time}</span></div>
                    <button className={task.done ? 'secondary-button' : 'primary-button'} onClick={() => toggleTask(task.id)}>
                      {task.done ? 'Completed' : 'Mark complete'}
                    </button>
                  </div>
                ))}
              </div>
              <p className="demo-note">This is a sample roadmap. Customize it to match your target job description.</p>
            </section>
          )}
        </div>

        <footer className="footer">
          <span>© 2026 PrepPilot AI</span>
          <span>Built for your next career step <Sparkles size={13} /></span>
        </footer>
      </main>
    </div>
  )
}

export default App
