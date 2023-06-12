<div align="center">
  <img height="60" src="./img/javascript-logo.png">
  <h1>JavaScript Workout 💪🏼</h1>

<span>This is a collection of short JavaScript programming solutions that you will encounter everyday.

As with any programming language, JavaScript has its own way of solving problems. Knowing how to do basic data type conversion or array manipulations will make you deliver your solutions faster 😊.

I hope this helps you to be a more efficient JavaScript developer 🤟💀🤟.

Feel free to reach out to me 🤙! <br />

<a href="https://www.mydatahack.com" target="_blank">Blog</a> || <a href="https://github.com/aws-lambda-template-generator" target="_blank">Open Source Project</a> || <a href="https://thehondas.bandcamp.com/" target="_blank">Band Camp</a>

If you want to make a suggestion or contribute to this, feel free to pull the repo and make a pull request!

</span>
<br />
<h1>Topics🏷</h1>
<p><b><a href="#1">(1) Array of objects</a></b></P>
<p><b><a href="#2">(2) Array</a></b></P>
<p><b><a href="#3">(3) String format</a></b></P>
<p><b><a href="#4">(4) Spread Syntax</a></b></P>
<p><b><a href="#5">(5) Rest Parameter Syntax</a></b></P>
<p><b><a href="#6">(6) Trivia</a></b></P>
</div>
<br />

---

<span id="1"></span>

### (1) ARRAY OF OBJECTS

---

<b>1. Create an array of number from an array of an object and do calculation</b>

input

```javascript
const input = [
  { name: "name A", score: 2 },
  { name: "name B", score: 1 },
  { name: "name C", score: 4 },
  { name: "name D", score: 5 },
];
```

output

```javascript
# (1) Create an array
[2, 1, 4, 5]

# (2) Return Sum of the array
12

# (3) Return Max
5
```

<details><summary><b>Answer</b></summary>

<b>Array.prototype.map</b> will create an array of the value from the selected key in the JSON object.

<b>Array.prototype.reduce</b> will accumulate the number. The first argument is the accumulator function and second argument is the starting value.

<b>Function.prototype.apply</b> takes this value as a first argument and an array as a second argument. It will apply the function to the array. For example, Math.sum.apply(null, [1, 2, 3]) will sum up all the numbers in the array. Math.sum works with Math.sum(1, 2, 3). But, to make it work with an array, we need to use apply function.

```javascript
# (1)
input.map(x => x.score);
// alternatively we can map array without .map()
// Array.from takes mapFunction as a second argument, which will be called on every element of an array.
Array.from(input, ({score}) => score);

# (2)
imput.map(x => x.score).reduce((a, b) => a + b, 0);

# (3)
Math.max.apply(null, input.map(x => x.score));
// or use spread operator
Math.max(...input.map(x => x.score));
```

</details>

<b>2. Getting max datetime from a string from the object array</b>

input

```javascript
const input = [
  { datetime: "2020-04-29T03:23:48Z", spend: 300.0 },
  { datetime: "2020-06-03T23:26:43Z", spend: 300.0 },
  { datetime: "2020-05-30T17:28:14Z", spend: 300.0 },
  { datetime: "2020-06-27T18:21:07Z", spend: 300.0 },
];
```

output - return it as a Date object in the local time

```javascript
Sun Jun 28 2020 04:21:07 GMT+1000
```

<details><summary><b>Answer</b></summary>

We can convert the string into a local time with new Date(). Then use the technique from question 1 to create an datetime array and apply max.

```javascript
new Date(
  Math.max.apply(
    null,
    input.map((x) => new Date(x.datetime))
  )
);

// or use spread
new Date(Math.max(...input.map((x) => new Date(x.datetime))));
```

</details>

<b>3. Adding new key-value pair in all the objects in an array</b>

You have an array of an object with name. Can you add an unique id to all the objects?

input

```javascript
const input = [{ name: "John" }, { name: "Tyson" }, { name: "Joan" }];
```

output

```javascript
[
  { name: "John", id: 1 },
  { name: "Tyson", id: 2 },
  { name: "Joan", id: 3 },
];
```

<details><summary><b>Answer</b></summary>

We can use the map and use the index to add an unique id that increments.

