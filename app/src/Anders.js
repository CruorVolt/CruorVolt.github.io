import './Anders.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faSoundcloud } from '@fortawesome/free-brands-svg-icons'


function Anders() {
  return (
    <div className="bod">
      <div className="header">

        <div>
          Anders Lundgren
        </div>

        <div className='font-row'>
          <FontAwesomeIcon className='icon' icon={faGithub} onClick={() => { window.open('https://github.com/CruorVolt', '_blank'); }} />
          <FontAwesomeIcon className='icon' icon={faSoundcloud} onClick={() => { window.open('https://soundcloud.com/anders-lundgren-589704197', '_blank'); }} />
        </div>

      </div>
    </div>
  );
}

export default Anders;
