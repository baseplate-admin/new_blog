---
title: 71A. Way Too Long Words
date: 2024-1-15
tags: CodeForces
---

# Problem

Sometimes some words like `"localization"` or `"internationalization"` are so long that writing them many times in one text is quite tiresome.

Let's consider a word too long, if its length is **strictly more** than `10` characters. All too long words should be replaced with a special abbreviation.

This abbreviation is made like this: we write down the first and the last letter of a word and between them we write the number of letters between the first and the last letters. That number is in decimal system and doesn't contain any leading zeroes.

Thus, `"localization"` will be spelt as `"l10n"`, and `"internationalization"` will be spelt as `"i18n"`.

You are suggested to automatize the process of changing the words with abbreviations. At that all too long words should be replaced by the abbreviation and the words that are not too long should not undergo any changes.

# Input

The first line contains an integer `n (1 ≤ n ≤ 100)`. Each of the following n lines contains one word. All the words consist of lowercase Latin letters and possess the lengths of from `1` to `100` characters.

# Output

Print `n` lines. The `i`-th line should contain the result of replacing of the `i`-th word from the input data.


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
4
word
localization
internationalization
pneumonoultramicroscopicsilicovolcanoconiosis
```
    

</td>
<td>

```
word
l10n
i18n
p43s
```
    
    
</td>
</tr>
 </tbody>

</table>

# Analyzation

So we can see that in the string:

* If `string` has less than 10 characters we print it, using `len()` to get the length is a pretty good way to get string length.
* If `string` has more than 10 character, we have to do the following operation, so it looks like this `{FIRST_CHARACTER}{STRING_LENGTH-2}{LAST_CHARACTER}` (in order):
   - Get the first character and store it in a variable
   - Take the length of the string and minus 2 from it ( due to we removing first and last character )
   - Get the last character and store it in a variable

# Solution

```python
no_of_cases = int(input())

solution_list = []

for i in range(0, no_of_cases):
    word = input()
    if word_length := len(word) > 10:
        solution_list.append(f"{word[0]}{word_length-2}{word[-1]}")
    else:
        solution_list.append(word)


print("\n".join(solution_list))
```