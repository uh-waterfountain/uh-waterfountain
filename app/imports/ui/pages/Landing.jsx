import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>

          <Grid.Column width={4}>
            <Image size='large' src="/images/landing-img.png"/>
          </Grid.Column>

          <Grid.Column width={8}>
            <h1>Welcome to UH Water Connoisseur!</h1>
            <p>The Problem: With many thirsty people frequenting the UH Manoa Campus to quench their thirst, it is imperative that people have access to the best avaliable water source on campus. For all those times you don’t have a water bottle and aren’t willing to pay the price for bottled water. Or maybe you aren’t sure if the water fountains in POST are better then the water fountains at Sakamaki. We bring to you an innovative new app.</p>

             <p>The Solution: Introducing Water Connoisseur, for the times you don’t have a water bottle and just need to know which water fountain is the best. Water Connoisseur is an app that allows users to review and find the best water fountains on campus.</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
