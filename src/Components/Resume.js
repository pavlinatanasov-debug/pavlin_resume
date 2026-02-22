import React, { Component } from "react";
import Slide from "react-reveal";

class Resume extends Component {
  getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  render() {
    if (!this.props.data) return null;

    const skillmessage = this.props.data.skillmessage;
    const education = this.props.data.education.map(function (education) {
      return (
        <div key={education.school}>
          <h3>{education.school}</h3>
          <p className="info">
            {education.degree} <span>&bull;</span>
            <em className="date">{education.graduated}</em>
          </p>
          <p>{education.description}</p>
        </div>
      );
    });

    const work = this.props.data.work.map(function (work) {
      return (
        <div key={work.company}>
          <h3>{work.company}</h3>
          <p className="info">
            {work.title}
            <span>&bull;</span> <em className="date">{work.years}</em>
          </p>
          {/* Support multi-line descriptions.
              - If `work.description` is an array, render each item as its own <p>.
              - If it's a string, split on "\n" and render each line as a paragraph. */}
          <div>
            {Array.isArray(work.description)
              ? work.description.map((line, i) => <p key={i}>{line}</p>)
              : String(work.description)
                  .split('\n')
                  .map((line, i) => <p key={i}>{line}</p>)}
          </div>
        </div>
      );
    });

    const skills = this.props.data.skills.map((skills) => {
      const backgroundColor = this.getRandomColor();
      const className = "bar-expand " + skills.name.toLowerCase();
      const width = skills.level;

      return (
        <li key={skills.name}>
          <span style={{ width, backgroundColor }} className={className}></span>
          <em>{skills.name}</em>
        </li>
      );
    });

    return (
      <section id="resume">
        <Slide left duration={1300}>
          <div className="row education">
            <div className="three columns header-col">
              <h1>
                <span>Education</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <div className="row item">
                <div className="twelve columns">{education}</div>
              </div>
            </div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div id="work" className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work</span>
              </h1>
            </div>

            <div className="nine columns main-col">{work}</div>
          </div>
        </Slide>

        <Slide left duration={1300}>
          <div id="skills" className="row skill">
            <div className="three columns header-col">
              <h1>
                <span>Skills</span>
              </h1>
            </div>

            <div className="nine columns main-col">
              <p>{skillmessage}</p>
 
              <div className="bars">
                <ul className="skills">{skills}</ul>
              </div>
              <div>

  <h4>Languages & Frontend Technologies</h4>
  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
    <li>JS / HTML / CSS</li>
    <li>ReactJS</li>
    <li>AngularJS</li>
    <li>Java</li>
    <li>Python</li>
  </ul>

  <h4>DevOps & CI/CD</h4>
  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
    <li>Jenkins</li>
    <li>GitHub Actions</li>
    <li>GitHub / Git</li>
    <li>Kubernetes</li>
    <li>Docker</li>
    <li>Grafana</li>
    <li>Bash / Shell Scripting</li>
    <li>Terraform</li>
  </ul>

  <h4>Security & Code Quality</h4>
  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
    <li>SonarQube</li>
    <li>Snyk</li>
    <li>EdgeScan</li>
  </ul>

  <h4>Monitoring & Operations</h4>
  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
    <li>Incident Management</li>
    <li>Production Support / On-Call</li>
    <li>Grafana</li>
  </ul>

  <h4>Tools & Other Technologies</h4>
  <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
    <li>AI Tools</li>
  </ul>

</div>
            </div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Resume;
