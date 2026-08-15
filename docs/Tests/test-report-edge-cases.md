
## Test Information

-   **Tester:** Sahibjeet Singh
-   **Role:** Dev 2
-   **Date:** 15 Aug 2026
-   **Environment:** Deployed application
-   **Deployed URL:** [https://mock-sprint-frontend-sandy.vercel.app](https://mock-sprint-frontend-sandy.vercel.app/)
-   **Browser / version:** Safari Version 26.5
-   **Commit / deployment tested:** 57d835a9550d4156fe667628d4b2a878a4843ecd
- **Test report:**`docs/Tests/test-report-edge-cases.md`
-   **Test script:**  `frontend/tests/edge/spec.test.jsx`
    
## Scope

This report verifies the Task 8 edge cases  on the deployed application:

1. Invalid login.
2. Direct Team-page access without login.
3. Missing or failed team-member photo.
4. Unusually long member blurb.
5. Any bugs found are logged with reproduction steps and returned to Dev 1 for correction and retesting.

## Requirements Covered

| Requirement | Verification |
|---|---|
| Invalid login | Invalid-login and error-handling test |
| Direct Team-page access without login | Access-control and redirect verification |
| Missing/failed member image | Image-fallback and content verification |
| Long member blurb | Long-content and layout verification |


## Test Results


| ID | Test | Expected Result | Actual Result | Status |
|---|---|---|---|---|
| T8-01 | Invalid credentials rejected | User is not authenticated when invalid credentials are entered | Stayed in login page | PASS |
| T8-02 | Invalid-login error visible | Existing authentication error message is displayed | Invalid credentials msg displayed | PASS |
| T8-03 | Invalid-login error layout | Error message remains readable and does not break the Login page layout | Invalid credentials msg displayed in all sizes | PASS |
| T8-04 | Direct `/team` access while logged out | Unauthenticated user is redirected to the Login page | Redirected to login page | PASS |
| T8-05 | Missing or failed member photo | A suitable placeholder is displayed instead of the unavailable image | Mismatched placeholder image some displays image icon while other shows cross |  FAIL |
| T8-06 | Member information with missing photo | Member name, role and blurb remain visible when the photo is missing or fails to load | Alt text "Photo" is displayed when image fails to load and all information remains intact | PASS |
| T8-07 | Missing-photo card layout | Missing or failed image does not break the member card or page layout | Members card still intact | PASS |
| T8-08 | Long blurb wrapping | Unusually long blurb text wraps appropriately | Messes up the UI |  FAIL |
| T8-9 | Long blurb readability | The complete long blurb remains readable | Can be easily read | PASS |
| T8-10 | Long blurb card behaviour | Member card/container expands appropriately to accommodate the additional text | Members card expands correctly | PASS |
| T8-11 | Long blurb page layout | Long content does not overlap other elements or cause unwanted horizontal scrolling | Doesn't overlaps or cause any unwanted horizontal scrolling | PASS |
| T8-12 | Eye icon functionality | Clicking the password visibility icon should perform its intended UI action and should not display an unrelated popup. | Clicking on button displays unwanted pop up msg "Hello World!" | FAIL |
| T8-13 | No unwanted fields in sign in page  | There is no extra or not approved field in sign in page  | Page has a "Forgot password" field which is not part of design which on click shows unwanted pop up msg “Hello World!” | FAIL |
| T8-14 | UI follows Colour Style Guide & Typography  | All h1, h2, h3, body and Primary, Secondary, Territorial, White and Background / Fill are consistent with Requirments  | Card borders and paragraph text do not consistently follow the agreed colour palette. | FAIL |

## Automated Test Result

Command used:
```bash
cd  frontend
pnpm  test
```

- **Result:** FAIL
- **Notes:** 
```
 ✓ tests/unit/lib/utils.test.ts (6 tests) 5ms
 ❯ tests/edge/spec.test.jsx (3 tests | 1 failed) 84ms
   ✓ Edge Cases and Bugs > Rejects invalid credentials 66ms
   ✓ Edge Cases and Bugs > Displays the existing authentication error for invalid credentials 11ms
   × Edge Cases and Bugs > Password visibility control does not display an unrelated popup 7ms
     → expected "bound " to not be called at all, but actually been called 1 times
AssertionError: expected "bound " to not be called at all, but actually been called 1 times
Received: 

  1st bound  call:

    Array [
      "Hello World!",
    ]
Number of calls: 1
 ❯ tests/edge/spec.test.jsx:128:27
    126|     )
    127| 
    128|     expect(alertMock).not.toHaveBeenCalled()
       |                           ^
    129|   })
    130| })

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯
Test Files  1 failed | 1 passed (2)
      Tests  1 failed | 8 passed (9)
   Start at  22:26:15
   Duration  1.10s (transform 85ms, setup 338ms, collect 169ms, tests 94ms, environment 882ms, prepare 124ms)
```
- Failure's
>-   **Failure details:**  
    The password visibility test failed because clicking the visibility icon triggered a JavaScript alert containing `"Hello World!"`. The test expected no unrelated popup to be displayed.


## Bugs Found

#### BUG-[1] — [Accurate Placeholder not displayed]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** Should see photos of every member or Cross icon as placeholder
-  **Actual result:** Seeing placeholder image icon on 4 member and one has a valid cross icon.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.5_Missing_or_ailed_member_photo.png

#### BUG-[2] — [Long blurb spreads across page instead of wrapping under]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on blurb
5. Change text to exceptionally long sentence
-  **Expected result:** Should see blurb wrapping in contained card size
-  **Actual result:** Blurb expanding card and speeding across page.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.8_Long_blur_wrapping.png

#### BUG-[3] — [Clicking the password visibility icon showing unwanted messgae]
-  **Steps to reproduce:**
1. Be on sign in page 
2. Enter any password
3. Click on eye icon on password tab
-  **Expected result:** Show see actual password instead of "******"(dots).
-  **Actual result:** Seeing pop with msg "Hello World!"
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.12_Eye_icon_functionality.png

#### BUG-[4] — [Unwanted field in sign in page:**
1. Be on sign in page 
-  **Expected result:** Welcome msg, create account link and see Email and password field with Sign In button.
-  **Actual result:** Seeing extra non functional field "Forgot Password"
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.13_No_unwanted_fields_in_sign_in_page.png

#### BUG-[5] — [Card borders and paragraph text do not consistently follow the agreed colour palette]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Click on card border or Click on any paragraph text [Right click inspect element and see tag color]
-  **Expected result:** Should see colours accordingly to agreed palette.
-  **Actual result:** Seeing system assigned colours.
-  **Status:** Open — reported to Dev 1
-  **Evidence 1:** docs/Tests/Images/8.14.1_UI follows_Colour_Style_Guide_&_Typography.png
-  **Evidence 2:** docs/Tests/Images/8.14.2_UI follows_Colour_Style_Guide_&_Typography.png

## Overall Result
**FAIL**

## Planner Completion Comment

**Done:** Completed edge-case testing for invalid login, direct Team-page access while logged out, missing or failed member images, and unusually long member blurbs. Additional Login and Team page UI issues were also tested and documented. Five bugs were identified and reported to Dev 1.

**Deliverable:** `docs/Tests/test-report-edge-cases.md` and `frontend/tests/edge/spec.test.jsx`.

**Note for next role:** BUG-01, BUG-02, BUG-03, BUG-04 and BUG-05 require Dev 1 fixes and redeployment. Dev must retest the failed cases after the fixes are deployed before final sign-off.
