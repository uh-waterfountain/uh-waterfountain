import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px' };
    return (
        <footer>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              UH Water Connoisseur team<br />
              Members: Bryson Yuen, Gunwook Baik, Sean Sumida, Sheena Torres, Jake Castillo.<br />
            <a href="https://github.com/uh-waterfountain">Project Github</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
