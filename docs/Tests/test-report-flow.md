
## Test Information 
-  **Tester:** Sahibjeet Singh
-  **Role:** Dev 2
-  **Date:** 15 Aug 2026
-  **Environment:** Deployed application
-  **Deployed URL:** https://mock-sprint-frontend-sandy.vercel.app
-  **Browser / version:** Safari Version 26.5
-  **Commit / deployment tested:** 57d835a9550d4156fe667628d4b2a878a4843ecd
-  **Test report:**  `docs/test-report-flow.md`
-  **Test script:**  `frontend/tests/flow/signin.test.jsx`

## Scope
This report verifies the Task 7 happy-path flow on the deployed application:
1. Valid login works end-to-end.
2. Successful authentication redirects the user to the Team page.
3. The Team page displays the required team information correctly and completely.
  

## Requirements Covered 
| Requirement | Verification |
| ----------------------------------------------------------- | ------------------------------ |
| Existing Login functionality continues to operate correctly | Valid login test |
| Authentication behaviour remains unchanged | Valid login and redirect |
| Team name is displayed | Team-page content verification |
| Every agreed member is displayed | Team-page content verification |
| Each member has a photo, full name, role and short blurb | Team-page content verification |
| Member information is presented clearly and consistently | Visual/manual verification |

## Test Results
| ID | Test | Expected Result | Actual Result | Status |
| ----- | ----------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| T7-01 | Open deployed application | Login page loads without errors | Login page loads with no errors | PASS |
| T7-02 | Login using valid credentials | Authentication succeeds | Logged in as expected user | PASS |
| T7-03 | Successful-login redirect | User is automatically redirected to the Team page | Got redirected to Team's page | PASS |
| T7-04 | Team name | Correct agreed team name is visible | "Team 28 - Grand Prix Redesign Ticketing - Team 2" - Visible | PASS |
| T7-05 | Team members | All agreed team members are displayed | Every member is displayed correctly | PASS |
| T7-06 | Member photos | Every member has a visible photo | All members have placeholder pictures where 4 members have a image icon 1 member has cross icon while according to UX design if no image is present it should display cross icon on all images | FAIL |
| T7-07 | Member names | Every member's full name is visible | All members full name visible with one member name not correctly added contains an extra capital letter "Hui Wen CHew" the result should be "Hui Wen Chew" | FAIL |
| T7-08 | Member roles | Every member's project role is visible and clearly associated with the member | Every member role is cleary visible | PASS |
| T7-09 | Member blurbs | Every member has a readable short blurb | No blurb written on displays UX design placeholder text "Blurb" no actual blurb present | FAIL |

## Automated Test Result
Command used:
  
```bash
cd  frontend
pnpm  test
```
-  **Result:** PASS
-  **Notes:**
✓ tests/unit/lib/utils.test.ts (6 tests) 5ms
✓ tests/flow/signin.test.jsx (2 tests) 61ms
Test Files 2 passed (2)
Tests 8 passed (8)
Start at 19:13:03
Duration 1.01s


## Bugs Found  
#### BUG-[1] — [Visible photos placeholders not as expected]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** Should see photos of every member or Cross icon as placeholder
-  **Actual result:** Seeing placeholder image icon on 4 member and one has a valid cross icon.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/7.2_Redirect_to_team_page_confirmed.png

#### BUG-[2] — [A members name not correctly displayed]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** All members should have correct name displayed
-  **Actual result:** One member name has 2 Capital letters “Hui Wen CHew”
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/7.2_Redirect_to_team_page_confirmed.png

#### BUG-[3] — [No blurb written instead placeholder used]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** Every member has a readable short blurb
-  **Actual result:** Only displays UX design placeholder text “Blurb” no actual blurb written
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/7.2_Redirect_to_team_page_confirmed.png  

## Overall Result

**FAIL**

## Planner Completion Comment

**Done:** Automated UI tests were completed for the login page these tests verified that the email and password fields are displayed and that the Sign In button is present through Automated Testing, and the deployed Login → Team flow was manually verified. T7-06, T7-07, and T7-09 failed due to incorrect member image placeholders, an incorrectly displayed member name, and missing member blurbs.

**Deliverable:**  `frontend/tests/flow/signin.test.jsx` and `docs/test-report-flow.md`.

**Note for next role:** Task 7 testing is complete with an overall FAIL result. The identified requirement failures have been reported to Dev 1. Task 8 can start, with additional UI issues identified during testing to be reviewed and logged separately.