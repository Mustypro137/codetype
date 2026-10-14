/*
 * CodeType – practice snippets
 *
 * SNIPPETS is an array (a list). Each item is an object with 4 keys:
 *   id         – unique name, for example "js-1"
 *   language   – the language name; this text is shown in the dropdown
 *   difficulty – "easy", "medium" or "hard"
 *   code       – the code to type, written between backticks ` `
 *
 * Rules for the code:
 *   - 5 to 15 lines, 4 spaces for indentation, never tabs.
 *   - The code starts right after the opening backtick and ends right
 *     before the closing backtick, at the start of the line (column 0).
 *   - Inside the backticks, three things need a backslash in front:
 *       write \\  to get \
 *       write \`  to get `
 *       write \${ to get ${
 *
 * To add a snippet: copy one object, give it a new id, change the code.
 * To add a language: use a new language name. The dropdown updates by itself.
 */

const SNIPPETS = [

    /* ===== JavaScript ===== */
    {
        id: "js-1",
        language: "JavaScript",
        difficulty: "easy",
        code: `const numbers = [4, 8, 15, 16, 23, 42];
let total = 0;
for (let i = 0; i < numbers.length; i++) {
    total += numbers[i];
}
console.log("Total:", total);`
    },
    {
        id: "js-2",
        language: "JavaScript",
        difficulty: "easy",
        code: `const user = {
    name: "Amina",
    age: 24,
    skills: ["HTML", "CSS", "JavaScript"]
};
const { name, skills } = user;
console.log(name + ' knows ' + skills.length + ' skills');`
    },
    {
        id: "js-3",
        language: "JavaScript",
        difficulty: "medium",
        code: `const products = [
    { name: "Laptop", price: 950, inStock: true },
    { name: "Mouse", price: 25, inStock: false },
    { name: "Keyboard", price: 70, inStock: true }
];
const available = products
    .filter((item) => item.inStock)
    .map((item) => item.name.toUpperCase());
console.log(available); // ["LAPTOP", "KEYBOARD"]`
    },
    {
        id: "js-4",
        language: "JavaScript",
        difficulty: "medium",
        code: `async function loadUser(id) {
    try {
        const response = await fetch("https://api.example.com/users/" + id);
        if (!response.ok) {
            throw new Error("HTTP error: " + response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Could not load user:', error.message);
        return null;
    }
}`
    },
    {
        id: "js-5",
        language: "JavaScript",
        difficulty: "hard",
        code: `class Counter {
    #count = 0;
    constructor(step = 1) {
        this.step = step;
    }
    increment() {
        this.#count += this.step;
        return this;
    }
    get value() {
        return this.#count;
    }
}
const counter = new Counter(5);
console.log(counter.increment().increment().value); // 10`
    },
    {
        id: "js-6",
        language: "JavaScript",
        difficulty: "hard",
        code: `function debounce(callback, delay = 300) {
    let timerId = null;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(null, args);
        }, delay);
    };
}
const input = document.querySelector("#search");
const onSearch = debounce((event) => {
    console.log(\`Searching for: \${event.target.value}\`);
}, 500);
input.addEventListener("input", onSearch);`
    },

    /* ===== Python ===== */
    {
        id: "py-1",
        language: "Python",
        difficulty: "easy",
        code: `fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())

print("Total:", len(fruits))`
    },
    {
        id: "py-2",
        language: "Python",
        difficulty: "easy",
        code: `squares = [n * n for n in range(1, 11)]
evens = [n for n in squares if n % 2 == 0]
print(squares)
print(evens)
print(f"Sum of evens: {sum(evens)}")`
    },
    {
        id: "py-3",
        language: "Python",
        difficulty: "medium",
        code: `scores = {"amina": 88, "bilal": 72, "chen": 95}

for name, score in scores.items():
    grade = "A" if score >= 90 else "B" if score >= 80 else "C"
    print(f"{name.title():<10} {score:>3}  ({grade})")

best = max(scores, key=scores.get)
print(f"Best student: {best}")`
    },
    {
        id: "py-4",
        language: "Python",
        difficulty: "medium",
        code: `def greet(name: str, greeting: str = "Hello", times: int = 1) -> str:
    message = f"{greeting}, {name}!"
    return " ".join([message] * times)


print(greet("Sara"))
print(greet("Omar", greeting="Salaam"))
print(greet("Lina", times=3))`
    },
    {
        id: "py-5",
        language: "Python",
        difficulty: "hard",
        code: `class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount

    def __repr__(self) -> str:
        return f"BankAccount(owner={self.owner!r}, balance={self.balance:.2f})"`
    },
    {
        id: "py-6",
        language: "Python",
        difficulty: "hard",
        code: `import json
from collections import Counter


def top_words(path: str, limit: int = 5) -> list[tuple[str, int]]:
    with open(path, encoding="utf-8") as file:
        words = [w.strip(".,!?;:'\\"").lower() for w in file.read().split()]
    counts = Counter(w for w in words if w)
    return counts.most_common(limit)


print(json.dumps(top_words("story.txt"), indent=4))`
    },

    /* ===== HTML ===== */
    {
        id: "html-1",
        language: "HTML",
        difficulty: "easy",
        code: `<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>`
    },
    {
        id: "html-2",
        language: "HTML",
        difficulty: "easy",
        code: `<article class="card">
    <img src="images/cat.jpg" alt="A grey cat sleeping">
    <h2>My Cat</h2>
    <p>She sleeps <strong>16 hours</strong> a day.</p>
    <a href="cats.html" target="_blank">Read more</a>
</article>`
    },
    {
        id: "html-3",
        language: "HTML",
        difficulty: "medium",
        code: `<form action="/signup" method="post">
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required>

    <label for="password">Password</label>
    <input type="password" id="password" name="password" minlength="8">

    <button type="submit">Sign up</button>
</form>`
    },
    {
        id: "html-4",
        language: "HTML",
        difficulty: "medium",
        code: `<table>
    <thead>
        <tr><th scope="col">Language</th><th scope="col">Year</th></tr>
    </thead>
    <tbody>
        <tr><td>JavaScript</td><td>1995</td></tr>
        <tr><td>Python</td><td>1991</td></tr>
        <tr><td>PHP</td><td>1995</td></tr>
    </tbody>
</table>`
    },
    {
        id: "html-5",
        language: "HTML",
        difficulty: "hard",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <main id="app"></main>
    <script src="js/main.js" defer></script>
</body>
</html>`
    },
    {
        id: "html-6",
        language: "HTML",
        difficulty: "hard",
        code: `<details open>
    <summary>Show the image</summary>
    <picture>
        <source srcset="images/hero.avif" type="image/avif">
        <source srcset="images/hero.webp" type="image/webp">
        <img src="images/hero.jpg" alt="Mountains at sunrise" width="800" height="450" loading="lazy">
    </picture>
    <label for="volume">Volume: <output id="result" for="volume">50</output></label>
    <input type="range" id="volume" min="0" max="100" value="50" oninput="result.value = this.value">
</details>`
    },

    /* ===== CSS ===== */
    {
        id: "css-1",
        language: "CSS",
        difficulty: "easy",
        code: `.button {
    padding: 12px 24px;
    background-color: #3366ff;
    color: white;
    border: none;
    border-radius: 8px;
}`
    },
    {
        id: "css-2",
        language: "CSS",
        difficulty: "easy",
        code: `a {
    color: #f5b942;
    text-decoration: none;
}

a:hover,
a:focus {
    text-decoration: underline;
}`
    },
    {
        id: "css-3",
        language: "CSS",
        difficulty: "medium",
        code: `.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
}

.navbar > a:first-child {
    font-weight: bold;
    margin-right: auto;
}`
    },
    {
        id: "css-4",
        language: "CSS",
        difficulty: "medium",
        code: `:root {
    --main-color: #0f1117;
    --accent: #f5b942;
    --radius: 10px;
}

.card {
    background: var(--main-color);
    border: 2px solid var(--accent);
    border-radius: var(--radius);
}`
    },
    {
        id: "css-5",
        language: "CSS",
        difficulty: "hard",
        code: `.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
}

