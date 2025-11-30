# GitHub Copilot Workspace Instructions

## Multi-Role Development Workflow

When working on tasks for this project, follow a structured multi-role approach that ensures thorough analysis, robust implementation, and comprehensive testing.

## Workflow Process

### 1. Task Classification

First, determine the task type:

- **FEATURE**: New functionality, enhancements, architectural changes
  - **Mode**: STRICT - Must follow full PM → Engineer → Reviewer → QA workflow
  - **Examples**: Add new card support, redesign UI, new subcap calculation logic
  
- **BUG**: Defect fixes, corrections, minor adjustments
  - **Mode**: FLEXIBLE - Can skip PM analysis, go directly to Engineer → Reviewer → QA
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

#### Phase 3: Code Review & Validation
**Consult**: `.github/agents/code-reviewer.md`

**Responsibilities**:
- Review code quality and adherence to project patterns
- Validate implementation meets PM requirements
- Assess product alignment and user experience
- Identify risks and issues before testing
- Provide feedback to PM if requirements gaps found

**Output Required**:
- Product assessment (does it solve the user problem?)
- Code quality assessment (readability, maintainability, patterns)
- Technical review (correctness, performance, compatibility, privacy)
- Issues found (Critical/Major/Minor)
- Recommendation (APPROVE/APPROVE WITH COMMENTS/REQUEST CHANGES/REJECT)
- Feedback for PM (if requirements issues discovered)

**Decision Points**:
- **APPROVE or APPROVE WITH COMMENTS**: Proceed to QA
- **REQUEST CHANGES**: Back to Staff Engineer for revision
- **REJECT + Requirements Issues**: Back to PM for requirements clarification, then to Engineer
- **REJECT + Code Issues**: Back to Staff Engineer for redesign

#### Phase 4: QA Testing & Validation
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
- Bug reports (if any issues found → back to Engineer → Reviewer)

### 3. Flexible Mode (Bugs)

For bug fixes, reviewer is recommended but optional:

#### Engineer → Reviewer → QA Flow (Recommended)
1. **Staff Engineer**: Diagnose root cause, implement fix, verify solution
2. **Code Reviewer**: Quick review for correctness and no regressions
3. **QA**: Test fix, verify no regressions, confirm across browsers

#### Engineer → QA Flow (Quick Fix)
1. **Staff Engineer**: Diagnose and implement obvious fix
2. **QA**: Test fix, verify no regressions

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

### Code Review Assessment
[Reviewer output: product assessment, code quality, technical review, recommendation]

### Testing & Validation
[QA output: test plan, scenarios, expected results]

### Summary
- Files to modify: [list]
- Estimated complexity: [Low | Medium | High]
- Key risks: [list any concerns]
- Review status: [APPROVED/APPROVED WITH COMMENTS/PENDING CHANGES]
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

3. Code Review:
   - Product: Solves user problem, meets acceptance criteria
   - Code Quality: Clean, maintainable, follows patterns
   - Technical: Logic correct, privacy preserved, browser compatible
   - Recommendation: APPROVE WITH COMMENTS (minor style suggestions)

4. QA Testing:
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

2. Code Review:
   - Technical: Logic fix is correct, no regressions expected
   - Code Quality: Clean implementation, proper error handling
   - Recommendation: APPROVE

3. QA Validation:
   - Test: Verify no double-counting with duplicate transactions
   - Regression: Ensure other calculations still work
   - Results: [test outcomes]

