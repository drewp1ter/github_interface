import * as React from 'react'

import wave from './wave.module.scss'
import circle from './circle.module.scss'

export interface IProps {
  type?: 'wave' | 'circle'
  theme?: 'default' | 'light'
}

const Spinner: React.StatelessComponent<IProps> = ({ type = 'wave', theme = 'default' }) => {
  switch (type) {
    case 'wave':
      return (
        <div className={wave.skSpinnerWave} data-theme={theme} >
          <div className={wave.skRect1} data-theme={theme} />
          <div className={wave.skRect2} data-theme={theme} />
          <div className={wave.skRect3} data-theme={theme} />
          <div className={wave.skRect4} data-theme={theme} />
          <div className={wave.skRect5} data-theme={theme} />
        </div>
      )
    case 'circle':
      return (
        <div className={circle.skSpinnerCircle}>
          <div className={circle.skCircle1} data-theme={theme} />
          <div className={circle.skCircle2} data-theme={theme} />
          <div className={circle.skCircle3} data-theme={theme} />
          <div className={circle.skCircle4} data-theme={theme} />
          <div className={circle.skCircle5} data-theme={theme} />
          <div className={circle.skCircle6} data-theme={theme} />
          <div className={circle.skCircle7} data-theme={theme} />
          <div className={circle.skCircle8} data-theme={theme} />
          <div className={circle.skCircle9} data-theme={theme} />
          <div className={circle.skCircle10} data-theme={theme} />
          <div className={circle.skCircle11} data-theme={theme} />
          <div className={circle.skCircle12} data-theme={theme} />
        </div>
      )
  }
}

export default Spinner