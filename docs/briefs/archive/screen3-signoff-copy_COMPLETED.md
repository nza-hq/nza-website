# Brief — Landing page: screen 3 and sign-off copy

**Repo:** `nza-hq/nza-website`
**Mode:** Product
**Author:** Claude Chat, 13 September 2026
**Authorised by:** Chris Scott
**Revision:** R01

---

## BEFORE DOING ANYTHING

- [ ] Read this brief in full. Confirm receipt by quoting its title.
- [ ] Read `CLAUDE.md` and `STATUS.md`.
- [ ] Session-start reconciliation: `ls docs/briefs/active/` · `cat docs/briefs/current.md` · `git log --oneline -20`. If `active/` holds a different brief, STOP and surface it.
- [ ] Confirm clean tree, `origin` synced.
- [ ] Read `src/screens/ProductsScreen.tsx` and `src/screens/GetInTouchScreen.tsx` before editing.
- [ ] Land this brief at `docs/briefs/active/screen3-signoff-copy.md` as Part 1's first commit.

---

## Goal

Copy-only revision to landing screens 3 and 4. No layout work, no component changes, no CSS beyond deleting one rule if it is left orphaned.

Screen 3's heading and intro were written when the three cards were framed as alternative entry points. They are now framed as examples of work — so the heading changes, the intro is deleted outright, and the card promises describe what each thing is rather than where it sits relative to the others.

Screen 4 becomes an invitation to imagine something rather than a polite offer to talk.

**Screen 2 is already correct and is not in scope.** Its two-sentence statement and all three phase bodies match the agreed copy as at commit `a24bc16`. Do not touch `HowWeWorkSection.tsx`.

---

## Why this — intent

**Screen 3's intro has to go, not be rewritten.** Anything in that slot will either rank the three products or explain how they relate, and the page should do neither. Three logos and three lines let the reader draw their own conclusion. Deleting it also matches PABLO and decodED, which both go straight from a short heading into content.

**"Where it starts" contradicted screen 2.** Screen 2 says *one way of working*; "three ways in" argued with it fifteen seconds later. "What we've built" hands off cleanly instead — screen 2 says what NZA does, screen 3 shows it.

**The NZ:AI card carries the most weight** because it is the general case. Its promise is longer than its siblings on purpose. Do not trim it to match.

**Screen 4's new copy makes an economic argument, not a technology one.** It never says "AI". Saying the cost of building collapsed invites the reader to do arithmetic; saying AI advanced invites them to be sceptical. Keep it that way.

---

## Scope

**IN:** `ProductsScreen.tsx` heading, intro deletion, three card promises, one card question. `GetInTouchScreen.tsx` headline and body.

**OUT:** `HowWeWorkSection.tsx` (already correct). Card order, accent colours, hover interaction, logos, hrefs. The hero. All three product pages. Any CSS beyond removing an orphaned `.products-intro` rule. `colors_and_type.css`.

---

## Part 1 — Land the brief

Save to `docs/briefs/active/screen3-signoff-copy.md`, repoint `docs/briefs/current.md`.

**Commit:** `docs: land screen3 + signoff copy brief`

---

## Part 2 — Screen 3

### 2.1 Heading

Current (verbatim in the file):
```
Where it starts
```

Replace with:
```
What we've built
```

### 2.2 Intro — DELETE

The file currently contains, at roughly line 198:

```jsx
<MaskReveal as="p" className="products-intro" delay={200}>
  Three ways in, depending on what you need first.
</MaskReveal>
```

**Delete the entire element**, not just the string. Then grep `products-intro` across `src/` and remove the CSS rule if nothing else references it.

Check the heading's own `MaskReveal` delay still reads correctly once the second reveal is gone — if the heading was timed to lead into the intro, it may want retiming. Report if you change it.

### 2.3 Card copy

Three promises change. One question changes. Two questions stay exactly as they are.

**NZ:AI**

Question — current:
```
Want net zero tools built around your organisation?
```
Replace with:
```
Want to do more with your data?
```

