import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [history, setHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("main");

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const newAnswer = response.data.candidates[0].content.parts[0].text;
      setAnswer(newAnswer);
      setHistory([...history, { question, answer: newAnswer }]);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  function generateDeveloperSocials() {
    const socials = [
      { link: "https://twitter.com/PrabeshPaudell", icon: "fab fa-twitter" },
      { link: "https://github.com/virtualprabesh", icon: "fab fa-github" },
      { link: "https://www.linkedin.com/in/prabesh-paudel-42b690252/", icon: "fab fa-linkedin" },
      { link: "https://www.facebook.com/https.prabesh/", icon: "fab fa-facebook" },
    ];

    return socials.map((social, index) => (
      <a key={index} href={social.link} target="_blank" rel="noopener noreferrer" className="social-link">
        <i className={social.icon}></i>
      </a>
    ));
  }

  return (
    <div className="app-container">
      <div className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
        &#9776; {/* Hamburger icon */}
      </div>
      {sidebarOpen && (
        <div className="sidebar">
          <button className="sidebar-item" onClick={() => setActiveComponent("main")}>
            Prabhu AI 
          </button>
          <button className="sidebar-item" onClick={() => setActiveComponent("history")}>
            History
          </button>
          <button className="sidebar-item" onClick={() => setActiveComponent("developerSocials")}>
            Developer's Socials
          </button>
          <button className="sidebar-item" onClick={() => setActiveComponent("aboutDeveloper")}>
            About Developer
          </button>
        </div>
      )}
      <div className="content-wrapper">
        <div className="header">
          <a href="https://github.com/virtualprabesh" target="_blank" className="header-link">
            <img src="/helloicon.png" alt="Profile Icon" className="profile-icon" />
            <h1 className="header-title">Prabhu <span className="gradient-text">AI</span></h1>
          </a>
          <span className="version">@prabesh.paudell </span>
        </div>
        {activeComponent === "main" && (
          <>
            <form onSubmit={generateAnswer} className="form-container">
              <textarea
                required
                className="question-input"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything to PrabhuAI"
              ></textarea>
              <button
                type="submit"
                className="submit-button"
                disabled={generatingAnswer}
              >
                {generatingAnswer ? "Generating..." : "Generate answer"}
              </button>
            </form>
            <div className="answer-container">
              <ReactMarkdown className="answer-markdown">{answer}</ReactMarkdown>
            </div>
          </>
        )}
        {activeComponent === "history" && (
          <div className="history-container">
            <h2 className="history-title">Chat History</h2>
            {history.map((entry, index) => (
              <div key={index} className="history-entry">
                <p className="history-question"><strong>Q:</strong> {entry.question}</p>
                <p className="history-answer"><strong>A:</strong> <ReactMarkdown>{entry.answer}</ReactMarkdown></p>
              </div>
            ))}
          </div>
        )}
        {activeComponent === "developerSocials" && (
          <div className="socials-container">
            <h2 className="socials-title">Developer's Socials</h2>
            <div className="social-links">
              {generateDeveloperSocials()}
            </div>
          </div>
        )}
        {activeComponent === "aboutDeveloper" && (
          <div className="about-developer-container">
            <h2 className="about-developer-title">About Developer</h2>
            <p className="about-developer-text">
            There is nothing you need to know about the developer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Add CSS styles within the same file
const styles = `
  .app-container {
    background: linear-gradient(to right, #d9a7c7, #fffcdc);
    min-height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .sidebar-toggle {
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 10;
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, #8b5e3c, #d3a87c);
    width: 18rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 4rem;
    z-index: 5;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  }

  .sidebar-item {
    background: none;
    color: #fff;
    border: none;
    padding: 1rem;
    text-align: left;
    font-size: 1.25rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .sidebar-item:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  .content-wrapper {
    max-width: 48rem;
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
    background-color: #ffffff;
    border-radius: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .header-link {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .profile-icon {
    width: 4rem;
    height: 4rem;
    border-radius: 9999px;
    margin-right: 0.75rem;
  }

  .header-title {
    font-size: 2.25rem;
    font-weight: 700;
    color: #5a3e36;
    font-family: 'Arial', sans-serif;
    position: relative;
  }

  .header-title .gradient-text {
    background: linear-gradient(to right, #f5af19, #f12711);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .version {
    font-size: 1rem;
    font-weight: 500;
    color: #8b5e3c;
    margin-top: 0.5rem;
  }

  .version strong {
    font-weight: bold;
    background: linear-gradient(to right, #f5af19, #f12711);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .form-container {
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 1rem;
    width: 100%;
  }

  .question-input {
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
    height: 10rem;
    margin-top: 0.5rem;
    padding: 0.75rem;
    resize: none;
    outline: none;
    font-size: 1rem;
    font-family: 'Arial', sans-serif;
  }

  .question-input:focus {
    ring: 2;
    ring-color: #8b5e3c;
  }

  .submit-button {
    background-color: #8b5e3c;
    color: #ffffff;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    font-size: 1rem;
    font-family: 'Arial', sans-serif;
    margin-top: 0.5rem;
    width: 100%;
    cursor: pointer;
  }

  .submit-button:hover {
    background-color: #744a30;
  }

  .submit-button:disabled {
    background-color: #c8a67e;
    cursor: not-allowed;
  }

  .answer-container {
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    margin-top: 1rem;
    padding: 1rem;
    width: 100%;
  }

  .answer-markdown {
    max-width: none;
    font-size: 1.25rem;
  }

  .history-container {
    margin-top: 2rem;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 1rem;
    width: 100%;
  }

  .history-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5a3e36;
    margin-bottom: 1rem;
    font-family: 'Arial', sans-serif;
  }

  .history-entry {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  .history-entry:last-child {
    border-bottom: none;
  }

  .history-question, .history-answer {
    font-size: 1rem;
    color: #333;
    font-family: 'Arial', sans-serif;
  }

  .socials-container {
    margin-top: 2rem;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    width: 100%;
  }

  .socials-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5a3e36;
    margin-bottom: 1rem;
    font-family: 'Arial', sans-serif;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .social-link {
    display: inline-block;
    font-size: 2rem;
    color: #8b5e3c;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .social-link:hover {
    color: #5a3e36;
  }

  .about-developer-container {
    margin-top: 2rem;
    background-color: #ffffff;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 1rem;
    width: 100%;
  }

  .about-developer-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #5a3e36;
    margin-bottom: 1rem;
    font-family: 'Arial', sans-serif;
  }

  .about-developer-text {
    font-size: 1rem;
    color: #333;
    font-family: 'Arial', sans-serif;
  }

  @media (max-width: 768px) {
    .profile-icon {
      width: 3rem;
      height: 3rem;
    }

    .header-title {
      font-size: 1.75rem;
    }

    .question-input {
      height: 8rem;
    }

    .answer-markdown {
      font-size: 1rem;
    }

    .history-title {
      font-size: 1.25rem;
    }

    .history-question, .history-answer {
      font-size: 0.875rem;
    }

    .sidebar {
      width: 15rem;
    }

    .sidebar-item {
      font-size: 1rem;
    }

    .social-link {
      font-size: 1.5rem;
    }
  }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
