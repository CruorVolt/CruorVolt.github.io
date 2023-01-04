import './Anders.css';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSoundcloud, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faCarrot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

import code from './code.png';
import gosper from './gosper.gif';
import soundCloud from './soundcloud.gif';
import RedditMatrix from './reddit_matrix';


function Anders() {

  const [hoverPane, setHoverPane] = useState(null);

  return (
    <div className="bod">
      <div className="header">

        <div className='header-text'>
          Anders Lundgren
        </div>

        <div className='font-row'>

          <FontAwesomeIcon 
            className='icon reddit' 
            icon={faCarrot} 
            onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='reddit box'>
                <RedditMatrix/>
                <div className='app-description'> A real-time Reddit visualizer </div>
              </div>
            )}}
          />

          <FontAwesomeIcon 
            className='icon life' 
            icon={faPaperPlane} 
            onClick={() => { window.open('https://github.com/CruorVolt/life', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='life box'>
                <img src={gosper} alt='life' height={'200px'}/>
                <div className='app-description'> Conway's Life in the terminal </div>
              </div>
            )}}
          />

          <FontAwesomeIcon 
            className='icon github' 
            icon={faGithub} 
            onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='github box'>
                <img src={code} alt='github' height={'200px'}/>
                <div className='app-description'> Other projects </div>
              </div>
            )}}
          />

          <FontAwesomeIcon 
            className='icon soundcloud' 
            icon={faSoundcloud} 
            onClick={() => { window.open('https://soundcloud.com/anders-lundgren-589704197', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='soundcloud box'>
                <img src={soundCloud} alt='soundcloud' height={'200px'}/>
                <div className='app-description'> Music </div>
              </div>
            )}}
          />

        </div>

        <div className='hover-pane'>
          { hoverPane }
        </div>

      </div>
    </div>
  );
}

export default Anders;
