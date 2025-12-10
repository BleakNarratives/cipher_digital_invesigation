// Mr. Carter's Training Questions Database
// Organized by opponent difficulty

const opponents = [
  {
    name: "TERMINAL TYSON",
    sprite: "🤖",
    difficulty: "BEGINNER",
    health: 100,
    description: "The basics master. He'll test your fundamental knowledge!"
  },
  {
    name: "BASH BALBOA",
    sprite: "💻",
    difficulty: "INTERMEDIATE",
    health: 150,
    description: "Shell command specialist. Can you handle the command line?"
  },
  {
    name: "PYTHON PUNISHER",
    sprite: "🐍",
    difficulty: "ADVANCED",
    health: 200,
    description: "Code execution expert. Time to show your scripting skills!"
  },
  {
    name: "CRYPTO CRUSHER",
    sprite: "🔐",
    difficulty: "EXPERT",
    health: 250,
    description: "The final boss. Master of crypto forensics!"
  }
];

const questionBank = {
  "TERMINAL TYSON": [
    {
      explanation: "Alright Mr. Carter, let's start with the basics! When you want to run a JavaScript file, you need Node.js installed. Node.js is a runtime that lets you execute JavaScript outside of a web browser. The command is simple: you type 'node' followed by the filename. For example, if you have a file called 'app.js', you'd run it by typing 'node app.js' in your terminal. This tells Node.js to read and execute all the JavaScript code in that file!",
      question: "How do you execute a JavaScript file named 'script.js' in the terminal?",
      answers: [
        "node script.js",
        "run script.js",
        "execute script.js",
        "js script.js"
      ],
      correct: 0,
      hint: "Think about the runtime environment for JavaScript... it starts with 'n'!",
      damage: 15
    },
    {
      explanation: "Now let's talk about Python! Python is another programming language, and to run Python files, you use the 'python' command (or 'python3' on some systems). Python files end with '.py'. So if you have a file called 'hello.py', you'd type 'python hello.py' or 'python3 hello.py'. The number '3' refers to Python version 3, which is the current standard. Some older systems still have Python 2, so 'python3' makes sure you're using the right version!",
      question: "What command runs a Python file called 'forensics.py'?",
      answers: [
        "python forensics.py",
        "node forensics.py",
        "run forensics.py",
        "py forensics.py"
      ],
      correct: 0,
      hint: "The command is literally the name of the language!",
      damage: 15
    },
    {
      explanation: "HTML files are different, Mr. Carter! HTML is for web pages, not scripts you run in terminal. To view an HTML file, you open it in a web browser like Chrome, Firefox, or Edge. You can do this by double-clicking the file, or by right-clicking and choosing 'Open with' and selecting your browser. You can also drag and drop the HTML file into an open browser window. The browser reads the HTML and displays the webpage!",
      question: "How do you view an HTML file named 'index.html'?",
      answers: [
        "Open it in a web browser",
        "node index.html",
        "python index.html",
        "run index.html"
      ],
      correct: 0,
      hint: "HTML is for web pages... where do you view web pages?",
      damage: 15
    },
    {
      explanation: "Let's learn about navigating directories! 'cd' stands for 'Change Directory'. It's how you move around your file system in the terminal. Think of it like clicking on folders in File Explorer, but with text commands. If you want to go into a folder called 'projects', you type 'cd projects'. To go back up one level (to the parent folder), you use 'cd ..' - those two dots mean 'parent directory'. This works in both Windows PowerShell and Unix/Linux terminals!",
      question: "What command changes your current directory to a folder named 'documents'?",
      answers: [
        "cd documents",
        "move documents",
        "goto documents",
        "open documents"
      ],
      correct: 0,
      hint: "It's a two-letter command that stands for 'Change Directory'!",
      damage: 15
    }
  ]
};

  "BASH BALBOA": [
    {
      explanation: "Time to level up, Mr. Carter! The 'ls' command (or 'dir' in Windows CMD) lists all files and folders in your current directory. It's like looking at what's inside a folder. In PowerShell and Unix systems, 'ls' shows you everything. In Windows Command Prompt, you use 'dir' instead. Both do the same thing - show you what files and folders are in your current location. You can add flags like 'ls -la' to see more details like file sizes, permissions, and hidden files!",
      question: "What command lists all files in the current directory in PowerShell?",
      answers: [
        "ls",
        "list",
        "show",
        "files"
      ],
      correct: 0,
      hint: "It's a two-letter command that's short for 'list'!",
      damage: 20
    },
    {
      explanation: "Creating directories (folders) is essential! The 'mkdir' command stands for 'Make Directory'. When you type 'mkdir foldername', it creates a new folder with that name in your current location. You can even create nested folders in one command! For example, 'mkdir -p parent/child/grandchild' creates all three folders at once (the -p flag means 'create parent directories as needed'). This works the same in PowerShell, CMD, and Unix terminals!",
      question: "How do you create a new folder named 'crypto-tools'?",
      answers: [
        "mkdir crypto-tools",
        "create crypto-tools",
        "newfolder crypto-tools",
        "makedir crypto-tools"
      ],
      correct: 0,
      hint: "It's short for 'make directory'!",
      damage: 20
    },
    {
      explanation: "Let's talk about viewing file contents! The 'cat' command (short for 'concatenate') displays the contents of a file right in your terminal. In Windows PowerShell, you can also use 'Get-Content' or 'type'. For example, 'cat readme.txt' will print out everything in readme.txt. This is super useful for quickly checking what's in a file without opening an editor. For large files, you might want to use 'less' or 'more' instead, which let you scroll through the content page by page!",
      question: "What command displays the contents of 'config.txt' in Unix/Linux?",
      answers: [
        "cat config.txt",
        "show config.txt",
        "read config.txt",
        "open config.txt"
      ],
      correct: 0,
      hint: "It's a three-letter command that's also a pet animal!",
      damage: 20
    },
    {
      explanation: "Moving and renaming files is crucial! The 'mv' command does both in Unix/Linux. To move a file, you specify the source and destination: 'mv file.txt /new/location/'. To rename, you 'move' it to a new name in the same location: 'mv oldname.txt newname.txt'. In Windows, you use 'move' for moving and 'ren' or 'rename' for renaming. PowerShell has 'Move-Item' and 'Rename-Item'. They all do the same thing - relocate or rename your files!",
      question: "What command moves 'data.json' to a folder called 'backup' in Unix?",
      answers: [
        "mv data.json backup/",
        "move data.json backup/",
        "cp data.json backup/",
        "transfer data.json backup/"
      ],
      correct: 0,
      hint: "It's a two-letter command short for 'move'!",
      damage: 20
    }
  ],

  "PYTHON PUNISHER": [
    {
      explanation: "Now we're getting advanced, Mr. Carter! When you run a Python script, you can pass arguments to it. These are extra pieces of information the script can use. For example, 'python script.py arg1 arg2' passes two arguments. Inside the script, you access these using 'sys.argv' - it's a list where sys.argv[0] is the script name, sys.argv[1] is the first argument, and so on. You need to 'import sys' at the top of your script to use this. It's how you make flexible, reusable scripts!",
      question: "How do you pass arguments to a Python script?",
      answers: [
        "python script.py arg1 arg2",
        "python script.py --args arg1 arg2",
        "python script.py (arg1, arg2)",
        "python --args arg1 arg2 script.py"
      ],
      correct: 0,
      hint: "Just add them after the filename, separated by spaces!",
      damage: 25
    },
    {
      explanation: "Virtual environments are CRUCIAL for Python development! They create isolated spaces for your project's dependencies. Why? Because different projects might need different versions of the same library. To create one, use 'python -m venv myenv' (where myenv is your environment name). To activate it: on Windows, run 'myenv\\Scripts\\activate', on Unix/Mac, run 'source myenv/bin/activate'. Once activated, any packages you install with pip only affect this environment, not your whole system. It's like having a separate Python installation for each project!",
      question: "What command creates a Python virtual environment named 'env'?",
      answers: [
        "python -m venv env",
        "python create env",
        "virtualenv env",
        "python --venv env"
      ],
      correct: 0,
      hint: "Use the -m flag to run the venv module!",
      damage: 25
    },
    {
      explanation: "Package management with pip! 'pip' is Python's package installer. When you find a library you want to use (like 'requests' for HTTP calls or 'pandas' for data analysis), you install it with 'pip install packagename'. To see what's installed, use 'pip list'. To install from a requirements file (a list of all packages your project needs), use 'pip install -r requirements.txt'. To create that requirements file, use 'pip freeze > requirements.txt'. This makes it easy to share your project - others just need to run one command to get all dependencies!",
      question: "How do you install the 'requests' package using pip?",
      answers: [
        "pip install requests",
        "python install requests",
        "pip get requests",
        "install requests"
      ],
      correct: 0,
      hint: "pip install [package name]",
      damage: 25
    },
    {
      explanation: "Running Python scripts as modules! Sometimes you want to run a Python file as a module, not a script. The difference? When you use 'python -m modulename', Python treats it as a module and handles imports differently. This is important for packages with relative imports. For example, 'python -m http.server' starts a simple web server. The -m flag tells Python to search sys.path for the module and run it as __main__. It's more robust than running the file directly, especially for complex projects!",
      question: "What flag runs a Python file as a module?",
      answers: [
        "-m",
        "-r",
        "--module",
        "-mod"
      ],
      correct: 0,
      hint: "It's a single letter flag that stands for 'module'!",
      damage: 25
    }
  ],

  "CRYPTO CRUSHER": [
    {
      explanation: "Welcome to the big leagues, Mr. Carter! Git is version control - it tracks changes to your code over time. To start using Git in a project, you 'initialize' a repository with 'git init'. This creates a hidden .git folder that stores all the version history. After that, you can 'git add' files to stage them (prepare them for saving), then 'git commit' to save a snapshot of your code. Think of commits like save points in a video game - you can always go back to them! 'git status' shows what's changed since your last commit.",
      question: "What command initializes a new Git repository?",
      answers: [
        "git init",
        "git start",
        "git create",
        "git new"
      ],
      correct: 0,
      hint: "It's short for 'initialize'!",
      damage: 30
    },
    {
      explanation: "Environment variables are KEY for security! They're variables that exist outside your code, in your system environment. You use them to store sensitive info like API keys, passwords, and configuration that changes between environments (development vs production). In Node.js, you access them with 'process.env.VARIABLE_NAME'. In Python, use 'os.environ.get('VARIABLE_NAME')'. You typically store them in a .env file (which you NEVER commit to Git!). Libraries like 'dotenv' (Node.js) or 'python-dotenv' (Python) load these files automatically. This way, your secrets stay secret!",
      question: "Where should you store API keys and passwords in your code?",
      answers: [
        "In environment variables (.env file)",
        "Directly in the source code",
        "In a config.js file committed to Git",
        "In comments at the top of files"
      ],
      correct: 0,
      hint: "Never commit secrets! Use a file that starts with a dot...",
      damage: 30
    },
    {
      explanation: "Package.json is the heart of Node.js projects! It's a JSON file that describes your project: name, version, dependencies, and scripts. The 'scripts' section is powerful - you can define custom commands. For example, if you add '\"start\": \"node app.js\"' to scripts, you can run 'npm start' instead of typing the full command. 'npm install' reads package.json and installs all dependencies listed. 'npm run scriptname' runs any custom script. It's like a control panel for your entire project!",
      question: "What file contains Node.js project dependencies and scripts?",
      answers: [
        "package.json",
        "config.json",
        "dependencies.json",
        "node.json"
      ],
      correct: 0,
      hint: "It's named after what it describes - a package!",
      damage: 30
    },
    {
      explanation: "The final test, Mr. Carter! When you're investigating crypto transactions, you need to query blockchain data. Most blockchains have RPC (Remote Procedure Call) endpoints - these are URLs you can send requests to. For Ethereum, you might use Infura or Alchemy. You send JSON-RPC requests with methods like 'eth_getBalance' or 'eth_getTransactionByHash'. In our forensics tool, we use libraries like ethers.js or web3.js that wrap these RPC calls in easy-to-use functions. The provider connects to the blockchain, and you can query any public data - balances, transactions, smart contract state. It's how we trace stolen funds!",
      question: "What do you use to connect to and query blockchain data?",
      answers: [
        "RPC endpoint/provider",
        "Direct database connection",
        "FTP server",
        "SSH tunnel"
      ],
      correct: 0,
      hint: "It's a three-letter acronym for Remote Procedure Call!",
      damage: 30
    }
  ]
};