```javascript
input.map((data, index) => ({ name: data.name, id: index + 1 }));
```

</details>

<b>4. Sorting object array by a key</b>

input

```javascript
const input = [
  { name: "John", score: "432" },
  { name: "Joe", score: "125" },
  { name: "Zoe", score: "320" },
  { name: "Ziggy", score: "532" },
  { name: "Dave", score: "211" },
  { name: "Sarah", score: "621" },
];
```

output - sort it in descending order

```javascript
0: {name: "Sarah", score: "621"}
1: {name: "Ziggy", score: "532"}
2: {name: "John", score: "432"}
3: {name: "Zoe", score: "320"}
4: {name: "Dave", score: "211"}
5: {name: "Joe", score: "125"}
```

<details><summary><b>Answer</b></summary>
<b>Array.prototype.sort</b> takes a callback function as a sorter. We can write a simple call back function and pass it.

```javascript
const sorter = (key) => {
  return (a, b) => {
    if (a[key] > b[key]) {
      return -1;
    } else if (a[key] < b[key]) {
      return 1;
    } else {
      return 0;
    }
  };
};

input.sort(sorter("score"));
```

The above solution is too convoluted if we just want to sort by score. We can do this. This however does not work with `name` because they are string values.

```js
// Ascending
input.sort((a, b) => a.score - b.score);

// Descending
input.sort((a, b) => b.score - a.score);

// This doesn't work...
input.sort((a, b) => b.name - a.name);
```

</details>

<b>5. Sorting object array by multiple keys</b>

We sorted an object array by a key in the previous question. What if the score is tie and want to sort it by the second key, name.

input

```javascript
const input = [
  { name: "John", score: "432" },
  { name: "Joe", score: "125" },
  { name: "Zoe", score: "320" },
  { name: "Ziggy", score: "532" },
  { name: "Dave", score: "211" },
  { name: "Sarah", score: "621" },
  { name: "Alex", score: "320" },
];
```

output - see when the sore is the same, it's sorted by name.

```javascript
0: {name: "Sarah", score: "621"}
1: {name: "Ziggy", score: "532"}
2: {name: "John", score: "432"}
3: {name: "Alex", score: "320"}
4: {name: "Zoe", score: "320"}
5: {name: "Dave", score: "211"}
6: {name: "Joe", score: "125"}
```

<details><summary><b>Answer</b></summary>

Apply the same method for the previous question. When the first key is the same, we can add another logic to sort it by the second key. Reference <a target="_blank" href="https://www.mydatahack.com/sorting-json-by-multiple-keys-with-javascript/">here</a>

```javascript
function rankingSorter(firstKey, secondKey) {
  return function (a, b) {
    if (a[firstKey] > b[firstKey]) {
      return -1;
    } else if (a[firstKey] < b[firstKey]) {
      return 1;
    } else {
      if (a[secondKey] > b[secondKey]) {
        return 1;
      } else if (a[secondKey] < b[secondKey]) {
        return -1;
      } else {
        return 0;
      }
    }
  };
}

input.sort(rankingSorter("score", "name"));
```

</details>

<b>6. Sorting object array by datetime</b>

Sort array by datetime.

input

```javascript
const arrays = [
  { datetime: "2020-04-29T03:23:48Z", spend: 300.0 },
  { datetime: "2020-06-03T23:26:43Z", spend: 300.0 },
  { datetime: "2021-05-30T17:28:14Z", spend: 300.0 },
  { datetime: "2020-06-27T18:21:07Z", spend: 300.0 },
];
```

output - return the latest datetime record

```javascript
{datetime: '2021-05-30T17:28:14Z', spend: 300.00}
```

<details><summary><b>Answer</b></summary>

Use custom function for sort. getTime() will convert datetime to a number of milliseconds since midnight Jan 1, 1970. We can also use `localeCompare()` method which returns a number indicating whether a reference string comes before, or after, or is the same as the given string in sort order.

```js
arrays.sort((a, b)
  => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
)[0]

// Using localeCompare()
arrays.sort(
function(a,b){
  return b.datetime.localeCompare(a.datetime)
})

```

</details>

<b>7. Update object values</b>

