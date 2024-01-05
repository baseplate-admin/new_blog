---
title: Watermelon problem
date: 2023-10-24
tags: CodeForces
---


# Problem

One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed w kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.

Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.

This is the most minimal way to solve the problem in Python.

# Input
The first (and the only) input line contains integer number `w (1 ≤ w ≤ 100)` — the weight of the watermelon bought by the boys.

# Output
Print `YES`, if the boys can divide the watermelon into two parts, each of them weighing even number of kilos; and NO in the opposite case.

# Examples
<table>
<thead>
  <tr>
    <th>Input</th>
    <th>Output</th>
  </tr>
</thead>
<tbody>
<tr>

<td>
    

```diff
8
```
    

</td>
<td>

```python
YES
```
    
    
</td>
</tr>
 </tbody>

</table>

# Analyzation

So basically this problem wants us to return :
* If answer is not divisible by 2 (return `NO`) [ for example 7 ]
* If answer is divisible by 2 (return `YES`) [ for example 8 ]
* If answer is less than 2 then by default (return `NO`) [ because 1 cant be divided by 2]

# Solution

```python
number: int = int(input(""))

print("YES") if number > 2 and number % 2 == 0 else print("NO")

```