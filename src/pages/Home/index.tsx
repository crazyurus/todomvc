import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Footer, Header, List } from '../../components';
import useStore from '../../store';
import { TodoStatus } from '../../types';

function Home(): JSX.Element {
  const { status } = useParams();
  const changeStatus = useStore(state => state.changeStatus);

  useEffect(() => {
    if (status) {
      changeStatus(status as TodoStatus);
    }
  }, [status]);

  return (
    <div className="todoapp">
      <Header />
      <List />
      <Footer />
    </div>
  );
}

export default Home;
