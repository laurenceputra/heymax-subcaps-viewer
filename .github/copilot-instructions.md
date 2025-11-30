# GitHub Copilot Workspace Instructions

## Multi-Role Development Workflow

When working on tasks for this project, follow a structured multi-role approach that ensures thorough analysis, robust implementation, and comprehensive testing.

## Workflow Process

### 1. Task Classification

First, determine the task type:

- **FEATURE**: New functionality, enhancements, architectural changes
  - **Mode**: STRICT - Must follow full PM → Engineer → QA workflow
  - **Examples**: Add new card support, redesign UI, new subcap calculation logic
  
- **BUG**: Defect fixes, corrections, minor adjustments
  - **Mode**: FLEXIBLE - Can skip PM analysis, go directly to Engineer → QA
  - **Examples**: Fix calculation error, resolve display issue, patch security vulnerability

### 2. Role Sequence (STRICT Mode - Features)

For new features, follow this mandatory sequence:

#### Phase 1: Product Manager Analysis
**Consult**: `.github/agents/product-manager.md`

**Responsibilities**:
- Understand the user need and problem statement
- Define clear requirements and scope
- Write user stories with acceptance criteria
- Consider edge cases and card-specific implications
- Ensure privacy-first approach

**Output Required**:
- Problem statement
- Proposed solution approach
- User stories (As a [user], I want [feature] so that [benefit])
- Acceptance criteria (specific, testable)

#### Phase 2: Staff Engineer Design & Implementation
**Consult**: `.github/agents/staff-engineer.md`

**Responsibilities**:
- Review PM requirements and acceptance criteria
- Design technical architecture
- Implement the solution following project patterns
- Write maintainable, performant code
- Document implementation details

**Output Required**:
- Technical design overview
- Implementation approach (which modules/functions to modify)
- Code changes with explanations
- Performance and security considerations
- Technical documentation updates

#### Phase 3: QA Testing & Validation
**Consult**: `.github/agents/qa.md`

**Responsibilities**:
- Review acceptance criteria from PM
- Create comprehensive test plan
- Execute tests (network interception, storage, calculations, UI)
- Verify cross-browser compatibility
- Test edge cases and card-specific scenarios

**Output Required**:
- Test plan with scenarios
- Test execution results
- Regression test verification
- Browser compatibility confirmation
- Bug reports (if any issues found)

### 3. Flexible Mode (Bugs)

For bug fixes, you may skip PM analysis and proceed directly:

#### Engineer → QA Flow
1. **Staff Engineer**: Diagnose root cause, implement fix, verify solution
2. **QA**: Test fix, verify no regressions, confirm across browsers

### 4. Combined Implementation Plan

**All outputs must be consolidated into a single implementation plan** with these sections:

```markdown
## Implementation Plan: [Task Name]

### Task Classification
- Type: [FEATURE | BUG]
- Mode: [STRICT | FLEXIBLE]

### Product Requirements (Features only)
[PM analysis output: problem, solution, user stories, acceptance criteria]

### Technical Implementation
[Engineer output: design, approach, code changes, considerations]

### Testing & Validation
[QA output: test plan, scenarios, expected results]

### Summary
- Files to modify: [list]
- Estimated complexity: [Low | Medium | High]
- Key risks: [list any concerns]
```

## Project-Specific Guidelines

### Privacy First
- ALL data must stay local (browser storage only)
- NO external API calls for user data
- Network interception is read-only (clone responses)

### Card-Specific Logic
- **UOB PPV**: $600 limits, $5 rounding, contactless + online buckets
- **UOB VS**: $1,200 limits, $1,000 minimum, foreign currency + contactless buckets
- Always test with both card types

### Code Patterns
- Monkey patching with auto-recovery
- ES6+ JavaScript (async/await, arrow functions)
- Defensive programming (null checks, error handling)
- Debug mode for verbose logging

### Browser Compatibility
- **Desktop**: Chrome, Firefox, Safari, Opera, Edge
- **Mobile**: Edge Mobile only
- Test across multiple browsers before finalizing

## Usage Examples

### Example 1: New Feature (STRICT)
```
User request: "Add support for UOB One Card"

1. PM Analysis:
   - Problem: Users with UOB One Card cannot track their subcaps
   - Solution: Extend card detection and add One Card rules
   - User Story: As a UOB One Card holder, I want to see my subcap progress...
   - Acceptance Criteria: [list]

2. Engineer Implementation:
   - Design: Add card type detection for One Card
   - Modify: cardConfig object, calculation logic, UI display
   - Code: [implementation details]

3. QA Testing:
   - Test Plan: Verify One Card detection, calculation accuracy, UI display
   - Execute: Test with One Card transactions
   - Results: [test outcomes]

Combined Plan: [consolidated output]
```

### Example 2: Bug Fix (FLEXIBLE)
```
User request: "Contactless transactions are being double-counted"

1. Engineer Diagnosis & Fix:
   - Root Cause: Transaction filtering logic not deduplicating
   - Solution: Add transaction ID check before counting
   - Code: [implementation]

2. QA Validation:
   - Test: Verify no double-counting with duplicate transactions
   - Regression: Ensure other calculations still work
   - Results: [test outcomes]

Combined Plan: [consolidated output]
```

## Agent File References

- **Product Manager**: `.github/agents/product-manager.md`
- **Staff Engineer**: `.github/agents/staff-engineer.md`
- **QA Engineer**: `.github/agents/qa.md`

## Notes

- Always produce a **single, combined implementation plan** rather than separate documents
- For ambiguous tasks, default to STRICT mode (better safe than sorry)
- If PM requirements change during implementation, loop back to PM phase
- If QA finds critical issues, loop back to Engineer phase
- Document any deviations from the standard workflow