```js
// input
const height = {
  john: 170,
  allen: 182,
  jack: 168,
};

// output
const output = {
  john: "170cm",
  allen: "182cm",
  jack: "168cm",
};
```

<details><summary><b>Answer</b></summary>

Use `Object.entries` to create an array of the key-value pairs.
`Object.entries(height)` will create `[['john', 170], ...]`.

```js
const output = Object.entries(height).map((v) => ({ [v[0]]: `${v[1]}cm` }));
```

</details>

<b>8. Aggregate by year</b>

Aggregate the percentage by key.

input

```js
const breakdown = [
  {
    percentage: 80,
    key: 2011,
  },
  {
    percentage: 10,
    key: 2010,
  },
  {
    percentage: 5,
    key: 2011,
  },
  {
    percentage: 5,
    key: 2010,
  },
  {
    percentage: 5,
    key: 2011,
  },
];
```

output - return the sum of percentage by year.

```javascript
[
  {
    percentage: 90,
    key: 2011,
  },
  {
    percentage: 15,
    key: 2010,
  },
];
```

<details><summary><b>Answer</b></summary>

Approach 1: We can sort the data in a descending order and then use reduce to aggregate.

```javascript
const sorted = breakdown.sort((a, b) => a.key - b.key);

const aggregated = breakdown
  .sort((a, b) => b.key - a.key)
  .reduce((acc, next) => {
    const currentAccIndex = acc.length - 1;
    if (acc.length && acc[currentAccIndex].key === next.key) {
      acc[currentAccIndex].percentage + next.percentage;
    } else {
      acc[currentAccIndex + 1] = next;
    }
    return acc;
  }, []);
```

Approach 2: This feels more like a JS witchcraft, doesn't it? Using `Object.entries`, and then reduce to aggregate.

```javascript
const result = Object.entries(
  breakdown.reduce(
    (aggregate, current) => ({
      ...aggregate,
      [current.key]:
        (aggregate[current.key] ? aggregate[current.key] : 0) +
        current.percentage,
    }),
    {}
  )
).map((aggregate) => ({
  year: aggregate[0],
  percentage: aggregate[1],
}));

console.log(`output from the 3rd way ${JSON.stringify(result)}`);
```

</details>

---

<span id="2"></span>

### (2) ARRAY

---

<b>1. Create an array with a sequence of number</b>

output

```javascript
[0, 1, 2, 3, 4];
```

<details><summary><b>Answer</b></summary>

We can use either spread operator or Array from() and key() for ES6✌

For a reference, knowing how to use the Set object is great. Interestingly, this is not supported by IE11. If you do Array.from(new Set([1, 2, 3])), you will get an empty array without an error. Use set polyfill for IE11 support.

```javascript
[...Array(5).keys()];

Array.from(Array(5).keys());

Array.from(new Set([0, 1, 2, 3, 4]));
```

</details>

<b>2. Removing duplicates from an array</b>

Remove duplicate value from an array.

```javascript
const arr = ["apple", "orange", "banana", "orange", "apple"];
```

<details><summary><b>Answer</b></summary>

The `Set` type is new in ES6. It's similar to array, but not quite. It contains no duplicate value (member values are unique). So first, we dedupe by converting array into a set object and then convert back to an array with `Array.from` or spread operator.

```javascript
Array.from(new Set(arr));

// or
[...new Set(arr)];
```

</details>

<b>3. Replace the specific value</b>

Replace watermelon with blueberry in the array below.

input

```javascript
const fruits = ["apple", "banana", "watermelon", "melon"];
```

output

```javascript
["apple", "banana", "blueberry", "melon"];
```

<details><summary><b>Answer</b></summary>

Use map with if condition.

```javascript
const newFruits = fruits.map((x) => {
  if (x === "watermelon") return "blueberry";
  return x;
});
```

</details>

<b>4. modulo operation</b>

Create an array of the reminder after dividing each by 3. Let's try map the value without using map(). What can you do?

input

```javascript
const input = [3, 4, 5, 6, 7];
```

output

```javascript
[0, 1, 2, 0, 1];
```

<details><summary><b>Answer</b></summary>

We can map array without using .map(). Array.from takes arrayLike object as an first argument and map function applied to every element of the array as a second argument. Third argument is the value to use as this when executing map function. Second and third arguments are optional.

