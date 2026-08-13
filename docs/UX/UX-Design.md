# UX Design Handoff – Login & Team Page

**Project:** Grand Prix – Redesign Ticketing System Team 2
**Team:** Team 28
**Role:** UX – Hui Wen Chew
**Date Completed:** 11 August 2026
**Status:** Completed

## 1. Overview

This document provides the UX design handoff for the restyled Login page and Team page.

The UX mockups were created using **Figma** based on the requirements provided by the BA. The designs define the layout, styling, typography, colours and responsive behaviour to be followed during development.

The Login page work is styling only. Existing authentication functionality, validation, Firebase configuration and access-control behaviour should remain unchanged.

## 2. Login Page

The Login page has been visually restyled while maintaining the existing authentication functionality.

### Design Requirements

* Maintain the existing email and password fields.
* Maintain the existing login functionality.
* Maintain existing validation and error handling.
* Follow the typography, colour palette and styling specified in this document.
* Do not modify the existing authentication flow, Firebase configuration or access-control behaviour.

## 3. Team Page

The Team page displays information about the project team.

Each team member card contains:

* Profile photo
* Full name
* Role
* Short blurb


### Desktop Layout

Team member cards are displayed in a multi-column layout with consistent sizing, spacing and alignment.

### Mobile Layout

Team member cards are displayed vertically in a single-column layout. Text should wrap appropriately and the page should not require horizontal scrolling.


## 4. Colour Style Guide

The following colour palette should be used consistently throughout the Login and Team pages.

| Style             | Hex Code  | Usage                                                          |
| ----------------- | --------- | -------------------------------------------------------------- |
| Primary           | `#545F71` | Main headings, primary text, buttons and important UI elements |
| Secondary         | `#9BA5B7` | Secondary text, borders and supporting/inactive elements       |
| Tertiary          | `#EEF1F4` | Subtle backgrounds, cards and inactive surfaces                |
| White             | `#FFFFFF` | Cards, input fields and content surfaces                       |
| Background / Fill | `#EBF5FE` | Main application/page background                               |

## 5. Typography

**Inter** is the primary font used throughout the interface.

| Style | Font  | Weight  | Size | Usage              |
| ----- | ----- | ------- | ---- | ------------------ |
| H1    | Inter | Bold    | 48px | Main page headings |
| H2    | Inter | Bold    | 32px | Section headings   |
| H3    | Inter | Bold    | 24px | Smaller headings   |
| Body  | Inter | Regular | 16px | Main body text     |

The same typography hierarchy should be maintained across the Login and Team pages to ensure visual consistency.

## 6. Visual Consistency

The Login and Team pages should maintain consistent:

* Typography
* Colour palette
* Button styling
* Card styling
* Spacing
* Alignment
* Border styling
* Overall visual hierarchy

The UX mockups created in Figma should be used as the visual reference during implementation.


## 7. Developer Handoff

The UX designs have been completed using **Figma** and are ready for development.

For the **Login page**, only the visual styling should be changed. Existing authentication behaviour and functionality should remain unchanged.

For the **Team page**, development should follow the desktop and mobile layouts together with the colour and typography specifications documented above.

Any significant deviation from the UX design should be discussed with UX before implementation.

**UX Status: Completed and ready for development.**
