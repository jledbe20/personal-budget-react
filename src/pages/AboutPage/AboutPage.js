import React from 'react';

function AboutPage() {
    return (
        <div id="main-container" className="container">
            <section className="main-section">
                <h1 className="header">About Me</h1>

                <img id="me" src="assets/images/jon.png" className="auth-image" alt="Jon in a charcoal sport coat with a purple necktie."></img>

                <p>Well versed in numerous aspects of the computer science field, including but not limited to programming,
                    maintenance, technical support and applied theory. Have received current A+ certification from CompTIA.
                    In addition to technical ability, possess exceptional written and verbal communication skills, and have
                    consistently achieved high levels of client satisfaction. Natural problem solver, quick learner, adaptable
                    and challenge motivated. Recently earned certification in full-stack web development from a prestigious and
                    accredited university.</p>

                <p>Enjoys books, film and videogames when met with "spare" time.</p><br></br>

                <p>Click <a href="assets/resume/Resume_Jon_Ledbetter_ 07_2023.pdf" id="resume_link" alt="Resume Here!">here</a> to
                    download my resumé!</p>

            </section>
        </div>
    );
}

export default AboutPage;
