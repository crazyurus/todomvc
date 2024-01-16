import React from 'react';

import { Footer, Header, List } from '../../components';

function Home(): JSX.Element {
  return (
    <div className="todoapp">
      <Header />
      <List />
      <Footer />
    </div>
  );
}

export default Home;
