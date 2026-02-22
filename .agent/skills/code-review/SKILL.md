---
name: TypeScript / Node Code Review
description: Comprehensive code review process for TypeScript/Node.js web extension projects following standard TS conventions and best practices
---

# TypeScript / Node Code Review Skill

A rigorous code review process that analyzes either git differences or the entire project codebase, producing comprehensive impediment reports based on typical TypeScript and Web Extension guidelines.

---

## Overview

This skill enables systematic code review for TypeScript/Node.js projects. It can analyze:
- **Diff-based reviews**: Changes between branches, commits, or working directory
- **Full project reviews**: Complete codebase analysis

The output is a detailed markdown report saved to `docs/code-reviews/codereview_{date}_{time}.md`.

---

## How to Invoke

Use `/code-review` workflow or reference this skill when:
- The user asks for a code review
- The user wants to check code quality before merging
- The user wants a full project audit

---

## Review Process

### Step 1: Determine Scope

Ask the user or infer from context:
- **Diff review**: Analyze changes only (e.g., `git diff main`, `git diff HEAD~5`)
- **Full review**: Analyze entire project

### Step 2: Gather Code for Analysis

For **diff-based review**:
```bash
# Get diff against main branch
git diff main --name-only

# Get detailed diff
git diff main
```

For **full project review**, identify all TS files:
```bash
find src -name "*.ts" -type f
```

### Step 3: Compile Report

Generate the final report with:
1. Executive summary
2. Issues summary table (ordered by severity/risk)
3. Detailed findings with code snippets and fixes

---

## Issue Classification

### Severity Levels

| Level | Description | Examples |
|-------|-------------|----------|
| 🔴 **Critical** | Security vulnerabilities, data loss, crashes | XSS, eval() usage, unprotected APIs |
| 🟠 **High** | Functional bugs, performance problems | Memory leaks, unhandled promises, logic errors |
| 🟡 **Medium** | Maintainability, testability issues | Missing types (any), poor error handling |
| 🔵 **Low** | Style, conventions, minor improvements | Naming, formatting, documentation |
| ⚪ **Info** | Suggestions, best practices | Modern TS features, potential optimizations |

---

## TypeScript Code Review Checklist

### 1. Type Safety
- [ ] No `any` types unless absolutely necessary (use `unknown` instead)
- [ ] Strict null checks are enforced and handled
- [ ] Interfaces/Types are used for object shapes
- [ ] Function return types are correctly inferred or explicitly declared
- [ ] Type assertions (`as Type`) are used sparingly and safely

### 2. Asynchronous Programming
- [ ] Promises are always handled (no floating promises)
- [ ] `async`/`await` used over raw Promise chains `.then().catch()` where appropriate
- [ ] Proper error handling in `try/catch` blocks for async code
- [ ] Concurrent operations use `Promise.all()` appropriately

### 3. Error Handling
- [ ] Custom Error classes or informative error messages used
- [ ] Errors are properly caught and either logged or propagated
- [ ] No empty `catch` blocks

### 4. Web Extension Specifics
- [ ] DOM manipulation is properly sanitized to prevent XSS
- [ ] `chrome.*` or `browser.*` APIs are used correctly with proper permissions declared
- [ ] Content scripts and background scripts communicate securely and efficiently
- [ ] Local storage (`chrome.storage`) is not used for sensitive raw data unless expected

### 5. Naming & Style
- [ ] PascalCase for types, interfaces, classes
- [ ] camelCase for variables, functions, methods
- [ ] Descriptive, unambiguous variable and function names
- [ ] Magic strings/numbers extracted into constants

### 6. Test Quality
- [ ] Unit tests (Vitest/Jest) follow Arrange-Act-Assert
- [ ] Tests cover happy paths, edge cases, and error states
- [ ] Meaningful assertions and mocked dependencies where necessary

---

## Report Template

The generated report should follow this structure:

```markdown
# Code Review Report

**Project:** [Project Name]  
**Date:** [YYYY-MM-DD HH:MM]  
**Scope:** [Diff-based / Full Project]  
**Reviewer:** AI Code Review Agent  

---

## Executive Summary

[Brief overview of code quality, major findings, and recommendations]

---

## Issues Summary

| # | Severity | Category | File | Location | Brief Description |
|---|----------|----------|------|----------|-------------------|
| 1 | 🔴 Critical | Security | `file.ts` | Line 42 | Unsanitized innerHTML |
| 2 | 🟠 High | Types | `service.ts` | Lines 15-25 | Implicit any usage |

**Total Issues:** X (Y Critical, Z High, ...)

---

## Detailed Findings

### Issue #1: [Title]

**Severity:** 🔴 Critical  
**Category:** Security  
**File:** `src/content.ts`  
**Location:** Lines 42-48  

**Description:**  
[Detailed explanation of the issue and why it's problematic]

**Code with Issue:**
```typescript
element.innerHTML = userInput;
```

**Proposed Fix:**
```typescript
element.textContent = userInput;
```

---

## Output Location

Reports should be saved to: `docs/code-reviews/codereview_{YYYY-MM-DD}_{HH-MM}.md`
