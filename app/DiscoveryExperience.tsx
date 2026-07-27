"use client";

import { useEffect, useRef, useState } from "react";

const INTRO_STAGE_DURATION = 7000;

const introBeats = [
  {
    eyebrow: "ACCESS CHANGES EVERYTHING",
    title: "What if every speed limit disappeared?",
    copy: "A delivery company replaces every van with a Formula-style race car.",
    image: "assets/race-car-start-v2.png",
    alt: "A delivery driver holding a package beside an unexpectedly powerful Formula-style race car, with traditional delivery trucks behind him",
  },
  {
    eyebrow: "POWER ARRIVES FIRST",
    title: "Every driver gets one hour of training.",
    copy: "The company hires a legendary champion to train their drivers. The employees are confident that they are ready.",
    image: "assets/race-car-classroom-v2.webp",
    alt: "A diverse class of delivery drivers with helmets on their desks learning from a legendary racing champion",
  },
  {
    eyebrow: "THE HUMAN GAP",
    title:
      "A few deliver faster. Unprepared for that much power, most will crash.",
    copy: "This is how adopting AI is impacting most organizations.",
    image: "assets/race-car-crashes.webp",
    alt: "Formula-style cars crashed along a city street while one car crosses a distant intersection",
  },
  {
    eyebrow: "RIDE-ALONG INTELLIGENCE",
    title: "HermanScience rides with your workforce.",
    copy: "Hyper-personalized guidance helps every employee learn to direct AI while doing real work.",
    image: "assets/race-car-finish-v5.png",
    alt: "An employee driving a tandem Formula-style car with a guide riding behind",
  },
];

const products = [
  {
    name: "HermanCQI",
    label: "UNDERSTAND",
    description:
      "Builds a behavioral intelligence layer around how a person thinks, communicates, learns, and works.",
  },
  {
    name: "HermanTransform",
    label: "TRANSLATE",
    description:
      "Preserves human intent while rendering instructions in a structure the AI can use more effectively.",
  },
  {
    name: "HermanAgents",
    label: "OPERATIONALIZE",
    description:
      "Turns repeatable work into guided, reusable agents without asking every employee to become an AI engineer.",
  },
];

const research = [
  {
    value: "72.8%",
    label: "maximum observed recoverable lift",
    detail:
      "Observed in a recommendation experiment: 7.70 versus 4.45.",
  },
  {
    value: "1,890",
    label: "personality-authored runs",
    detail: "Analyzed in the controlled token-utilization study.",
  },
  {
    value: "12.8%",
    label: "conservative token-savings estimate",
    detail: "Quality-guarded estimate; 95% CI of 9.7% to 15.8%.",
  },
];

