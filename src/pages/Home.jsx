import { Banner } from "../components/Banner"
import { LatestPosts } from "../components/LatestPosts"
import { Recarga } from "../components/Recarga"
import { Resume } from "../components/Resume"

export const Home = () => {

  return (
    <>
      <Banner />
      <Resume />
      <LatestPosts />
      <Recarga />
    </>
  )
}