```javascript
Array.from(input, (x) => x % 3);
```

</details>

<b>5. Empty an array</b>

Empty the array below:

input

```javascript
const arr = [1, 2, 3, 4];
```

output

```javascript
[];
```

<details><summary><b>Answer</b></summary>

We can just set the array length to 0. That's it 🤯

```javascript
arr.length = 0;
```

</details>

<b>6. Fill an empty array</b>

Create an array of 10 1s as below.

output

```javascript
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
```

<details><summary><b>Answer</b></summary>

We can use `fill()` to fill an empty array with the value.

```javascript
new Array(10).fill(1);
```

</details>

<b>7. Find common value from two arrays</b>

Find the common value from two arrays.

input

```javascript
const numOne = [0, 2, 4, 6, 8, 8];
const numTwo = [1, 2, 3, 4, 5, 6];
```

output

```javascript
[2, 4, 6];
```

<details><summary><b>Answer</b></summary>

First, we need de-duplicate the first array and use filter to find the common value.

```javascript
[...new Set(numOne)].filter((x) => numTwo.includes(x));
```

</details>

<b>8. Get random value from an array</b>

Return random value from the color array below

```javascript
const colors = ["blue", "white", "green", "navy", "pink", "black", "brown"];
```

<details><summary><b>Answer</b></summary>

`Math.random()` gives a random number between 0 and one. Then, we multiply with length of the array and take the floor to generate random index.

```javascript
colors[Math.floor(Math.random() * colors.length)];
```

</details>

<b>9. Get the last index of the value that occurs</b>

Get the last index of 5 occurs in the array below. You need to return 9.

```javascript
const numbers = [1, 5, 2, 6, 3, 5, 2, 3, 6, 5, 2, 7];
```

<details><summary><b>Answer</b></summary>

Here is the interesting method that javascript has. lastIndexOf().

```javascript
numbers.lastIndexOf(5);
```

</details>

<b>9. Get the last element of an array</b>

Get the last element of the array

```javascript
const array = [1, 2, 3, 4];
```

output

```bash
4
```

<details><summary><b>Answer</b></summary>

```javascript
array.slice(-1)[0];

array.slice(-1).pop;

array[array.length - 1];
```

</details>

<b>10. Convert array to string</b>

```js
const language = ["Japanese", "Spanish", "English", "German"];
```

From the array above, return string representing the elements of the list.

output

```bash
# (1)
Japanese, Spanish, English, and German

# (2)
Japanese, Spanish, English, or German

# (3)
Japanese Spanish English German
```

<details><summary><b>Answer</b></summary>

Intl internationalization API has `ListFormat` object. `Intl.ListFormat` is supported in all major browsers except IE11.

```javascript
// (1)
const listFormatter = new Intl.ListFormat("en", {
  style: "long",
  type: "conjunction",
});

console.log(listFormatter.format(language));

typeof listFormatter.format(language); // -> string

// (2)
const listFormatter = new Intl.ListFormat("en", {
  style: "short",
  type: "disjunction",
});

// (3)
const listFormatter = new Intl.ListFormat("en", {
  style: "narrow",
  type: "unit",
});
```

</details>

---

<span id="3"></span>

### (3) STRING FORMAT

---

<b>1. Currency Format</b>

input

```javascript
const amount = 2398622.26;
```

output

```javascript
"$2,398,622.26";
```

<details><summary><b>Answer</b></summary>

By using toLocaleString(), we can format currency with one line 🤯.

```javascript
amount.toLocaleString("en-US", {
  style: "currency",
  currency: "USD",
});
```

We can natively format JavaScript Numbers.

<img alt="formatting-number-cheatsheet" src="./img/format-js-numbers-crop.png" width="900"/>

If you want to do this without native API, it gets really intense...

```javascript
const formatAmount = (amount) => {
  const splitAmount = amount.split(".");
  const dollar = splitAmount[0];
  const decimal = splitAmount[1];
  const index = dollar.length / 3;
  const dollarArray = [];
  for (let i = 1; i <= index + 1; i++) {
    const startIndex = dollar.length - i * 2 - 1 - (i - 1);
    const finalStartIndex = startIndex < 0 ? 0 : startIndex;
    dollarArray.push(dollar.substring(finalStartIndex, startIndex + 3));
  }
  return `$${dollarArray.reverse().join(",")}.${decimal}`;
};
```

