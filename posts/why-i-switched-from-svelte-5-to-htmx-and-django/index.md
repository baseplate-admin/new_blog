---
title: Why I Switched From Svelte 5 to Htmx and Django
date: 2023-10-22
tags: htmx, svelte, django, coreproject
---

`svelte` is the most popular framework ( or in [2021](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks) that was the case ). There's no debate over the fact that [svelte does some things right](https://medium.com/@arxpoetica/top-5-reasons-you-should-use-svelte-on-your-current-project-right-now-e2f6835e904f).

Pros of svelte:
* No virtual DOM
* Less boilerplate
* Truly reactive ( or it was before svelte 5 )


So if `svelte` is a bag of goodies, why move away from it?

Well I am glad you asked.

# `svelte` 5 is a mess
`svelte` is not all sunshine and rainbows.

`svelte` 3-4 has the nicest API possible.

Take for example:

```svelte
<script lang='ts'>
let count = writable(0);
</script>

{$count}
<button on:click={
    ()=>$count++
}>click</button>
```

This became something like:

```svelte
<script lang='ts'>
let countRune = $state(0)
const count = {
    get value(){
        return countRune
    }
    set value(v){
        countRune = v
    }
}
</script>
{count.value}

<button on:click={
    ()=>{
        count.value++
    }
}>Click</button>
```
in `svelte` 5.

See the problem? This is the route `react` took with their [context api](https://react.dev/learn/passing-data-deeply-with-context) 

[This tweet from *fireship* sums it all up](https://twitter.com/fireship_dev/status/1704879390000369689)

Coming from `react` land, this gives me PTSD.

Some people might say, ["But it's opt out, if you dont like it you dont have to use it"](https://www.reddit.com/r/sveltejs/comments/16nm7r5/comment/k1hn6ow/).
To which I reply, "[Rich hinted that runes will be the default way moving forward](https://news.ycombinator.com/item?id=37585384)"

# Jamstack gets expensive
The data transfer between backend and frontend gets expensive relatively quickly. 

We were using REST api to move data from backend to frontend. There's a lot of redundant payload that moves from backend to frontend.

Take for example we send this data from one of our endpoints :

```json
{
    "name":"Joe Smith",
    "first_name":"Joe",
    "middle_name":"",
    "last_name":"Smith"
}
```

But let's say we use only `Joe` from the above example. We still need to send everything from backend. 

When the payload gets large ( about 129kb ) from our backend on each request, it gets expensive.

# `svelte` community is confused and possible diverted
Oh boy, where do we start.

For starters, projects like [`pelte`](https://pelte.dev/) [popped up](https://www.reddit.com/r/sveltejs/comments/16pjccm/pelte_putting_svelte_back_into_svelte_5/) right after rich announced svelte 5.

Posts like these popped started appearing on reddit:
* [How does Svelte 5 w/ Runes differentiate itself from Vue (i.e. why use Svelte vs Vue going forward)](https://www.reddit.com/r/sveltejs/comments/16uiiqf/how_does_svelte_5_w_runes_differentiate_itself/)
* [\[Meta\] Svelte vs X](https://www.reddit.com/r/sveltejs/comments/16zdvdz/meta_svelte_vs_x/)

These indicate that a portion ( may be small ) shifted away from svelte after the announcement.

# Authentication between `SPA` and decoupled backend is hard
