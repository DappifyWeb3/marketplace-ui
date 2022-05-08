import React from 'react';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";
import MainButton from 'components/MainButton';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const Intro = ({ context, t }) => {
  return (
    <div className="container">
      <div className="row align-items-center">
            <div className="col-md-6 m-auto">
                <div className="spacer-single"></div>
                <div className="spacer-double"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                </Reveal>
                <div className="spacer-half"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
                  <h1 className="text-center">{t('Title')}</h1>
                </Reveal>
                <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                  <p className="lead text-center">
                  {t('Tagline')}
                  </p>
                </Reveal>
                <div className="spacer-10"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={600} triggerOnce>
                  <div className='d-flex justify-content-center'>
                    <MainButton label={t('Get started')} to={context.cta}/>
                  </div>
                  <div className="spacer-single"></div>
                  <div className="spacer-half"></div>
                </Reveal>
            </div>
        </div>
      </div>
  );
};
export default Intro;