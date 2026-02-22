---
description: Save a concise summary of the current conversation's work, learnings, and mistakes to Examples/context.md for loading into future conversations
---

1. Review the entire conversation history and identify:
   - **What was done**: All tasks completed, features added, bugs fixed, configurations changed
   - **Key decisions**: Important architectural or design choices made and why
   - **Learnings**: Useful discoveries, patterns, or techniques that worked well
   - **Mistakes / What NOT to do**: Things that went wrong, dead ends, incorrect assumptions, and what to avoid in the future

2. Create (or overwrite) the file `Examples/context.md` with a concise, well-structured summary using the following template:

   ```markdown
   # Conversation Context Summary
   
   **Date**: [current date]
   
   ## What Was Done
   - Bullet list of completed work
   
   ## Key Decisions
   - Important choices and their rationale
   
   ## Learnings
   - Useful discoveries and patterns
   
   ## Mistakes & What NOT to Do
   - Things that went wrong and should be avoided
   
   ## Relevant Files Changed
   | File | Change |
   |------|--------|
   | `path/to/file` | Brief description |
   
   ## Current Status
   - What's working, what's pending
   ```

3. Keep the summary **concise and actionable** — it should be easy to scan and load into a new conversation to quickly regain context. Avoid verbose explanations; prefer bullet points.

4. If `Examples/context.md` already exists, **overwrite it** with the new summary (each conversation produces a fresh context snapshot).
