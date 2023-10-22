---
title: Why I Switched From Svelte 5 to Htmx and Django
date: 2023-10-22
tags: htmx, svelte, django, coreproject
---

`svelte` is the most popular framework ( or in [2021](https://insights.stackoverflow.com/survey/2021#section-most-loved-dreaded-and-wanted-web-frameworks) that was the case ). There's no debate over the fact that [`svelte` does some things right](https://medium.com/@arxpoetica/top-5-reasons-you-should-use-svelte-on-your-current-project-right-now-e2f6835e904f).

Pros of `svelte`:
* No virtual DOM
* Less boilerplate
* Truly reactive ( or it was before `svelte` 5 )


So if `svelte` is a bag of goodies, why move away from it?

Well I am glad you asked.

# `svelte` 5 is a mess
`svelte` is not all sunshine and rainbows.

`svelte` 3-4 had the nicest API possible.

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

This became something like in `svelte` 5:

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

See the problem? This is the route `react` took with their [context api](https://react.dev/learn/passing-data-deeply-with-context) 

[This tweet from *fireship* sums it all up](https://twitter.com/fireship_dev/status/1704879390000369689)

Coming from `react` land, this gives me PTSD.

> Some people might say, ["But it's opt out, if you dont like it you dont have to use it"](https://www.reddit.com/r/sveltejs/comments/16nm7r5/comment/k1hn6ow/).

To which I reply, "[Rich hinted that runes will be the default way moving forward](https://news.ycombinator.com/item?id=37585384)"

`svelte` lost its original vision, instead they are going for a different direction ( to which not sure i agree with )

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

When the payload gets large ( about **129kb** ) from our backend on each request, it gets expensive.

# `svelte` community is confused and possible diverted
Oh boy, where do we start.

For starters, projects like [`pelte`](https://pelte.dev/) [popped up](https://www.reddit.com/r/sveltejs/comments/16pjccm/pelte_putting_svelte_back_into_svelte_5/) right after rich announced `svelte` 5.

Posts like these popped started appearing on reddit:
* [How does Svelte 5 w/ Runes differentiate itself from Vue (i.e. why use Svelte vs Vue going forward)](https://www.reddit.com/r/sveltejs/comments/16uiiqf/how_does_svelte_5_w_runes_differentiate_itself/)
* [\[Meta\] Svelte vs X](https://www.reddit.com/r/sveltejs/comments/16zdvdz/meta_svelte_vs_x/)

These indicate that a portion ( may be small ) shifted away from `svelte` after the announcement.

# Authentication between `SPA` and decoupled backend is hard

For starters, if you have a `django` backend, you dont have a straightforward way to do authentication from backend and frontend. 

You can do something like token authentication, but the problem rises with storing the token securely, then validating the token, ....

The token can be stored securely ( specially if you use something like `sveltekit` ) but the process is cumbersome ( server side route, setting https only cookie from server ) and it takes time to set everything up. Minus point is you lose client side routing if you go with this route.


# The ecosystem is brittle

The entire `svelte` ecosystem didn't get that much mature even after 2-3 years. For example there's nothing like [`mantine`](https://mantine.dev) for `svelte`. Well [`skeleton`](https://skeleton.dev) exists but it's a relatively young project with countless bugs.

There's no good text editor ( that's native ) for `svelte`. [Posts like this](https://www.reddit.com/r/sveltejs/comments/17cgmts/rich_text_editor/) echo this problem.

# The move

So, why did I move to `django`?

For starters `django` does a whole lot of things right ( that's a post for another day ). 

Some benefits:
*    With the help of [`django-components`](https://github.com/EmilStenstrom/django-components) we can even recreate the components from `svelte`
*    With the help of [`django-tailwind`](https://github.com/timonweb/django-tailwind) we can use [`tailwind`](https://github.com/tailwindlabs/tailwindcss) in our `django` app 

Our new stack:

<ul>

<li>

<div style='display:flex; align-items: center;gap:0.5rem'> 

`htmx`

![htmx](./htmx.png)


</div>

</li>

<li>

<div style='display:flex; align-items: center;gap:0.5rem'> 

`django` 

![django](./django.png)


</div>

</li>

<li>

<div style='display:flex; align-items: center;gap:0.5rem'> 

`tailwindcss` 

![tailwind](./tailwind.png)


</div>

</li>

<li>

<div style='display:flex; align-items: center;gap:0.5rem'> 

`hyperscript` 

![hyperscript](./hyperscript.png)


</div>

</li>

</ul>

### Authentication

For `django` we can do something like:

```jinja
{% if request.user.is_authenticated %}
    <!--Do something-->
{% endif %}
```

To do this in `svelte` I probably would have to show either a `skeleton`  or a loading spinner

### No `node.js` server in production

Doing everything in `django` means I don't have to deal with `node.js` docker container, saving resources and improving efficiency



### No fetching data from backend

We can return the html rendered by `django`, no need to fetch data back and forth.

```jinja
welcome back {{ request.user }}
```

### With hyperscript we can add **event driven** interactions 

Take for example :

```hyperscript
on hyperscript:change(url)
    if url !== '{{icon.href}}'
        put 'btn btn-icon relative w-[4vw] h-[4vw] border-none rounded-[0.75vw] p-0 !bg-transparent' into my.classList
        remove .hidden from <span/> in me
    else
        put 'btn btn-icon relative w-[4vw] h-[4vw] border-none rounded-[0.75vw] p-0 relative !bg-accent before:absolute before:-left-[0.15vw] before:z-10 before:h-[1.25vw] before:w-[0.25vw] before:rounded-full before:bg-primary-500' into my.classList
    end
on htmx:afterRequest
    add .blur-sm
    then wait 100ms
    send hyperscript:change(url:event.detail.pathInfo.responsePath) to <icon/> in <glider-container/>
    send hyperscript:change(url:event.detail.pathInfo.responsePath) to <button/> in <glider-container/>
```

This doesn't look that great compared to `svelte` but, we can achieve the same functionality provided by `svelte`.


# Conclusion

I had really hoped that `svelte` would be my last framework. But the way things are moving forward, I am currently unsure if this would be the case. 

Having many ways to do the same thing is why `perl` died and `react` became a mess.

<em>

`svelte` should get their direction right ( they originally had the motto ["Reactivity by Default"](https://www.youtube.com/watch?v=qqt6YxAZoOc) ), should that happen i will return to `svelte`.



</em>

Don't  get me wrong, I still do absolutely love the innovations brought by `svelte` ( that's why [my blog uses `svelte`](https://github.com/baseplate-admin/new_blog/tree/312098c5a25edf052f6a8582aa7731bd62feae2c) ), it's just that I am not gonna rely on `svelte` for my main project moving forward. 