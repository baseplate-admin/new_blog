---
title: How to make a permission_required decorator for django-ninja
date: 2023-6-19
tags: django-ninja
---

It's no surprise that `django-ninja` is the next big thing for `django`. But as you might have assumed, `django-ninja` is the new kid on the block. It lacks many of the necessary features of `django-rest-framework` ( eg: **`throttling`**,**`permission_required`** ). Recreating all of that in one article is not a feasible thing ( due to how complex the topic can get )

This article tries to cover how to make a `permission_required` decorator with `django-ninja`.

**This article assumes that developer is familiar with [python decorators](https://docs.python.org/3/glossary.html#term-decorator)**

Now that the boring part is out of the equation, let's see how we can implement a `permission_required` decorator.

# How to implement a `permission_requied` decorator

1. Let's make a file named `permissions.py` ( this file will essentially have all of our permission classes )

```python
# permissions.py

from django.contrib.auth.models import User
from django.http import HttpRequest

SAFE_METHODS = ("GET", "HEAD", "OPTIONS")


class IsSuperUser:
    def __init__(self, request: HttpRequest, user: User) -> None:
        self.request = request
        self.user = user

    def has_permissions(self) -> bool:
        if self.user.is_superuser and self.request.method not in SAFE_METHODS:
            return True
        return False
```

2. Let's make another file named `decorators.py` ( this will essentially have our core logics )

```python
# decorator.py

from collections.abc import Callable
from functools import wraps
from http import HTTPStatus
from typing import Any, TYPE_CHECKING

from apps.user.models import CustomUser
from django.contrib.auth.models import AnonymousUser
from django.http import HttpRequest
from ninja.errors import HttpError

if TYPE_CHECKING:
    from .permissions import IsSuperUser


def permission_required(
    permissions: list[Callable[[HttpRequest, CustomUser], "IsSuperUser"]],
    key: str | None = "auth",  # To get request.auth
) -> Callable[[Callable[..., Any]], Callable[..., Any]]:
    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @wraps(func)
        def wrapper(request: HttpRequest, *args: Any, **kwargs: Any) -> Any:
            user = getattr(request, key, AnonymousUser)

            permission_granted = any(
                [permission(request, user).has_permissions() for permission in permissions]
            )
            if not permission_granted:
                raise HttpError(
                    HTTPStatus.UNAUTHORIZED,
                    "Superuser is required for this operation",
                )
            return func(request, *args, **kwargs)

        return wrapper

    return decorator
```

... and we are done.

# How to use this decorator

Let's say you have a super protected route and you don't want every user to access that information ( it's okay to have different information for different users | We wont judge ).

Let's assume you have a route that you want to protect :

```python
@api.get('/some-route')
def return_super_secret(request):
    return 'Hi, this is not meant to be accessible to normal users'
```

Essentially you can just add a decorator to protect the route.

```python
from ninja import NinjaAPI

from .permissions import IsSuperUser
from .decorator import permission_required
from .auth import AuthBearer

api = NinjaAPI()

@api.get("", auth=AuthBearer())
@permission_required([IsSuperUser])
def return_super_secret(request):
    return 'Hi, this is not meant to be accessible to normal users'
```

<sub> If you aren't sure about where the `AuthBearer` class came from have a look at [this](https://django-ninja.rest-framework.com/guides/authentication/#http-bearer) </sub>

You must note the following things:

-   **The decorator must come after the `@api.get`**. Otherwise we wont have a request object that is injected with the `request.auth` parameter that we need.
-   **The `@api.get()` decorator must have a `auth` parameter**, Otherwise our method of getting the user from request object is not going to work.

and **Voila!** you have a functional `permission_required` decorator.

Take it for a spin. Good luck on your journey.

# How does this work

**This section is meant for advanced developers who atleast have a basic understanding of [`dependency-injection`](https://en.wikipedia.org/wiki/Dependency_injection) and [`django-ninja`](https://github.com/vitalik/django-ninja/) architecture**
