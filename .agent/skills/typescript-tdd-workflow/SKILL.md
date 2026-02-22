---
name: TypeScript TDD Development Workflow
description: Test-Driven Development workflow for TypeScript/Node.js projects with phased implementation, branching strategy, and comprehensive testing patterns
---

# TypeScript TDD Development Workflow

A comprehensive guide for building TypeScript applications using Test-Driven Development with a phased approach, proper branching, and quality gates.

---

## Development Philosophy

### Core Principles

1. **TDD First**: Write tests before implementation
2. **Phased Development**: Break work into discrete, reviewable phases
3. **Branch Per Phase**: Each phase gets its own feature branch
4. **Zero Tolerance for Failures**: All tests must pass, zero type errors
5. **Context Continuity**: Document state for session handoffs

### Quality Gates

Before completing any phase:
- [ ] All tests pass (`npm run test` or `npx vitest run`)
- [ ] Zero TypeScript compiler errors (`npm run build` or `tsc --noEmit`)
- [ ] **Diff code review passed** (no Critical, High, or Medium issues)
- [ ] Code committed with descriptive message

---

## End of Phase Checklist

**MANDATORY**: At the end of each phase, complete these steps in order:

### Step 1: Run Build/Typecheck
```bash
npx tsc --noEmit
```
Fix any TypeScript errors before proceeding.

### Step 2: Run Tests
```bash
npm run test
# OR
npx vitest run
```
All tests must pass.

### Step 3: Run Diff Code Review
Invoke the code-review skill to analyze changes against main:
```bash
git diff main --name-only -- '*.ts'
```
Review following the TypeScript Code Review Skill guidelines.

### Step 4: Fix All Critical, High, and Medium Issues
Address issues in order of severity (Critical → High → Medium). After fixing, run tests again to ensure nothing is broken.

### Step 5: Commit and Push
```bash
git add -A
git commit -m "feat(phase-N): Description"
git push origin feature/your-feature-name
```

---

## TDD Implementation Pattern

### The Red-Green-Refactor Cycle

1. **RED**: Write a failing test in Vitest/Jest
2. **GREEN**: Write minimal code to make it pass
3. **REFACTOR**: Clean up while keeping tests green

### Test File Structure (Vitest/Jest)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { parseData } from '../parser';

describe('Parser Module', () => {
    beforeEach(() => {
        // Setup state if needed
    });

    it('should correctly parse a standard input string', () => {
        // Arrange
        const input = "test data";
        
        // Act
        const result = parseData(input);
        
        // Assert
        expect(result).toBeDefined();
        expect(result.value).toBe("test data");
    });

    it('should throw an error for null input', () => {
        // Arrange
        const input = null as any;

        // Act & Assert
        expect(() => parseData(input)).toThrow('Input cannot be null');
    });
});
```

### Test Categories to Cover

1. **Happy Path**: Normal successful operations
2. **Edge Cases**: Empty inputs, boundaries, nulls, undefined
3. **Error Handling**: Invalid inputs, missing data
4. **Integration**: Component interactions (e.g., DOM parsing)

---

## TypeScript Implementation Patterns

### Strict Typing

```typescript
// Define clear interfaces
export interface ParseResult {
    success: boolean;
    data?: ParsedItem[];
    error?: string;
}

export interface ParsedItem {
    id: string;
    title: string;
    price: number;
}

// Use precise return types
export function parseHtmlNode(element: HTMLElement): ParseResult {
    if (!element) return { success: false, error: "Element is null" };
    // Implementation
    return { success: true, data: [] };
}
```

### Error Handling

Avoid throwing raw strings or generic errors:
```typescript
class ParserError extends Error {
    constructor(message: string, public readonly node?: HTMLElement) {
        super(message);
        this.name = 'ParserError';
    }
}
```

---

## Quick Reference Commands

```bash
# Typecheck
npx tsc --noEmit

# Run tests once
npm run test
# OR
npx vitest run

# Run tests in watch mode
npx vitest watch

# Run tests with coverage
npx vitest run --coverage
```
