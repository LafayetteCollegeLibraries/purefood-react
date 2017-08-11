import React from 'react'

const Contact = () => (
  <div className="container-fluid">

    <div className="container-fluid">
      <p>
        We welcome comments, questions, and suggestions for the Pure Food
        Project. Please feel free to contact us directly through e-mail,
        phone, or using the form below.
      </p>
    </div>

    <div className="container-fluid">
      <form method="post">
        <div className="form-group">
          <label htmlFor="name">
            Your Name

            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="name"
              required="true"
              size="60"
              maxLength="128"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Your E-Mail Address

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="E-Mail Address"
              name="email"
              required="true"
              size="60"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="subject">
            <input
              type="subject"
              className="form-control"
              id="subject"
              placeholder="Subject"
              name="subject"
              required="true"
              size="60"
            />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <textarea
              className="form-textarea"
              cols="60"
              id="message"
              name="message"
              required="true"
              rows="5"
            ></textarea>
          </label>
        </div>

        <input
          type="text"
          className="hidden"
          id="spam"
          name="spam"
        />

        <button type="submit" className="btn btn-default">
          Submit
        </button>
      </form>
    </div>
  </div>
)

export default Contact
