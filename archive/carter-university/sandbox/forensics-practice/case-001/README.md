# 🔍 Case #001: The Missing Funds

## Case Overview

**Difficulty**: ⭐☆☆☆☆ (Beginner)  
**Time**: 30-45 minutes  
**Skills**: Terminal basics, text searching, pattern recognition

## The Story

A small business owner, Sarah, noticed that 5 ETH (Ethereum) disappeared from her company wallet. She suspects one of three employees might be involved. Your job is to investigate the transaction logs and find out what happened.

## What You'll Learn

- Reading transaction logs
- Searching for patterns
- Following the money trail
- Writing an investigation report

## The Evidence

You have access to:
1. `transactions.log` - All company wallet transactions
2. `employees.txt` - List of employees with their wallet addresses
3. `timeline.txt` - Timeline of events

## Your Mission

1. Identify which employee's wallet received the missing funds
2. Determine when the transaction occurred
3. Find if there are any other suspicious transactions
4. Write a brief report with your findings

## Getting Started

```bash
# Navigate to the case folder
cd carter-university/sandbox/forensics-practice/case-001

# List the evidence files
ls

# Start by reading the case brief
cat case-brief.txt
```

## Investigation Steps

### Step 1: Understand the Evidence

Read each file to understand what information you have:

```bash
# Read the transaction log
cat transactions.log

# Read the employee list
cat employees.txt

# Read the timeline
cat timeline.txt
```

### Step 2: Find the Missing Transaction

The missing funds are 5 ETH. Search for transactions of that amount:

```bash
# Search for 5 ETH transactions
grep "5 ETH" transactions.log
```

**Question**: How many 5 ETH transactions do you see?

### Step 3: Identify the Recipient

Now that you found the transaction, identify who received it:

```bash
# The transaction will show a "To:" address
# Compare it with the employee addresses
cat employees.txt
```

**Question**: Which employee's address matches?

### Step 4: Check the Timeline

When did this happen?

```bash
# Look at the timestamp in the transaction
# Compare with the timeline of events
cat timeline.txt
```

**Question**: Does the timing match any suspicious events?

### Step 5: Look for Patterns

Are there other suspicious transactions from the same employee?

```bash
# Search for all transactions to that employee's address
grep "EMPLOYEE_ADDRESS_HERE" transactions.log
```

### Step 6: Write Your Report

Create a file with your findings:

```bash
# Create your report
cat > investigation-report.txt << EOF
=== INVESTIGATION REPORT ===
Case: #001 - Missing Funds
Investigator: [Your Name]
Date: $(date)

FINDINGS:
1. Missing Amount: 5 ETH
2. Transaction Date: [Fill in]
3. Suspect: [Fill in]
4. Suspect's Wallet: [Fill in]
5. Additional Evidence: [Fill in]

CONCLUSION:
[Write your conclusion here]

RECOMMENDATION:
[What should Sarah do next?]
EOF

# View your report
cat investigation-report.txt
```

## Hints

<details>
<summary>Hint 1: Finding the transaction</summary>

Use `grep "5 ETH" transactions.log` to find all 5 ETH transactions. Look for one that's going OUT of the company wallet.
</details>

<details>
<summary>Hint 2: Identifying the employee</summary>

The "To:" address in the transaction should match one of the addresses in `employees.txt`. Use `grep` to search for that address in the employee file.
</details>

<details>
<summary>Hint 3: Timeline correlation</summary>

Look at the date/time of the transaction. Does it match when someone had access to the company computer? Check `timeline.txt`.
</details>

## Solution

<details>
<summary>Click to see the complete solution (try first!)</summary>

```bash
# Step 1: Find the suspicious transaction
grep "5 ETH" transactions.log
# You'll see: 2024-01-15 14:30:00 | From: 0xCompany | To: 0xEmployee2 | Amount: 5 ETH

# Step 2: Identify the employee
grep "0xEmployee2" employees.txt
# Result: Bob Smith - 0xEmployee2

# Step 3: Check timeline
grep "2024-01-15" timeline.txt
# Result: Bob was alone in office during lunch

# Step 4: Look for other suspicious activity
grep "0xEmployee2" transactions.log
# You'll find multiple small transactions before the big one

# Conclusion: Bob Smith gradually tested with small amounts, then took 5 ETH when alone
```
</details>

## Self-Assessment

After completing this case, you should be able to:
- [ ] Navigate to the case directory
- [ ] Read and understand log files
- [ ] Use grep to search for specific information
- [ ] Correlate information from multiple sources
- [ ] Write a professional investigation report

## Next Steps

✅ Completed Case #001  
➡️ Try Case #002 (Medium difficulty)  
➡️ Or review your technique with `../case-001-review.md`

## Real-World Application

This simplified case teaches you the basics of:
- Transaction analysis
- Pattern recognition
- Evidence correlation
- Report writing

In real investigations, you'd use blockchain explorers and our forensics workbench, but the process is the same!

---

**Need Help?** Check `../../resources/faq.md` or review `../../lessons/02-terminal-basics.md`