Combined Plan: [consolidated output]
```

## Agent File References

- **Product Manager**: `.github/agents/product-manager.md`
- **Staff Engineer**: `.github/agents/staff-engineer.md`
- **Code Reviewer**: `.github/agents/code-reviewer.md`
- **QA Engineer**: `.github/agents/qa.md`

## Notes

- Always produce a **single, combined implementation plan** rather than separate documents
- For ambiguous tasks, default to STRICT mode (better safe than sorry)
- **Code review is a quality gate** - implementations must be approved before QA testing
- If Reviewer finds requirements issues, loop back to PM for clarification
- If Reviewer finds code issues, loop back to Engineer for revision
- If QA finds bugs, loop back to Engineer → Reviewer → QA
- Document any deviations from the standard workflow

## GitHub Copilot Pull Request Review Instructions

When reviewing pull requests for this project, follow these guidelines specific to Tampermonkey userscript development:

### PR Review Checklist

#### 1. Task Classification Verification
- [ ] PR is correctly classified as FEATURE or BUG
- [ ] Appropriate workflow mode was followed (STRICT vs FLEXIBLE)
- [ ] All required phases completed (PM → Engineer → Reviewer → QA)
- [ ] PR description includes combined implementation plan

#### 2. Tampermonkey-Specific Checks
- [ ] `@version` number incremented appropriately (major.minor.patch)
- [ ] `@updateURL` and `@downloadURL` point to correct branch/location
- [ ] No external network calls added (privacy violation - CRITICAL)
- [ ] GM_getValue/GM_setValue used correctly for storage
- [ ] Storage structure changes include migration plan (if needed)
- [ ] Browser compatibility maintained (Chrome, Firefox, Safari, Opera, Edge desktop + Edge Mobile)
- [ ] No external dependencies (npm packages) introduced
- [ ] `@grant` permissions not expanded unnecessarily

#### 3. Code Quality Standards
- [ ] ES6+ syntax used consistently (async/await, arrow functions)
- [ ] Monkey patching includes auto-recovery mechanism
- [ ] Error handling is defensive and graceful (no crashes)
- [ ] Debug logging doesn't expose sensitive transaction data
- [ ] Code follows DRY principle and project patterns
- [ ] Variable and function names are clear and descriptive

#### 4. Testing Requirements
- [ ] Manual testing completed on at least 2 browsers
- [ ] Both UOB PPV and UOB VS cards tested (if calculation changes)
- [ ] Storage persistence verified across page reloads
- [ ] Network interception verified with browser DevTools
- [ ] Edge cases documented and tested
- [ ] Testing evidence provided (screenshots or console logs)

#### 5. Documentation Requirements
- [ ] README.md updated if user-facing changes
- [ ] TECHNICAL_DESIGN.md updated if architecture/API changes
- [ ] Inline comments added for complex logic
- [ ] Card-specific calculation logic documented

#### 6. Breaking Changes Assessment
- [ ] Storage format changes documented with migration path
- [ ] Backwards compatibility considered and tested
- [ ] Version bump reflects severity (breaking = major, feature = minor, fix = patch)
- [ ] Existing user data won't be corrupted

### PR Review Process

For this Tampermonkey userscript project, review in this priority order:

#### Priority 1: Privacy & Security (BLOCKING)
- **CRITICAL**: Verify absolutely NO external API calls added
- Confirm all data processing happens locally in browser
- Check that no sensitive data is logged to console
- Verify GM_getValue/GM_setValue usage is secure
- Ensure no XSS vulnerabilities in DOM manipulation

#### Priority 2: Storage Safety (BLOCKING)
- Verify storage structure changes won't corrupt existing user data
- Check for migration script if storage format changes
- Confirm backwards compatibility with older data formats
- Test data persistence across script updates

#### Priority 3: Browser Compatibility (BLOCKING)
- Verify changes work across all supported browsers
- Check for browser-specific API usage
- Confirm monkey patching works in different contexts
- Test on both desktop and Edge Mobile (if UI changes)

#### Priority 4: Testing Evidence (BLOCKING)
- Require proof of testing (console screenshots, DevTools captures)
- Verify both UOB PPV and UOB VS card types tested (if applicable)
- Check for edge case testing (no transactions, at limit, over limit)
- Confirm cross-browser testing completed

#### Priority 5: Workflow Compliance (BLOCKING)
- For FEATURE: Must include PM analysis, Engineer implementation, Reviewer assessment, QA results
- For BUG: Must include Engineer diagnosis/fix, Reviewer quick review (recommended), QA validation
- Verify combined implementation plan is complete
- Check that all acceptance criteria are addressed

#### Priority 6: Code Quality (NON-BLOCKING)
- Review for maintainability and readability
- Check adherence to ES6+ patterns
- Suggest optimizations if applicable
- Flag technical debt

#### Priority 7: Documentation (NON-BLOCKING)
- Verify completeness of documentation updates
- Check inline code comments for clarity
- Suggest improvements to user-facing docs

### Automatic Rejection Criteria

**REJECT immediately** if any of these are present:

1. **Privacy Violations**
   - External API calls to non-HeyMax domains
   - Data transmission to external services
   - Analytics/telemetry without explicit opt-in

2. **Storage Corruption Risks**
   - Breaking storage format changes without migration
   - Missing backwards compatibility handling
   - No testing of data migration

3. **Dependency Violations**
   - npm packages added
   - External library imports
   - CDN script loading

4. **Security Issues**
   - XSS vulnerabilities in DOM manipulation
   - Unsafe eval() usage
   - Insecure data handling

5. **Browser Compatibility Breaks**
   - Removing support for listed browsers
   - Using browser-specific APIs without polyfills
   - Breaking mobile (Edge Mobile) support

6. **Missing Critical Testing**
   - No testing evidence provided
   - Calculation changes not tested on both card types
   - No cross-browser testing for UI changes

### Review Response Templates

#### For Missing Workflow Documentation
```
This appears to be a [FEATURE/BUG]. According to our workflow, it should include:

