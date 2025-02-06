import React from 'react'
import Separator from './Separator'
import type { Language } from '../types'
import { t } from '../utils/translations'

interface BreakpointDistanceProps {
  distance: number
  prefix: '+' | '-'
  breakpointKey: string
  separatorColor: string
  textClass: string
  language?: Language
}

const BreakpointDistance: React.FC<BreakpointDistanceProps> = ({
  distance,
  prefix,
  breakpointKey,
  separatorColor,
  textClass,
  language = 'en',
}: BreakpointDistanceProps) => (
  <>
    <Separator color={separatorColor} />
    <span className={textClass}>
      {`${prefix}${distance}px ${t('breakpointDistance', language)} ${breakpointKey}`}
    </span>
  </>
)

export default BreakpointDistance
