import './TeamSelector.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { chooseTeam } from '../store/reducers/team';
import InfiniteCarousel from 'react-leaf-carousel';
import teamColors from '../resources/teamColors.json';

const TeamSelector = props => {
  const { team: selected } = useSelector(state => state.team, shallowEqual);
  const dispatch = useDispatch();
  console.log('team from redux store: ', selected);
  const [width, updateWidth] = useState(props.innerWidth);

  useEffect(() => {
    updateWidth(props.innerWidth);
  }, [props.innerWidth]);

  const handleClick = e => {
    const logos = document.getElementsByClassName('selected');

    if (logos.length) {
      [...logos].forEach(logo => {
        logo.setAttribute('class', '');
      });
    }

    e.target.setAttribute('class', 'selected');

    const team = e.currentTarget.getAttribute('value');
    dispatch(chooseTeam(team));
  };

  return (
    <div id='TeamSelector'>
      <div
        className='carousel-container'
        style={{ minWidth: Math.min(width, 500) }}
      >
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 5,
              },
            },
          ]}
          dots={false}
          showSides={true}
          sidesOpacity={0.2}
          slidesToScroll={Math.floor((0.6 * width) / 100)}
          slidesToShow={Math.floor((0.6 * width) / 100)}
          scrollOnDevice={true}
        >
          {Object.keys(teamColors).map((team, idx) => (
            <div
              key={idx + 1}
              className='logo-container'
              value={team}
              onClick={handleClick}
            >
              <img
                src={`./logos/${team}.png`}
                id={`logo-${team}`}
                alt={team}
                className={team === selected ? 'selected' : ''}
              />
            </div>
          ))}
        </InfiniteCarousel>
      </div>
    </div>
  );
};

export default TeamSelector;
