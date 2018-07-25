import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about_main">
      <div className="about_title">
        About re<span className="restay">ST</span>ay
      </div>
      <div className="text_box">
        <div className="para">
          Hello and thank you for visiting reSTay, an app which allows
          homeowners to list their properties for rent, and users to browse
          these properties (homes, apartments) as they make plans about upcoming
          trips.
        </div>
        <div className="para">
          While reSTay is fully functional without logging, logged-in users will
          experience all of the features fully. All you need is a Gmail account;
          no other information will be asked of you.{" "}
        </div>
        <div className="para">
          reSTay is a full-stack web app, built using the following
          technologies:
          <div>
            <li>React front-end</li>
            <li>Redux state management</li>
            <li>Node.js/Express for backend server-side functions</li>
            <li>PostgreSQL/Massive for database queries and connection</li>
            <li>Moment.js</li>
            <li>CSS</li>
            <li>Firebase for image uploadingstorage</li>
            <li>Google Maps API</li>
          </div>
        </div>
        <div className="para">
          <div>Contact information:</div>
          <div>Jonathan Waller</div>
          <div>email: waller.j27@gmail.com</div>
          <div>
            LinkedIn:{" "}
            <a href="https://www.linkedin.com/in/jonathan-waller-37302733">
              <span className="about_click">Link</span>
            </a>
          </div>
          <div>
            GitHub:{" "}
            <a href="https://github.com/JonathanWaller">
              <span className="about_click">Link</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
