
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
| T8-03 | Invalid-login error layout | Error message remains readable and does not break the Login page layout | Invalid credentials msg not displayed at right location | FAIL |
| T8-04 | Direct `/team` access while logged out | Unauthenticated user is redirected to the Login page | Redirected to login page | PASS |
| T8-05 | Missing or failed member photo | Display text message "Photo Unavailable" | Mismatched placeholder some displays image icon while other shows cross |  FAIL |
| T8-06 | Member information with missing photo | Member name, role and blurb remain visible when the photo is missing or fails to load and photo displays Alt text "Image failed to load" | Alt text "Photo" is displayed when image fails to load and all information remains intact | FAIL |
| T8-07 | Missing-photo card layout | Missing or failed image does not break the member card or page layout | Members card still intact | PASS |
| T8-08 | Long blurb wrapping | Unusually long blurb text wraps appropriately | Messes up the UI |  FAIL |
| T8-09 | Long name wrapping and responsive | Long name text wraps appropriately | Name expands card, changes page title and card placement but aligned pertly in smaller screens |  FAIL |
| T8-010 | Long role title wrapping and responsive | Long role title text wraps appropriately | Name expands card and changes card placement and mobile devices role text misaligned |  FAIL |
| T8-11 | Long blurb readability | The complete long blurb remains readable | Can be easily read | PASS |
| T8-12 | Long blurb card behaviour | Member card/container expands appropriately to accommodate the additional text | Members card expands correctly | PASS |
| T8-13 | Long blurb page layout | Long content does not overlap other elements or cause unwanted horizontal scrolling | Doesn't overlaps or cause any unwanted horizontal scrolling | PASS |
| T8-14 | Short blurb wrapping and responsive | Short blurb fits in one line on both mobile and web | Fits perfectly |  PASS |
| T8-15 | Standard blurb wrapping and responsive | Standard blurb fits in one line on both mobile and web | Fits perfectly without expanding Card |  PASS |
| T8-16 | Missing blurb | Should display "No blurb available" as display text | Displaying blurb as text |  FAIL |
| T8-17 | Addition Team Members | Addition members that's are added should be well alined well | Odd numbered members added after >4 members are out of alignment |  FAIL |
| T8-18 | Keyboard Focus | On Active field keyboard focus should be visible |Keyboard focus is visible when pressed TAB keybind or clicked |  PASS |
| T8-19 | Eye icon functionality | Clicking the password visibility icon should perform its intended UI action and should not display an unrelated popup. | Clicking on button displays unwanted pop up msg "Hello World!" | FAIL |
| T8-20 | No unwanted fields in sign in page  | There is no extra or not approved field in sign in page  | Page has a "Forgot password" field which is not part of design which on click shows unwanted pop up msg “Hello World!” | FAIL |
| T8-21 | UI follows Colour Style Guide & Typography  | All h1, h2, h3, body and Primary, Secondary, Territorial, White and Background / Fill are consistent with Requirments  | Card borders and paragraph text do not consistently follow the agreed colour palette. | FAIL |
| T8-22 | Cards are as per agreed design  |  White Square cards with img at top and text below  | Card design dosent follow agreed design | FAIL |
| T8-23 | Teams page responsiveness on mobile devices  |  Screen should display content accordingly on smaller screens  | No side bar access and text size not adjusting | FAIL |
| T8-24 | Addition Team Members on smaller screens | Addition members that's are added should be well alined well | Addition members are displayed under each member well aligned |  PASS |
| T8-25 | Long blurb wrapping on smaller screens | Unusually long blurb text wraps with more and less button | The whole blurb is displayed as paragraph no button is displayed |  FAIL |

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
#### BUG-[1] — [Invalid credentials msg not displayed at right location]
-  **Steps to reproduce:**
1. Be on Signin page
2. Try login with wrong credential
-  **Expected result:** Should see error msg above Email
-  **Actual result:** Seeing error msg at top right corner of screen
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.3_Invalid-login_error_layout.png
- 
#### BUG-[2] — [Accurate Placeholder not displayed]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** Should see photos of every member or text "Photo unavailable"
-  **Actual result:** Seeing placeholder images of img icon and  cross icon.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.5_Missing_or_ailed_member_photo.png

#### BUG-[3] — [When photo not available not showing right text]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on photo
5. Remove photo src
-  **Expected result:** Should see Alt text "Image failed to load"
-  **Actual result:** Seeing Alt text "Photo".
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.6_Member_information_with_missing_photo.png

#### BUG-[4] — [Long blurb spreads across page instead of wrapping under]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on blurb
5. Change text to exceptionally long sentence
-  **Expected result:** Should see blurb wrapping in card.
-  **Actual result:** Blurb expanding card and speeding across page.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.8_Long_blur_wrapping.png