export function DiscoveryExperience() {
  const [introOpen, setIntroOpen] = useState(true);
  const [introStage, setIntroStage] = useState(0);
  const [introTimerReset, setIntroTimerReset] = useState(0);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoEnded, setDemoEnded] = useState(false);
  const demoVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!introOpen) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      return;
    }

    const stageTimer = window.setTimeout(() => {
      if (introStage < introBeats.length - 1) {
        setIntroStage((current) => current + 1);
      } else {
        setIntroOpen(false);
      }
    }, INTRO_STAGE_DURATION);

    return () => window.clearTimeout(stageTimer);
  }, [introOpen, introStage, introTimerReset]);

  useEffect(() => {
    if (!demoOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        demoVideoRef.current?.pause();
        setDemoOpen(false);
        setDemoEnded(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [demoOpen]);

  const closeIntro = () => setIntroOpen(false);
  const showIntroStage = (stage: number) => {
    setIntroStage(stage);
    setIntroTimerReset((current) => current + 1);
  };
  const replayIntro = () => {
    setIntroStage(0);
    setIntroTimerReset((current) => current + 1);
    setIntroOpen(true);
  };
  const openDemo = () => {
    setDemoEnded(false);
    setDemoOpen(true);
  };
  const closeDemo = () => {
    demoVideoRef.current?.pause();
    setDemoOpen(false);
    setDemoEnded(false);
  };
  const replayDemo = () => {
    const video = demoVideoRef.current;

    if (!video) {
      return;
    }

    setDemoEnded(false);
    video.currentTime = 0;
    void video.play();
  };

  return (
    <>
      {introOpen && (
        <section className="cinema" aria-label="HermanScience opening story">
          {introBeats.map((beat, index) => (
            <img
              key={beat.image}
              className={`cinema-image ${
                introStage === index ? "is-visible" : ""
              }`}
              src={beat.image}
              alt={beat.alt}
            />
          ))}
          <div className="cinema-overlay" />
          <div className="cinema-grid" aria-hidden="true" />
          <button className="cinema-skip" onClick={closeIntro}>
            Skip opening
          </button>
          <div
            className="cinema-copy"
            key={introStage}
            aria-live="polite"
          >
            <span>{introBeats[introStage].eyebrow}</span>
            <h1
              className={
                introStage === 0
                  ? "cinema-opening-question"
                  : introStage === 2
                    ? "cinema-crash-headline"
                    : undefined
              }
              aria-label={
                introStage === 0 || introStage === 2
                  ? introBeats[introStage].title
                  : undefined
              }
            >
              {introStage === 0 ? (
                <>
                  <span>What if every</span>
                  <span className="cinema-title-accent">speed limit</span>
                  <span>disappeared?</span>
                </>
              ) : introStage === 2 ? (
                <>
                  <span>A few deliver faster.</span>
                  <span>Unprepared for</span>
                  <span>that much power,</span>
                  <span>
                    most will <strong>crash</strong>.
                  </span>
                </>
              ) : (
                introBeats[introStage].title
              )}
            </h1>
            <p>{introBeats[introStage].copy}</p>
            <nav
              className="cinema-progress"
              aria-label="Opening story slides"
            >
              {introBeats.map((beat, index) => (
                <button
                  type="button"
                  key={beat.eyebrow}
                  className={
                    index === introStage
                      ? "active"
                      : index < introStage
                        ? "complete"
                        : ""
                  }
                  aria-current={index === introStage ? "step" : undefined}
                  aria-label={`Show slide ${index + 1}: ${beat.eyebrow}`}
                  onClick={() => showIntroStage(index)}
                />
              ))}
            </nav>
            {introStage === introBeats.length - 1 && (
              <button className="button button-primary" onClick={closeIntro}>
                Explore HermanScience
              </button>
            )}
          </div>
        </section>
      )}

      {demoOpen && (
        <div
          className="demo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-lightbox-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDemo();
            }
          }}
        >
          <div className="demo-lightbox-panel">
            <div className="demo-lightbox-header">
              <div>
                <span>HERMANENGAGE</span>
                <h2 id="demo-lightbox-title">See personalized engagement in action.</h2>
              </div>
              <button
                className="demo-lightbox-close"
                type="button"
                aria-label="Close demo"
                onClick={closeDemo}
                autoFocus
              >
                ×
              </button>
            </div>
            <div className="demo-video-frame">
              <video
                ref={demoVideoRef}
                src="media/hermanengage-demo-720p.mp4"
                controls
                autoPlay
                playsInline
                preload="metadata"
                onEnded={() => setDemoEnded(true)}
              >
                Your browser does not support embedded video.
              </video>
              {demoEnded && (
                <div className="demo-complete">
                  <span>DEMO COMPLETE</span>
                  <h3>Want to see it again?</h3>
                  <div>
                    <button
                      className="button button-primary"
                      type="button"
                      onClick={replayDemo}
                    >
                      Replay video
                    </button>
                    <button
                      className="button button-secondary"
                      type="button"
                      onClick={closeDemo}
                    >
                      Return to site
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <main>
        <header className="site-header">
          <a className="brand" href="#top" aria-label="HermanScience home">
            <img src="assets/hermanscience-logo.png" alt="HermanScience" />
          </a>
          <nav aria-label="Primary navigation">
            <a href="#approach">Approach</a>
            <a href="#evidence">Evidence</a>
            <a href="#experiences">Explore</a>
            <button className="nav-replay" onClick={replayIntro}>
              Replay opening
            </button>
            <a className="nav-cta" href="#engage">
              HermanEngage
            </a>
          </nav>
        </header>

        <section className="hero" id="top">
          <img
            className="hero-background"
            src="assets/race-car-finish-v5.png"
            alt=""
            aria-hidden="true"
          />
          <div className="hero-scrim" />
          <div className="hero-content">
            <span className="kicker">HUMAN–AI INTERACTION INTELLIGENCE</span>
            <h1>
              Don’t just give your workforce a faster car.
              <em> Teach them how to drive it.</em>
            </h1>
            <p>
              HermanScience personalizes the way people communicate with AI—so
              extraordinary capability becomes better work, not more rework.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#approach">
                See how it works
              </a>
              <a
                className="button button-secondary"
                href="https://hermancoach.hermanscience.com/"
                target="_blank"
                rel="noreferrer"
              >
                Try the Prompt Challenge
              </a>
            </div>
          </div>
          <div className="hero-note">
            <span>THE RIDE-ALONG MODEL</span>
            <p>
              The employee drives. HermanScience understands the driver,
              translates intent, and provides guidance in the moment.
            </p>
          </div>
        </section>

        <section className="thesis section" id="approach">
          <div className="section-number">01</div>
          <div className="section-heading">
            <span className="kicker">THE MISSING LAYER</span>
            <h2>AI learned our language. It didn’t learn each of us.</h2>
          </div>
          <div className="thesis-body">
            <p className="lead">
              Models are powerful. The human interface is still generic. People
              are from Earth. AI is from Saturn. Different people frame goals,
              uncertainty, context, and risk in different ways—and the model
              responds differently.
            </p>
            <p>
              HermanScience adds a behavioral translation layer between people
              and LLMs. It helps preserve what the person means while making the
              instruction clearer, more complete, and better aligned to the
              work.
            </p>
          </div>
        </section>

        <section className="process section">
          <div className="process-line" aria-hidden="true" />
          {[
            [
              "01",
              "Understand the driver",
              "Use HermanCQI—a patent-pending, visual, neuroscience-informed online assessment—to understand how each driver thinks.",
            ],
            ["02", "Read the road", "Recognize the task, context, constraints, and risk before the model acts."],
            ["03", "Translate intent", "Render a task-aligned instruction without replacing the person’s objective."],
            [
              "04",
              "Coach in motion",
              "Help employees build trust in AI and become more effective—expanding what they can accomplish while completing real work.",
            ],
          ].map(([number, title, copy]) => (
            <article className="process-step" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </section>

        <section className="evidence section" id="evidence">
          <div className="evidence-intro">
            <span className="kicker">CONTROLLED RESEARCH</span>
            <h2>Prompting style changes both quality and efficiency.</h2>
            <p>
              HermanScience experiments held task content and output structure
              constant while varying personality-authored request style. The
              findings show substantial differences—and a compelling
              opportunity to improve alignment.
            </p>
            <a className="text-link" href="#research">
              Read the methodology and limitations <span>↘</span>
            </a>
          </div>
          <div className="evidence-results">
            <div className="metric-grid">
              {research.map((item) => (
                <article className="metric" key={item.value}>
                  <strong>{item.value}</strong>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <aside className="evidence-example">
              <p>
                A typical marketing manager using AI for 15 hours a week could
                become <strong>35% more productive</strong>, use{" "}
                <strong>14% fewer tokens</strong>.
              </p>
              <a
                className="button evidence-example-cta"
                href="https://gtmnow.github.io/hermanscience-prompt-cqi-roi-calculator/"
                target="_blank"
                rel="noreferrer"
              >
                Calculate your AI ROI ↗
              </a>
            </aside>
          </div>
          <p className="evidence-note">
            Experimental results describe the tested conditions; they are not
            universal performance guarantees.
          </p>
        </section>

        <section className="intelligence section">
          <div className="section-heading">
            <span className="kicker">FROM INSIGHT TO ACTION</span>
            <h2>One intelligence layer. Multiple ways to apply it.</h2>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <span>{product.label}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="engage section" id="engage">
          <div className="engage-copy">
            <span className="status status-coming">COMING SOON</span>
            <span className="status">PRIVATE PREVIEW</span>
            <span className="kicker">HERMANENGAGE</span>
            <h2>Personalization that reaches beyond the prompt.</h2>
            <p>
              HermanEngage combines contact and organization intelligence with
              task-aware generation to create communications shaped for the
              people receiving them—not just the person writing them.
            </p>
            <ul>
              <li>Build richer contact and account context</li>
              <li>Personalize messages and content for the audience</li>
              <li>Turn engagement intelligence into repeatable workflows</li>
            </ul>
            <div className="engage-actions">
              <button
                className="button button-secondary"
                type="button"
                onClick={openDemo}
              >
                View the demo
              </button>
              <a
                className="button button-primary"
                href="mailto:admin@hermanscience.com?subject=HermanEngage%20private%20preview"
              >
                Request preview access
              </a>
            </div>
          </div>
          <div className="engage-visual" aria-label="Personalization flow">
            <div className="profile-orbit">
              <span>CONTACT</span>
              <span>COMPANY</span>
              <span>CONTEXT</span>
              <span>INTENT</span>
              <strong>ENGAGE</strong>
            </div>
            <div className="message-preview">
              <span>PERSONALIZED OUTPUT</span>
              <i />
              <i />
              <i />
              <i className="short" />
            </div>
          </div>
        </section>

        <section className="experiences section" id="experiences">
          <div className="section-heading">
            <span className="kicker">EXPERIENCE THE THESIS</span>
            <h2>Don’t take our word for it. Try the ideas.</h2>
          </div>
          <div className="experience-grid">
            <a
              className="experience-card challenge"
              href="https://hermancoach.hermanscience.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>01 / INTERACTIVE</span>
              <h3>How strong is your prompt?</h3>
              <p>
                Enter an original prompt, receive an immediate score, and see
                which ingredients are missing.
              </p>
              <strong>Take the Prompt Challenge ↗</strong>
            </a>
            <a
              className="experience-card calculator"
              href="https://gtmnow.github.io/hermanscience-prompt-cqi-roi-calculator/"
              target="_blank"
              rel="noreferrer"
            >
              <span>02 / CALCULATOR</span>
              <h3>What could better alignment be worth?</h3>
              <p>
                Explore the modeled value of prompt-quality improvement by
                role, personality, AI usage, and task mix.
              </p>
              <strong>Open the ROI Calculator ↗</strong>
            </a>
          </div>
        </section>

        <section className="research section" id="research">
          <div className="research-intro">
            <span className="kicker">OPEN THE EVIDENCE</span>
            <h2>Explore the experiments behind the platform thesis.</h2>
            <p>
              These reports describe the controlled methods, findings,
              limitations, and product implications behind the numbers used on
              this site.
            </p>
          </div>
          <article className="paper">
            <span>RESPONSE QUALITY · 19 PAGES</span>
            <h3>Isolating the Effect of Human Personality on LLM Response Quality</h3>
            <p>
              Tests whether personality-driven prompt authorship changes output
              quality when the underlying task and output contract are held
              constant.
            </p>
            <a href="research/llm-prompt-quality-report.pdf" target="_blank">
              Read the full report ↗
            </a>
          </article>
          <article className="paper">
            <span>TOKEN ECONOMICS · 14 PAGES</span>
            <h3>Measuring the Effect of Human Personality on LLM Token Consumption</h3>
            <p>
              Examines token use, output quality, and quality-guarded
              optimization across personality-authored prompt styles.
            </p>
            <a href="research/llm-token-consumption-report.pdf" target="_blank">
              Read the full report ↗
            </a>
          </article>
        </section>

        <section className="closing section">
          <span className="kicker">THE FINISH LINE IS PROFICIENCY</span>
          <h2>Give people the power of AI—and the intelligence to use it.</h2>
          <div>
            <a
              className="button button-primary"
              href="mailto:admin@hermanscience.com?subject=Explore%20HermanScience"
            >
              Start a conversation
            </a>
            <button
              className="button button-secondary"
              onClick={() => {
                setIntroStage(0);
                setIntroOpen(true);
              }}
            >
              Replay the opening
            </button>
            <a
              className="button button-secondary"
              href="https://hermanscience.com/"
              target="_blank"
              rel="noreferrer"
            >
              Visit HermanScience.com
            </a>
          </div>
        </section>

        <footer>
          <img src="assets/hermanscience-logo.png" alt="HermanScience" />
          <p>Human intelligence for better AI performance.</p>
          <span>© 2026 HermanScience</span>
        </footer>
      </main>
    </>
  );
}
