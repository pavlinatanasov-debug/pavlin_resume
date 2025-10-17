import React, { Component } from 'react';
import emailjs from '@emailjs/browser';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: '',
      contactEmail: '',
      contactSubject: '',
      contactMessage: '',
      loading: false,
      statusMessage: '',
      statusType: '' // 'success' or 'error'
    };
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { contactName, contactEmail, contactSubject, contactMessage } = this.state;
    console.log(33333333);
    // Basic validation
    if (!contactName || !contactEmail || !contactMessage) {
      this.setState({
        statusMessage: 'Please fill in all required fields.',
        statusType: 'error'
      });
      return;
    }

    emailjs.init('uMKdOfIVTULhtA6Sl'); // ✅ initialize

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      this.setState({
        statusMessage: 'Please enter a valid email address.',
        statusType: 'error'
      });
      return;
    }

    this.setState({ loading: true, statusMessage: '', statusType: '' });

    // EmailJS configuration
    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
    console.log(11111111);
    console.log('SERVICE_ID:', serviceID, 'TEMPLATE_ID:', templateID, 'PUBLIC_KEY:', publicKey);
    const templateParams = {
      from_name: contactName,
      from_email: contactEmail,
      subject: contactSubject || 'No Subject',
      message: contactMessage
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      this.setState({
        contactName: '',
        contactEmail: '',
        contactSubject: '',
        contactMessage: '',
        loading: false,
        statusMessage: 'Your message has been sent successfully!',
        statusType: 'success'
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.setState({ statusMessage: '', statusType: '' });
      }, 5000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      this.setState({
        loading: false,
        statusMessage: 'Failed to send message. Please try again later.',
        statusType: 'error'
      });
    }
  };

  render() {
    const { contactName, contactEmail, contactSubject, contactMessage, loading, statusMessage, statusType } = this.state;

    return (
      <form onSubmit={this.handleSubmit} id="contactForm" name="contactForm">
        <fieldset>
          {statusMessage && (
            <div style={{
              padding: '15px',
              marginBottom: '20px',
              borderRadius: '4px',
              backgroundColor: statusType === 'success' ? '#d4edda' : '#f8d7da',
              color: statusType === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${statusType === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}>
              {statusMessage}
            </div>
          )}

          <div>
            <label htmlFor="contactName">
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              value={contactName}
              size="35"
              id="contactName"
              name="contactName"
              onChange={this.handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="contactEmail">
              Email <span className="required">*</span>
            </label>
            <input
              type="text"
              value={contactEmail}
              size="35"
              id="contactEmail"
              name="contactEmail"
              onChange={this.handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="contactSubject">Subject</label>
            <input
              type="text"
              value={contactSubject}
              size="35"
              id="contactSubject"
              name="contactSubject"
              onChange={this.handleChange}
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="contactMessage">
              Message <span className="required">*</span>
            </label>
            <textarea
              cols="50"
              rows="15"
              id="contactMessage"
              name="contactMessage"
              value={contactMessage}
              onChange={this.handleChange}
              disabled={loading}
            ></textarea>
          </div>

          <div>
            <button className="submit" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Submit'}
            </button>
            {loading && (
              <span id="image-loader">
                <img alt="Loading" src="images/loader.gif" />
              </span>
            )}
          </div>
        </fieldset>
      </form>
    );
  }
}

export default ContactForm;