#### BUG-[5] — [Long Name expands card, changes page title and card placment]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on Name
5. Change text to exceptionally long name
-  **Expected result:** Should see name wrapping down in card.
-  **Actual result:** Name expanding card, changes card alignment to uneven and cuts the title off.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.9_Long_name_wrapping.png

#### BUG-[6] — [Long  Role expands card and changes card placement]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on Role
5. Change text to exceptionally long role
6. Check on both device types 
-  **Expected result:** Should see role wrapping down in card.
-  **Actual result:** Role expanding card and changes card alignment to uneven and on mobile devices role text being alight to left.
-  **Status:** Open — reported to Dev 1
-  **Evidence 1:** docs/Tests/Images/8.10.1_Long_Role_wrapping.png
-  **Evidence 2:** docs/Tests/Images/8.10.2_Long_Role_wrapping.png
- 
#### BUG-[7] — [Displaying "blurb" as text instead of right message]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** Should see display "No blurb available" on all cards as its not yet added.
-  **Actual result:** Displaying "blurb" as text on all cards.
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.16_Missing blurb.png
- 
#### BUG-[8] — [Greater than 4 members and any additional member who's count is odd out of alignment]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Add additional members via inspect element
-  **Expected result:** Should see members alighned left to right top to bottom max 4 in a row.
-  **Actual result:** Odd numbers of additional members after member count reaches 4 are misaligned.
-  **Status:** Open — reported to Dev 1
-  **Evidence 1:** docs/Tests/Images/817.1_Addition_Team_Members.png
-  **Evidence 2:** docs/Tests/Images/817.2_Addition_Team_Members.png

#### BUG-[9] — [Clicking the password visibility icon showing unwanted messgae]
-  **Steps to reproduce:**
1. Be on sign in page 
2. Enter any password
3. Click on eye icon on password tab
-  **Expected result:** Show see actual password instead of "******"(dots).
-  **Actual result:** Seeing pop with msg "Hello World!"
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.19_Eye_icon_functionality.png

#### BUG-[10] — [Unwanted field in sign in page]
1. Be on sign in page 
-  **Expected result:** Welcome msg, create account link and see Email and password field with Sign In button.
-  **Actual result:** Seeing extra non functional field "Forgot Password"
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.20_No_unwanted_fields_in_sign_in_page.png

#### BUG-[11] — [Card borders and paragraph text do not consistently follow the agreed colour palette]
-  **Steps to reproduce:**
1. Login in with valid Email and Password
2. Are on Team page
3. Click on card border or Click on any paragraph text [Right click inspect element and see tag color]
-  **Expected result:** Should see colours accordingly to agreed palette.
-  **Actual result:** Seeing system assigned colours.
-  **Status:** Open — reported to Dev 1
-  **Evidence 1:** docs/Tests/Images/8.21.1_UI follows_Colour_Style_Guide_&_Typography.png
-  **Evidence 2:** docs/Tests/Images/8.21.2_UI follows_Colour_Style_Guide_&_Typography.png

#### BUG-[12] — [Cards are not according to agreed design]
1. Login in with valid Email and Password
2. Are on Team page
-  **Expected result:** White Square cards with img at top and text below
-  **Actual result:** No card visible just img and text below
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.22_Cards_are_as_per_agreed_design.png

#### BUG-[13] — [Smaller screens no side bar access and text size not adjusting]
1. Login in with valid Email and Password
2. Are on Team page
3. Are in responsive design check view on smaller screen 
-  **Expected result:** Text should adjust according to size and side bar should be accessible.
-  **Actual result:** Txt staying big covering large screen are and no access to sidebar
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.23_Teams_page_responsiveness_on_mobile_devices.png

#### BUG-[14] — [Smaller screens whole blurb is displayed as paragraph]
1. Login in with valid Email and Password
2. Are on Team page
3. Open inspect element tool
4. Right click on blurb
5. Change text to exceptionally long sentence
6.  Are in responsive design check view on smaller screen 
-  **Expected result:** Text should collapse with "more" displayed when collapsed and "less" button displayed when whole text is not collapsed.
-  **Actual result:** Seeing whole text as paragraph with no muttons
-  **Status:** Open — reported to Dev 1
-  **Evidence:** docs/Tests/Images/8.25_Long blurb_wrapping_on_smaller_screens.png

## Overall Result
**FAIL**

## Planner Completion Comment

**Done:** Completed edge-case testing for invalid login, direct Team-page access while logged out, missing or failed member images, and unusually long member blurbs. Additional Login and Team page UI issues were also tested and documented. Five bugs were identified and reported to Dev 1.

**Deliverable:** `docs/Tests/test-report-edge-cases.md` and `frontend/tests/edge/spec.test.jsx`.

**Note for next role:** BUG-01, BUG-02, BUG-03, BUG-04... BUG-14 require Dev 1 fixes and redeployment. Dev must retest the failed cases after the fixes are deployed before final sign-off.