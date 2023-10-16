import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const Post = () => {
 const { id } = useParams();
 const [post, setPost] = useState(null);
 const [loading, setLoading] = useState(true);

 const navigation = useNavigate();

 function handleBackButton() {
   navigation('/');
   window.scrollTo({ top: 0, behavior: 'smooth' });
 }

 async function fetchPost() {
  try {
    const apiUrl = `https://api.mir4-rogue.com/post/${id}`;
    const response = await axios.get(apiUrl);

    if (response.status === 200) {
      setPost(response.data);
      console.log(post);
    }
  } catch (error) {
    console.error('Ocorreu um erro:', error);
  }
}

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchPost();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen px-4 py-10 mx-auto text-white md:px-40 lg:px-96">
      {loading ? (
        <div className="absolute z-10 translate-x-1/2 -translate-y-1/2 right-1/2 lds-dual-ring top-1/2 text"></div>
      ) : (
        post && (
          <div className="py-10 shadow-md px-10 translate-y-8 opacity-0 border-[1px] rounded animate-enter">
            <img src={post._embedded['wp:featuredmedia'][0].source_url} alt="Foto Post" className="w-full rounded"/>
            <h2 className="my-10 text-4xl font-bold text-white uppercase drop-shadow">
          {post.title.rendered}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} className="mb-7" />
            <button onClick={handleBackButton} className="px-6 py-3 font-bold text-white duration-150 ease-in-out bg-red-600 rounded-md gap-x-2 hover:bg-red-800">Voltar</button>
          </div>
        )
      )}
    </div>
  )
}