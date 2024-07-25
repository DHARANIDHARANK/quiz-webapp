import  { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './Home.css'


const Home = () => {
  

  return (
    <Fragment>
      <Helmet>
        <title>Quiz app - Home</title>
      </Helmet>
      <div id="home">
        <section>
          <div>
            <span className='mdi mdi-cube-outline mdi-56px'></span>
          </div>
          <h1> QUIZ APP </h1>
          <div className='play-button-container'>
            <ul>
              <li>
                <Link to="/questions">Play</Link>
              </li>
            </ul>
          </div>
          <div className='button-container'>
            <Link to="/login" >Login</Link>
            <Link to="/signup" >Sign up</Link>

          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Home;
