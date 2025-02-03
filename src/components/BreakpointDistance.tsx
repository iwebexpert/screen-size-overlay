import React from 'react'
import Separator from './Separator'
import type { SupportedLocale } from '../types'
import { t } from '../utils/locale'

interface BreakpointDistanceProps {
  distance: number
  prefix: '+' | '-'
  breakpointKey: string
  separatorColor: string
  textClass: string
  locale?: SupportedLocale
}

const BreakpointDistance: React.FC<BreakpointDistanceProps> = ({
  distance,
  prefix,
  breakpointKey,
  separatorColor,
  textClass,
  locale = 'en-US',
}: BreakpointDistanceProps) => (
  <>
    <Separator color={separatorColor} />
    <span className={textClass}>
      {`${prefix}${distance}px ${t('breakpointDistance', locale)} ${breakpointKey}`}
    </span>
  </>
)

export default BreakpointDistance
