---
title: 5A. Chat Server Outgoing Traffic
date: 2024-1-5
tags: CodeForces
---



# Problem
Polycarp is working on a new project called "Polychat". Following modern tendencies in IT, he decided, that this project should contain chat as well. To achieve this goal, Polycarp has spent several hours in front of his laptop and implemented a chat server that can process three types of commands:

*    Include a person to the chat ('Add' command).
*    Remove a person from the chat ('Remove' command).
*    Send a message from a person to all people, who are currently in the chat, including the one, who sends the message ('Send' command). 

Now Polycarp wants to find out the amount of outgoing traffic that the server will produce while processing a particular set of commands.

Polycarp knows that chat server sends no traffic for 'Add' and 'Remove' commands. When 'Send' command is processed, server sends l bytes to each participant of the chat, where l is the length of the message.

As Polycarp has no time, he is asking for your help in solving this problem.
Input

Input file will contain not more than 100 commands, each in its own line. No line will exceed 100 characters. Formats of the commands will be the following:

*    +`<name>` for 'Add' command.
*    -`<name>` for 'Remove' command.
*    `<sender_name>`:`<message_text>` for 'Send' command. 

`<name>` and `<sender_name>` is a non-empty sequence of Latin letters and digits. `<message_text>` can contain letters, digits and spaces, but can't start or end with a space. `<message_text>` can be an empty line.

It is guaranteed, that input data are correct, i.e. there will be no 'Add' command if person with such a name is already in the chat, there will be no 'Remove' command if there is no person with such a name in the chat etc.

All names are case-sensitive.

# Output

Print a single number — answer to the problem.

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
+Mike
Mike:hello
+Kate
+Dmitry
-Dmitry
Kate:hi
-Kate
```
    

</td>
<td>

```python
9
```
    
    
</td>
</tr>
<tr>

<td>
    

```diff
+Mike
-Mike
+Mike
Mike:Hi   I am here
-Mike
+Kate
-Kate
```
    

</td>
<td>

```python
14
```
    
    
</td>
</tr>
 </tbody>

</table>

# Analyzation

So we can see that in first problem: 
* If there is a `+` in front of the string, it should increatment a variable ( say `participants` )
* If there is a `-` in front of the string, it should decrement a variable ( say `participants` )

Then we can use a `for` loop to iterate over each string to see if there is a `:` in the string. Then:
* If there is a `:` split the string and get the length of that portion and then store it to a variable ( say `bytes_send` ) multiplied by `participants`

Special Note:
* You can't use `while` loop to get the user input. This is because `python` doesn't have a built in way to get `EOF`. That's why you use `sys.stdin`

# Solution ( Python )

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
    elif i[0] == "-":
        participants -= 1
    else:
      text = i.split(":")[-1]
      bytes_send += len(text) * participants

print(bytes_send)

```


# Solution ( C Plus Plus )

```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    vector<string> arr;
    string s;

    while (1)
    {
        char x = getchar();
        if (x == EOF)
            break;

        if (x == '\n')
        {

            arr.push_back(s);
            s = "";
        }
        else
            s += x;
    }
    int participants = 0;
    int bytes_send = 0;

    for (auto p : arr)
    {
        if (p[0] == '+')
            participants++;

        else if (p[0] == '-')
            participants--;
        else
        {

            for (int i = 0; i < p.size(); i++)
            {
                char x = p[i];
                if (x == ':')
                {
                    bytes_send += participants * (p.size() - (i + 1));
                    break;
                }
            }
        }
    }
    cout << bytes_send;
}
```