Promise — current:
```
Built around your organisation, whatever shape the problem takes.
```
Replace with:
```
Our partnership approach: we build the tools your organisation needs, and work alongside your team to act on what matters.
```

**PABLO**

Question: **unchanged** — `Want to cut your electricity costs?`

Promise — current:
```
When the problem is energy: what it costs, and what to do about it.
```
Replace with:
```
Break down what you actually pay for, then model solar, storage and demand against it.
```

**decodED**

Question: **unchanged** — `Running climate action in education?`

Promise — current:
```
Built for education, and free for every institution.
```
Replace with:
```
Build a climate action plan for your site. Free for every nursery, school, college and university.
```

**Card order is unchanged:** NZ:AI, PABLO, decodED.

**Files:** `src/screens/ProductsScreen.tsx`, possibly `src/styles/landing.css`, `STATUS.md`

**Commit:** `copy: screen 3 heading and card promises, remove intro line`

---

## Part 3 — Sign-off screen

Headline — current:
```
Let's talk.
```
Replace with:
```
Tell us what you'd build.
```

Body — current:
```
We'd be delighted to hear from you. Whether you want a quick demo, a longer conversation, or just to ask questions.
```
Replace with:
```
The tools that used to take a year and a budget most organisations could never justify now take weeks. That changes what is worth attempting. If you have an idea, or a problem you have been working around for years, we would like to hear it.
```

CTA text unchanged: `Get in touch`.

Note the headline loses its italic emphasis if the current one has any — check how `Let's talk.` is marked up and keep the same treatment on the replacement. If `talk` was italicised, the natural equivalent is `build`.

**Files:** `src/screens/GetInTouchScreen.tsx`, `STATUS.md`

**Commit:** `copy: sign-off screen headline and body`

---

## Part 4 — Verify and close

1. Check at 1440, 1024, 768 and 375px. The new body copy on screen 4 is roughly twice the length of the old — confirm it does not overflow or crowd the CTA on phone.
2. `npm run build` clean.
3. `STATUS.md` updated; brief archived to `docs/briefs/archive/screen3-signoff-copy_COMPLETED.md`; `current.md` repointed.

**Commit:** `close: screen3 + signoff copy complete`

---

## Verification

- [ ] Screen 3 heading reads `What we've built`.
- [ ] No intro paragraph between the heading and the cards. Inspect the DOM — confirm the element is gone, not hidden.
- [ ] `grep -r "products-intro" src/` returns zero results, or returns only a still-used rule (report which).
- [ ] `grep -r "Three ways in" src/` returns zero results.
- [ ] `grep -r "Where it starts" src/` returns zero results.
- [ ] Three cards in order NZ:AI, PABLO, decodED, each with the new promise and correct question.
- [ ] Each card still draws its own accent on hover: NZ:AI teal, PABLO orange, decodED green.
- [ ] Each Explore link still routes to `/nz-ai`, `/pablo`, `/decoded`.
- [ ] Screen 4 headline reads `Tell us what you'd build.`
- [ ] Screen 4 body does not overflow or push the CTA off-screen at 375px. Screenshot it.
- [ ] Console clean, build clean.

---

## What MUST NOT happen

- Do not reword any copy in this brief.
- Do not touch `HowWeWorkSection.tsx`.
- Do not blank the intro string instead of deleting the element.
- Do not reorder cards or change accent colours, logos or hrefs.
- Do not shorten the NZ:AI promise to match its siblings' length.
- Do not add anything in place of the deleted intro.
- Do not run `npm install`.

---

## Escalate if

- Deleting the intro breaks the heading's reveal timing in a way that is not a one-line fix.
- `.products-intro` is shared with another component.
- The longer screen 4 body cannot fit on phone without a type-scale change — report rather than adjusting the copy.

---

## Spec-is-the-prompt test

Every current string is quoted verbatim alongside its replacement, so the edits cannot land on the wrong text. Scope boundaries are explicit, including the instruction not to touch screen 2. Builds correctly with the conversation deleted.