For FEATURE (STRICT mode):
- PM Analysis (requirements, user stories, acceptance criteria)
- Engineer Implementation (design, code changes, considerations)
- Code Reviewer Assessment (product/quality/technical review, recommendation)
- QA Results (test plan, execution results, browser compatibility)

For BUG (FLEXIBLE mode):
- Engineer Diagnosis & Fix (root cause, solution, implementation)
- Code Reviewer Quick Review (recommended)
- QA Validation (test results, regression checks)

Could you add the complete implementation plan to the PR description? See .github/copilot-instructions.md for the template.
```

#### For Privacy Violations
```
⚠️ CRITICAL: This appears to make an external API call to [domain], which violates our privacy-first principle.

All data must stay local in the browser. We cannot:
- Make external API calls (except to HeyMax.ai for interception)
- Send user transaction data anywhere
- Use third-party services

Please refactor to use only:
- GM_getValue/GM_setValue for storage
- Local browser APIs
- Network interception of existing HeyMax API calls
```

#### For Storage Changes Without Migration
```
This changes the storage structure from:
[old structure]

To:
[new structure]

Questions:
1. How will existing users with old format data be handled?
2. Do we need a migration script to transform old data to new format?
3. What happens if migration fails?
4. Have you tested upgrading from v[old] with real data?

Please add:
- Migration logic to handle old format gracefully
- Version check to determine if migration needed
- Fallback behavior if migration fails
- Testing evidence showing upgrade path works
```

#### For Missing Testing Evidence
```
Could you provide testing evidence showing this works correctly? Please include:

For calculation changes:
- [ ] Console screenshots showing correct calculations for UOB PPV
- [ ] Console screenshots showing correct calculations for UOB VS
- [ ] Edge case testing (no transactions, at limit, over limit)

For UI changes:
- [ ] Screenshots from at least 2 browsers (Chrome, Firefox, Safari, Edge)
- [ ] Screenshot from Edge Mobile (if applicable)

For network interception changes:
- [ ] Browser DevTools Network tab showing interception working
- [ ] Console logs showing data capture

For storage changes:
- [ ] Evidence that data persists across page reloads
- [ ] Evidence that old data format still works (or migration tested)
```

#### For Incomplete Card Testing
```
This changes calculation logic but only shows testing for [UOB PPV/UOB VS].

Both card types must be tested because they have different rules:
- UOB PPV: $600 limits, $5 rounding, contactless + online buckets
- UOB VS: $1,200 limits, $1,000 threshold, contactless + foreign currency buckets

