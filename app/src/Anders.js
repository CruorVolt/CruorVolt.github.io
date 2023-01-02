import './Anders.css';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faSoundcloud, faRedditAlien } from '@fortawesome/free-brands-svg-icons'
import { faCarrot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import gosper from './gosper.gif';
import RedditMatrix from './reddit_matrix';


function Anders() {

  const [hoverPane, setHoverPane] = useState(null);

  return (
    <div className="bod">
      <div className="header">

        <div>
          Anders Lundgren
        </div>

        <div className='font-row'>

          <FontAwesomeIcon 
            className='icon reddit' 
            icon={faCarrot} 
            onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='reddit-box'>
                <RedditMatrix/>
              </div>
            )}}
            onMouseLeave={ () => {setHoverPane(null)}}
          />

          <FontAwesomeIcon 
            className='icon life' 
            icon={faPaperPlane} 
            onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} 
            onMouseEnter={ () => {setHoverPane( 
              <div className='life-box'>
                <img src={gosper} height={'200px'}/>
              </div>
            )}}
            onMouseLeave={ () => {setHoverPane(null)}}
          />

          <FontAwesomeIcon 
            className='icon' 
            icon={faGithub} 
            onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} 
            onMouseLeave={ () => {setHoverPane(null)}}
          />

          <FontAwesomeIcon 
            className='icon' 
            icon={faSoundcloud} 
            onClick={() => { window.open('https://soundcloud.com/anders-lundgren-589704197', '_blank'); }} 
            onMouseLeave={ () => {setHoverPane(null)}}
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