</details>

<b>2. Datetime formatting</b>

Formatting the datetime string below into a local time.

input

```javascript
"2020-06-28T23:59:01Z";
```

output - this is the local time (AEST for me)

```javascript
"29/06/2020 09:59:01 AM";
```

<details><summary><b>Answer</b></summary>

Let's give it a go by using <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat">Intl.DateTimeFormat.</a> This will give you '29/06/2020'.

```javascript
new Intl.DateTimeFormat("en-AU").format(new Date("2020-06-28T23:59:01Z"));
```

Now, Intl.DateTimeFormat has options. Let's pass the options.

```javascript
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
  timeZone: "Australia/Sydney",
};

const formatted = new Intl.DateTimeFormat("en-AU", options).format(
  new Date("2020-06-28T23:59:01Z")
);
```

The above will give us the output of '29/06/2020, 9:59:01 am'. We need to format this.

```javascript
formatted.toUpperCase().split(", ").join(" ");
```

That's it 🤙!

If you want to do this without native API, it gets long 🐢.

```typescript
formatUtcToLocal(timestamp: string): string {
  const localTime = new Date(timestamp)
  const year = localTime.getFullYear()
  const month = this.formatSingleDigit(localTime.getMonth() + 1)
  const day = this.formatSingleDigit(localTime.getDate())
  const hour = this.formatSingleDigit(this.convertHour(localTime.getHours()))
  const minutes = this.formatSingleDigit(localTime.getMinutes())
  const seconds = this.formatSingleDigit(localTime.getSeconds())
  const amOrPm = localTime.getHours() > 12 ? 'PM' : 'AM'

  return `${day}/${month}/${year} ${hour}:${minutes}:${seconds} ${amOrPm}`
}

formatSingleDigit(value: number): string {
  const formattedMonth = `0${value}`
  return formattedMonth.substring(formattedMonth.length - 2, formattedMonth.length)
}

convertHour(hour: number): number {
  if (hour > 12) {
      return hour - 12
  }
  return hour
}
```

</details>

---

<span id="4"></span>

### (4) SPREAD SYNTAX

---

Spread syntax is cool 🥳. Use spread syntax for all the questions. Let's build spread syntax muscle memory 🐣🐣🐣!

<b>1. Spread with arrays</b>

input

```javascript
const fruits = ["apple", "banana", "blueberry"];
const vegs = ["lettuce", "tomato"];
```

Without spread, we would use `.concat()` to combine two arrays. Use spread syntax to `.concat()` two arrays.

output

```javascript
["apple", "banana", "blueberry", "lettuce", "tomato"];
```

<details><summary><b>Answer</b></summary>

```javascript
const combined = [...fruits, ...vegis];

// it is the same as
const combined = fruits.concat(vegis);
```

</details>

<b>2. Add object to an array</b>

Create a new object with a new fruit added and preserve original fruits array the same.

input

```javascript
const fruits = [
  { id: 1, item: "apple" },
  { id: 2, item: "orange" },
];
const newFruit = { id: 3, item: "banana" };
```

output

```javascript
// Create a new object called newFruits
[
  { id: 1, item: "apple" },
  { id: 2, item: "orange" },
  { id: 3, item: "banana" },
];
```

<details><summary><b>Answer</b></summary>

```javascript
const newFruits = [...fruits, newFruit];
```

If you use Array.push() as below, it will modify the original array fruits. With spreading, we can preserve the original array.

```javascript
fruits.push(newFruit);
```

</details>

<b>3. Create an array from a set</b>

We can use spread syntax to create an iterable array from a set.

input

```javascript
const fruitSet = new Set();
set.add("apple");
set.add("orange");
set.add("banana");
```

output - create a new array called fruitArray

```javascript
["apple", "orange", "banana"];
```

<details><summary><b>Answer</b></summary>

Using spread syntax with a set object will create an array.

```js
[...fruitSet];
```

Set is a collection of unique values (either primitive or object).