@media (min-width: 768px) {
    .gallery {
        grid-template-columns: repeat(3, 1fr);
    }

    .gallery img:nth-child(3n + 1) {
        grid-column: span 2;
    }
}`
    },
    {
        id: "css-6",
        language: "CSS",
        difficulty: "hard",
        code: `.badge::before {
    content: "\\2605";
    margin-right: 4px;
}

input[type="checkbox"]:checked + label {
    color: #2ecc71;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); opacity: 0.8; }
}`
    },

    /* ===== Java ===== */
    {
        id: "java-1",
        language: "Java",
        difficulty: "easy",
        code: `public class Hello {
    public static void main(String[] args) {
        String name = "CodeType";
        System.out.println("Hello, " + name + "!");
    }
}`
    },
    {
        id: "java-2",
        language: "Java",
        difficulty: "easy",
        code: `public static double average(int[] scores) {
    int sum = 0;
    for (int i = 0; i < scores.length; i++) {
        sum += scores[i];
    }
    return (double) sum / scores.length;
}`
    },
    {
        id: "java-3",
        language: "Java",
        difficulty: "medium",
        code: `public static List<String> longNames(List<String> names) {
    List<String> result = new ArrayList<>();
    for (String name : names) {
        if (name.length() > 4) {
            result.add(name.toUpperCase());
        }
    }
    return result;
}`
    },
    {
        id: "java-4",
        language: "Java",
        difficulty: "medium",
        code: `public class Student {
    private final String name;
    private int score;

    public Student(String name, int score) {
        this.name = name;
        this.score = score;
    }

    public String getName() { return name; }
    public int getScore() { return score; }
    public boolean hasPassed() { return score >= 50; }
}`
    },
    {
        id: "java-5",
        language: "Java",
        difficulty: "hard",
        code: `import java.util.HashMap;
