---
description: Create a comprehensive Pull Request message based on the current changes
---

# Create PR Message Workflow

Generates a structured Pull Request message by analyzing the changes between the current branch/state and the main branch.

## Steps

### 1. Fetch Latest Changes (Optional but Recommended)
// turbo
```bash
git fetch origin main || echo "Could not fetch origin/main, proceeding with local main"
```

### 2. Identify Changed Files
Get the list of files that have changed compared to the main branch.
// turbo
```bash
git diff --name-status main
```

### 3. Analyze Content Changes
Get the detailed diff to understand *what* changed.
// turbo
```bash
git diff main
```

### 4. Analyze Test Coverage
Identify new or modified tests.
// turbo
```bash
# Find changed test files
git diff --name-only main | grep "Test"

# Count tests in new/changed files (heuristic)
# Look for [Fact], [Theory], [Test] attributes in C# files
grep -rEi "\[(Fact|Theory|Test)\]" $(git diff --name-only main | grep "\.cs$") | wc -l
```

### 5. Generate PR Message
Based on the diffs and analysis above, generate the PR message in the following format:

**Output Format:**

1. **Title**: [A concise and descriptive title for the PR]
2. **PR Message**:
```markdown
## 🚀 Features Added
- [Feature 1]
- [Feature 2]

## 🛠️ Code & Design Changes
- [Change 1]
- [Change 2]

## 🧪 Tests Status
- **Status**: [Green/Passing/WIP]
- **Count**: [Number] tests added/modified
  - [X] Unit Tests
  - [Y] Integration Tests
  - [Z] Scenario Tests

## 🔌 Added API Endpoints
- `[METHOD]` /api/[endpoint]

## 📄 New Documents
- [Document Name](link)

## 🤖 New Commands
- [Command Name]

---
```

**Instructions for Generation:**
- **Final Output**: Always provide the final PR message (including the title) inside a markdown code block (using triple backticks) so it can be easily copied and pasted into GitHub.
- **Features**: Summarize the "what" and "why" of the changes.
- **Code/Design**: Mention significant refactors, CSS changes, or architectural updates.
- **Tests**: Be specific about the *count* and *types* of tests based on the file paths (e.g., `*.UnitTests`, `*.IntegrationTests`).
- **API**: List any new controller actions or endpoints found in `*Controller.cs`.
- **Docs**: List any new markdown or documentation files.
- **Commands**: List any new workflows in `.agent/workflows`.
- Use emojis and dividers exactly as requested.
