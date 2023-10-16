import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { removeHtmlTags } from "../utils/functions";

export const LatestPosts = () => {
  const [posts, setPosts] = useState([]);

async function fetchData() {
      try {
        const apiUrl = 'https://api.mir4-rogue.com/posts';

        const response = await axios.get(apiUrl);

        if (response.status === 200) {
          const postsData = response.data;

          const postsWithImages = await Promise.all(
            postsData.map(async post => {
              if (post._embedded && post._embedded['wp:featuredmedia']) {

                return {
                  id: post.id,
                  title: post.title.rendered,
                  content: removeHtmlTags(post.content.rendered),
                  imageUrl: post._embedded['wp:featuredmedia'][0].source_url,
                };
              } else {
                return {
                  id: post.id,
                  title: post.title.rendered,
                  content: removeHtmlTags(post.content.rendered),
                  imageUrl: null,
                };
              }
            })
          );

          setPosts(postsWithImages);
        }
      } catch (error) {
        console.error('Ocorreu um erro:', error);
      }
    }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="px-8 py-12 md:px-48 bg-zinc-900">
      <h2 className="text-3xl font-medium text-center text-white uppercase drop-shadow-sm after:content-[''] after:block after:h-[3px] after:w-[120px] after:my-5 after:mx-auto after:rounded-sm after:bg-gradient-to-r from-red-800 to-red-600">Confira os <b>últimos anúncios:</b></h2>
      <div className="grid px-2 my-10 md:grid-cols-2 gap-x-20">

      {posts.map((post) => (
        <div className="grid items-center my-5 lg:grid-cols-2 gap-x-6" key={post.id}>
          <div className="w-full">
            <img src={post.imageUrl} alt="Foto Post" className="rounded shadow-lg" />
          </div>

          <div className="mt-3 text-white lg:mt-0">
            <h3 className="text-lg font-semibold md:text-2xl drop-shadow">{post.title}</h3>
            <p className="my-6 text-sm line-clamp-4">{post.content}</p>
            <Link className="px-8 py-3 text-sm font-bold duration-150 ease-in-out bg-red-600 rounded hover:bg-red-800" to={`/post/${post.id}`} >Leia mais</Link>
          </div>
        </div>
      ))}

      </div>
    </section>
  )
}