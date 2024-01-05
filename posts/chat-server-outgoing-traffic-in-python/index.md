---
title: Chat Server Outgoing Traffic
date: 2024-1-5
tags: CodeForces
---


[Chat server's outgoing traffic](https://codeforces.com/problemset/problem/5/A) is a fun problem to solve ( specially since you can't use `while` loop to get input )


This is how i solved it in `python` :

```python

import sys

_input_list = []

# Hack is from
# https://codeforces.com/blog/entry/54228
for line in sys.stdin:
    if line != "":
        _input_list.append(line)

participants = 0
bytes_send = 0

for i in _input_list:
    i = i.replace("\n", "")
    if i[0] == "+":
        participants += 1
        continue
    elif i[0] == "-":
        participants -= 1
        continue

    text = i.split(":")[-1]
    bytes_send += len(text) * participants

print(bytes_send)

```


Some notes on this :
* You can't use `while` loop to get the user input. This is because `python` doesn't have a built in way to get `EOF`. That's why you use `sys.stdin`