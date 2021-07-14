From https://jsisweird.com/

1. true + false

Output: 1

This question sets the tone for many of the upcoming questions. All four options may sound quite reasonable for someone who does not already know the answer. The short answer is that the booleans are converted to their numeric representations. Learn more in the ECMAScript Language Specification.

```js
Number(true); // -> 1
Number(false); // -> 0
1 + 0; // -> 1
```

2. [,,,].length

Output: 3

[,,,] outputs an array with three empty slots. The last comma is a trailing comma.

If you don't think this is weird enough yet, then take a look at this:

```js
[,] + [,]; // -> ""
[] + [] === [,] + [,]; // -> true
[,,,] + [,,,]; // -> ",,,,"
([,,,] + [,,,]).length === [,,,,].length; // -> true
To find resources that explain the addition operator with arrays, take a look at the explanation for question 3, directly below this.
```

3. [1, 2, 3] + [4, 5, 6]

Output: "1,2,34,5,6"

The extremely simplified answer is that the arrays are converted to strings and are then concatenated. See how this happens here. To learn more about this behavior, visit this StackOverflow answer for a mid-level explanation or this blog post for a more detailed one.

Adding a trailing comma doesn't change anything, by the way:

[1, 2, 3,] + [4, 5, 6]; // -> "1,2,34,5,6"

But, I suppose, if you really want to convert your arrays to comma-separated strings and combine them, you could write something stupid like this:

[1, 2, 3] + [, 4, 5, 6]; // -> "1,2,3,4,5,6"
Or, even dumber, this:

[1, 2, 3, ""] + [4, 5, 6]; // -> "1,2,3,4,5,6"
Probably best not to use the addition operator together with arrays, though. If you do want to combine two arrays for real, this is a better approach:

[...[1, 2, 3], ...[4, 5, 6]];

4. 0.2 + 0.1 === 0.3

Output: false
You answered: true

This is a dilemma of comparing floating-point values. Instead of comparing two floating points directly, one should compare the floating points with some level of tolerance. This StackOverflow answer explains this problem in greater detail.

```js
0.2 + 0.1; // -> 0.30000000000000004;
0.2 + 0.1 > 0.3; // -> true
```

5. 10,2

Output: 2

The comma operator simply returns the value of the last operand.

```js
10, 2; // -> 2
1, 2, 3, 4; // -> 4
42, "pineapple", true; // -> true
```

6. !!""

Output: false

You can add two exclamation marks before any value to get its boolean representation. Usually, anything with a value is true, and anything without a value is false, according to w3schools.

```js
Boolean(""); // -> false
```

7. +!![]

Output: 1

You might expect the boolean representation of an empty array to be false, much like it is for an empty string or the number 0, but it returns true. The plus character then converts true to its numeric representation.

```js
Boolean([]); // -> true
Number(true); // -> 1
```

8. !!!true

Output: false

It's incredibly unusual to put three or more exclamation marks in a row, so you may not realize that it is something you can even do.

But why stop at only three when you could write incredibly unreadable code?

```js
!!!!!!!!!!!!true; // -> true
```

9. true == "true"

Output: false

According to the rules of abstract equality comparison, both of these values are converted to numbers.

```js
Number(true); // -> 1
Number("true"); // -> NaN
1 == NaN; // -> false
```

10. 010 - 03

Output: 5

010 is treated as an octal number by JavaScript. Thus, its value is in base 8. Mozilla explains octal numbers here.

```js
010; // -> 8
03; // -> 3
8 - 3; // -> 5
```

You can go all out with octal numbers, if you'd like:

01111111111111111; // -> 40210710958665
By the way, the number of leading zeroes doesn't matter:

010 === 0000000010; // -> true

11. "" - - ""

Output: 0

These two empty strings are both converted to 0.

```js
Number(""); // -> 0
0 - - 0; // -> 0
```

The expression might become a bit clearer if I write it like this:

```js
+"" - -"";
+0 - -0;
```

Please note that, while I put the space between the minus sign and the empty string simply to attempt to confuse you, the space between the minus signs themselves is important:

```js
- -""; // -> 0
--""; // -> SyntaxError
```

12. null + 0

Output: 0

Null converts to its numeric representation: 0.

```js
Number(null); // -> 0
0 + 0; // -> 0
```
This also means that while...

```js
null === false; // -> false
```
... this is true:

```js
+null === +false; // -> true
```

13. 0/0

Output: NaN

As there is no meaningful numerical answer to the equation 0/0, the output is simply NaN.

