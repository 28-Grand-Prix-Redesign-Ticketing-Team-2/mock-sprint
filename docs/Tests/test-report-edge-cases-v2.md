# Task 8 Edge-Case Retest Report

## Test Information

- **Original Tester:** Sahibjeet Singh
- **Role:** Dev 2

  **Tester:** Sahibjeet Singh, Muhammad Rayyan Sohail -**Role:** Dev 2, BA

- **Retest Date:** 16 Aug 2026
- **Environment:** Local frontend test environment after fixes
- **Branch tested:** `fix/login-team-edge-case-tests`
- **Deployed URL reference:** https://mock-sprint-frontend-sandy.vercel.app
- **Deployment verification:** To be repeated after the branch is merged and redeployed
- **Test report:** `docs/Tests/test-report-edge-cases.md`
- **Primary test script:** `frontend/tests/edge/spec.test.jsx`
- **Additional regression scripts:**
  - `frontend/tests/flow/team.test.jsx`
  - `frontend/tests/flow/TeamMemberCard.test.tsx`
  - `frontend/tests/flow/TeamMemberCard.long-text.test.tsx`
  - `frontend/tests/flow/TeamMemberCard.mobile-edge-cases.test.tsx`
  - `frontend/tests/flow/TeamMemberCard.missing-blurb.test.tsx`

## Scope

This report records the post-fix retest of the Task 8 Login and Team page edge cases. The retest covers:

1. Invalid login handling.
2. Direct Team-page access without login.
3. Missing or failed team-member photos.
4. Long member blurbs.
5. Long member names and roles.
6. Missing blurbs.
7. Additional team-member alignment.
8. Password visibility behaviour.
9. Removal of unapproved Login-page fields and popups.
10. Team-card styling, colour, typography and responsive behaviour.
11. Mobile long-blurb More/Less behaviour.
12. Regression checks for the updated inline authentication messages.

## Requirements Covered

| Requirement                           | Verification                                                    |
| ------------------------------------- | --------------------------------------------------------------- |
| Invalid login                         | Invalid-login rejection and inline error-message verification   |
| Direct Team-page access without login | Access-control and redirect verification                        |
| Missing/failed member image           | Image-fallback and member-content verification                  |
| Long member blurb                     | Long-content wrapping, readability and layout verification      |
| Long member name                      | Responsive wrapping without truncation or layout breakage       |
| Long member role                      | Responsive wrapping without truncation or misalignment          |
| Missing blurb                         | Exact fallback text verification                                |
| Additional team members               | Desktop and mobile grid alignment verification                  |
| Password visibility                   | Reveal/conceal behaviour with no unrelated popup                |
| Login-page UI                         | No unapproved fields; Figma-aligned authentication feedback     |
| Team-page UI                          | Approved colours, typography, white cards and responsive layout |

## Test Results

| ID    | Test                                         | Expected Result                                                                   | Actual Result After Fix                                                                             | Status |
| ----- | -------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------ |
| T8-01 | Invalid credentials rejected                 | User is not authenticated when invalid credentials are entered                    | Invalid credentials are rejected and the user remains on the Login page                             | PASS   |
| T8-02 | Invalid-login error visible                  | Approved authentication error message is displayed                                | Inline authentication error is displayed                                                            | PASS   |
| T8-03 | Invalid-login error layout                   | Error message remains readable and appears in the approved Figma position         | Error is displayed inline above the Email field and no top-right invalid-credentials toast is shown | PASS   |
| T8-04 | Direct `/team` access while logged out       | Unauthenticated user is redirected to Login                                       | Route protection redirects unauthenticated access to Login                                          | PASS   |
| T8-05 | Missing or failed member photo               | Missing photo displays `Photo Unavailable`                                        | Exact fallback text is displayed when no image is provided                                          | PASS   |
| T8-06 | Member information with missing/failed photo | Name, role and blurb remain visible; failed image displays `Image failed to load` | Failed image is removed, `Image failed to load` is shown, and member information remains visible    | PASS   |
| T8-07 | Missing-photo card layout                    | Missing/failed image does not break the card or page layout                       | Card remains intact and aligned                                                                     | PASS   |
| T8-08 | Long blurb wrapping                          | Unusually long blurb wraps appropriately                                          | Long blurb is contained within the card without breaking layout                                     | PASS   |
| T8-09 | Long name wrapping and responsiveness        | Long name wraps appropriately                                                     | Long names wrap naturally without truncation, clipping or card misalignment                         | PASS   |
| T8-10 | Long role title wrapping and responsiveness  | Long role title wraps appropriately                                               | Long roles wrap naturally and stay correctly aligned on mobile and desktop                          | PASS   |
| T8-11 | Long blurb readability                       | Complete long blurb remains readable                                              | Full blurb remains readable                                                                         | PASS   |
| T8-12 | Long blurb card behaviour                    | Card expands appropriately for additional text                                    | Card expands correctly without overlap                                                              | PASS   |
| T8-13 | Long blurb page layout                       | No overlap or unwanted horizontal scrolling                                       | No overlap or unwanted horizontal scrolling occurs                                                  | PASS   |
| T8-14 | Short blurb wrapping and responsiveness      | Short blurb displays cleanly                                                      | Short blurb displays correctly without unnecessary expansion controls                               | PASS   |
| T8-15 | Standard blurb wrapping and responsiveness   | Standard blurb displays cleanly                                                   | Standard blurb displays correctly without breaking the card                                         | PASS   |
| T8-16 | Missing blurb                                | Display the approved missing-blurb fallback                                       | Exact text `No Blurb Available` is displayed                                                        | PASS   |
| T8-17 | Additional Team Members                      | Additional members remain correctly aligned                                       | Members follow the responsive grid and remain aligned                                               | PASS   |
| T8-18 | Keyboard Focus                               | Active controls show visible keyboard focus                                       | Keyboard focus is visible for interactive controls                                                  | PASS   |
| T8-19 | Eye icon functionality                       | Visibility control reveals/conceals password and shows no unrelated popup         | Password visibility toggles correctly and no `Hello World!` popup appears                           | PASS   |
| T8-20 | No unwanted fields on Sign In page           | Only approved Login controls are present                                          | Unapproved Forgot Password field and unrelated popup behaviour are removed                          | PASS   |
| T8-21 | UI follows Colour Style Guide & Typography   | Approved colours and typography are used consistently                             | Login and Team UI use the agreed palette and typography                                             | PASS   |
| T8-22 | Cards match agreed design                    | White cards with square image at top and text below                               | Team cards match the approved white-card design with responsive square images                       | PASS   |
| T8-23 | Team page responsiveness on smaller screens  | Content adapts correctly to smaller screens                                       | Team content, typography and card layout respond correctly on smaller screens                       | PASS   |
| T8-24 | Additional Team Members on smaller screens   | Additional members remain aligned                                                 | Additional members display one per row and remain aligned                                           | PASS   |
| T8-25 | Long blurb on smaller screens                | Long blurb collapses with More/Less controls                                      | Mobile long blurbs use More/Less and expand/collapse correctly                                      | PASS   |

