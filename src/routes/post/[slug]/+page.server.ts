import { posts } from '$lib/data/posts'
import { error,redirect } from '@sveltejs/kit'
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = ({ params,url }) => { 
  const { slug } = params

  if(url.pathname.includes('how-i-created-alpine-blur-effect-using-svelte')){
    throw redirect(302,'how-i-created-svelte-blur-effect-using-alpine')
  }

  // get post with metadata
  const post = posts.find((post) => slug === post.slug)

  if (!post) {
    throw error(404, 'Post not found')
  }

  return {
    post
  }
}
