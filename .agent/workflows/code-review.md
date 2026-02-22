---
description: Run a comprehensive C# code review on the ExpenseApp project
---

# C# Code Review Workflow

Run a rigorous code review following Microsoft's C# Coding Conventions and Engineering Playbook guidelines.

## Prerequisites

- Ensure you're on the correct branch
- The project should build successfully (`dotnet build`)

## Steps

### 1. Read the Code Review Skill

First, read the skill instructions:
```
View file: .agent/skills/code-review/SKILL.md
```

### 2. Determine Review Scope

Ask the user:
- **Diff review**: Analyze changes against `main` branch
- **Full project review**: Analyze entire codebase

### 3. For Diff-Based Review

// turbo
```bash
git diff main --name-only -- '*.cs'
```

Then get the full diff:
// turbo
```bash
git diff main --unified=5 -- '*.cs'
```

### 4. For Full Project Review

// turbo
```bash
find src -name "*.cs" -type f
```

### 5. Analyze Code

Go through each file/change systematically using the checklist from the skill.

Check for common issues:
// turbo
```bash
# Check for Thread.Sleep usage
grep -rn "Thread.Sleep" src --include="*.cs" || echo "No Thread.Sleep found"

# Check for catch base Exception
grep -rn "catch.*Exception\b" src --include="*.cs" | grep -v "ArgumentException\|InvalidOperationException\|FormatException" || echo "No generic Exception catches found"

# Check for TODO/FIXME
grep -rn "TODO\|FIXME\|HACK" src --include="*.cs" || echo "No TODO/FIXME found"
```

### 6. Generate Report

Create the report file with the current timestamp:
```
docs/code-reviews/codereview_{YYYY-MM-DD}_{HH-MM}.md
```

Include:
1. Executive Summary
2. Issues Summary Table (ordered by severity)
3. Detailed Findings with code snippets and proposed fixes
4. Recommendations

### 7. Summarize to User

Provide a brief verbal summary of:
- Total issues found by severity
- Critical items requiring immediate attention
- General code health assessment
