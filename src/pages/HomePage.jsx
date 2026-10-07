import { useResumeBuilder } from '../hooks/useResumeBuilder.js';
import SiteHeader from '../components/layout/SiteHeader.jsx';
import Icon from '../components/ui/Icon.jsx';
import ResumeDocument from '../components/resume/ResumeDocument.jsx';
import { templates } from '../data/resume.js';
export default function HomePage() {
const { start, setMode, resume } = useResumeBuilder();
const preview = <ResumeDocument resume={resume} templateClass={resume.template.toLowerCase()} />;
return <div className="site-shell mx-auto w-full max-w-[1440px] overflow-hidden bg-paper">
      <SiteHeader start={start} />
      <main>
        <section className="hero-section grid grid-cols-2 items-center max-[760px]:flex max-[760px]:flex-col max-[760px]:items-stretch">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> A calmer way to get hired
            </div>
            <h1>
              Build a resume
              <br />
              worth <i>sending.</i>
            </h1>
            <p className="hero-sub">
              Thoughtful templates, helpful writing tools, and a live preview.
              Everything you need to make your next move feel a little easier.
            </p>
            <div className="hero-ctas">
              <button
                className="button primary large focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                onClick={start}
              >
                Create my resume <Icon name="arrow" />
              </button>
              <button
                className="button text-button"
                onClick={() => setMode("templates")}
              >
                Explore templates <Icon name="arrow" />
              </button>
            </div>
            <div className="hero-note">
              <span className="note-check">
                <Icon name="check" size={12} />
              </span>{" "}
              Free to start <span className="note-sep">·</span> No account
              needed
            </div>
          </div>
          <div className="hero-art">
            <div className="art-caption">
              <span className="live-dot" /> YOUR NEXT CHAPTER, ON PAPER
            </div>
            <div className="art-paper">{preview}</div>
            <div className="suggestion-card">
              <span className="suggestion-icon">
                <Icon name="spark" />
              </span>
              <span>
                <b>A little more clarity</b>
                <small>Summary reads beautifully.</small>
              </span>
              <Icon name="check" />
            </div>
            <div className="art-index">
              01 <span /> 03
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <span>MADE FOR THE MOMENT THAT MATTERS</span>
          <div>
            Less formatting <b>·</b> More confidence <b>·</b> Your story,
            clearly told
          </div>
        </section>
        <section className="benefits">
          <div className="section-intro">
            <div className="eyebrow">A BETTER WAY TO BEGIN</div>
            <h2>
              All the right things.
              <br />
              <i>None of the busywork.</i>
            </h2>
          </div>
          <div className="benefit-grid">
            <article>
              <div className="benefit-no">01</div>
              <h3>Find the right words</h3>
              <p>
                Shape your experience into clear, confident writing with a
                little help when you need it.
              </p>
              <span className="benefit-symbol"><Icon name="type" size={22} /></span>
            </article>
            <article>
              <div className="benefit-no">02</div>
              <h3>Look the part</h3>
              <p>
                Choose from thoughtfully designed templates that keep your story
                easy to read.
              </p>
              <span className="benefit-symbol"><Icon name="file" size={22} /></span>
            </article>
            <article>
              <div className="benefit-no">03</div>
              <h3>See it take shape</h3>
              <p>
                Your resume updates as you write, so you can focus on what
                matters most.
              </p>
              <span className="benefit-symbol"><Icon name="arrowUpRight" size={22} /></span>
            </article>
          </div>
        </section>
        <section className="template-feature">
          <div className="feature-copy">
            <div className="eyebrow">SEVEN WAYS TO SHOW UP</div>
            <h2>
              There’s a layout
              <br />
              for <i>your kind of work.</i>
            </h2>
            <p>
              From a first role to your next big step, start with a layout that
              lets your experience speak for itself.
            </p>
            <button
              className="button dark-button"
              onClick={() => setMode("templates")}
            >
              Meet the templates <Icon name="arrow" />
            </button>
          </div>
          <div className="template-preview-row">
            {templates.slice(0, 3).map(([name]) => (
              <button key={name} onClick={() => setMode("templates")}>
                <div className={`mini-page mini-${name.toLowerCase()}`}>
                  <span />
                  <span />
                  <span />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <b>{name}</b>
              </button>
            ))}
          </div>
        </section>
        <section className="closing-cta">
          <div>
            <span className="eyebrow">ONE GOOD PAGE CAN CHANGE A LOT</span>
            <h2>
              Your experience deserves
              <br />
              to be <i>seen.</i>
            </h2>
          </div>
          <button className="button primary large" onClick={start}>
            Start your resume <Icon name="arrow" />
          </button>
        </section>
      </main>
      <footer>
        <button className="brand">
          <span className="brand-mark">R</span> ResumeForge
        </button>
        <span>Build a resume worth sending.</span>
        <span>© 2026 ResumeForge</span>
      </footer>
      
    </div>;
}
