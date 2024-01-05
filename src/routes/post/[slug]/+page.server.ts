import { posts } from '$lib/data/posts'
import { error,redirect } from '@sveltejs/kit'
import type {PageServerLoad} from './$types';

const redirects = [
  {'from':'how-i-created-alpine-blur-effect-using-svelte',to:'how-i-created-svelte-blur-effect-using-alpine'}
]

export const load: PageServerLoad = ({ params,url }) => { 
  const { slug } = params

  redirects.forEach(item=>{
    if (url.pathname.includes(item.from)){
      redirect(301,item.to)
    }
  })

  // get post with metadata
  const post = posts.find((post) => slug === post.slug)

  if (!post) {
    error(404, 'Post not found');
  }

  return {
    post
  }
}