```javascript
const fruitSet = new Set();
set.add("apple");
set.add("apple");
set.add("banana");
// Set only contains "apple" and "banana"
```

We can actually create an array with unique values with Set and spread syntax.

```js
[...new Set(["apple", "banana", "apple", "banana", "orange"])];
// results in ['apple', 'banana', 'orange']
```

</details>

<b>4. Create an array from a string</b>

We can also use spread to create an array from a string.

input

```javascript
const str = "spread";
```

output

```javascript
["s", "p", "e", "a", "d"];
```

<details><summary><b>Answer</b></summary>

```javascript
const strArray = [...str];
```

</details>

<b>5. Copying an object</b>

We can spread an object to copy and update. It is the equivalent of Object.assign().

input

```javascript
const original = { id: 1, fruit: "apple" };
```

output - create an copy of the original, copied.

<details><summary><b>Answer</b></summary>

```javascript
const copied = { ...original };
```

This is the equivalent of

```javascript
const copied = Object.assign({}, original);
```

</details>

<b>6. Adding a new property on an existing object</b>

Add a new property to an existing object in an immutable fashion.

input

```javascript
const fruit = { id: 1, name: "apple" };
```

output

```javascript
{ id: 1, name: 'apple', sweet: true }
```

<details><summary><b>Answer</b></summary>

```javascript
const updatedFruit = { ...fruit, sweet: true };
```

We can do the spread if the added property is an object as below.

```javascript
const add = { sweet: true }
const updatedFruit = { ...fruit, ...add }
// Then this will create the object with a new property
{ id: 1, name: 'apple', sweet: true }
```

</details>

<b>7. Updating a property on an existing object</b>

Update an existing property to create a new object in an immutable fashion.

input

```javascript
const fruit = { id: 1, name: "apple", taste: "good" };
```

Update two properties with spread syntax.
output

```javascript
{ id: 1, name: 'banana', taste: 'great' }
```

<details><summary><b>Answer</b></summary>

To update multiple properties, we can just add them as below.

```javascript
const updatedFruit = { ...fruit, name: "banana", taste: "great" };
```

Note that the order of the properties does not matter.
We can do it like `{ ...fruit, taste: 'sweet', id: 4 }` and it updates the correct property as long as the name matches.

We can update the property of the object from an object with spread, too!

```javascript
const update = { name: 'banana', taste: 'great' }
const updatedFruit = { ...fruit, ...update }
// this will update the property
{ id: 1, name: 'banana', taste: 'great' }
```

</details>

<b>8. Spread with nested object</b>

Spread with nested object gets hairy. See if you can add a new property to the nested object as below.

input

```javascript
const fruit = {
  id: 1,
  item: {
    name: "apple",
    sweet: true,
  },
};
```

output - add an price property to item

```javascript
{
  id: 1,
  item: {
    name: 'apple',
    sweet: true,
    price: 1.0
  }
}
```

<details><summary><b>Answer</b></summary>

Nested objects need to be spread. In another word, we can spread the inner object, item, to retain the existing property.

```javascript
const newFruit = { ...fruit, item: { ...fruit.item, price: 1.0 } };
```

</details>

<b>9. More spread with nested objects</b>

Use spread to update item.price.amount to 2.0.

input

```javascript
const fruit = {
  id: 1,
  item: {
    name: "apple",
    sweet: true,
    price: {
      currency: "US",
      amount: 1.0,
    },
  },
};
```

output - add an price property to item

```javascript
{
  id: 1,
  item: {
    name: 'apple',
    sweet: true,
    price: {
      currency: 'US',
      amount: 2.0
    }
  }
}
```

<details><summary><b>Answer</b></summary>

```javascript
const updated = {
  ...fruit,
  item: {
    ...fruit.item,
    price: {
      ...fruit.item.price,
      amount: 2.0,
    },
  },
};
```

</details>

<b>10. Spread function call</b>

Spread can be used in a function call. We have a function called addAll. This will take 3 parameters. If we have an array of 3 numbers, how can we use the function?

```javascript
const addAll = (a, b, c) => a + b + c;

// use addAll function on the array below
const input = [1, 2, 3];
```

<details><summary><b>Answer</b></summary>

This is a cool use case. We can in fact pass the spread input.

```javascript
addAll(...input);
```

