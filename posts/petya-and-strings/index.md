---
title: 112A. Petya and Strings
date: 2024-2-5
tags: CodeForces
---

# Problem

Little Petya loves presents. His mum bought him two strings of the same size for his birthday. The strings consist of uppercase and lowercase Latin letters. Now Petya wants to compare those two strings lexicographically. The letters' case does not matter, that is an uppercase letter is considered equivalent to the corresponding lowercase letter. Help Petya perform the comparison.
# Input

Each of the first two lines contains a bought string. The strings' lengths range from 1 to 100 inclusive. It is guaranteed that the strings are of the same length and also consist of uppercase and lowercase Latin letters.

# Output

If the first string is less than the second one, print "-1". If the second string is less than the first one, print "1". If the strings are equal, print "0". Note that the letters' case is not taken into consideration when the strings are compared.



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
aaaa
aaaA
```
    

</td>
<td>

```
0
```
    
    
</td>
</tr>


<tr>

<td>
    

```
abs
Abz
```
    

</td>
<td>

```
-1
```
    
    
</td>
</tr>

<tr>

<td>
    

```
abcdefg
AbCdEfF
```
    

</td>
<td>

```
1
```
    
    
</td>
</tr>

</tbody>

</table>



# Analyzation 

In this case we have to compare values of 2 strings.

Check this [digitalocean](https://www.digitalocean.com/community/tutorials/python-string-comparison) blog for more information on how this works.


# Solution ( Python )

```python
string_1 = input().lower()
string_2 = input().lower()

if string_1 < string_2:
    print(-1)
elif string_2 < string_1:
    print(1)
elif string_1 == string_2:
    print(0)
```


# Solution ( C Plus Plus )

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    string s1;
    string s2;

    cin >> s1;
    cin >> s2;

    transform(s1.begin(), s1.end(), s1.begin(), ::tolower);
    transform(s2.begin(), s2.end(), s2.begin(), ::tolower);

    if (s1 < s2)
        cout << -1;
    else if (s2 < s1)
        cout << 1;
    else
        cout << 0;
    cout << endl;
}
```