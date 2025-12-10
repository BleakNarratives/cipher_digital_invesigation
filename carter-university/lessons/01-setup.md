# 🔧 Lesson 1: Setting Up Your Environment

## What We're Doing

Before we can investigate anything, we need to set up our tools. Think of this like a carpenter setting up their workshop before building furniture.

## What is a Terminal?

**Simple Answer**: A terminal is a text-based way to talk to your computer.

**Why Use It?**
- Faster than clicking through menus
- More powerful than graphical interfaces
- Required for many forensic tools
- Makes you look like a hacker in movies 😎

**Real Talk**: At first, the terminal seems scary. That's normal! After a few days, you'll prefer it for many tasks.

## Opening Your Terminal

### On Windows:
1. Press `Windows Key + R`
2. Type `cmd` or `powershell`
3. Press Enter
4. You'll see a black window with text - that's your terminal!

### On Mac:
1. Press `Command + Space`
2. Type `terminal`
3. Press Enter

### On Linux:
1. Press `Ctrl + Alt + T`
2. (You probably already know this if you're on Linux!)

## Your First Command

Type this and press Enter:
```bash
echo "Hello, I'm learning forensics!"
```

**What happened?**
- `echo` is a command that prints text
- The text in quotes is what gets printed
- You just ran your first command!

## Understanding File Paths

**What is a Path?**
A path is the address of a file or folder on your computer.

**Example**:
```
C:\Users\Calvin\Documents\investigation.txt
```

This means:
- `C:\` - Your main hard drive
- `Users\` - Folder containing user accounts
- `Calvin\` - Your user folder
- `Documents\` - Your documents folder
- `investigation.txt` - The file

**Think of it like**: Country > State > City > Street > House Number

## Essential Commands You'll Use Every Day

### 1. `pwd` (Print Working Directory)
**What it does**: Shows you where you are

```bash
pwd
```

**Output**: `/Users/Calvin/Desktop`  
**Translation**: "You are currently in the Desktop folder"

### 2. `ls` (List)
**What it does**: Shows files and folders in current location

```bash
ls
```

**Output**: 
```
Documents/
Pictures/
investigation.txt
```

### 3. `cd` (Change Directory)
**What it does**: Moves you to a different folder

```bash
cd Documents
```

**Translation**: "Go into the Documents folder"

**Special shortcuts**:
- `cd ..` - Go up one level (to parent folder)
- `cd ~` - Go to your home folder
- `cd /` - Go to the root (top level)

### 4. `cat` (Concatenate)
**What it does**: Shows the contents of a file

```bash
cat investigation.txt
```

**Translation**: "Show me what's inside investigation.txt"

### 5. `mkdir` (Make Directory)
**What it does**: Creates a new folder

```bash
mkdir my-first-case
```

**Translation**: "Create a folder called 'my-first-case'"

## Practice Exercise 1: Navigate Your Computer

Let's practice! Follow these steps:

```bash
# 1. See where you are
pwd

# 2. List what's here
ls

# 3. Create a practice folder
mkdir forensics-practice

# 4. Go into that folder
cd forensics-practice

# 5. Confirm you're there
pwd

# 6. Go back up
cd ..

# 7. Confirm you're back
pwd
```

**Did it work?** If yes, you just navigated your file system using only text commands! 🎉

## Installing Node.js (Required for Our Tools)

Our forensics workbench runs on Node.js. Here's how to install it:

### Windows:
1. Go to https://nodejs.org
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Click "Next" through everything
5. Restart your terminal

### Mac:
1. Go to https://nodejs.org
2. Download the LTS version
3. Run the installer
4. Follow the prompts

### Verify Installation:
```bash
node --version
```

**Expected output**: `v18.x.x` or similar

```bash
npm --version
```

**Expected output**: `9.x.x` or similar

**If you see version numbers, you're good!** ✅

## Setting Up the Forensics Workbench

Now let's set up our main tool:

```bash
# 1. Navigate to where you downloaded the workbench
cd path/to/crypto-forensics-workbench

# 2. Install dependencies (this downloads required code)
npm install

# 3. This might take 2-3 minutes - that's normal!
# You'll see lots of text scrolling - don't worry!

# 4. When it's done, test it:
npm start
```

**What should happen**:
- You'll see "🚀 Starting Crypto Forensics Workbench..."
- Then "✅ API server running!"
- A message about opening the dashboard

**If you see errors**: Check `resources/common-errors.md`

## Understanding What Just Happened

When you ran `npm install`:
1. npm (Node Package Manager) read the `package.json` file
2. It downloaded all the code libraries we need
3. It put them in a folder called `node_modules`
4. Now our tools have everything they need to run!

**Analogy**: Like downloading all the apps you need on a new phone.

## Your Workspace Setup

Create this folder structure for your learning:

```
forensics-practice/
├── cases/              (Your investigation files)
├── notes/              (Your learning notes)
├── exercises/          (Practice exercises)
└── resources/          (Useful files and data)
```

**How to create it**:
```bash
mkdir forensics-practice
cd forensics-practice
mkdir cases notes exercises resources
ls
```

You should see all four folders!

## Practice Exercise 2: Create Your First Case File

```bash
# 1. Go to your cases folder
cd forensics-practice/cases

# 2. Create a new file (Windows)
echo "Case #001 - Practice Investigation" > case-001.txt

# 3. View the file
cat case-001.txt

# 4. Add more information
echo "Date: Today" >> case-001.txt
echo "Investigator: Calvin Carter" >> case-001.txt

# 5. View the complete file
cat case-001.txt
```

**Note**: 
- `>` creates a new file (overwrites if exists)
- `>>` adds to the end of a file

## Common Mistakes (And How to Fix Them)

### Mistake 1: "Command not found"
**Problem**: You typed the command wrong or it's not installed  
**Solution**: Check spelling, make sure software is installed

### Mistake 2: "Permission denied"
**Problem**: You don't have rights to access that file/folder  
**Solution**: Use administrator/sudo, or work in your own folders

### Mistake 3: "No such file or directory"
**Problem**: The file/folder doesn't exist where you think it does  
**Solution**: Use `ls` to see what's actually there, check your path

### Mistake 4: Terminal is frozen
**Problem**: A command is running or waiting for input  
**Solution**: Press `Ctrl + C` to cancel the current command

## Quick Reference Card

Save this for later:

```bash
# Navigation
pwd                 # Where am I?
ls                  # What's here?
cd folder-name      # Go into folder
cd ..               # Go up one level
cd ~                # Go home

# Files
cat file.txt        # Read file
echo "text" > file  # Create file
mkdir folder        # Create folder

# Help
command --help      # Get help for a command
man command         # Read manual (Mac/Linux)
```

## Checkpoint Quiz

Before moving on, answer these:

1. What command shows your current location?
2. What command lists files in a folder?
3. What does `cd ..` do?
4. How do you create a new folder?
5. What's the difference between `>` and `>>`?

**Answers at the bottom of this file**

## Next Steps

✅ You've set up your terminal  
✅ You've learned basic commands  
✅ You've installed the forensics workbench  
✅ You've created your workspace  

**Next Lesson**: `02-terminal-basics.md` - More terminal skills  
**Or Jump To**: `03-first-investigation.md` - Your first case!

## Additional Resources

- `resources/terminal-cheatsheet.md` - All commands in one place
- `resources/common-errors.md` - Troubleshooting guide
- `sandbox/terminal-practice/` - Safe practice environment

---

**Time to Complete**: 30-45 minutes  
**Difficulty**: ⭐⭐☆☆☆ (Easy)  
**Prerequisites**: None  
**Next Lesson**: `02-terminal-basics.md`

---

## Quiz Answers

1. `pwd`
2. `ls`
3. Goes up one directory level (to the parent folder)
4. `mkdir folder-name`
5. `>` creates/overwrites a file, `>>` appends to a file
