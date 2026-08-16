# Task 7 Login-to-Team Flow Retest Report

## Test Information

- **Original Tester:** Sahibjeet Singh
- **Role:** Dev 2

  **Tester:** Sahibjeet Singh, Muhammad Rayyan Sohail -**Role:** Dev 2, BA

- **Retest Date:** 16 Aug 2026
- **Environment:** Local frontend test environment after fixes
- **Branch tested:** `fix/login-team-edge-case-tests`
- **Deployed URL reference:** https://mock-sprint-frontend-sandy.vercel.app
- **Deployment verification:** To be repeated after the branch is merged and redeployed
- **Test report:** `docs/Tests/test-report-flow.md`
- **Test scripts:**
  - `frontend/tests/flow/signin.test.jsx`
  - `frontend/tests/flow/team.test.jsx`

## Scope

This report records the post-fix retest of the Task 7 happy-path Login-to-Team flow:

1. Valid login works end-to-end.
2. Successful authentication displays the approved inline success feedback.
3. Successful authentication redirects the user to the Team page.
4. The Team page displays the required team information correctly and completely.
5. Previously failed member photo, member name and member blurb checks are verified after the fixes.
6. The updated Team page is checked against the approved responsive Figma design.

## Requirements Covered

| Requirement                                                       | Verification                                              |
| ----------------------------------------------------------------- | --------------------------------------------------------- |
| Existing Login functionality continues to operate correctly       | Valid-login test                                          |
| Authentication behaviour remains unchanged                        | Valid login and redirect                                  |
| Successful-login feedback matches approved UI                     | Inline success-message verification with no success toast |
| Team name is displayed                                            | Team-page content verification                            |
| Every agreed member is displayed                                  | Team-page content verification                            |
| Each member has a photo/fallback, full name, role and short blurb | Team-card content verification                            |
| Member information is presented clearly and consistently          | Responsive layout and card-state verification             |

## Test Results

| ID    | Test                                   | Expected Result                                                            | Actual Result After Fix                                                                                              | Status |
| ----- | -------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------ |
| T7-01 | Open application                       | Login page loads without errors                                            | Login page loads successfully                                                                                        | PASS   |
| T7-02 | Login using valid credentials          | Authentication succeeds                                                    | Authentication succeeds as expected                                                                                  | PASS   |
| T7-03 | Successful-login feedback and redirect | Approved success feedback is shown and user is redirected to Team          | Inline `Signed in successfully` message is shown before redirect; no top-right success toast is used                 | PASS   |
| T7-04 | Team name                              | Correct agreed team name is visible                                        | `Team 28 - Grand Prix Redesigning Ticketing - Team 2` is visible                                                     | PASS   |
| T7-05 | Team members                           | All agreed team members are displayed                                      | Every agreed member is displayed                                                                                     | PASS   |
| T7-06 | Member photos/fallbacks                | Every member has a visible photo or approved fallback                      | Valid photos display correctly; missing photos use `Photo Unavailable`, and failed images use `Image failed to load` | PASS   |
| T7-07 | Member names                           | Every member's full name is correct and visible                            | All member names are displayed correctly, including `Hui Wen Chew`                                                   | PASS   |
| T7-08 | Member roles                           | Every role is visible and clearly associated with the member               | All member roles are clearly visible                                                                                 | PASS   |
| T7-09 | Member blurbs                          | Every member has a readable short blurb or approved missing-blurb fallback | Member blurbs display correctly; missing blurbs use `No Blurb Available`                                             | PASS   |
| T7-10 | Team responsive layout                 | Team cards follow the approved responsive Figma layout                     | One card per row below desktop and three cards per row at `1440px+`                                                  | PASS   |
| T7-11 | Team card presentation                 | Member cards follow the agreed white-card design                           | Responsive white cards with square images and text below are displayed                                               | PASS   |

## Automated Test Result

Command used:

```bash
cd frontend
pnpm vitest run
```

- **Result:** PASS
- **Notes:** The complete automated Vitest suite was rerun after the Login and Team-page fixes. All tests completed successfully. The flow and Team-page tests now reflect the approved responsive layout, corrected fallbacks and updated inline authentication feedback.

## Previously Reported Bugs — Retest Status

| Bug    | Previous Issue                                                                     | Retest Result                                                           | Status   |
| ------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | -------- |
| BUG-01 | Visible photo placeholders did not match the expected fallback behaviour           | Photo and fallback states now behave consistently                       | RESOLVED |
| BUG-02 | `Hui Wen CHew` was displayed with incorrect capitalisation                         | Name corrected to `Hui Wen Chew`                                        | RESOLVED |
| BUG-03 | Member cards displayed placeholder `Blurb` text instead of actual/fallback content | Actual blurbs are displayed and missing blurbs use `No Blurb Available` | RESOLVED |

## Regression Verification

The following related changes were also checked during the retest:

- Invalid credentials display only the approved inline authentication error.
- Successful login displays the approved inline success state and no top-right success toast.
- Password visibility control reveals/conceals the password without an unrelated popup.
- Team cards use the approved responsive square-image presentation.
- Long member names and roles wrap without truncation or clipping.
- Mobile long blurbs use More/Less controls.
- Existing authentication and redirect behaviour is preserved.

## Overall Result

**PASS**

The Task 7 Login-to-Team flow and all previously failed Task 7 checks now pass in the current branch.

## Planner Completion Comment

**Done:** Retested the Login-to-Team happy path after the UI and regression fixes. Confirmed successful authentication, approved inline success feedback, redirect to the Team page, correct team information, member photo/fallback behaviour, corrected member names, readable blurbs, and the approved responsive Team layout. The complete automated test suite completed successfully with all tests passing.

**Deliverable:** `docs/Tests/test-report-flow.md`, `frontend/tests/flow/signin.test.jsx`, and `frontend/tests/flow/team.test.jsx`.

**Note for next role:** No outstanding Task 7 defects remain in the current branch. Perform final verification against the deployed build after merge/deployment, then proceed with final sign-off.
