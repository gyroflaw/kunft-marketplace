import { NFTCard } from '@components/Card/NFT'
import { ProfileFilter } from '@components/Filter'
import { Layout } from '@components/Layout'
import { Text } from '@components/Text'

import {
  StyledImage,
  ImageContainer,
  NameContainer,
  DataContainer,
  NFTContainer,
} from './Profile.styles'

interface ProfileProps {
  avatar?: string
  NFTs: string[]
}

export default function Profile({ avatar, NFTs = [] }: ProfileProps) {
  const profileAvatar =
    avatar ||
    'https://beta.api.solanalysis.com/images/400x400/filters:frames(,0)/https://arweave.net/eWX3j4ulh4LK8RXC2VSIyF1Lwd-dKZIymXBuGiKsEpY'

  return (
    <Layout>
      <DataContainer>
        <ImageContainer>
          <StyledImage src={profileAvatar} alt="" width={235} height={235} />
        </ImageContainer>
        <NameContainer>
          <Text fontSize="27px">Insert Name Here</Text>
        </NameContainer>
        <ProfileFilter />
      </DataContainer>
      <NFTContainer>
        {NFTs.map((item) => {
          return (
            <NFTCard
              key={item}
              type={
                Math.random() > 0.5
                  ? Math.random() > 0.5
                    ? 'Sale'
                    : 'NoneSale'
                  : 'Upcoming'
              }
              image={item}
              name="KUNFT"
              price={Math.random() * 10000}
              stars={Math.floor(Math.random() * 100)}
              userStarred={Math.random() > 0.5}
            />
          )
        })}
      </NFTContainer>
    </Layout>
  )
}