Please provide testing evidence for both card types.
```

### Approval Criteria

**APPROVE** when:
- All checklist items pass
- Implementation plan is complete and workflow followed
- Testing evidence provided for all affected areas
- Documentation updated appropriately
- No privacy, security, or storage safety concerns
- Browser compatibility maintained
- Version number appropriately incremented

**APPROVE WITH COMMENTS** when:
- Core functionality is correct and tested
- Minor style improvements suggested
- Documentation could be clearer
- Non-blocking optimization opportunities identified
- Version increment is correct

**REQUEST CHANGES** when:
- Critical checklist items fail (privacy, security, storage)
- Missing testing evidence
- Workflow not followed (missing phases)
- Breaking changes without migration plan
- Browser compatibility issues
- Incomplete implementation (acceptance criteria not met)

**COMMENT** when:
- Asking clarifying questions
- Suggesting alternative approaches
- Recommending future improvements
- Highlighting potential edge cases

### Common Issues to Flag

1. **External API Calls**: Adding fetch/XHR to non-HeyMax domains
2. **Storage Format Changes**: Modifying cardData structure without migration
3. **Browser-Specific Code**: Using APIs not available in all supported browsers
4. **Missing Error Handling**: Monkey patching without try-catch
5. **Sensitive Data Logging**: console.log of transaction details in production
6. **Incomplete Testing**: Only testing one browser or one card type
7. **Version Not Incremented**: Forgetting to bump @version in metadata
8. **Update URLs Wrong**: @updateURL/@downloadURL pointing to wrong branch
9. **Workflow Skipped**: PR missing implementation plan sections
10. **Documentation Stale**: Changes not reflected in README or TECHNICAL_DESIGN

### Tampermonkey-Specific Patterns to Verify

#### Metadata Block Should Look Like:
```javascript
// ==UserScript==
// @name         HeyMax SubCaps Viewer
// @version      X.Y.Z  // MUST be incremented
// @match        https://heymax.ai/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @run-at       document-start
// @updateURL    https://github.com/.../main/src/heymax-subcaps-viewer.user.js
// @downloadURL  https://github.com/.../main/src/heymax-subcaps-viewer.user.js
// ==/UserScript==
```

#### Monkey Patching Pattern Should Look Like:
```javascript
const targetWindow = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;
const originalFetch = targetWindow.fetch;

targetWindow.fetch = async function(...args) {
  try {
    const response = await originalFetch.apply(this, args);
    // ... interception logic
    return response;
  } catch (error) {
    console.error('[HeyMax SubCaps Viewer] Error:', error);
    return originalFetch.apply(this, args); // Fallback
  }
};
```

#### Storage Pattern Should Look Like:
```javascript
// Read
const cardDataStr = GM_getValue('cardData', '{}');
const cardData = JSON.parse(cardDataStr);

// Modify
cardData[cardId] = { /* ... */ };

// Write
GM_setValue('cardData', JSON.stringify(cardData));
```

### Questions to Ask During Review

1. **Privacy**: Does this maintain the privacy-first principle? Is all data local?
2. **Compatibility**: Will this work on all supported browsers?
3. **Storage**: Could this corrupt existing user data?
4. **Error Handling**: What happens if this fails? Is there graceful degradation?
5. **Testing**: Was this tested on both card types? On multiple browsers?
6. **Workflow**: Was the appropriate workflow followed? Is documentation complete?
7. **Security**: Are there any XSS or injection vulnerabilities?
8. **Performance**: Could this cause memory leaks or performance issues?
9. **Migration**: If storage changed, how are existing users handled?
10. **Rollback**: If this breaks, can we easily rollback?

### Post-Approval Checklist

Before merging APPROVED PRs, verify:
- [ ] All review comments addressed
- [ ] Version number is correct for change type
- [ ] GitHub branch is ready (no conflicts)
- [ ] Manual merge testing completed (if critical)
- [ ] Rollback plan documented (if high-risk change)
