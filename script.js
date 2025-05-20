let currentTheme = 'light';
let currentCategory = '';
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let timerValue = 30;

// DOM Elements
const usernameInput = document.getElementById("username");
const userLoginDiv = document.getElementById("user-login");
const categorySelectionDiv = document.getElementById("category-selection");
const quizDiv = document.getElementById("quiz");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const timerElement = document.getElementById("time");
const nextButton = document.getElementById("next-btn");
const resultDiv = document.getElementById("result");
const scoreElement = document.getElementById("score");
const leaderboardElement = document.getElementById("leaderboard");
const themeToggleButton = document.getElementById("theme-toggle");

const quizData = {
    literature: [
      { question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
      { question: "Which novel begins with 'Call me Ishmael'?", options: ["Moby Dick", "Pride and Prejudice", "Dracula", "Jane Eyre"], answer: "Moby Dick" },
      { question: "Who wrote '1984'?", options: ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Ernest Hemingway"], answer: "George Orwell" },
      { question: "What genre is 'The Hobbit'?", options: ["Romance", "Science Fiction", "Fantasy", "Mystery"], answer: "Fantasy" },
      { question: "Who is the author of 'Pride and Prejudice'?", options: ["Jane Austen", "Emily Brontë", "Mary Shelley", "Agatha Christie"], answer: "Jane Austen" },
      { question: "Which Shakespeare play features Iago?", options: ["Macbeth", "Hamlet", "Othello", "King Lear"], answer: "Othello" },
      { question: "Who wrote 'The Great Gatsby'?", options: ["F. Scott Fitzgerald", "Ernest Hemingway", "John Steinbeck", "T.S. Eliot"], answer: "F. Scott Fitzgerald" },
      { question: "Which novel is set in the dystopian future of Panem?", options: ["Divergent", "The Giver", "The Hunger Games", "Fahrenheit 451"], answer: "The Hunger Games" },
      { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "Mark Twain", "John Grisham", "Stephen King"], answer: "Harper Lee" },
      { question: "What is the real name of Mark Twain?", options: ["Samuel Langhorne Clemens", "James Joyce", "Nathaniel Hawthorne", "William Faulkner"], answer: "Samuel Langhorne Clemens" }
    ],
  
    DSA: [
      { question: "Which data structure uses FIFO?", options: ["Stack", "Queue", "Array", "Tree"], answer: "Queue" },
      { question: "What is the time complexity of binary search?", options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"], answer: "O(log n)" },
      { question: "Which algorithm is used in merge sort?", options: ["Divide and Conquer", "Dynamic Programming", "Greedy", "Backtracking"], answer: "Divide and Conquer" },
      { question: "What is the best case time complexity of quicksort?", options: ["O(n^2)", "O(n log n)", "O(log n)", "O(n)"], answer: "O(n log n)" },
      { question: "Which data structure is used in recursion?", options: ["Queue", "Stack", "Heap", "Array"], answer: "Stack" },
      { question: "Which traversal prints nodes in order in BST?", options: ["Preorder", "Postorder", "Inorder", "Level Order"], answer: "Inorder" },
      { question: "What is a heap?", options: ["Tree", "Graph", "Queue", "Array"], answer: "Tree" },
      { question: "Which algorithm finds the shortest path in a weighted graph?", options: ["DFS", "BFS", "Dijkstra", "Prim"], answer: "Dijkstra" },
      { question: "What does a hash function do?", options: ["Sorts data", "Stores data", "Maps keys to values", "Deletes data"], answer: "Maps keys to values" },
      { question: "Which data structure allows duplicate elements?", options: ["Set", "Map", "Multiset", "Tree"], answer: "Multiset" }
    ],
  
    DBMS: [
      { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Sequential Query Language"], answer: "Structured Query Language" },
      { question: "Which of the following is a DDL command?", options: ["SELECT", "INSERT", "UPDATE", "CREATE"], answer: "CREATE" },
      { question: "What is a primary key?", options: ["A unique identifier", "A duplicate key", "A secondary key", "A nullable key"], answer: "A unique identifier" },
      { question: "Which command is used to remove all records from a table?", options: ["DELETE", "REMOVE", "TRUNCATE", "DROP"], answer: "TRUNCATE" },
      { question: "What is normalization?", options: ["Adding redundancy", "Data denormalization", "Removing redundancy", "Making tables"], answer: "Removing redundancy" },
      { question: "Which level of data abstraction describes what data is stored?", options: ["Physical", "Logical", "View", "User"], answer: "Logical" },
      { question: "What does ACID stand for?", options: ["Access, Control, Integrity, Database", "Atomicity, Consistency, Isolation, Durability", "Array, Column, Index, Data", "None"], answer: "Atomicity, Consistency, Isolation, Durability" },
      { question: "Which command is used to add a new column?", options: ["INSERT", "MODIFY", "ALTER", "UPDATE"], answer: "ALTER" },
      { question: "Which is a valid SQL constraint?", options: ["VALID", "REQUIRE", "UNIQUE", "PRIMARY"], answer: "UNIQUE" },
      { question: "Which SQL clause is used to group rows?", options: ["ORDER BY", "GROUP BY", "WHERE", "HAVING"], answer: "GROUP BY" }
    ],
  
    maths: [
      { question: "What is 7 x 8?", options: ["54", "56", "64", "58"], answer: "56" },
      { question: "What is the value of π (Pi) approximately?", options: ["2.14", "3.14", "1.41", "4.13"], answer: "3.14" },
      { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: "12" },
      { question: "What is 2^5?", options: ["16", "32", "64", "128"], answer: "32" },
      { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], answer: "30" },
      { question: "If x = 2, what is the value of x^2 + 3x + 2?", options: ["12", "10", "8", "16"], answer: "12" },
      { question: "What is 100 divided by 4?", options: ["20", "24", "25", "28"], answer: "25" },
      { question: "What is the derivative of x^2?", options: ["2x", "x", "x^2", "3x"], answer: "2x" },
      { question: "Solve: 5x = 20. Find x.", options: ["2", "4", "5", "6"], answer: "4" },
      { question: "What is 10 factorial (10!)?", options: ["3628800", "40320", "720", "5040"], answer: "3628800" }
    ],
  
    Networks: [
      { question: "What does OSI stand for?", options: ["Open System Interconnection", "Operating System Interface", "Open Software Integration", "None"], answer: "Open System Interconnection" },
      { question: "How many layers are in the OSI model?", options: ["5", "6", "7", "8"], answer: "7" },
      { question: "Which layer handles IP addressing?", options: ["Data Link", "Network", "Transport", "Session"], answer: "Network" },
      { question: "TCP is a __________ protocol.", options: ["Connectionless", "Connection-oriented", "Unreliable", "Routing"], answer: "Connection-oriented" },
      { question: "Which protocol is used to send email?", options: ["SMTP", "HTTP", "FTP", "SNMP"], answer: "SMTP" },
      { question: "Which device connects different networks?", options: ["Router", "Switch", "Hub", "Bridge"], answer: "Router" },
      { question: "What is the default port number for HTTP?", options: ["21", "23", "80", "443"], answer: "80" },
      { question: "Which layer ensures error-free delivery?", options: ["Session", "Transport", "Presentation", "Application"], answer: "Transport" },
      { question: "What does DNS stand for?", options: ["Domain Name System", "Data Network System", "Dynamic Name Service", "None"], answer: "Domain Name System" },
      { question: "Which IP class is used for multicasting?", options: ["Class A", "Class B", "Class D", "Class E"], answer: "Class D" }
    ],
  
    OS: [
      { question: "Which of the following is not an OS?", options: ["Linux", "Windows", "Oracle", "MacOS"], answer: "Oracle" },
      { question: "What is the function of an OS?", options: ["Compiler", "Manage Hardware", "Browser", "Debugger"], answer: "Manage Hardware" },
      { question: "Which is not a function of OS?", options: ["Memory Management", "Process Management", "Browser Execution", "Device Management"], answer: "Browser Execution" },
      { question: "Which scheduling algorithm is non-preemptive?", options: ["Round Robin", "SJF", "Priority", "FCFS"], answer: "FCFS" },
      { question: "Which memory is non-volatile?", options: ["RAM", "Cache", "ROM", "Registers"], answer: "ROM" },
      { question: "Which of the following is a real-time OS?", options: ["Windows", "DOS", "RTOS", "MacOS"], answer: "RTOS" },
      { question: "Which of the following is a deadlock avoidance algorithm?", options: ["FIFO", "Banker's Algorithm", "Round Robin", "LIFO"], answer: "Banker's Algorithm" },
      { question: "Which technique is used for memory management?", options: ["Paging", "Indexing", "Clustering", "Sorting"], answer: "Paging" },
      { question: "Which state is not a valid process state?", options: ["Ready", "Running", "Blocked", "Interrupted"], answer: "Interrupted" },
      { question: "The kernel is:", options: ["User-level library", "A compiler", "Core of OS", "A type of file"], answer: "Core of OS" }
    ],
  
    OOPS: [
      { question: "What is encapsulation?", options: ["Hiding data", "Inheritance", "Polymorphism", "Overloading"], answer: "Hiding data" },
      { question: "Which keyword is used for inheritance in C++?", options: ["inherit", "extends", "public", "base"], answer: "public" },
      { question: "Polymorphism means:", options: ["Many forms", "Single form", "Abstraction", "Inheritance"], answer: "Many forms" },
      { question: "Which concept hides complexity?", options: ["Inheritance", "Encapsulation", "Abstraction", "Polymorphism"], answer: "Abstraction" },
      { question: "Which of the following is not a pillar of OOP?", options: ["Encapsulation", "Abstraction", "Looping", "Inheritance"], answer: "Looping" },
      { question: "Which is a user-defined data type?", options: ["int", "float", "class", "char"], answer: "class" },
      { question: "Function overloading is an example of:", options: ["Abstraction", "Encapsulation", "Compile-time polymorphism", "Inheritance"], answer: "Compile-time polymorphism" },
      { question: "Inheritance is used to:", options: ["Hide data", "Reuse code", "Implement interface", "All of these"], answer: "Reuse code" },
      { question: "Which of the following supports OOP?", options: ["C", "Java", "HTML", "SQL"], answer: "Java" },
      { question: "Which of the following is a constructor?", options: ["main()", "new()", "init()", "ClassName()"], answer: "ClassName()" }
    ],
  
    Frontend: [
      { question: "Which tag is used for paragraphs in HTML?", options: ["<div>", "<p>", "<span>", "<section>"], answer: "<p>" },
      { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Color Style Sheets", "Creative Style Syntax", "Coding Style Structure"], answer: "Cascading Style Sheets" },
      { question: "Which attribute sets the text color?", options: ["font", "style", "color", "text-color"], answer: "style" },
      { question: "Which JavaScript method adds an element to the end of an array?", options: ["push()", "pop()", "shift()", "unshift()"], answer: "push()" },
      { question: "React is a ________", options: ["Framework", "Library", "Language", "Protocol"], answer: "Library" },
      { question: "Which CSS property changes font size?", options: ["font", "font-style", "font-size", "text-size"], answer: "font-size" },
      { question: "Which HTML tag is used for images?", options: ["<src>", "<img>", "<image>", "<pic>"], answer: "<img>" },
      { question: "Which tool is used for debugging frontend?", options: ["Chrome DevTools", "MySQL", "MongoDB", "Postman"], answer: "Chrome DevTools" },
      { question: "Which tag is used for links?", options: ["<a>", "<link>", "<href>", "<ref>"], answer: "<a>" },
      { question: "Which selector is used for an ID in CSS?", options: [".", "#", "*", "%"], answer: "#" }
    ],
  
    Backend: [
      { question: "Which language is commonly used for backend?", options: ["HTML", "CSS", "JavaScript", "Python"], answer: "Python" },
      { question: "Node.js is built on which engine?", options: ["SpiderMonkey", "Java", "V8", "Safari"], answer: "V8" },
      { question: "Which framework is used in Python for web apps?", options: ["React", "Django", "Laravel", "Vue"], answer: "Django" },
      { question: "Which HTTP method is used to update data?", options: ["GET", "POST", "PUT", "FETCH"], answer: "PUT" },
      { question: "What is an API?", options: ["Application Program Interface", "Applied Programming Integration", "Application Processing Interface", "None"], answer: "Application Program Interface" },
      { question: "What does REST stand for?", options: ["Representational State Transfer", "Remote Execution Server Task", "Read Execute Send Transfer", "None"], answer: "Representational State Transfer" },
      { question: "Which database is NoSQL?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], answer: "MongoDB" },
      { question: "Which status code means 'Not Found'?", options: ["200", "403", "404", "500"], answer: "404" },
      { question: "JWT is used for:", options: ["Token-based authentication", "File compression", "Encryption", "Parsing HTML"], answer: "Token-based authentication" },
      { question: "Which command initializes a Node.js project?", options: ["npm install", "npm run", "npm init", "npm build"], answer: "npm init" }
    ]
  };

// Login function
function login() {
    const username = usernameInput.value.trim();
    if (username) {
      document.getElementById("user-login").classList.add("hidden");
      categorySelectionDiv.classList.remove("hidden");
    } else {
      alert("Please enter a valid name!");
    }
  }
  
  // Theme toggle function
  function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(currentTheme);
  }
  
  // START QUIZ
function startQuiz(category) {
    currentCategory = category;
    currentQuestionIndex = 0;
    score = 0;
    timerValue = 30;
    categorySelectionDiv.classList.add("hidden");
    quizDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
  
    loadQuestion();
    startTimer();
  }
  
  // LOAD QUESTION
  function loadQuestion() {
    const questionData = quizData[currentCategory][currentQuestionIndex];
    questionElement.textContent = questionData.question;
  
    optionsElement.innerHTML = "";
    questionData.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      optionsElement.appendChild(btn);
    });
  
    nextButton.classList.add("hidden");
    timerValue = 30;
  }
  
  // CHECK ANSWER
  function checkAnswer(selected) {
    const correctAnswer = quizData[currentCategory][currentQuestionIndex].answer;
    if (selected === correctAnswer) score++;
  
    Array.from(optionsElement.children).forEach(btn => btn.disabled = true);
    nextButton.classList.remove("hidden");
    clearInterval(timerInterval);
  }
  
  // NEXT QUESTION
  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentCategory].length) {
      loadQuestion();
      startTimer();
    } else {
      endQuiz();
    }
  }
  
  // TIMER
  function startTimer() {
    timerElement.textContent = timerValue;
  
    timerInterval = setInterval(() => {
      timerValue--;
      timerElement.textContent = timerValue;
  
      if (timerValue <= 0) {
        clearInterval(timerInterval);
        nextQuestion();
      }
    }, 1000);
  }
  
  // END QUIZ
  function endQuiz() {
    quizDiv.classList.add("hidden");
    resultDiv.classList.remove("hidden");
    scoreElement.textContent = score;
    saveToLeaderboard();
    showLeaderboard();
  }
  
  // LEADERBOARD
  function saveToLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ username: usernameInput.value, score: score });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  }
  
  function showLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboardElement.innerHTML = "";
  
    leaderboard.sort((a, b) => b.score - a.score).slice(0, 5).forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.username}: ${entry.score}`;
      leaderboardElement.appendChild(li);
    });
  }
  
  // RESTART
  function restartQuiz() {
    userLoginDiv.classList.remove("hidden");
    resultDiv.classList.add("hidden");
    quizDiv.classList.add("hidden");
    categorySelectionDiv.classList.add("hidden");
    usernameInput.value = "";
  }
  
  // BINDINGS
  themeToggleButton.addEventListener("click", toggleTheme);
  nextButton.addEventListener("click", nextQuestion);
  
  // Make login global so HTML can call it
  window.login = login;
  window.startQuiz = startQuiz;
  window.restartQuiz = restartQuiz;