---
title: 25A. IQ test
date: 2024-7-26
tags: CodeForces
---

Bob is preparing to pass IQ test. The most frequent task in this test is to find out which one of the given `n` numbers differs from the others. Bob observed that one number usually differs from the others in evenness. Help Bob — to check his answers, he needs a program that among the given n numbers finds one that is different in evenness.

# Input

The first line contains integer n (3 ≤ n ≤ 100) — amount of numbers in the task. The second line contains n space-separated natural numbers, not exceeding 100. It is guaranteed, that exactly one of these numbers differs from the others in evenness.


# Output

Output index of number that differs from the others in evenness. Numbers are numbered from 1 in the input order.


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
    

```cpp
5
2 4 7 8 10
```
    

</td>
<td>

```cpp
3
```
    
    
</td>
</tr>


<tr>

<td>
    

```cpp
4
1 2 1 1

```
    

</td>
<td>

```cpp
2
```
    
    
</td>
</tr>


<tr>

</tr>
</tbody>

</table>

# Analyzation

So basically we have to count the number of even and odd inputs. Then we have to return the index of the different number.

To do this:
* We have to take a variable that counts the number of `even`/`odd` numbers.
* We have to take a variable that stores the last index of `even`/`odd` number.

Then it is a simple if-else statement
* If (`even` > `odd`) return the last `odd` position else return the last `even` position.

# Solution ( CPP )

```cpp
#include <bits/stdc++.h>

using namespace std;

int main(){
    int n;
    cin >> n;

    int numbers[n];
    for(int i =0;i<n;i++){
        cin>>numbers[i];
    }

    int even=0;
    int odd=0;
    int last_even_index=0,last_odd_index=0;

    for(int i=0;i<n;i++){
        int x = numbers[i];
        if(x%2==0) {
            even++;
            last_even_index = i;
        }else{
            odd++;
            last_odd_index=i;
        }
    }



    if (even<odd) cout << last_even_index +1 <<endl;
    else cout << last_odd_index+1 << endl;

}
```