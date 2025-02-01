import React from 'react'
import Separator from './Separator'

interface BreakpointDistanceProps {
  distance: number
  prefix: '+' | '-'
  breakpointKey: string
  separatorColor: string
  textClass: string
}

const BreakpointDistance: React.FC<BreakpointDistanceProps> = ({
  distance,
  prefix,
  breakpointKey,
  separatorColor,
  textClass,
}: BreakpointDistanceProps) => (
  <>
    <Separator color={separatorColor} />
    <span className={textClass}>
      {`${prefix}${distance}px to ${breakpointKey}`}
    </span>
  </>
)

export default BreakpointDistance
