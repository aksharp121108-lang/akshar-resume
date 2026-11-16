# Akshar Chetan Pandya: personal site

A small static site: plain HTML, CSS and a little JavaScript. No build step, no frameworks, nothing to install.

## What is in this folder

| File | What it is |
| --- | --- |
| `index.html` | Home page: hero, about, timeline, education, experience, skills |
| `interests-and-goals.html` | Interests and goals on one page, with the Odyssey voyage intro |
| `about.html` | About page with the star-chart intro and Odyssey background |
| `academics.html`, `experience.html`, `resume.html`, `contact.html` | The other pages |
| `404.html` | Page shown for a wrong address (GitHub Pages picks it up automatically) |
| `style.css` | All the styling. Colours and spacing are at the top |
| `script.js` | Mobile menu, copy-email buttons, experience filter, count-up numbers, scroll fade-ins, back-to-top button, light/dark mode, F1 scroll car |
| `logo.png` | Round logo made from your photo, shown top left on every page |
| `akshar.jpg` | Your portrait. Replace it with another photo of the same name to change it |
| `resume-photo.jpg` | Portrait used in the resume page and downloadable PDF |
| `resume.pdf` | The file behind every "Download my resume" button |
| `favicon.svg`, `robots.txt`, `.nojekyll` | Browser tab icon, search-engine note, GitHub Pages setting |

Keep all files in the same folder. `index.html` must stay named exactly that.

## Intro animations

The home page (opening bell), About page (star chart), Academics page (stardust and astrolabe) and Interests and Goals page (the Odyssey ship) each start with a short intro. They play every time the page opens. Press **Skip intro** to end one. The button at the bottom of those pages turns the intros off or on for that browser.

If you never see an intro, check that you are opening the site through `index.html` or the hosted link, and that the phone is not in a mode that blocks JavaScript.

## Try it on your computer

Double-click `index.html`. It opens in your browser. The fonts need an internet connection.

## Put it on GitHub Pages (free)

1. Sign in at github.com and click **New repository**. Name it `akshar-pandya` (or `YOUR-USERNAME.github.io` for a shorter address). Keep it **Public**.
2. On the new repository page click **uploading an existing file**. Drag in everything from this folder (the files, not the folder itself). Click **Commit changes**.
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and click **Save**.
4. Wait a minute or two and refresh the page. GitHub shows your address:
   - `https://YOUR-USERNAME.github.io/akshar-pandya/` for a normal repository
   - `https://YOUR-USERNAME.github.io/` if you named it `YOUR-USERNAME.github.io`

To change something later, open the file on GitHub, click the pencil icon, edit and commit. The site updates by itself.

## Other free hosts

- **Netlify:** go to app.netlify.com/drop and drag this folder onto the page. You get a link straight away.
- **Cloudflare Pages:** create a project, choose **Upload assets**, and upload the folder.
- **Vercel:** import the GitHub repository above. Leave the framework as **Other** and the build command empty.

## Before you submit or share

- Click every menu link and button once.
- Open the site on your phone.
- Check both email addresses on the Contact page.
- Press **Print** on the Resume page to confirm it still fits on one A4 page.

## Common problems

- **Page shows no styling:** `style.css` is not in the same folder as the pages.
- **Photo shows "AP":** `akshar.jpg` is missing or renamed.
- **GitHub shows a 404:** wait a few minutes after turning on Pages, and check that `index.html` is in the top level of the repository.
