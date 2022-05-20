import { Grid, GridItem } from '@chakra-ui/react'
import ProfileSidebar from '~/components/ProfileSidebar'

export default function ProfileLayout({ children }) {
  return (
    <Grid
      templateColumns='repeat(5, 1fr)'
      gap={6}
    >
      <GridItem colSpan={1}>
        <ProfileSidebar />
      </GridItem>
      <GridItem colSpan={4}>{children}</GridItem>
    </Grid>
  )
}