## Additional Regression Checks

| Check                             | Expected Result                                                                 | Actual Result                                                                             | Status |
| --------------------------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------ |
| Invalid-credentials toast removal | Invalid credentials use only the approved inline error banner                   | No invalid-credentials toast is produced                                                  | PASS   |
| Successful-login feedback         | Successful sign-in displays the approved inline success message before redirect | `Signed in successfully` is displayed in the Figma-aligned success banner before redirect | PASS   |
| Successful-login toast removal    | Successful authentication should not create the old top-right success toast     | Success feedback is inline only                                                           | PASS   |
| Responsive Team grid              | One card per row below desktop and three cards per row at `1440px+`             | Grid matches the approved responsive behaviour                                            | PASS   |
| Square member image               | 240px square on smaller screens and 280px square on desktop                     | Responsive square-image classes are applied                                               | PASS   |

## Automated Test Result

Command used:

```bash
cd frontend
pnpm vitest run
```

- **Result:** PASS
- **Notes:** The complete automated Vitest suite was rerun after the Login and Team-page fixes. All tests completed successfully, including the updated legacy tests and the new TeamMemberCard edge-case/regression tests.

## Previously Reported Bugs — Retest Status

| Bug    | Previous Issue                                              | Retest Result                                                                        | Status   |
| ------ | ----------------------------------------------------------- | ------------------------------------------------------------------------------------ | -------- |
| BUG-01 | Invalid credentials message displayed in the wrong location | Message now appears in the approved inline Figma position                            | RESOLVED |
| BUG-02 | Missing-photo placeholders were inconsistent                | Missing image now displays `Photo Unavailable` consistently                          | RESOLVED |
| BUG-03 | Failed image displayed incorrect fallback text              | Failed image now displays `Image failed to load` while preserving member information | RESOLVED |
| BUG-04 | Long blurb broke the card/page layout                       | Long blurb is contained and wraps correctly                                          | RESOLVED |
| BUG-05 | Long name expanded/misaligned the card                      | Long names wrap without clipping or layout breakage                                  | RESOLVED |
| BUG-06 | Long role expanded/misaligned the card                      | Long roles wrap and remain aligned                                                   | RESOLVED |
| BUG-07 | Incorrect missing-blurb placeholder                         | `No Blurb Available` is displayed                                                    | RESOLVED |
| BUG-08 | Additional/odd-numbered members were misaligned             | Responsive grid keeps additional members aligned                                     | RESOLVED |
| BUG-09 | Password eye icon triggered `Hello World!` popup            | Visibility control toggles password with no unrelated popup                          | RESOLVED |
| BUG-10 | Unapproved Forgot Password field was displayed              | Unapproved field has been removed                                                    | RESOLVED |
| BUG-11 | Card/text colours did not match the agreed palette          | Approved colour palette is applied consistently                                      | RESOLVED |
| BUG-12 | Team cards did not match the agreed design                  | White responsive cards with square images are implemented                            | RESOLVED |
| BUG-13 | Team page did not respond correctly on smaller screens      | Responsive mobile layout has been corrected                                          | RESOLVED |
| BUG-14 | Mobile long blurb showed full paragraph with no controls    | Mobile More/Less behaviour is implemented                                            | RESOLVED |

## Overall Result

**PASS**

All previously failed Task 8 edge cases have been corrected and successfully retested in the current branch. The automated regression suite is green.

## Planner Completion Comment

**Done:** Retested the previously failed Login and Team page edge cases after the fixes were implemented. Verified invalid-login feedback, photo fallbacks, missing blurb handling, long-name/role/blurb behaviour, password visibility, approved Login controls, card styling, responsive Team layout, and mobile More/Less behaviour. The updated automated test suite completed successfully with all tests passing.

**Deliverable:** `docs/Tests/test-report-edge-cases.md`, `frontend/tests/edge/spec.test.jsx`, updated Team flow tests, and the new TeamMemberCard regression/edge-case test scripts.

**Note for next role:** No outstanding Task 8 defects remain in the current branch. Perform a final deployment verification after merge/deployment, then proceed with final sign-off.
