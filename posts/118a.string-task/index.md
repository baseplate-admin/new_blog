---
title: 118A. String Task
date: 2024-2-14
tags: CodeForces
---



Petya started to attend programming lessons. On the first lesson his task was to write a simple program. The program was supposed to do the following: in the given string, consisting if uppercase and lowercase Latin letters, it:

* deletes all the vowels,
* inserts a character "." before each consonant,
* replaces all uppercase consonants with corresponding lowercase ones. 

Vowels are letters "A", "O", "Y", "E", "U", "I", and the rest are consonants. The program's input is exactly one string, it should return the output as a single string, resulting after the program's processing the initial string.

Help Petya cope with this easy task.


# Input

The first line represents input string of Petya's program. This string only consists of uppercase and lowercase Latin letters and its length is from 1 to 100, inclusive.

# Output

Print the resulting string. It is guaranteed that this string is not empty.



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
    

```
tour
```
    

</td>
<td>

```
.t.r
```
    
    
</td>
</tr>


<tr>

<td>
    

```
Codeforces
```
    

</td>
<td>

```
.c.d.f.r.c.s
```
    
    
</td>
</tr>


<tr>

<td>
    

```
aBAcAba
```
    

</td>
<td>

```
.b.c.b
```
    
    
</td>
</tr>
</tbody>

</table>

# Analyzation

So in order to solve this problem, we have to check for the existance of vowels. Namely "A", "E", "I", "O", "U".

But we have to be extra careful not to take first letter into account. ( or we can use capitialize )


# Solution ( C++ )

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    const set<char> vowel_arr = {'a', 'e', 'i', 'o', 'u','y'};

    vector<char> a;

    string s;
    cin >> s;

    for (int i = 0; i < s.size(); i++)
    {
        char x = tolower(s[i]);
        if (!vowel_arr.contains(x))
            a.push_back(x);
    }
    for (auto p : a)
    {
        cout << '.' << p;
    }
    cout << endl;
}


```

# Solution ( Python )


```python
inp = map(str, input(""))

_second_list = []

for i in inp:
    if i.lower() not in "aeiouy":
        _second_list.append(i.lower())

print(".".join(["", *_second_list]))
```


N.B: This solution uses a clever trick to join the lists. Without doing `*_second_list` the code returns something like `t.r`.