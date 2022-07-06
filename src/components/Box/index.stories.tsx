import React from 'react'

import Text from '@components/Text/Text'

import BoxComponent from './Box'
import FlexComponent from './Flex'
import GridComponent from './Grid'

export default {
  title: 'Components/Boxes',
  component: BoxComponent,
  argTypes: {},
}

export const Box: React.FC = () => {
  return (
    <div>
      <BoxComponent as="p">
        Contains background, border, layout, position, and space from Styled
        System&lsquo;s API
      </BoxComponent>
    </div>
  )
}

export const Flex: React.FC = () => {
  return (
    <div>
      <Text>
        Based on the Box component. You can apply any flexbox properties on the
        Flex component.
      </Text>
      List of applicable props
      <FlexComponent justifyContent="space-between" mt="40px">
        <span>Left</span>
        <span>right</span>
      </FlexComponent>
      <FlexComponent justifyContent="center" mt="8px">
        <span>center</span>
      </FlexComponent>
      <FlexComponent fontFamily="Avenir" justifyContent="space-around">
        <Text fontWeight={700}>Avenir</Text>
        <Text fontFamily="Castle">Castle</Text>
      </FlexComponent>
    </div>
  )
}

export const Grid: React.FC = () => {
  return (
    <GridComponent
      justifyItems="center"
      alignContent="center"
      gridTemplateColumns="1fr 1fr"
      gridColumnGap="16px"
      style={{ backgroundColor: '#7645D9' }}
    >
      <BoxComponent
        style={{ backgroundColor: '#1fc7d4', width: '300px', height: '300px' }}
      />
      <BoxComponent
        style={{ backgroundColor: '#1fc7d4', width: '300px', height: '300px' }}
      />
    </GridComponent>
  )
}