import java.util.Map;

public class WordCount {
    public static void main(String[] args) {
        String text = "to be or not to be";
        Map<String, Integer> counts = new HashMap<>();
        for (String word : text.split(" ")) {
            counts.put(word, counts.getOrDefault(word, 0) + 1);
        }
        counts.forEach((word, count) -> System.out.println(word + ": " + count));
    }
}`
    },
    {
        id: "java-6",
        language: "Java",
        difficulty: "hard",
        code: `interface Shape {
    double area();
}

record Circle(double radius) implements Shape {
    public double area() { return Math.PI * radius * radius; }
}

record Square(double side) implements Shape {
    public double area() { return side * side; }
}`
    },

    /* ===== C ===== */
    {
        id: "c-1",
        language: "C",
        difficulty: "easy",
        code: `#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}`
    },
    {
        id: "c-2",
        language: "C",
        difficulty: "easy",
        code: `#include <stdio.h>

int main(void) {
    int numbers[5] = {3, 7, 1, 9, 4};
    int sum = 0;
    for (int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    printf("Sum = %d\\n", sum);
    return 0;
}`
    },
    {
        id: "c-3",
        language: "C",
        difficulty: "medium",
        code: `void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int max(int a, int b) {
    return (a > b) ? a : b;
}`
    },
    {
        id: "c-4",
        language: "C",
        difficulty: "medium",
        code: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main(void) {
    struct Point points[3] = {{0, 0}, {2, 5}, {-1, 4}};
    for (int i = 0; i < 3; i++) {
        printf("(%d, %d)\\n", points[i].x, points[i].y);
    }
    return 0;
}`
    },
    {
        id: "c-5",
        language: "C",
        difficulty: "hard",
        code: `#include <stddef.h>

size_t my_strlen(const char *s) {
    const char *p = s;
    while (*p != '\\0') {
        p++;
    }
    return (size_t)(p - s);
}`
    },
    {
        id: "c-6",
        language: "C",
        difficulty: "hard",
        code: `#include <stdio.h>
#include <stdlib.h>

int *make_squares(int size) {
    int *arr = malloc(size * sizeof(int));
    if (arr == NULL) {
        fprintf(stderr, "Out of memory\\n");
        exit(1);
    }
    for (int i = 0; i < size; i++) {
        arr[i] = i * i;
    }
    return arr; /* the caller must call free(arr) */
}`
    },

    /* ===== PHP ===== */
    {
        id: "php-1",
        language: "PHP",
        difficulty: "easy",
        code: `<?php
$name = "Amina";
$age = 24;
echo "Hello, $name! ";
echo 'You are ' . $age . ' years old.';`
    },
    {
        id: "php-2",
        language: "PHP",
        difficulty: "easy",
        code: `<?php
$colors = ['red', 'green', 'blue'];
$colors[] = 'yellow';
for ($i = 0; $i < count($colors); $i++) {
    echo $colors[$i] . "<br>";
}`
    },
    {
        id: "php-3",
        language: "PHP",
        difficulty: "medium",
        code: `<?php
$prices = [
    'coffee' => 2.50,
    'tea' => 1.80,
    'cake' => 3.20,
];

foreach ($prices as $item => $price) {
    echo "$item: " . number_format($price, 2) . " EUR\\n";
}`
    },
    {
        id: "php-4",
        language: "PHP",
        difficulty: "medium",
        code: `<?php
declare(strict_types=1);

function calculateTotal(array $items, float $tax = 0.2): float
{
    $sum = array_sum(array_column($items, 'price'));
    return round($sum * (1 + $tax), 2);
}

echo calculateTotal([['price' => 10.0], ['price' => 5.5]]);`
    },
    {
        id: "php-5",
        language: "PHP",
        difficulty: "hard",
        code: `<?php
class User
{
    public function __construct(
        private string $name,
        private string $email
    ) {}

    public function getGreeting(): string
    {
        $safeName = htmlspecialchars($this->name, ENT_QUOTES, 'UTF-8');
        return "<p>Welcome, {$safeName}!</p>";
    }
}`
    },
    {
        id: "php-6",
        language: "PHP",
        difficulty: "hard",
        code: `<?php
$pdo = new PDO('mysql:host=localhost;dbname=shop', 'user', 'secret', [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
]);

$id = (int) ($_GET['id'] ?? 0);
$stmt = $pdo->prepare('SELECT name, price FROM products WHERE id = :id');
$stmt->execute([':id' => $id]);
$product = $stmt->fetch(PDO::FETCH_ASSOC);

echo $product ? "{$product['name']}: {$product['price']}" : 'Not found';`
    }
];