```js
isNaN(0/0); // -> true
```

14. 1/0 > Math.pow(10, 1000)

Output: false

JavaScript treats both of these values as infinite, and infinity is equal to infinity. Learn more about infinities on Wikipedia.

```js
1/0; // -> Infinity
Math.pow(10, 1000); // -> Infinity
Infinity > Infinity; // -> false
```

15. true++

Output: SyntaxError

Our first and only syntax error. I put SyntaxError as an option on a lot of the questions, hoping that some users would find some syntax so bizarre that it could not possibly be allowed. So, I felt that I had to add at least one expression that actually does result in a SyntaxError.

By the way, undefined++ does not result in a SyntaxError:

```js
1++; // -> SyntaxError
"x"++; // -> SyntaxError
undefined++; // -> NaN
```

And, of course, just to be completely clear, this is valid syntax:

```js
let x = true;
x++;
x; // -> 2
```

16. "" - 1

Output: -1

While the addition operator (+) is used both for numbers and strings, the subtraction operator (-) has no use for strings, so JavaScript interprets this as an operation between numbers. An empty string converts to 0.

```js
Number(""); // -> 0
0 - 1; // -> -1;
```

This would still be true even if the string had a space (or more) inside of it:

```js
" " - 1; // -> -1;
```
However, if we use the addition operator, then string concatenation takes priority:

```js
"" + 1; // -> "1";
```

17. (null - 0) + "0"

Output: "00"

```js
Number(null) - 0; // -> 0
0 + "0"; // -> "00"
```

But if the question had used only the subtraction operator, the result would have been different:

```js
(null - 0) - "0"; // -> 0
```

18. true + ("true" - 0)

Output: NaN

You might suspect that JS is so bananas that it would convert the string literal to its boolean value and then its numerical representation. It's not quite that bananas, however. What actually happens is that it tries to convert the string to a number and fails.

```js
Number("true"); // -> NaN
```

19. !5 + !5
Output: 0
You answered: 0
You got it right!
All positive numbers are represented by the boolean true. The opposite of true is false, and false converts to 0.

Boolean(5); // -> true
!true; // -> false
Number(false); // -> 0
0 + 0; // -> 0
20. [] + []
Output: ""
You answered: []
You answered incorrectly.
This question is closely tied to question 3. Again, the extremely simplified answer is that JavaScript converts the arrays to strings. Scroll up to question 3 to find resources that explain this behavior.

[].toString(); // -> ""
"" + ""; // -> ""
Also, like I mentioned in the explanation for question 2, these expressions are equal, due to trailing commas:

[] + [] === [,] + [,]; // -> true
Even though these arrays are different, they are both converted to empty strings:

[].length; // -> 0
[,].length; // -> 1
[].toString() === [,].toString(); // -> true
Of course, this is also true:

Number([]) === Number([,]); // -> true
21. NaN === NaN
Output: false
You answered: true
You answered incorrectly.
This is due to a decision made by the IEEE-754 committee for a few reasons, such as space efficiency and the fact that the function isNaN didn't exist at the time. Stephen Canon explains this in detail here.

Also, while NaN may not be equal to itself...

NaN === NaN; // -> false
... these two statements are true.

isNaN(NaN); // -> true
Object.is(NaN, NaN); // -> true
22. NaN++
Output: NaN
You answered: NaN
You got it right!
NaN is not a number, so it cannot be incremented. This also means that NaN and NaN++ represent the same value:

Object.is(NaN, NaN++); // -> true
23. undefined + false
Output: NaN
You answered: "undefinedfalse"
You answered incorrectly.
While false can be converted to a number, undefined cannot.

Number(false); // -> 0
Number(undefined); // -> NaN
NaN + 0; // -> NaN
However, undefined is represented by false:

!!undefined === false; // -> true
Which means that we can add undefined and false like so:

!!undefined + false; // -> 0
24. +0 === -0
Output: true
You answered: true
You got it right!
Positive zero and negative zero are equal in JavaScript. Interestingly, though, the Object.is function disagrees. There are a few scenarios where === and Object.is disagree with one another, and this is one of them.

Object.is(0, -0); // -> false
25. - "" + + "1" * null - [,]
Output: 0
You answered: 0
You got it right!
The finale wraps up much of the bizarre syntax that I've covered in this quiz. Let's break it down, piece by piece:

-""; // -> -0
+"1"; // -> 1
Number(null); // -> 0
Number([,]); // -> 0
Add it all together:

-0 + 1 * 0 - 0; // -> 0
