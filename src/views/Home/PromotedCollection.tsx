import styled from 'styled-components'

import { Box, Grid, NFTCard, Layout, Text } from '@/components'
import { useGetTokens } from '@/hooks'

const Title = styled(Text)`
  font-size: 40px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 60px;
  }
`

const Description = styled(Text)`
  font-family: 'Avenir';
  font-size: 20px;
  margin-bottom: 70px;

  ${({ theme }) => theme.mediaQueries.lg} {
    font-size: 28px;
    margin-bottom: 60px;
  }
`

const Container = styled(Grid)`
  grid-template-columns: repeat(1, 1fr);

  grid-column-gap: 20px;
  grid-row-gap: 80px;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  ${({ theme }) => theme.mediaQueries.xl2} {
    grid-template-columns: repeat(4, 1fr);
  }
`

export default function NFTs() {
  const { data, loading } = useGetTokens({ promoted: true })
  return (
    <Layout mt="60px">
      <Box>
        <Title>
          {loading ? <div>Loading</div> : data?.tokens[0].collection.name}
        </Title>
        <Description>
          {loading ? (
            <div>Loading</div>
          ) : (
            data?.tokens[0].collection.description
          )}
        </Description>
        <Container>
          {loading ? (
            <div>Loading...</div>
          ) : (
            data?.tokens.map((token) => {
              return <NFTCard key={token.id} {...token} />
            })
          )}
        </Container>
      </Box>
    </Layout>
  )
}