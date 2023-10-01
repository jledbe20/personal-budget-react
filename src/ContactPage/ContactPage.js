import React from 'react';

function ContactPage() {
    return (
        <div id="main-container" className="container">
            <section className="main-section">
                <h1 className="header">Contact</h1>

                <form id="contact-form" action="mailto:jon.ledbetter@gmail.com" method="post" encType="text/plain">
                    <ul>
                        <li>
                            <label htmlFor="name">Name</label>
                            <input className="text-light bg-dark" type="text" id="name" name="name" placeholder="John Smith"
                                required="required"></input>
                        </li>
                        <li>
                            <label htmlFor="email">E-mail</label>
                            <input className="text-light bg-dark" type="email" id="email" name="email" placeholder="example@gmail.com"
                                required="required"></input>
                        </li>
                        <li>
                            <label htmlFor="message">Message</label>
                            <textarea className="text-light bg-dark" id="message" name="message" required="required"></textarea>
                        </li>
                    </ul>

                    <div id="buttons">
                        <input className="button" type="submit" id="submit" value="Send"></input>
                        <input className="button" type="reset" id="reset" value="Reset"></input>
                    </div>
                </form>
                <br></br>
            </section>
        </div>
    );
}

export default ContactPage;