This is the same as using apply(). But, spread makes it shorter.

```javascript
addAll.apply(null, input);
```

</details>

<b>11. Convert array to an object</b>

Another interesting use case for spread. Convert the array to an object as below.

input

```javascript
const arr = ["1", "2", "3"];
```

output

```javascript
{ 0: '1', 1: '2', 2: '3' }
```

<details><summary><b>Answer</b></summary>

It's the quick and dirty way to convert an array to an object with spread✌

```javascript
{ ...arr }
```

</details>

---

<span id="5"></span>

### (5) REST PARAMETER SYNTAX

---

In JavaScript, three dot syntax is interesting. It can be either spread or rest parameter syntax and they do exactly the opposite 🤯. Let's test your knowledge on rest parameter syntax 🚀.

<b>1. ...args</b>

What is the output of below?

```javascript
function check(...args) {
  console.log(args);
}

check(1, 2, 3, 4);
```

<details><summary><b>Answer</b></summary>

Rest parameter syntax will create an array instead of unpacking an array of object into individual values as in spread syntax.

The output will become an array of numbers 🤯.

```javascript
[1, 2, 3, 4];
```

</details>

<b>2. ...args with other arguments</b>

What is the output of below?

```javascript
function check(firstNum, secondNum, ...args) {
  console.log(firstNum);
  console.log(secondNum);
  console.log(args);
}

check(1, 2, 3, 4, 5);
```

<details><summary><b>Answer</b></summary>

Rest parameter syntax will create an array instead of unpacking an array of object into individual values as in spread syntax.

The output will become an array of numbers 🤯.

```javascript
1;
(2)[(3, 4, 5)];
```

</details>

<b>3. Destructing an array</b>

What is the output of below code?

```javascript
const [first, ...rest] = ["apple", "banana", "grape"];

console.log(first);
console.log(rest);
```

<details><summary><b>Answer</b></summary>

Rest parameter can be used when destructing arrays. `...rest` will creates the shorter array.

```javascript
apple[("banana", "grape")];
```

</details>

<b>4. Destructing an object</b>
What is the output of below code?

```javascript
const { id, ...rest } = { id: 1, name: "apple", price: 1.0 };

console.log(id);
console.log(rest);
```

<details><summary><b>Answer</b></summary>

Rest parameter can be used when destructing objects.

```javascript
1
{ name: 'apple', price: 1.0 }
```

</details>

<br />

<span id="6"></span>

### (6) Trivia

<b>1. Truthy or Falsy?</b>

Which one is evaluated as truthy?

1. the number `0`
2. the BigInt `0n`
3. the keyword `null`
4. the keyword `undefined`
5. the boolean `false`
6. the number `NaN`
7. empty string `''`
8. empty array `[]`
9. empty object `{}`

<details><summary><b>Answer</b></summary>

Empty array `[]` and empty object `{}` are evaluated as `truthy`.

Any primitive type evaluate to true in JavaScript, with the exception of 1 to 7 🤯.

</details>
<br />

<b>2. What is `!!`?</b>

<details><summary><b>Answer</b></summary>

Returns an associated boolean value. True or false according to whether it is truthy or falsy values.

```javascript
const number = 12;
!!number; // returns true
```

</details>
<br />

---

### REFERENCES

---

There is a great JavaScript questions to get to know the language better. Your JavaScript knowledge will skyrocket 🚀. Check out <a target="_blank" href="https://github.com/lydiahallie/javascript-questions">javascript-questions</a>

I subscribe to <a target="_blank" href="https://javascriptweekly.com/">JavaScript Weekly.</a> It's a weekly email informing you on what is happening on JS landscape as well as useful JS tips! Highly recommended.

There are many code challenges websites. My recommendation is <a target="_blank" href="https://edabit.com/challenges">edatbit.com</a>. If you are comfortable with JavaScript, go to the expert level. These interesting bite-size challenges will be a holiday for your mind 🌴.

You can get to build framework and library free JS apps from <a target="_blank" href="https://javascript30.com/">JavaScript30.com</a>. It's free.

I am copy and pasting emoji from <a target="_blank" href="https://unicode.org/emoji/charts/full-emoji-list.html">this website</a> 🥰.
