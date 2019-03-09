import * as React from 'react'

import wave from './wave.module.scss'
import circle from './circle.module.scss'

export interface IProps {
  type?: 'wave' | 'circle'
  theme?: 'default' | 'light'
  size?: 'sm' | 'md'
  className?: string
}

const Spinner: React.StatelessComponent<IProps> = ({ className = '', type = 'wave', theme = 'default', size = 'sm' }) => {
  switch (type) {
    case 'wave':
      return (
        <div className={className}>
          <div className={wave.skSpinnerWave} data-theme={theme} data-size={size}>
            <div className={wave.skRect1} data-theme={theme} />
            <div className={wave.skRect2} data-theme={theme} />
            <div className={wave.skRect3} data-theme={theme} />
            <div className={wave.skRect4} data-theme={theme} />
            <div className={wave.skRect5} data-theme={theme} />
          </div>
        </div>
      )
    case 'circle':
      return (
        <div className={className}>
          <div className={circle.skSpinnerCircle} data-size={size}>
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
        </div>
      )
  }
}

export default Spinner